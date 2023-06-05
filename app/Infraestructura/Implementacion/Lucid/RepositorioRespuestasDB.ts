
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioRespuesta } from 'App/Dominio/Repositorios/RepositorioRespuesta';
import TblRespuestas from 'App/Infraestructura/Datos/Entidad/Respuesta';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import TbClasificacion from 'App/Infraestructura/Datos/Entidad/Clasificacion';

export class RepositorioRespuestasDB implements RepositorioRespuesta {

  async guardar(datos: string, idReporte: number, documento: string): Promise<any> {
    const { respuestas } = JSON.parse(datos);

    respuestas.forEach(async respuesta => {
      //Evaluar si el archivo en la tabla temporal y borrarlo


      //validar si existe
      const existeRespuesta = await TblRespuestas.query().where({ 'id_pregunta': respuesta.preguntaId, 'id_reporte': idReporte }).first()

      if (existeRespuesta) {
        existeRespuesta.idPregunta = respuesta.preguntaId;
        existeRespuesta.valor = respuesta.valor;
        existeRespuesta.usuarioActualizacion = documento;
        existeRespuesta.idReporte = idReporte;
        existeRespuesta.documento = (respuesta.documento) ?? '';
        existeRespuesta.nombredocOriginal = (respuesta.nombreArchivo) ?? '';
        existeRespuesta.ruta = (respuesta.ruta) ?? '';

        existeRespuesta.save();
           
      }else{

      const respuestaDB = new TblRespuestas();
      respuestaDB.idPregunta = respuesta.preguntaId;
      respuestaDB.valor = respuesta.valor;
      respuestaDB.usuarioActualizacion = documento;
      respuestaDB.idReporte = idReporte;
      respuestaDB.documento = (respuesta.documento) ?? '';
      respuestaDB.nombredocOriginal = (respuesta.nombreArchivo) ?? '';
      respuestaDB.ruta = (respuesta.ruta) ?? '';

      respuestaDB.save();
    }
    });


    return {
      mensaje: "Encuesta guardada correctamente"
    }


  }



}
