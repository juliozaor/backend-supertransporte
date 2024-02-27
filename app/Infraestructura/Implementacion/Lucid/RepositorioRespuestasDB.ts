import { Respuesta } from 'App/Dominio/Datos/Entidades/Respuesta';
import { RepositorioRespuesta } from 'App/Dominio/Repositorios/RepositorioRespuesta';
import TblRespuestas from 'App/Infraestructura/Datos/Entidad/Respuesta';
import { DateTime } from 'luxon';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import { TblArchivosTemporales } from 'App/Infraestructura/Datos/Entidad/Archivo';
import { ServicioAuditoria } from 'App/Dominio/Datos/Servicios/ServicioAuditoria';
import { ServicioEstados } from 'App/Dominio/Datos/Servicios/ServicioEstados';
import { PayloadJWT } from 'App/Dominio/Dto/PayloadJWT';
import { ServicioEstadosVerificado } from 'App/Dominio/Datos/Servicios/ServicioEstadosVerificado';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import TbClasificacion from 'App/Infraestructura/Datos/Entidad/Clasificacion';
import { TblFormulariosIndicadores } from 'App/Infraestructura/Datos/Entidad/FormularioIndicadores';
import ErroresEmpresa from 'App/Exceptions/ErroresEmpresa';
import { ServicioEstadosEmpresas } from 'App/Dominio/Datos/Servicios/ServicioEstadosEmpresas';
export class RepositorioRespuestasDB implements RepositorioRespuesta {
  private servicioAuditoria = new ServicioAuditoria();
  private servicioEstado = new ServicioEstados();
  private servicioEstadoVerificado = new ServicioEstadosVerificado()
  private servicioEstadosEmpresas = new ServicioEstadosEmpresas();

  async guardar(datos: string, idReporte: number, documento: string): Promise<any> {
    const { respuestas } = JSON.parse(datos);
    const { usuarioCreacion, loginVigilado, idEncuesta, estadoVerificacionId } = await TblReporte.findByOrFail('id', idReporte)
    let estado = 1003
    if (estadoVerificacionId === 7 || estadoVerificacionId === 1005) {
      estado = 1005
    }
    this.servicioEstado.Log(loginVigilado, estado, idEncuesta, idReporte)
    this.servicioAuditoria.Auditar({
      accion: "Guardar Respuesta",
      modulo: "Encuesta",
      usuario: usuarioCreacion ?? '',
      vigilado: loginVigilado ?? '',
      descripcion: 'Primer guardado de la encuesta',
      encuestaId: idEncuesta,
      tipoLog: 4
    })

    for await (const respuesta of respuestas) {
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
        const resp = await existeRespuesta.save();


        this.servicioAuditoria.Auditar({
          accion: "Actualizar Respuesta",
          modulo: "Encuesta",
          jsonAnterior: JSON.stringify(existeRespuesta.$attributes),
          jsonNuevo: JSON.stringify(resp.$attributes),
          usuario: usuarioCreacion ?? '',
          vigilado: loginVigilado ?? '',
          descripcion: 'Actualización de respuesta',
          encuestaId: idEncuesta
        })


      } else {

        const respuestaDB = new TblRespuestas();
        respuestaDB.establecerRespuestaDb(data)
        await respuestaDB.save();
      }

      //Elimnar de la tabla temporal el archivo almacenado     

      if (respuesta.documento) {
        const temporal = await TblArchivosTemporales.query().where({ 'art_pregunta_id': respuesta.preguntaId, 'art_usuario_id': loginVigilado, 'art_nombre_archivo': respuesta.documento }).first()

        await temporal?.delete()
      }

      //});
    }

    return {
      mensaje: "Encuesta guardada correctamente"
    }

  }


  async guardarReporte(datos: string, idReporte: number, documento: string): Promise<any> {
    const { idVigilado } = JSON.parse(datos);
    const reporte = await TblReporte.findOrFail(idReporte)
 
    if (!reporte) {
     throw new ErroresEmpresa('El reporte no existe.',400)
    }
 
    if(reporte.envioSt == '1'){
     throw new ErroresEmpresa('El reporte ya fue enviado a ST.',400)
    }
 
    return await this.guardar(datos, idReporte, idVigilado);


  }

  //verificar fase 1
  async verificar(datos: string, payload: PayloadJWT): Promise<any> {
    const { idReporte, respuestas, noObligado } = JSON.parse(datos)

    this.servicioEstadoVerificado.Log(idReporte, 2, payload.documento)

    if(noObligado){
      const reporteDb = await TblReporte.findBy('id_reporte', idReporte)
      reporteDb?.establecerEstadoobligado(noObligado);
      reporteDb?.save()
    }

    respuestas.forEach(async respuesta => {

      const existeRespuesta = await TblRespuestas.query().where({ 'id_pregunta': respuesta.preguntaId, 'id_reporte': idReporte }).first()
      existeRespuesta?.estableceVerificacion(respuesta)
      existeRespuesta?.save()
    });

  }

  //finalizar verificacion fase 1
  async finalizar(params: any): Promise<any> {


    const { idEncuesta, idReporte, idUsuario, idVigilado } = params
    const usuario = await TblUsuarios.query().preload('clasificacionUsuario', (sqlClasC) => {
      sqlClasC.preload('clasificacion', (sqlCla) => {
        sqlCla.preload('pregunta', (sqlPre) => {
          sqlPre.preload('respuesta', sqlResp => {
            sqlResp.where('id_reporte', idReporte)
          })
          sqlPre.where('id_encuesta', idEncuesta)
        }).whereHas('pregunta', sqlE => {
          sqlE.where('id_encuesta', idEncuesta);
        }).orderBy('id_clasificacion', 'asc')
      })
    }).where('identificacion', idVigilado).first()


    let aprobado = true;
    let cumple = true;
    const faltantes = new Array();
    const clasificaciones = await TbClasificacion.query().preload('pregunta').where('estado', 1);
    const pasos = usuario?.clasificacionUsuario[0].clasificacion
    const respuestas = await TblRespuestas.query().where('id_reporte', idReporte).orderBy('id_pregunta', 'asc')
    clasificaciones.forEach(clasificacion => {
      const paso = pasos?.find(p => p.id === clasificacion.id);
      if (paso) {
        paso.pregunta.forEach(preguntaPaso => {
          const respuesta = preguntaPaso.respuesta[0];

          if (respuesta) {
            if (!respuesta.cumple || respuesta.cumple == 0 || !respuesta.corresponde || respuesta.corresponde == 0) {
              faltantes.push(respuesta.idPregunta)
              aprobado = false
            }


            if (respuesta.cumple && respuesta.cumple == 2 && (!respuesta.observacionCumple || respuesta.observacionCumple == '')) {
              faltantes.push(respuesta.idPregunta)
              aprobado = false
            }

            if (respuesta.corresponde && respuesta.corresponde == 2 && (!respuesta.observacionCorresponde || respuesta.observacionCorresponde == '')) {
              faltantes.push(respuesta.idPregunta)
              aprobado = false
            }

            if (respuesta.corresponde == 2 || respuesta.cumple == 2) {
              cumple = false;
            }

          }

        });

      } else {

        clasificacion.pregunta.forEach(preguntaClasificacion => {
          const respuesta = respuestas.find(r => r.idPregunta === preguntaClasificacion.id)
          if (respuesta) {
            if (respuesta.cumple && respuesta.cumple == 2 && (!respuesta.observacionCumple || respuesta.observacionCumple == '')) {
              faltantes.push(respuesta.idPregunta)
              aprobado = false
            }

            if (respuesta.corresponde && respuesta.corresponde == 2 && (!respuesta.observacionCorresponde || respuesta.observacionCorresponde == '')) {
              faltantes.push(respuesta.idPregunta)
              aprobado = false
            }

            if (respuesta.corresponde == 2 || respuesta.cumple == 2) {
              cumple = false;
            }

          }


        });

      }
    });



    //guardar log de intento si falla 

    if (aprobado) {
      let estado = 7;
      if (cumple) {
        estado = 6;
      }
      this.servicioEstadoVerificado.Log(idReporte, estado, idUsuario)
    }



    return { aprobado, faltantes }

  }


  //finalizar verificacion fase 2
  async finalizarF2(params: any): Promise<any> {


    const { idEncuesta=2, idReporte, idUsuario, idVigilado, idMes } = params
    const reporte = await TblReporte.findOrFail(idReporte)

    let aprobado = true;
    let cumple = true;
    const faltantes = new Array();


    const consulta = TblFormulariosIndicadores.query()
    const vigencia = reporte?.anioVigencia ?? undefined

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
      const evidencias: any = [];
      let consecutivo: number = 1;
      formulario.evidencias.forEach(evidencia => {
        evidencia.datosEvidencias.forEach(datoEvidencia => {
          const respuesta = datoEvidencia.detalleEvidencias[0];
          if(respuesta){
          if (!respuesta.cumple || respuesta.cumple == 0 || !respuesta.corresponde || respuesta.corresponde == 0) {
            faltantes.push(datoEvidencia.id)
            aprobado = false
          }


          if (respuesta.cumple && respuesta.cumple == 2 && (!respuesta.observacionCumple || respuesta.observacionCumple == '')) {
            faltantes.push(datoEvidencia.id)
            aprobado = false
          }

          if (respuesta.corresponde && respuesta.corresponde == 2 && (!respuesta.observacionCorresponde || respuesta.observacionCorresponde == '')) {
            faltantes.push(datoEvidencia.id)
            aprobado = false
          }

          if (respuesta.corresponde == 2 || respuesta.cumple == 2) {
            cumple = false;
          }
        }else{
          faltantes.push(datoEvidencia.id)
          aprobado = false
          cumple = false;
        }
        });
      })

    });


    //guardar log de intento si falla 

    if (aprobado) {
      let estado = 7;
      if (cumple) {
        estado = 6;
      }
      this.servicioEstadoVerificado.Log(idReporte, estado, idUsuario)
    }



    return { aprobado, faltantes }

  }


}
