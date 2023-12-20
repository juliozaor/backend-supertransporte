
import { Reportadas } from 'App/Dominio/Dto/Encuestas/Reportadas';
import { Paginador } from '../../../Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioReporte } from 'App/Dominio/Repositorios/RepositorioReporte'
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import { EstadosVerificado } from 'App/Dominio/Datos/Entidades/EstadosVerificado';
import TblEstadosVerificado from 'App/Infraestructura/Datos/Entidad/EstadoVerificado';
import { ServicioEstadosVerificado } from 'App/Dominio/Datos/Servicios/ServicioEstadosVerificado';
import TbClasificacion from 'App/Infraestructura/Datos/Entidad/Clasificacion';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import TblEncuestas from 'App/Infraestructura/Datos/Entidad/Encuesta';
import { ServicioAcciones } from 'App/Dominio/Datos/Servicios/ServicioAcciones';
import { TblAnioVigencias } from 'App/Infraestructura/Datos/Entidad/AnioVigencia';
import { TblFormulariosIndicadores } from 'App/Infraestructura/Datos/Entidad/FormularioIndicadores';
import { TblEstadosReportes } from 'App/Infraestructura/Datos/Entidad/EstadosReportes';

export class RepositorioReporteDB implements RepositorioReporte {
  private servicioEstadoVerificado = new ServicioEstadosVerificado()
  private servicioAcciones = new ServicioAcciones();
  async obtenerAsignadas(params: any): Promise<{ asignadas: Reportadas[], paginacion: Paginador }> {
    const { idVerificador, pagina, limite, rol } = params;

    const asignadas: any[] = []
    const consulta = TblReporte.query().preload('usuario');
    consulta.preload('encuesta')
    consulta.preload('estadoVerificado')
    consulta.preload('estadoVigilado')
    /*  consulta.preload('reporteEstadoVerificado', sqlEstado =>{
       sqlEstado.orderBy('rev_creacion', 'desc').first()
     }) */

    if (rol === '001') {

      consulta.where('asignado', true);
      if (idVerificador) {
        consulta.andWhere('ultimo_usuario_asignado', idVerificador)
      }
    }

    if (rol === '002') {
      consulta.where({ 'asignado': true, 'ultimo_usuario_asignado': idVerificador });

    }

    let reportadasBD = await consulta.orderBy('fecha_enviost', 'desc').paginate(pagina, limite)

    const anioVigencia = await TblAnioVigencias.query().where('anv_estado', true);
    const anios = anioVigencia.length >=2
    
    for await (const reportada of reportadasBD) {
    

  //  reportadasBD.map(async reportada => {
      let estadoValidacion = '';
      estadoValidacion = reportada.estadoVerificado?.nombre ?? estadoValidacion;
      estadoValidacion = reportada.estadoVigilado?.nombre ?? estadoValidacion;

      //buscar reportes fase 2
      const consultaSqlf2 = TblReporte.query().where({'nit_rues':reportada.nitRues, 'id_encuesta':2});
      if (!anios) {
        consultaSqlf2.where('anio_vigencia',anioVigencia[0].anio);
      }
      const sqlf2 = await consultaSqlf2;
      const fase_dos: any[] = []
      sqlf2.forEach(f2 => {
        fase_dos.push({
       titulo:"fase 2 " + (anios?f2.anioVigencia:'')?.toString(), 
        idReporte: f2.id!,
        idVigilado: reportada.nitRues,
        idEncuesta: f2.idEncuesta,
        vigencia:f2.anioVigencia
        });
        
      });
      asignadas.push({
        titulo:"fase 1",
        idReporte: reportada.id!,
        nit: reportada.nitRues,
        idEncuesta: reportada.idEncuesta,
        razonSocial: reportada.razonSocialRues,
        asignador: reportada.asignador,
        fechaAsignacion: reportada.fechaAsignacion,
        fechaEnvioST: reportada.fechaEnviost!,
        asignado: reportada.asignado,
        email: reportada.usuario?.correo,
        estadoValidacion,
        fase_dos
        //estadoValidacion: reportada.reporteEstadoVerificado[0]?.nombre  
      });
  //  })

  
}


    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(reportadasBD)
    return { asignadas, paginacion }
  }

  async asignar(datos: string, asignador: string): Promise<any> {
    const reportesAsignar = JSON.parse(datos)
    //Guardar asignado por primera vez
    for (const i in reportesAsignar) {
      const { reporte, verificador } = reportesAsignar[i]
      const reporteDb = await TblReporte.findBy('id_reporte', reporte)
      //TODO validar fecha de asignacion
      reporteDb?.establecerVerificador(true, verificador, asignador)
      reporteDb?.save()

      this.servicioEstadoVerificado.Log(reporte, 1, verificador)

    }
    return { mensaje: 'Reportes asignados' }

  }

  async eliminar(reporte: string, asignador: string): Promise<any> {
    const reporteDb = await TblReporte.findBy('id_reporte', reporte)

    reporteDb?.establecerVerificador(false, '', '')
    reporteDb?.save()
    return { mensaje: 'Asignación eliminada' }
  }

  async obtenerEstadosVerificado(): Promise<EstadosVerificado[]> {
    return await TblEstadosVerificado.query()

  }



  async obtenerEnviadas(params: any): Promise<{ reportadas: Reportadas[], paginacion: Paginador }> {
    const { pagina, limite, filtro } = params;

    let usuarioCreacion: string = "";

    const reportadas: Reportadas[] = []
    const consulta = TblReporte.query().preload('usuario');

    if (filtro) {
      consulta.andWhere(subquery => {
        subquery.orWhere('razon_social_rues', 'ilike', `%${filtro}%`)
        subquery.orWhere('nit_rues', 'ilike', `%${filtro}%`)
        subquery.orWhere('login_vigilado', 'ilike', `%${filtro}%`)
        subquery.orWhere('usuario_creacion', 'ilike', `%${filtro}%`)
        if (Number.isInteger(parseInt(filtro))) {
          subquery.orWhere('id_reporte', `${filtro}`)
        }
      })
    }
    consulta.preload('encuesta', sqlEncuesta => {
      /* sqlEncuesta.where('id_encuesta', '1'); */
    })

    consulta.whereHas('encuesta', sqlEncuesta => {
      /* sqlEncuesta.where('id_encuesta', '1'); */
    })

    consulta.preload('estadoVerificado')
    consulta.preload('estadoVigilado')



    consulta.whereNotNull('fecha_enviost').andWhere('envio_st', '>', 0)
    let reportadasBD = await consulta.orderBy('fecha_enviost', 'desc').paginate(pagina, limite)

    reportadasBD.map(reportada => {
      let estado = 'FORMULARIO EN BORRADOR';
      estado = reportada.estadoVerificado?.nombre ?? estado;
      estado = reportada.estadoVigilado?.nombre ?? estado;
      reportadas.push({
        idEncuestaDiligenciada: reportada.encuesta.id,
        idVigilado: reportada.loginVigilado,
        clasificacion: '',
        numeroReporte: reportada.id!,
        encuesta: reportada.encuesta.nombre,
        descripcion: reportada.encuesta.descripcion,
        fechaInicio: reportada.encuesta.fechaInicio,
        fechaFinal: reportada.encuesta.fechaFin,
        fechaEnvioST: reportada.fechaEnviost!,
        razonSocial: reportada.razonSocialRues,
        nit: reportada.nitRues,
        email: reportada.usuario?.correo,
        usuarioCreacion: reportada.usuarioCreacion,
        asignado: reportada.asignado,
        ultimoUsuarioAsignado: reportada.ultimoUsuarioAsignado,
        estado
        // estado: (reportada.envioSt == "1") ? "FORMULARIO ENVIADO ST" : "FORMULARIO EN BORRADOR",
      });
    })

    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(reportadasBD)
    return { reportadas, paginacion }
  }

  //Visualizar respuestas validadas
  async visualizar(params: any): Promise<any> {

    const { idEncuesta, idUsuario, idVigilado, idReporte, rol } = params;
    const tipoAccion = (rol === '006') ? 2 : 1;

    let clasificacionesArr: any = [];


    let clasificacion = '';

    const consulta = TblEncuestas.query().preload('pregunta', sql => {
      sql.preload('clasificacion')
      sql.preload('tiposPregunta')
      sql.preload('respuesta', sqlResp => {
        sqlResp.where('id_reporte', idReporte)
      })
      sql.where('estado', 1)
    })
    consulta.preload('reportes', sqlReporte => {
      sqlReporte.preload('estadoVerificado')
      sqlReporte.preload('estadoVigilado')
      sqlReporte.where('id_reporte', idReporte)
    })



    consulta.where({ 'id_encuesta': idEncuesta })
    const encuestaSql = await consulta.first();


    //BUscar la clasificacion del usuario
    const usuario = await TblUsuarios.query().preload('clasificacionUsuario', (sqlClasC) => {
      sqlClasC.preload('clasificacion')
      sqlClasC.has('clasificacion')
    }).preload('modalidadesRadio', sqlModal => {
      sqlModal.preload('modalidades')
    }).where('identificacion', idVigilado).first()

    let modalidad = '';
    const modalidadesradio = usuario?.modalidadesRadio;
    if (modalidadesradio) {
      for (const key in modalidadesradio) {
        if (parseInt(key) === 0) {
          modalidad += modalidadesradio[key].modalidades.nombre
        } else {
          modalidad += ', ' + modalidadesradio[key].modalidades.nombre
        }

      }
    }

    const totalConductores = usuario?.clasificacionUsuario[0].$extras.pivot_clu_conductores ?? ''
    const totalVehiculos = usuario?.clasificacionUsuario[0].$extras.pivot_clu_vehiculos ?? ''

    const nombreClasificaion = usuario?.clasificacionUsuario[0]?.nombre;
    const pasos = usuario?.clasificacionUsuario[0]?.clasificacion


    const claficiacionesSql = await TbClasificacion.query().orderBy('id_clasificacion', 'asc');
    let consecutivo: number = 1;
    let pasosCompletados = 0;
    let preguntasTotales = 0;
    let preguntasCompletadas = 0;
    const pasosObligatorios = usuario?.clasificacionUsuario[0].pasos??24;
    claficiacionesSql.forEach(clasificacionSql => {
      let preguntasArr: any = [];
      clasificacion = clasificacionSql.nombre;

      //validar si el paso es obligatorio

      const obligatorio = pasos?.find(paso => paso.id === clasificacionSql.id) ? true : false;
      let preguntasPasos = 0;
      let PreguntasPasosCompletadas = 0;
      encuestaSql?.pregunta.forEach(pregunta => {

        if (clasificacionSql.id === pregunta.clasificacion.id) {

          preguntasArr.push({
            idPregunta: pregunta.id,
            numeroPregunta: consecutivo,
            pregunta: pregunta.pregunta,
            obligatoria: obligatorio,// pregunta.obligatoria,
            respuesta: pregunta.respuesta[0]?.valor ?? '',
            tipoDeEvidencia: pregunta.tipoEvidencia,
            documento: pregunta.respuesta[0]?.documento ?? '',
            nombreOriginal: pregunta.respuesta[0]?.nombredocOriginal ?? '',
            ruta: pregunta.respuesta[0]?.ruta ?? '',
            adjuntable: pregunta.adjuntable,
            adjuntableObligatorio: obligatorio,// pregunta.adjuntableObligatorio,
            tipoPregunta: pregunta.tiposPregunta.nombre,
            valoresPregunta: pregunta.tiposPregunta.opciones,
            validaciones: pregunta.tiposPregunta.validaciones,

            observacion: pregunta.respuesta[0]?.observacion ?? '',
            cumple: pregunta.respuesta[0]?.cumple ?? '',
            observacionCumple: pregunta.respuesta[0]?.observacionCumple ?? '',
            corresponde: pregunta.respuesta[0]?.corresponde ?? '',
            observacionCorresponde: pregunta.respuesta[0]?.observacionCorresponde ?? '',
          });
          consecutivo++;
          const resp = pregunta.respuesta[0]?.valor ?? '';
          const adj = pregunta.respuesta[0]?.documento ?? '';
          const obs = pregunta.respuesta[0]?.observacion ?? '';
          if (obligatorio) {
            preguntasTotales += 1;
            preguntasPasos += 1;
            if (resp == 'S' && adj != '') {
              preguntasCompletadas += 1;
              PreguntasPasosCompletadas += 1;
            }else if (resp == 'N' && obs != '') {
              preguntasCompletadas += 1;
              PreguntasPasosCompletadas += 1;
            }

          }
        }

      });
      if (obligatorio && preguntasPasos == PreguntasPasosCompletadas) {
        pasosCompletados += 1;
      }
      if (preguntasArr.length >= 1) {
        clasificacionesArr.push(
          {
            clasificacion,
            preguntas: preguntasArr
          }

        );
      }



    });

    //const estadoActual = encuestaSql?.reportes[0].reporteEstadoVerificado[0]?.nombre??''
    let estadoActual = '';

    estadoActual = encuestaSql?.reportes[0].estadoVerificado?.nombre ?? estadoActual
    estadoActual = encuestaSql?.reportes[0].estadoVigilado?.nombre ?? estadoActual

    const { encuestaEditable, verificacionVisible, verificacionEditable } = await this.servicioAcciones.obtenerAccion(encuestaSql?.reportes[0]?.estadoVerificacionId ?? 0, rol);

    const porcentajePasos = (pasosCompletados/pasosObligatorios)*100;
const porcentajePreguntas = (preguntasCompletadas/preguntasTotales)* 100;

    const encuesta = {
      tipoAccion,
      razonSocila: usuario?.nombre,
      idVigilado,
      idEncuesta,
      estadoActual,
      nombreEncuesta: encuestaSql?.nombre,
      clasificaion: nombreClasificaion,
      observacion: encuestaSql?.observacion,
      clasificaciones: clasificacionesArr,
      encuestaEditable, verificacionVisible, verificacionEditable,
      modalidad, totalConductores, totalVehiculos,
      porcentajePasos, porcentajePreguntas
    }

    return encuesta
  }


  //visualizar fase2
  async formularios(params: any): Promise<any> {
    const { idUsuario, idVigilado, idReporte, idMes, historico = true, rol } = params;
    const tipoAccion = (rol === '006') ? 2 : 1;
    const formularios: any = [];
    const reporte = await TblReporte.findOrFail(idReporte)

 //BUscar la clasificacion del usuario
 const usuario = await TblUsuarios.query().preload('clasificacionUsuario', (sqlClasC) => {
  sqlClasC.preload('clasificacion')
  sqlClasC.has('clasificacion')
}).preload('modalidadesRadio', sqlModal => {
  sqlModal.preload('modalidades')
}).where('identificacion', idVigilado).first()

let modalidad = '';
const modalidadesradio = usuario?.modalidadesRadio;
if (modalidadesradio) {
  for (const key in modalidadesradio) {
    if (parseInt(key) === 0) {
      modalidad += modalidadesradio[key].modalidades.nombre
    } else {
      modalidad += ', ' + modalidadesradio[key].modalidades.nombre
    }

  }
}

const totalConductores = usuario?.clasificacionUsuario[0].$extras.pivot_clu_conductores ?? ''
const totalVehiculos = usuario?.clasificacionUsuario[0].$extras.pivot_clu_vehiculos ?? ''

const nombreClasificaion = usuario?.clasificacionUsuario[0]?.nombre;

  // const { encuestaEditable } = await this.servicioAcciones.obtenerAccion(estadoreportes?.estado ?? 0, idRol);
   const encuestaEditable = true
    const soloLectura = true /* (historico && historico == 'true' || !encuestaEditable) ?? false; */

    const consulta = TblFormulariosIndicadores.query()
    const vigencia = reporte.anioVigencia ?? undefined

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
            ruta: datoEvidencia.detalleEvidencias[0]?.ruta ?? '',
            cumple: datoEvidencia.detalleEvidencias[0]?.cumple ?? '',
            observacionCumple: datoEvidencia.detalleEvidencias[0]?.observacionCumple ?? '',
            corresponde: datoEvidencia.detalleEvidencias[0]?.corresponde ?? '',
            observacionCorresponde: datoEvidencia.detalleEvidencias[0]?.observacionCorresponde ?? '',
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
    const variablesEntregadas = 40
    const evidenciasEntregadas = 60

    return {
      soloLectura,
      tipoAccion,
      idVigilado,
      razonSocila: usuario?.nombre,
      idReporte,
      idEncuesta: reporte.idEncuesta,
      vigencia,
      mensaje: 'Cumplimiento del paso #20 de la metodología definida en la Res. 40595 de 2022.',
      formularios,
      clasificaion: nombreClasificaion,
      modalidad, totalConductores, totalVehiculos,
      variablesEntregadas, evidenciasEntregadas,
      estadoActual: "Pendiente de validar"
    }

 
  }

}
