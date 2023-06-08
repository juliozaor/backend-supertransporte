import { Respuesta } from 'App/Dominio/Datos/Entidades/Respuesta';
import { RepositorioRespuesta } from 'App/Dominio/Repositorios/RepositorioRespuesta';
import TblRespuestas from 'App/Infraestructura/Datos/Entidad/Respuesta';
import TblAuditorias from 'App/Infraestructura/Datos/Entidad/auditoria';
import { DateTime } from 'luxon';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import { TblArchivosTemporales } from 'App/Infraestructura/Datos/Entidad/Archivo';
export class RepositorioRespuestasDB implements RepositorioRespuesta {

  async guardar(datos: string, idReporte: number, documento: string): Promise<any> {
    const { respuestas } = JSON.parse(datos);

    const { usuarioCreacion, loginVigilado } = await TblReporte.findByOrFail('id', idReporte)



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
        fechaActualizacion: DateTime.fromJSDate(new Date)
      }

      if (existeRespuesta) {

        existeRespuesta.estableceRespuestaConId(data)
        const respuesta = await existeRespuesta.save();

        const auditar = new TblAuditorias()
        auditar.accion = "Actualizar Respueta"
        auditar.modulo = "Encuesta"
        auditar.jsonAnterior = JSON.parse(JSON.stringify(existeRespuesta.$attributes))
        auditar.jsonNuevo = JSON.parse(JSON.stringify(respuesta.$attributes))
        auditar.usuario = usuarioCreacion ?? ''
        auditar.vigilado = loginVigilado ?? ''
        auditar.descripcion = 'Actualización de respuesta'

        auditar.save()

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
