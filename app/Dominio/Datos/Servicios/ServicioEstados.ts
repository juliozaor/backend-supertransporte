import TblEncuestas from 'App/Infraestructura/Datos/Entidad/Encuesta';
import TblUsuarioEncuesta from 'App/Infraestructura/Datos/Entidad/UsuarioEncuesta';
export class ServicioEstados{

  public async Log (usuario:string, estado:number, idEncuesta?: number) {
if(estado === 1){
    TblEncuestas.query().where('logueo', true).andWhere('fecha_fin', '>', new Date()).select('id_encuesta', 'fecha_inicio').then((encuestas) => {
      encuestas.forEach(async encuesta => {
        this.valdarEstado(usuario, estado, encuesta.id)        
      });

    })
  }else{
    this.valdarEstado(usuario, estado, idEncuesta)  
  }
  }

   valdarEstado = async (usuario:string, estado:number, idEncuesta?: number) =>{
    const existeUsuarioEncuesta = await TblUsuarioEncuesta.query()
    .where(
      {'use_nitVigilado':usuario, 
      'use_idEncuesta':idEncuesta, 
      'use_estado_vigilado_id': estado})
      .first()

      if(!existeUsuarioEncuesta){
        const usuarioEncuesta = new TblUsuarioEncuesta()
        usuarioEncuesta.nitVigilado = usuario
        usuarioEncuesta.encuestaId = idEncuesta!
        usuarioEncuesta.estadoVigiladoId = estado
        usuarioEncuesta.save()

        
      }
  }

}
