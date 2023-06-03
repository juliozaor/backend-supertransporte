
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioEncuesta } from 'App/Dominio/Repositorios/RepositorioEncuesta';
import { Reportadas } from 'App/Dominio/Dto/Encuestas/Reportadas';
import TblEncuestas from 'App/Infraestructura/Datos/Entidad/Encuesta';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import TbClasificacion from 'App/Infraestructura/Datos/Entidad/Clasificacion';

export class RepositorioEncuestasDB implements RepositorioEncuesta {
  async obtenerReportadas(params: any): Promise<{ reportadas: Reportadas[], paginacion: Paginador }> {
    const {idUsuario, idEncuesta, pagina, limite, idVigilado} = params;
//let validado: boolean = false;
     //TODO: Validar categorizado
   /*   if(idEncuesta && idEncuesta == 1){
        validado = await this.validarCategorizado(idUsuario);
     }
 */
let usuarioCreacion:string = "";
    
    const reportadas: Reportadas[] = []
    const consulta = TblReporte.query().preload('usuario');
    
    if (idEncuesta) {           
      consulta.preload('encuesta', sqlE =>{
        sqlE.where('id', idEncuesta);
      }).whereHas('encuesta', sqlE =>{
        sqlE.where('id', idEncuesta);
      })
    }else{
      consulta.preload('encuesta')
    }
    
    if (idVigilado && idVigilado === idUsuario ) {
      console.log("Entro iguales");
      
      consulta.where('login_vigilado', idVigilado);
    }else{
      console.log("Entro diferentes");
      consulta.where('usuario_creacion', idUsuario);
    }

    let reportadasBD = await consulta.paginate(pagina, limite)

    //console.log(reportadasBD.length <= 0 && idUsuario);
    

    if(reportadasBD.length <= 0) {
      const usuario = await TblUsuarios.query().where('identificacion', idUsuario).first()    
     
      
      const reporte = new TblReporte()
      reporte.estableceReporteConId({
        idEncuesta: idEncuesta,
        envioSt: '0',
        loginVigilado : idVigilado,
        razonSocialRues: usuario?.nombre!,
        nitRues: idVigilado,
        usuarioCreacion: idUsuario        
      })   

     await reporte.save(); 
     reportadasBD = await consulta.paginate(pagina, limite)
    }


    reportadasBD.map(reportada => {
      reportadas.push({
        idEncuestaDiligenciada: reportada.encuesta.id,
        idVigilado: reportada.loginVigilado,
        numeroReporte: reportada.id!,
        encuesta: reportada.encuesta.nombre,
        descripcion: reportada.encuesta.descripcion,
        fechaInicio: reportada.encuesta.fechaInicio,
        fechaFinal: reportada.encuesta.fechaFin,
        fechaEnvioST: reportada.fechaEnviost!,
        razonSocial: reportada.razonSocialRues,
        nit: reportada.nitRues,
        email: reportada.usuario.correo,
        usuarioCreacion: reportada.usuarioCreacion,
        estado: (reportada.envioSt == "1") ? "FORMULARIO ENVIADO ST" : "FORMULARIO EN BORRADOR",
      });
    })

    


    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(reportadasBD)
    return { reportadas, paginacion }
  }

  async visualizar(params: any): Promise<any> {

    const { idEncuesta, idUsuario, idVigilado } = params;
    const tipoAccion = (idUsuario === idVigilado) ? 2 : 1;   
    let clasificacionesArr: any = [];


    

    let clasificacion = '';

    const consulta = TblEncuestas.query().preload('pregunta', sql => {
      sql.preload('clasificacion').preload('tiposPregunta').orderBy('preguntas.orden')
    }).preload('reportes', (repo) =>{
      repo.where('id_reporte', ide)
    }).where({'id_encuesta':idEncuesta}).first();
    const encuestaSql = await consulta

    const claficiacionesSql = await TbClasificacion.query();    
    claficiacionesSql.forEach(clasificacionSql => {
      let preguntasArr: any = [];
      clasificacion = clasificacionSql.nombre;
      
      encuestaSql?.pregunta.forEach( pregunta=> { 
        console.log(pregunta.tiposPregunta);
        
        
        if (clasificacionSql.id === pregunta.clasificacion.id) {
            preguntasArr.push({
              idPregunta: pregunta.id,
            numeroPregunta: pregunta.orden,
            pregunta: pregunta.pregunta,
            obligatoria : pregunta.obligatoria,
            respuesta : '',
            tipoDeEvidencia : pregunta.tipoEvidencia,
            documento : '',
            adjuntable : pregunta.adjuntable,
            adjuntableObligatorio : pregunta.adjuntableObligatorio,
            tipoPregunta: pregunta.tiposPregunta.nombre,
            valoresPregunta: pregunta.tiposPregunta.opciones,
            validaciones: pregunta.tiposPregunta.validaciones
            });
            
          }
          
        });
       if (preguntasArr.length >= 1) {        
         clasificacionesArr.push(
           {
             clasificacion,
             preguntas: preguntasArr
           }
           
           );
       }
       

      
    });

    
    
const encuesta = {
  tipoAccion,
  clasificaciones: clasificacionesArr
}

    return encuesta
  }

/*   const validarCategorizado = async (idUsuario: string):Promise< boolean >=>{
    const validado = await TblDetallesClasificaciones.query().where('usuarioId', idUsuario).first();
    console.log(validado);    
    return (validado)?true:false;
  } */


}
