import { RepositorioIndicador } from 'App/Dominio/Repositorios/RepositorioIndicador';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import TblRespuestas from 'App/Infraestructura/Datos/Entidad/Respuesta';
import { ServicioAuditoria } from 'App/Dominio/Datos/Servicios/ServicioAuditoria';
import { DateTime } from 'luxon';
import { TblFormulariosIndicadores } from 'App/Infraestructura/Datos/Entidad/FormularioIndicadores';
import { TblDetalleDatos } from 'App/Infraestructura/Datos/Entidad/DetalleDatos';
import { DetalleDatos } from 'App/Dominio/Datos/Entidades/DetalleDatos';
import { TblDetalleDatosEvidencias } from 'App/Infraestructura/Datos/Entidad/DetalleEvidencias';
import { DetalleEvidencia } from 'App/Dominio/Datos/Entidades/DetalleEvidencias';
import { TblArchivosTemporales } from 'App/Infraestructura/Datos/Entidad/Archivo';
import { ServicioEstados } from 'App/Dominio/Datos/Servicios/ServicioEstados';

export class RepositorioIndicadoresDB implements RepositorioIndicador {
  private servicioAuditoria = new ServicioAuditoria();
  private servicioEstado = new ServicioEstados();

  async visualizar(params: any): Promise<any> {
    const { idUsuario, idVigilado, idReporte, idMes } = params;

    //let tipoAccion = (idUsuario === idVigilado) ? 2 : 1;
    const formularios: any = [];
    const reporte = await TblReporte.findOrFail(idReporte)

    const consulta = TblFormulariosIndicadores.query()
    const vigencia = reporte.anioVigencia??undefined

    consulta.preload('subIndicadores', subIndicador => {
      if (reporte && reporte.anioVigencia == 2023) {
        subIndicador.preload('datosIndicadores', datos => {
          datos.preload('detalleDatos', detalle => {
            detalle.where('ddt_reporte_id', idReporte)
          })
          datos.where('dai_visible', true)
          datos.where('dai_meses', idMes)
        }).whereHas('datosIndicadores', datos => {
          datos.where('dai_meses', idMes)
        })


      } else {
        subIndicador.preload('datosIndicadores', datos => {
          datos.preload('detalleDatos', detalle => {
            detalle.where('ddt_reporte_id', idReporte)
          })
          datos.where('dai_meses', idMes)
        }).whereHas('datosIndicadores', datos => {
          datos.where('dai_meses', idMes)
        })


      }
      subIndicador.preload('periodo')

    })

    //Evidencias
    consulta.preload('evidencias', sqlEvidencia => {

      if (reporte && reporte.anioVigencia == 2023) {
        sqlEvidencia.preload('datosEvidencias', sqlDatosE => {
          sqlDatosE.preload('detalleEvidencias', detalleV => {
            detalleV.where('dde_reporte_id', idReporte)
          })
          sqlDatosE.where('dae_visible', true)
          sqlDatosE.where('dae_meses', idMes)

        }).whereHas('datosEvidencias', sqlDatosE => {
          sqlDatosE.where('dae_meses', idMes)
        }).preload('subTipoDato', sqlSubTipoDato => {
          sqlSubTipoDato.preload('tipoDato')
        })

      } else {
        sqlEvidencia.preload('datosEvidencias', sqlDatosE => {
          sqlDatosE.preload('detalleEvidencias', detalleV => {
            detalleV.where('dde_reporte_id', idReporte)
          })
          sqlDatosE.where('dae_meses', idMes)
        }).whereHas('datosEvidencias', sqlDatosE => {
          sqlDatosE.where('dae_meses', idMes)
        }).preload('subTipoDato', sqlSubTipoDato => {
          sqlSubTipoDato.preload('tipoDato')
        })
      }
    })


    const formulariosBD = await consulta

     formulariosBD.forEach(formulario => {
      const nombre = formulario.nombre
      const mensaje = formulario.mensaje
      const subIndicador: any = [];
      formulario.subIndicadores.forEach(subInd => {
        const preguntas: any = []
        subInd.datosIndicadores.forEach(datos => {
          preguntas.push({
            idPregunta: datos.id,
            pregunta: datos.nombre,
            obligatoria: subInd.obligatorio,
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
        if(preguntas.length >= 1){
        subIndicador.push({
          nombreSubIndicador: subInd.nombre,
          codigo: subInd.codigo,
          preguntas,
        })
      }
      });

      const evidencias: any = [];
      formulario.evidencias.forEach(evidencia => {
        evidencia.datosEvidencias.forEach(datoEvidencia => {
          evidencias.push({
            idEvidencia: datoEvidencia.id,
            nombre: evidencia.nombre,
            tamanio: evidencia.tamanio,
            obligatoria: evidencia.obligatorio,
            tipoEvidencia: evidencia.subTipoDato.tipoDato.nombre,
            validaciones: {
              tipoDato: evidencia.subTipoDato.nombre,
              cantDecimal: evidencia.subTipoDato.decimales??0,
              tamanio: evidencia.tamanio,
              extension: evidencia.subTipoDato.extension??''
            },
            respuesta: datoEvidencia.detalleEvidencias[0]?.valor ?? '',
            documento: datoEvidencia.detalleEvidencias[0]?.documento ?? '',
            nombreOriginal: datoEvidencia.detalleEvidencias[0]?.nombredocOriginal ?? '',
            ruta: datoEvidencia.detalleEvidencias[0]?.ruta ?? ''
          })
        });
      })

      formularios.push({
        nombre,
        mensaje,
        subIndicador,
        evidencias
      })

    });

    return {
      idVigilado,
      idReporte,
      idEncuesta: reporte.idEncuesta,
      vigencia,
      formularios
    }
  }

  async enviarSt(params: any): Promise<any> {
    const { idEncuesta, idReporte, idVigilado, idUsuario } = params
    let aprobado = true;
    const faltantesIndicadores = new Array();
    const faltantesEvidencias = new Array();

    const indicadores = await this.visualizar(params)

    indicadores.formularios.forEach(formulario => {
      if (formulario.subIndicador.length != 0) {
        formulario.subIndicador.forEach(subInd => {
          if (subInd.preguntas.length != 0) {
            subInd.preguntas.forEach(pregunta => {
              if (pregunta.obligatoria && pregunta.respuesta === '') {
                faltantesIndicadores.push(pregunta.idPregunta);
                aprobado = false;
              }
            });
          }
        });
      }
      if (formulario.evidencias.length != 0) {
        formulario.evidencias.forEach(evidencia => {
          if (evidencia.obligatoria){
            if ((evidencia.tipoEvidencia === 'FILE' && evidencia.documento === '') || (evidencia.tipoEvidencia !== 'FILE' && evidencia.respuesta === '')) {
              faltantesEvidencias.push(evidencia.idEvidencia);
              aprobado = false;

            }

          }
        });

      }
    });

    if (aprobado) {
      this.servicioEstado.Log(idUsuario, 1004, idEncuesta)
      const reporte = await TblReporte.findOrFail(idReporte)
      reporte.fechaEnviost = DateTime.fromJSDate(new Date())
      reporte.envioSt = '1'
      reporte.estadoVerificacionId = 1004
      reporte.save();
    }

    //return indicadores
    return { aprobado, faltantesIndicadores, faltantesEvidencias }

  }


  async guardar(datos: string, documento: string): Promise<any> {
    const { respuestas, reporteId, evidencias, mesId } = JSON.parse(datos);

    //const { usuarioCreacion, loginVigilado, idEncuesta } = await TblReporte.findByOrFail('id', idReporte)

    this.servicioEstado.Log(documento, 1003, undefined, reporteId)
    /* this.servicioAuditoria.Auditar({
      accion: "Guardar Respuesta",
      modulo: "Encuesta",
      usuario: usuarioCreacion ?? '',
      vigilado: loginVigilado ?? '',
      descripcion: 'Primer guardado de la encuesta',
      encuestaId: idEncuesta,
      tipoLog: 4
    }) */
    for await (const respuesta of respuestas) {
      //Evaluar si el archivo en la tabla temporal y borrarlo
      //validar si existe
      //   const existeRespuesta = await TblRespuestas.query().where({ 'id_pregunta': respuesta.preguntaId, 'id_reporte': idReporte }).first()

      const existeDatos = await TblDetalleDatos.query().where({ 'ddt_dato_indicador_id': respuesta.preguntaId, 'ddt_reporte_id': reporteId }).first()

      let data: DetalleDatos = {
        datoIndicadorId: respuesta.preguntaId,
        valor: respuesta.valor,
        reporteId: reporteId,
        fechaActualizacion: DateTime.fromJSDate(new Date),
        anioActivoId: 2023
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

      if (existeDatos) {
        existeDatos.estableceDetalleDatosConId(data)
        const resp = await existeDatos.save();

      } else {
        const respuestaDB = new TblDetalleDatos();
        respuestaDB.establecerDetalleDatosDb(data)
        respuestaDB.save();
      }


    }

    for await (const evidencia of evidencias) {
      //Evaluar si el archivo en la tabla temporal y borrarlo
      //validar si existe
      //   const existeRespuesta = await TblRespuestas.query().where({ 'id_pregunta': respuesta.preguntaId, 'id_reporte': idReporte }).first()

      const existeDatosE = await TblDetalleDatosEvidencias.query().where({ 'dde_dato_evidencia_id': evidencia.evidenciaId, 'dde_reporte_id': reporteId }).first()

      let data: DetalleEvidencia = {
        datoEvidenciaId: evidencia.evidenciaId,
        valor: evidencia.valor,
        reporteId: reporteId,
        fechaActualizacion: DateTime.fromJSDate(new Date),
        anioActivoId: 2023
      }

      if (evidencia.documento) {
        data.documento = evidencia.documento
      }
      if (evidencia.nombreArchivo) {
        data.nombredocOriginal = evidencia.nombreArchivo
      }
      if (evidencia.ruta) {
        data.ruta = evidencia.ruta
      }

      if (existeDatosE) {
        existeDatosE.estableceDetalleEvidenciaConId(data)
        const evid = await existeDatosE.save();


      } else {
        const evidenciaDB = new TblDetalleDatosEvidencias();
        evidenciaDB.establecerDetalleEvidenciaDb(data)
        evidenciaDB.save();
      }

      if (evidencia.documento) {
        const temporal = await TblArchivosTemporales.query().where({ 'art_pregunta_id': evidencia.evidenciaId, 'art_usuario_id': documento, 'art_nombre_archivo': evidencia.documento }).first()

        await temporal?.delete()
      }


    }


    return {
      mensaje: "Formulario guardado correctamente"
    }


  }


}
