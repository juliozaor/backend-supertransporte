import TblEncuestas from 'App/Infraestructura/Datos/Entidad/Encuesta';
import TblUsuarioEncuesta from 'App/Infraestructura/Datos/Entidad/UsuarioEncuesta';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
export class ServicioEstados {

  public async Log(usuario: string, estado: number, idEncuesta?: number, idReporte?: number, confirmar?: boolean) {
    if (estado === 1001) {
      TblEncuestas.query().where('logueo', true).andWhere('fecha_fin', '>', new Date()).select('id_encuesta', 'fecha_inicio').then((encuestas) => {
        encuestas.forEach(async encuesta => {
          this.valdarEstado(usuario, estado, encuesta.id)
        });

      })
    } else {
      this.valdarEstado(usuario, estado, idEncuesta, confirmar)
    }
    if (idReporte) {
      const reporte = await TblReporte.findOrFail(idReporte)
      reporte.estadoVerificacionId = estado
      reporte.save();
    }
  }

  valdarEstado = async (usuario: string, estado: number, idEncuesta?: number, confirmar?: boolean) => {
    const existeUsuarioEncuesta = await TblUsuarioEncuesta.query()
      .where(
        {
          'use_nitVigilado': usuario,
          'use_idEncuesta': idEncuesta,
          'use_estado_vigilado_id': estado
        })
      .first()

    if (!existeUsuarioEncuesta) {
      const usuarioEncuesta = new TblUsuarioEncuesta()
      usuarioEncuesta.nitVigilado = usuario
      usuarioEncuesta.encuestaId = idEncuesta!
      usuarioEncuesta.estadoVigiladoId = estado
      usuarioEncuesta.stErrores = confirmar
      usuarioEncuesta.save()


    }
  }

}
