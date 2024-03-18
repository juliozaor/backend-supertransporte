import { RepositorioIndicador } from 'App/Dominio/Repositorios/RepositorioIndicador';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import { ServicioAuditoria } from 'App/Dominio/Datos/Servicios/ServicioAuditoria';
import { DateTime } from 'luxon';
import { TblFormulariosIndicadores } from 'App/Infraestructura/Datos/Entidad/FormularioIndicadores';
import { TblDetalleDatos } from 'App/Infraestructura/Datos/Entidad/DetalleDatos';
import { DetalleDatos } from 'App/Dominio/Datos/Entidades/DetalleDatos';
import { TblDetalleDatosEvidencias } from 'App/Infraestructura/Datos/Entidad/DetalleEvidencias';
import { DetalleEvidencia } from 'App/Dominio/Datos/Entidades/DetalleEvidencias';
import { TblArchivosTemporales } from 'App/Infraestructura/Datos/Entidad/Archivo';
import { ServicioEstados } from 'App/Dominio/Datos/Servicios/ServicioEstados';
import { ServicioAcciones } from 'App/Dominio/Datos/Servicios/ServicioAcciones';
import { TblEstadosReportes } from 'App/Infraestructura/Datos/Entidad/EstadosReportes';
import { PayloadJWT } from 'App/Dominio/Dto/PayloadJWT';
import ErroresEmpresa from 'App/Exceptions/ErroresEmpresa';
import { ServicioEstadosEmpresas } from 'App/Dominio/Datos/Servicios/ServicioEstadosEmpresas';
import { TblMeses } from 'App/Infraestructura/Datos/Entidad/Mes';
import { ServicioEstadosVerificado } from 'App/Dominio/Datos/Servicios/ServicioEstadosVerificado';

export class RepositorioIndicadoresDB implements RepositorioIndicador {
  private servicioAuditoria = new ServicioAuditoria();
  private servicioEstado = new ServicioEstados();
  private servicioAcciones = new ServicioAcciones();
  private servicioEstadosEmpresas = new ServicioEstadosEmpresas();
  private servicioEstadoVerificado = new ServicioEstadosVerificado()
  async visualizar(params: any): Promise<any> {
    const { idUsuario, idVigilado, idReporte, idMes, historico, idRol } = params;

    const formularios: any = [];
    const reporte = await TblReporte.findOrFail(idReporte)




    //Buscar el estado por la nueva tabla
    const estadoreportes = await TblEstadosReportes.query()
      .where({ 'reporte': idReporte, 'vigencia': reporte.anioVigencia, 'mes': idMes })
      .orderBy('created_at', 'desc')
      .first();

    if (!estadoreportes) {
      const newEstadoReporte = new TblEstadosReportes()
      newEstadoReporte.reporte = idReporte
      newEstadoReporte.vigencia = reporte.anioVigencia!
      newEstadoReporte.mes = idMes
      newEstadoReporte.estado = 1002
      newEstadoReporte.save()
    }

    // const { encuestaEditable } = await this.servicioAcciones.obtenerAccion(estadoreportes?.estado ?? 0, idRol);
   


    const encuestaEditable = (estadoreportes?.estado !== 1004) //true
    const soloLectura = (historico && historico == 'true' || !encuestaEditable) ?? false;

    const consulta = TblFormulariosIndicadores.query()
    const vigencia = reporte.anioVigencia ?? undefined
    const observacionAdmin = reporte?.observacion ?? '';
    const aprobado = reporte?.aprobado;

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
      subIndicador.preload('periodo');
      subIndicador.orderBy('sub_orden', 'asc');
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
      sqlEvidencia.where('evi_estado', true);
      sqlEvidencia.orderBy('evi_orden', 'asc');
    })


    const formulariosBD = await consulta.orderBy('fri_orden', 'asc');

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
        if (preguntas.length >= 1) {
          subIndicador.push({
            nombreSubIndicador: subInd.nombre,
            codigo: subInd.codigo,
            preguntas,
          })
        }
      });

      const evidencias: any = [];
      let consecutivo: number = 1;
      formulario.evidencias.forEach(evidencia => {
        evidencia.datosEvidencias.forEach(datoEvidencia => {
          evidencias.push({
            consecutivo,
            idEvidencia: datoEvidencia.id,
            nombre: evidencia.nombre,
            tamanio: evidencia.tamanio,
            obligatoria: evidencia.obligatorio,
            tipoEvidencia: evidencia.subTipoDato.tipoDato.nombre,
            validaciones: {
              tipoDato: evidencia.subTipoDato.nombre,
              cantDecimal: evidencia.subTipoDato.decimales ?? 0,
              tamanio: evidencia.tamanio,
              extension: evidencia.subTipoDato.extension ?? ''
            },
            respuesta: datoEvidencia.detalleEvidencias[0]?.valor ?? '',
            documento: datoEvidencia.detalleEvidencias[0]?.documento ?? '',
            nombreOriginal: datoEvidencia.detalleEvidencias[0]?.nombredocOriginal ?? '',
            ruta: datoEvidencia.detalleEvidencias[0]?.ruta ?? ''
          })
          consecutivo++;
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
      soloLectura,
      idVigilado,
      idReporte,
      idEncuesta: reporte.idEncuesta,
      vigencia,
      mensaje: 'Cumplimiento del paso #20 de la metodología definida en la Res. 40595 de 2022.',
      formularios,
      observacionAdmin,
      aprobado
    }
  }

  async enviarSt(params: any): Promise<any> {
    const { idReporte, idMes } = params
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
          if (evidencia.obligatoria) {
            if ((evidencia.tipoEvidencia === 'FILE' && evidencia.documento === '') || (evidencia.tipoEvidencia !== 'FILE' && evidencia.respuesta === '')) {
              faltantesEvidencias.push(evidencia.idEvidencia);
              aprobado = false;

            }

          }
        });

      }
    });

    if (aprobado) {


      this.servicioEstado.Log(indicadores.idVigilado, 1004, indicadores.idEncuesta)
      this.servicioEstadoVerificado.Enviados(idReporte, 1004, idMes, indicadores.vigencia)
      this.servicioEstado.estadoReporte(idReporte, indicadores.vigencia, idMes, 1004, DateTime.fromJSDate(new Date()))
      const reporte = await TblReporte.findOrFail(idReporte)
      reporte.fechaEnviost = DateTime.fromJSDate(new Date())
      reporte.envioSt = '1'
      reporte.estadoVerificacionId = 1004
      reporte.save();
    }

    //return indicadores
    return { aprobado, faltantesIndicadores, faltantesEvidencias }

  }

  async enviarInformacion(params: any): Promise<any> {
    const { idReporte, idVigilado, idUsuario} = params
   
   const reporte = await TblReporte.findOrFail(idReporte)

   if (!reporte) {
    throw new ErroresEmpresa('El reporte no existe.',400)
   }

   if(reporte.envioSt == '1'){
    throw new ErroresEmpresa('El reporte ya fue enviado a ST.',400)
   }

    const { aprobado, faltantesIndicadores, faltantesEvidencias } = await this.enviarSt(params);
   if(aprobado){
    this.servicioEstadosEmpresas.Log(idVigilado,idUsuario,2,3004, DateTime.fromJSDate(new Date()))
   }

   return{ aprobado, faltantesIndicadores, faltantesEvidencias } 
    

  }


  async guardar(datos: string, documento: string): Promise<any> {

    try {
      
    
    const { respuestas, reporteId, evidencias, mesId } = JSON.parse(datos);

    const { anioVigencia } = await TblReporte.findByOrFail('id', reporteId)

    this.servicioEstado.estadoReporte(reporteId, anioVigencia ?? 2023, mesId, 1003)
    this.servicioEstado.Log(documento, 1003, 2, reporteId)
   


    for await (const respuesta of respuestas) {

      const existeDatos = await TblDetalleDatos.query().where({ 'ddt_dato_indicador_id': respuesta.preguntaId, 'ddt_reporte_id': reporteId }).first()

      let data: DetalleDatos = {
        datoIndicadorId: respuesta.preguntaId,
        valor: respuesta.valor,
        reporteId: reporteId,
        fechaActualizacion: DateTime.fromJSDate(new Date),
        anioActivoId: anioVigencia ?? 2023
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
  
      const existeDatosE = await TblDetalleDatosEvidencias.query().where({ 'dde_dato_evidencia_id': evidencia.evidenciaId, 'dde_reporte_id': reporteId }).first()

      let data: DetalleEvidencia = {
        datoEvidenciaId: evidencia.evidenciaId,
        valor: evidencia.valor,
        reporteId: reporteId,
        fechaActualizacion: DateTime.fromJSDate(new Date),
        anioActivoId: anioVigencia ?? 2023
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

  } catch (error) {
      return error
  }
  }

  async guardarRespuestas(datos: string, documento: string): Promise<any> {
    const { reporteId, idVigilado, mesId  } = JSON.parse(datos);
    if(!reporteId || !idVigilado || !mesId ){
      throw new ErroresEmpresa('Faltan datos obligatorios por cargar.',400)
    }
    const reporte = await TblReporte.findOrFail(reporteId)
   
    if (!reporte) {
     throw new ErroresEmpresa('El reporte no existe.',400)
    }

    const mesActivo = await TblMeses.query().where({'mes_visual': mesId, 'mes_vigencia': reporte.anioVigencia}).first()
    
    if(!mesActivo?.estado){
      throw new ErroresEmpresa('No es posible cargar información para este mes.',400)
    }
    
 
    if(reporte.envioSt == '1'){
     throw new ErroresEmpresa('El reporte ya fue enviado a ST.',400)
    }

    return await this.guardar(datos, idVigilado);

  }


  async finalizarFaseDos(mes) {
    const sql = await TblReporte.query().where('id_encuesta', 2)

    sql.forEach(async reporte => {
      //for await (const reporte of sql) {
      const respuestaEnviado = await this.enviarSt({
        "idEncuesta": 2,
        "idReporte": reporte.id,
        "idVigilado": reporte.loginVigilado,
        "idMes": mes
      })
      if (respuestaEnviado.aprobado) {
        console.log("Finalizado : ", reporte.id);
      } else {
        const respuesta = await TblDetalleDatos.query().where('ddt_reporte_id', reporte.id!).first()

        if (respuesta) {
          console.log("En Proceso : ", reporte.id);
          this.servicioEstado.estadoReporte(reporte.id!, reporte.anioVigencia!, mes, 1003, null)


        }/* else{
          console.log("Inicio : ", reporte.id);
          this.servicioEstado.estadoReporte(reporte.id!, reporte.anioVigencia!, mes, 1003, DateTime.fromJSDate(new Date()))
         const reporteBD = await TblReporte.findOrFail(reporte.id)
         reporteBD.estadoVerificacionId = 1003
         reporteBD.save();
        } */

      }


      //}

    });

    //  return { finalizados, enProceso }

  }


  //verificar fase 2
  async verificar(datos: string, payload: PayloadJWT): Promise<any> {
    const { idReporte, evidencias, anio } = JSON.parse(datos)

    /*    this.servicioEstadoVerificado.Log(idReporte, 2, payload.documento) */

    evidencias.forEach(async evidencia => {

      const existeRespuesta = await TblDetalleDatosEvidencias.query()
        .where({ 'dde_dato_evidencia_id': evidencia.evidenciaId, 'dde_reporte_id': idReporte, 'dde_anio_activo_id': anio }).first()

      if (existeRespuesta) {
        existeRespuesta.estableceVerificacion(evidencia)
        existeRespuesta.save();


      } else {
        let data: DetalleEvidencia = {
          datoEvidenciaId: evidencia.evidenciaId,
          reporteId: idReporte,
          fechaActualizacion: DateTime.fromJSDate(new Date),
          anioActivoId: anio,
          cumple: evidencia.cumple,
          observacionCumple: evidencia.observacionCumple,
          corresponde: evidencia.corresponde,
          observacionCorresponde: evidencia.observacionCorresponde
        }
        const evidenciaDB = new TblDetalleDatosEvidencias();
        evidenciaDB.establecerDetalleEvidenciaDb(data)
        evidenciaDB.save();
      }




    });

  }



}
