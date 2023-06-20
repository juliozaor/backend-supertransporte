import { Respuesta } from 'App/Dominio/Datos/Entidades/Respuesta';
import { RepositorioRespuesta } from 'App/Dominio/Repositorios/RepositorioRespuesta';
import TblRespuestas from 'App/Infraestructura/Datos/Entidad/Respuesta';
import { DateTime } from 'luxon';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import { TblArchivosTemporales } from 'App/Infraestructura/Datos/Entidad/Archivo';
import { ServicioAuditoria } from 'App/Dominio/Datos/Servicios/ServicioAuditoria';
import { ServicioEstados } from 'App/Dominio/Datos/Servicios/ServicioEstados';
export class RepositorioRespuestasDB implements RepositorioRespuesta {
  private servicioAuditoria = new ServicioAuditoria();
  private servicioEstado = new ServicioEstados();

  async guardar(datos: string, idReporte: number, documento: string): Promise<any> {
    const { respuestas } = JSON.parse(datos);    
    const { usuarioCreacion, loginVigilado, idEncuesta } = await TblReporte.findByOrFail('id', idReporte)
   
    this.servicioEstado.Log(loginVigilado, 3, idEncuesta)
    this.servicioAuditoria.Auditar({
      accion: "Guardar Respuesta",
      modulo: "Encuesta",
      usuario: usuarioCreacion ?? '',
      vigilado: loginVigilado ?? '',
      descripcion: 'Primer guardado de la encuesta',
      encuestaId:idEncuesta,
      tipoLog: 4
    })

    respuestas.forEach(async respuesta => {
      //Evaluar si el archivo en la tabla temporal y borrarlo
      //validar si existe
      const existeRespuesta = await TblRespuestas.query().where({ 'id_pregunta': respuesta.preguntaId, 'id_reporte': idReporte }).first()

      const data: Respuesta = {
        idPregunta: respuesta.preguntaId,
        valor: respuesta.valor,
        usuarioActualizacion: documento,
        idReporte: idReporte,
        documento: (respuesta.documento) ?? '',
        nombredocOriginal: (respuesta.nombreArchivo) ?? '',
        ruta: (respuesta.ruta) ?? '',
        fechaActualizacion: DateTime.fromJSDate(new Date),
        observacion: (respuesta.observacion) ?? ''
      }

      if (existeRespuesta) {

        existeRespuesta.estableceRespuestaConId(data)
        const respuesta = await existeRespuesta.save();


        this.servicioAuditoria.Auditar({
          accion: "Actualizar Respuesta",
          modulo: "Encuesta",
          jsonAnterior: JSON.stringify(existeRespuesta.$attributes),
          jsonNuevo: JSON.stringify(respuesta.$attributes),
          usuario: usuarioCreacion ?? '',
          vigilado: loginVigilado ?? '',
          descripcion: 'Actualización de respuesta',
          encuestaId:idEncuesta
        })


      } else {
        const respuestaDB = new TblRespuestas();
        respuestaDB.establecerRespuestaDb(data)
        respuestaDB.save();
      }

      //Elimnar de la tabla temporal el archivo almacenado     
      console.log({ 'art_pregunta_id': respuesta.preguntaId, 'art_usuario_id': loginVigilado, 'art_nombre_archivo': respuesta.documento });

      if (respuesta.documento) {
        const temporal = await TblArchivosTemporales.query().where({ 'art_pregunta_id': respuesta.preguntaId, 'art_usuario_id': loginVigilado, 'art_nombre_archivo': respuesta.documento }).first()
        console.log(temporal);

        await temporal?.delete()
      }

    });


    return {
      mensaje: "Encuesta guardada correctamente"
    }


  }


}
