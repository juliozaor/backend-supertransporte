import { RepositorioIndicador } from 'App/Dominio/Repositorios/RepositorioIndicador';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import TblRespuestas from 'App/Infraestructura/Datos/Entidad/Respuesta';
import { Respuesta } from 'App/Dominio/Datos/Entidades/Respuesta';
import { Pregunta } from 'App/Dominio/Datos/Entidades/Pregunta';
import { ServicioAuditoria } from 'App/Dominio/Datos/Servicios/ServicioAuditoria';
import { ServicioEstados } from 'App/Dominio/Datos/Servicios/ServicioEstados';
import { DateTime } from 'luxon';
import { TblFormulariosIndicadores } from 'App/Infraestructura/Datos/Entidad/FormularioIndicadores';


export class RepositorioIndicadoresDB implements RepositorioIndicador {
  private servicioAuditoria = new ServicioAuditoria();
  private servicioEstado = new ServicioEstados();




  async visualizar(params: any): Promise<any> {
    const { idEncuesta, idUsuario, idVigilado, idReporte } = params;
    let tipoAccion = (idUsuario === idVigilado) ? 2 : 1;
    const formularios: any = [];
    const reporte = await TblReporte.findOrFail(idReporte)

    const consulta = TblFormulariosIndicadores.query()
    let vigencia = '';

    consulta.preload('subIndicadores', subIndicador => {
      if (reporte && reporte.anioVigencia == 2023) {
        vigencia = `Año de vigencia ${reporte.anioVigencia}`
        subIndicador.preload('datosIndicadores', datos => {
          datos.preload('detalleDatos', detalle => {
            detalle.where('ddt_reporte_id', idReporte)
          })
          datos.where('dai_visible', true)
        })
      } else {
        subIndicador.preload('datosIndicadores', datos => {
          datos.preload('detalleDatos', detalle => {
            detalle.where('ddt_reporte_id', idReporte)
          })
        })

      }
      subIndicador.preload('periodo')

    })

    const formulariosBD = await consulta

    formulariosBD.forEach(formulario => {
      const nombre = formulario.nombre
      const subIndicador: any = [];
      formulario.subIndicadores.forEach(subInd => {
        const preguntas: any = []
        subInd.datosIndicadores.forEach(datos => {
          preguntas.push({
            idPregunta: datos.id,
            pregunta: datos.nombre,
            obligatoria: true,
            respuesta: datos.detalleDatos[0]?.valor ?? '',
            tipoDeEvidencia: "",
            documento: "",
            nombreOriginal: "",
            ruta: "",
            adjuntable: false,
            adjuntableObligatorio: false,
            tipoPregunta: "NUMBER",
            valoresPregunta: [],
            validaciones: {
              tipoDato: subInd.periodo.tipo,
              cantDecimal: subInd.periodo.decimal
            },
            observacion: "",
            cumple: "",
            observacionCumple: "",
            corresponde: "",
            observacionCorresponde: ""
          })
        });
        subIndicador.push({
          nombreSubIndicador: subInd.nombre,
          codigo: subInd.codigo,
          preguntas
        })
      });
      formularios.push({
        nombre,
        subIndicador
      })

    });

    return {vigencia, formularios}
  }

/*   async enviarSt(params: any): Promise<any> {
    const { idEncuesta, idReporte, idVigilado, idUsuario } = params
    const usuario = await TblUsuarios.query().preload('clasificacionUsuario', (sqlClasC) => {
      sqlClasC.preload('clasificacion', (sqlCla) => {
        sqlCla.preload('pregunta', (sqlPre) => {
          sqlPre.where('id_encuesta', idEncuesta)
        }).whereHas('pregunta', sqlE => {
          sqlE.where('id_encuesta', idEncuesta);
        })
      })
    }).where('identificacion', idUsuario).first()

    let aprobado = true;
    const faltantes = new Array();
    const pasos = usuario?.clasificacionUsuario[0]?.clasificacion
    const respuestas = await TblRespuestas.query().where('id_reporte', idReporte).orderBy('id_pregunta', 'asc')
    pasos?.forEach(paso => {
      paso.pregunta.forEach(preguntaPaso => {
        let repuestaExiste = true
        let archivoExiste = true
        const respuesta = respuestas.find(r => r.idPregunta === preguntaPaso.id)
        if (preguntaPaso.obligatoria) {
          if (!respuesta) {
            //throw new NoAprobado('Faltan preguntas por responder')     
            repuestaExiste = false
          }

          if (respuesta && respuesta.valor === 'N' && respuesta.observacion === '') {
            repuestaExiste = false
          }


          if (respuesta && respuesta.valor === 'S' && preguntaPaso.adjuntableObligatorio) {
            console.log(respuesta.observacion);

            archivoExiste = this.validarDocumento(respuesta, preguntaPaso);
          }

        }


        if (!repuestaExiste || !archivoExiste) {
          aprobado = false
          faltantes.push({
            preguntaId: preguntaPaso.id,
            archivoObligatorio: preguntaPaso.adjuntableObligatorio
          })

        }


      });

    });

    if (aprobado) {
      this.servicioEstado.Log(idUsuario, 1004, idEncuesta)
      const reporte = await TblReporte.findOrFail(idReporte)
      reporte.fechaEnviost = DateTime.fromJSDate(new Date())
      reporte.envioSt = '1'
      reporte.estadoVerificacionId = 1004
      reporte.save();
    }

    return { aprobado, faltantes }

  } */

  validarDocumento = (r: Respuesta, p: Pregunta): boolean => {
    if (!r.documento || r.documento.length <= 0) {
      //throw new NoAprobado('Faltan archivos adjuntar')
      return false
    }
    return true
  }

/*   async guardar(datos: string, idReporte: number, documento: string): Promise<any> {
    const { respuestas } = JSON.parse(datos);
    const { usuarioCreacion, loginVigilado, idEncuesta } = await TblReporte.findByOrFail('id', idReporte)

    this.servicioEstado.Log(loginVigilado, 1003, idEncuesta, idReporte)
    this.servicioAuditoria.Auditar({
      accion: "Guardar Respuesta",
      modulo: "Encuesta",
      usuario: usuarioCreacion ?? '',
      vigilado: loginVigilado ?? '',
      descripcion: 'Primer guardado de la encuesta',
      encuestaId: idEncuesta,
      tipoLog: 4
    })

    respuestas.forEach(async respuesta => {
      //Evaluar si el archivo en la tabla temporal y borrarlo
      //validar si existe
      const existeRespuesta = await TblRespuestas.query().where({ 'id_pregunta': respuesta.preguntaId, 'id_reporte': idReporte }).first()


      let data: Respuesta = {
        idPregunta: respuesta.preguntaId,
        valor: respuesta.valor,
        usuarioActualizacion: documento,
        idReporte: idReporte,
        fechaActualizacion: DateTime.fromJSDate(new Date)
      }

      if (respuesta.documento) {
        data.documento = respuesta.documento
      }
      if (respuesta.nombreArchivo) {
        data.nombredocOriginal = respuesta.nombreArchivo
      }
      if (respuesta.ruta) {
        data.ruta = respuesta.ruta
      }
      if (respuesta.observacion) {
        data.observacion = respuesta.observacion
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
          encuestaId: idEncuesta
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


  } */

}
