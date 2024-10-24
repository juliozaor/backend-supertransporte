import { Paginador } from "App/Dominio/Paginador";
import { MapeadorPaginacionDB } from "./MapeadorPaginacionDB";
import { RepositorioEncuesta } from "App/Dominio/Repositorios/RepositorioEncuesta";
import { Reportadas } from "App/Dominio/Dto/Encuestas/Reportadas";
import TblEncuestas from "App/Infraestructura/Datos/Entidad/Encuesta";
import TblReporte from "App/Infraestructura/Datos/Entidad/Reporte";
import TblUsuarios from "App/Infraestructura/Datos/Entidad/Usuario";
import TbClasificacion from "App/Infraestructura/Datos/Entidad/Clasificacion";
import TblRespuestas from "App/Infraestructura/Datos/Entidad/Respuesta";
//import NoAprobado from 'App/Exceptions/NoAprobado';
import { Respuesta } from "App/Dominio/Datos/Entidades/Respuesta";
import { Pregunta } from "App/Dominio/Datos/Entidades/Pregunta";
import { ServicioAuditoria } from "App/Dominio/Datos/Servicios/ServicioAuditoria";
import { ServicioEstados } from "App/Dominio/Datos/Servicios/ServicioEstados";
import { DateTime } from "luxon";
import { TblAnioVigencias } from "App/Infraestructura/Datos/Entidad/AnioVigencia";
import { ServicioAcciones } from "App/Dominio/Datos/Servicios/ServicioAcciones";
import { EnviadorEmail } from "App/Dominio/Email/EnviadorEmail";
import { EmailnotificacionCorreo } from "App/Dominio/Email/Emails/EmailNotificacionCorreo";
import Env from "@ioc:Adonis/Core/Env";
import { EnviadorEmailAdonis } from "App/Infraestructura/Email/EnviadorEmailAdonis";
import { ServicioEstadosEmpresas } from "../../../Dominio/Datos/Servicios/ServicioEstadosEmpresas";
import ErroresEmpresa from "App/Exceptions/ErroresEmpresa";
import { TblMeses } from "App/Infraestructura/Datos/Entidad/Mes";
import { Estados } from "App/Infraestructura/Util/Estados";
import { TblAnioClasificaciones } from "App/Infraestructura/Datos/Entidad/AnioClasificacion";
import TblClasificacionesUsuario from "App/Infraestructura/Datos/Entidad/ClasificacionesUsuario";
export class RepositorioEncuestasDB implements RepositorioEncuesta {
  private servicioAuditoria = new ServicioAuditoria();
  private servicioEstado = new ServicioEstados();
  private servicioAcciones = new ServicioAcciones();
  private servicioEstadosEmpresas = new ServicioEstadosEmpresas();
  private enviadorEmail: EnviadorEmail;
  private estados = new Estados();
  async obtenerReportadas(
    params: any
  ): Promise<{ reportadas: Reportadas[]; paginacion: Paginador }> {
    const {
      idUsuario,
      idEncuesta,
      pagina,
      limite,
      idVigilado,
      idRol,
      termino,
    } = params;

    

    /// crear reporte
    const mesesActivos = await TblMeses.query()
    .where("mes_estado", true)
    .distinct("mes_vigencia");

    const vigencias = mesesActivos.map((mes) => mes.vigencia);
    if(idRol === "003" || idRol === "007"){
   // const existeReporte = TblReporte.query().where({'id_encuesta': idEncuesta, 'login_vigilado': idVigilado})
    if (idEncuesta == 2) {
      for await (const vigencia of vigencias) {
        
        const resporteF2 = await TblReporte.query().where({'id_encuesta': idEncuesta, 'login_vigilado': idVigilado,'anio_vigencia':vigencia});
      
        if (resporteF2.length <= 0) {
        await this.crearReporte(idUsuario,idEncuesta,idVigilado,idRol, vigencia);

        }
      }
    } else {
      
   /*  const anioClasificacion = await TblAnioClasificaciones.query().where('estado', true).first() */
   const anioVigencia = await TblAnioVigencias.query()
      .where("anv_estado", true)
      .orderBy("anv_id", "desc")
      .select("anv_anio")
      .first();
      const resporteF1 = await TblReporte.query().where({'id_encuesta': idEncuesta, 'login_vigilado': idVigilado, 'anioVigencia': anioVigencia?.anio});
          if (resporteF1.length <= 0) {
        await this.crearReporte(idUsuario,idEncuesta,idVigilado,idRol, anioVigencia?.anio);
      }
    }

  }

    const reportadas: Reportadas[] = [];
    const consulta = TblReporte.query().preload("usuario", (sqlUsuario) => {
      sqlUsuario.preload("clasificacionUsuario");
    }).has('usuario');

    if (idEncuesta) {
      consulta
        .preload("encuesta", (sqlE) => {
          sqlE.where("id", idEncuesta);
        })
        .whereHas("encuesta", (sqlE) => {
          sqlE.where("id", idEncuesta);
        });
    } else {
      consulta.preload("encuesta", (sqlE) => {});
    }

    if (idRol === "003" || idRol === "007") {
      consulta.where("login_vigilado", idVigilado);
    }
    consulta.preload("estadoVerificado");
    consulta.preload("estadoVigilado");

    if (termino) {
        const estadoF = this.estados.obtenerEstado(termino);
        
        consulta.andWhere((subquery) => {
          subquery.orWhere("nit_rues", `${termino}`);
          subquery.orWhere("razon_social_rues", "ilike", `%${termino}%`);
          subquery.orWhere("login_vigilado", `${termino}`);
          if (Number.isInteger(parseInt(termino))) {
            subquery.orWhere("id_reporte", `${termino}`);
          }
          if (estadoF.length > 0) {
            subquery.orWhereIn("estado_verificacion_id", estadoF);
            
        }
      });
    }
    if (idEncuesta == 2) {
      consulta.andWhere( s=>{
        vigencias.forEach(vigencia => {    
          s.orWhere('anio_vigencia', vigencia)
        });

        }

        )
        
    }

    let reportadasBD = await consulta
      .orderBy("fecha_creacion", "desc")
      .paginate(pagina, limite);

      for await (const reportada of reportadasBD) {
        let estado = "FORMULARIO EN BORRADOR";
      estado = reportada.estadoVerificado?.nombre ?? estado;
      estado = reportada.estadoVigilado?.nombre ?? estado;
     
      const clasificacion = await TblClasificacionesUsuario.query().preload('clasificacion').where({'vigencia': reportada.anioVigencia, 'usuarioId': reportada.usuario.id}).first()
            
      reportadas.push({
        idEncuestaDiligenciada: reportada.encuesta?.id,
        clasificacion: clasificacion?.clasificacion.nombre ?? "Sin Clasificar",
        idVigilado: reportada.loginVigilado,
        numeroReporte: reportada.id!,
        encuesta: reportada.encuesta?.nombre,
        descripcion: reportada.encuesta?.descripcion,
        fechaInicio: reportada.encuesta?.fechaInicio,
        fechaFinal: reportada.encuesta?.fechaFin,
        fechaEnvioST: reportada.fechaEnviost!,
        razonSocial: reportada.razonSocialRues,
        nit: reportada.nitRues,
        email: reportada.usuario.correo,
        usuarioCreacion: reportada.usuarioCreacion,
        asignado: reportada.asignado,
        ultimoUsuarioAsignado: reportada.ultimoUsuarioAsignado,
        estado,
        vigencia: reportada.anioVigencia ?? undefined,
      });
      }

    
   /* reportadasBD.map(async (reportada) => {
       let estado = "FORMULARIO EN BORRADOR";
      estado = reportada.estadoVerificado?.nombre ?? estado;
      estado = reportada.estadoVigilado?.nombre ?? estado;
     
      const clasificacion = await TblClasificacionesUsuario.query().preload('clasificacion').where({'vigencia': reportada.anioVigencia, 'usuarioId': reportada.usuario.id}).first()
            
      reportadas.push({
        idEncuestaDiligenciada: reportada.encuesta?.id,
        clasificacion: clasificacion?.clasificacion.nombre ?? "Sin Clasificar",
        idVigilado: reportada.loginVigilado,
        numeroReporte: reportada.id!,
        encuesta: reportada.encuesta?.nombre,
        descripcion: reportada.encuesta?.descripcion,
        fechaInicio: reportada.encuesta?.fechaInicio,
        fechaFinal: reportada.encuesta?.fechaFin,
        fechaEnvioST: reportada.fechaEnviost!,
        razonSocial: reportada.razonSocialRues,
        nit: reportada.nitRues,
        email: reportada.usuario.correo,
        usuarioCreacion: reportada.usuarioCreacion,
        asignado: reportada.asignado,
        ultimoUsuarioAsignado: reportada.ultimoUsuarioAsignado,
        estado,
        vigencia: reportada.anioVigencia ?? undefined,
      }); 
    });*/

    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(reportadasBD);
    return { reportadas, paginacion };
  }

  async crearReporte(
    idUsuario: string,
    idEncuesta: number,
    idVigilado: string,
    idRol: string,
    anioVigencia?
  ) {
    const usuario = await TblUsuarios.query()
      .where("identificacion", idUsuario)
      .first();

    const reporte = new TblReporte();
    reporte.estableceReporteConId({
      idEncuesta: idEncuesta,
      envioSt: "0",
      loginVigilado: idVigilado,
      razonSocialRues: usuario?.nombre!,
      nitRues: idVigilado,
      usuarioCreacion: idUsuario,
      estadoVerificacionId: 1002,
      anioVigencia: anioVigencia ?? undefined,
    });

    await reporte.save();
    this.servicioEstado.Log(idUsuario, 1002, idEncuesta);

    this.servicioAuditoria.Auditar({
      accion: "Listar Encuestas",
      modulo: "Encuesta",
      usuario: idUsuario,
      vigilado: idVigilado,
      descripcion: "Entra por primera vez a la encuesta",
      encuestaId: idEncuesta,
      tipoLog: 3,
    });

    if (idRol === "007") {
      this.servicioEstadosEmpresas.Log(idVigilado, idUsuario, 1, 3000);
    }
  }

  async visualizar(params: any): Promise<any> {
    const { idEncuesta, idUsuario, idVigilado, idReporte, idRol } = params;
    let tipoAccion = idUsuario === idVigilado ? 2 : 1;
    let clasificacionesArr: any = [];
    let estado = "";
    const reporte = await TblReporte.query()
      .preload("estadoVerificado")
      .preload("estadoVigilado")
      .where("id_reporte", idReporte)
      .first();
    estado = reporte?.estadoVerificado?.nombre ?? estado;
    estado = reporte?.estadoVigilado?.nombre ?? estado;
    const observacionAdmin = reporte?.observacion ?? '';
    const aprobado = reporte?.aprobado;
    let clasificacion = "";

    const consulta = TblEncuestas.query()
      .preload("pregunta", (sql) => {
        sql.preload("clasificacion");
        sql.preload("tiposPregunta");
        sql.preload("respuesta", (sqlResp) => {
          sqlResp.where("id_reporte", idReporte);
        });
        sql.where("estado", 1);
      })
      .where({ id_encuesta: idEncuesta })
      .first();
    const encuestaSql = await consulta;

    //BUscar la clasificacion del usuario
    const usuario = await TblUsuarios.query()
      .preload("clasificacionUsuario", (sqlClasC) => {
        sqlClasC.preload("clasificacion");
        sqlClasC.has("clasificacion");
        sqlClasC.where('clu_vigencia',reporte?.anioVigencia!)
      })
      .preload("modalidadesRadio", (sqlModal) => {
        sqlModal.preload("modalidades");
      })
      .where("identificacion", idVigilado)
      .first();

    let modalidad = "";
    const modalidadesradio = usuario?.modalidadesRadio;
    if (modalidadesradio) {
      for (const key in modalidadesradio) {
        if (parseInt(key) === 0) {
          modalidad += modalidadesradio[key].modalidades.nombre;
        } else {
          modalidad += ", " + modalidadesradio[key].modalidades.nombre;
        }
      }
    }

    const totalConductores =
      usuario?.clasificacionUsuario[0]?.$extras?.pivot_clu_conductores ?? "";
    const totalVehiculos =
      usuario?.clasificacionUsuario[0]?.$extras?.pivot_clu_vehiculos ?? "";

    const nombreClasificaion = usuario?.clasificacionUsuario[0]?.nombre;
    const descripcionClasificacion =
      usuario?.clasificacionUsuario[0]?.descripcion;
    const pasos = usuario?.clasificacionUsuario[0]?.clasificacion;

    const fechaActual = DateTime.now();
    const rolDefecto = fechaActual < encuestaSql?.fechaFin! ? idRol : "000";
    const { encuestaEditable, verificacionVisible, verificacionEditable } =
      await this.servicioAcciones.obtenerAccion(
        reporte?.estadoVerificacionId ?? 0,
        rolDefecto
      );

    const claficiacionesSql = await TbClasificacion.query().orderBy(
      "id_clasificacion",
      "asc"
    );
    let consecutivo: number = 1;
    let pasosCompletados = 0;
    let preguntasTotales = 0;
    let preguntasCompletadas = 0;
    const pasosObligatorios = usuario?.clasificacionUsuario[0]?.pasos ?? 24;
    claficiacionesSql.forEach((clasificacionSql) => {
      let preguntasArr: any = [];
      clasificacion = clasificacionSql.nombre;
      //validar si el paso es obligatorio
      const obligatorio = pasos?.find((paso) => paso.id === clasificacionSql.id)
        ? true
        : false;
      let preguntasPasos = 0;
      let PreguntasPasosCompletadas = 0;
      encuestaSql?.pregunta.forEach((pregunta) => {
        if (clasificacionSql.id === pregunta.clasificacion.id) {
          preguntasArr.push({
            idPregunta: pregunta.id,
            numeroPregunta: consecutivo,
            pregunta: pregunta.pregunta,
            obligatoria: obligatorio, //obligatorio,//
            respuesta: pregunta.respuesta[0]?.valor ?? "",
            tipoDeEvidencia: pregunta.tipoEvidencia,
            documento: pregunta.respuesta[0]?.documento ?? "",
            nombreOriginal: pregunta.respuesta[0]?.nombredocOriginal ?? "",
            ruta: pregunta.respuesta[0]?.ruta ?? "",
            adjuntable: pregunta.adjuntable,
            adjuntableObligatorio: obligatorio, // pregunta.adjuntableObligatorio,
            tipoPregunta: pregunta.tiposPregunta.nombre,
            tamanio: pregunta.tamanio,
            valoresPregunta: pregunta.tiposPregunta.opciones,
            validaciones: pregunta.tiposPregunta.validaciones,
            observacion: pregunta.respuesta[0]?.observacion ?? "",
            cumple: pregunta.respuesta[0]?.cumple ?? "",
            observacionCumple: pregunta.respuesta[0]?.observacionCumple ?? "",
            corresponde: pregunta.respuesta[0]?.corresponde ?? "",
            observacionCorresponde:
              pregunta.respuesta[0]?.observacionCorresponde ?? "",
          });
          consecutivo++;

          const resp = pregunta.respuesta[0]?.valor ?? "";
          const adj = pregunta.respuesta[0]?.documento ?? "";
          const obs = pregunta.respuesta[0]?.observacion ?? "";
          if (obligatorio) {
            preguntasTotales += 1;
            preguntasPasos += 1;
            if (resp == "S" && adj != "") {
              preguntasCompletadas += 1;
              PreguntasPasosCompletadas += 1;
            } else if (resp == "N" && obs != "") {
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
        clasificacionesArr.push({
          clasificacion,
          preguntas: preguntasArr,
        });
      }
    });

    const porcentajePasos = (pasosCompletados / pasosObligatorios) * 100;
    const porcentajePreguntas = (preguntasCompletadas / preguntasTotales) * 100;

    const encuesta = {
      tipoAccion,
      estadoActual: estado,
      nombreEncuesta: encuestaSql?.nombre,
      clasificaion: nombreClasificaion,
      descripcionClasificacion,
      observacion: encuestaSql?.observacion,
      clasificaciones: clasificacionesArr,
      encuestaEditable,
      verificacionVisible,
      verificacionEditable,
      modalidad,
      totalConductores,
      totalVehiculos,
      porcentajePasos,
      porcentajePreguntas,
      observacionAdmin,
      aprobado
    };

    return encuesta;
  }

  async enviarSt(params: any): Promise<any> {
    const {
      idEncuesta,
      idReporte,
      idVigilado,
      idUsuario,
      confirmar = false,
    } = params;

    const parametrisVisualizar = { idEncuesta, idUsuario, idVigilado, idReporte, idRol:'003' }

  const visualizar = await this.visualizar(parametrisVisualizar)

  const respuestas = await TblRespuestas.query()
      .where("id_reporte", idReporte)
      .orderBy("id_pregunta", "asc");

  let aprobado = true;
  const faltantes = new Array();    

  visualizar.clasificaciones.forEach(clasificaciones => {
    clasificaciones.preguntas.forEach(preguntaPaso => {

        let repuestaExiste = true;
        let archivoExiste = true;
        const respuesta = respuestas.find(
          (r) => r.idPregunta === preguntaPaso.idPregunta
        );
        if (preguntaPaso.obligatoria) {
          if (!respuesta) {
            //throw new NoAprobado('Faltan preguntas por responder')
            repuestaExiste = false;
          }

          if (respuesta && respuesta.valor === "") {
            repuestaExiste = false;
          }

          if (
            respuesta &&
            respuesta.valor === "N" &&
            (!respuesta.observacion || respuesta.observacion === "")
          ) {
            repuestaExiste = false;
          }

          if (
            respuesta &&
            respuesta.valor === "S" &&
            preguntaPaso.adjuntableObligatorio
          ) {
            archivoExiste = this.validarDocumento(respuesta, preguntaPaso);
          }
        }

        if (!repuestaExiste || !archivoExiste) {
          aprobado = false;          
          faltantes.push({
            preguntaId: preguntaPaso.idPregunta,
            numeroPregunta: preguntaPaso.numeroPregunta,
            archivoObligatorio: preguntaPaso.adjuntableObligatorio,
          });
        }

        



        
      });
  });

  if (confirmar) aprobado = true;

  if (aprobado) {
    this.servicioEstado.Log(
      idVigilado,
      1004,
      idEncuesta,
      undefined,
      confirmar
    );
    const reporte = await TblReporte.findOrFail(idReporte);
    const estado =
      reporte.estadoVerificacionId === 7 ||
      reporte.estadoVerificacionId === 1005
        ? 4
        : 1004;
    reporte.fechaEnviost = DateTime.fromJSDate(new Date());
    reporte.envioSt = "1";
    reporte.estadoVerificacionId = estado;
    reporte.save();

    this.servicioAuditoria.Auditar({
      accion: "Enviar a St",
      modulo: "Encuesta",
      usuario: idUsuario,
      jsonNuevo: JSON.stringify(respuestas),
      vigilado: idVigilado,
      descripcion: "Se envia a ST",
      encuestaId: idEncuesta,
      tipoLog: 5,
    });

    try {
      const usuario = await TblUsuarios.query().where('usn_identificacion',idVigilado).first()
      this.enviadorEmail = new EnviadorEmailAdonis();
      this.enviadorEmail.enviarTemplate(
        {
          asunto: "Envío a ST.",
          destinatarios: usuario?.correo!,
          de: Env.get("SMTP_USERNAME"),
        },
        new EmailnotificacionCorreo({
          nombre: usuario?.nombre!,
          mensaje:
            "De la manera más cordial nos permitimos informarle que la información Plan Estratégico de Seguridad Vial fue enviado de manera correcta a la Superintendencia de Transporte.",
          logo: Env.get("LOGO"),
          nit: usuario?.identificacion!,
        })
      );
    } catch (error) {
      console.log(error);
    }
  } 

  return { aprobado, faltantes };

/*   
  
    const reporte = await TblReporte.query()
    .where("id_reporte", idReporte)
    .first();

    const usuario = await TblUsuarios.query()
      .preload("clasificacionUsuario", (sqlClasC) => {
        sqlClasC.preload("clasificacion", (sqlCla) => {
          sqlCla
            .preload("pregunta", (sqlPre) => {
              sqlPre.where("id_encuesta", idEncuesta);
            })
            .whereHas("pregunta", (sqlE) => {
              sqlE.where("id_encuesta", idEncuesta);
            });
            sqlCla.orderBy('id', "asc")
        });
        sqlClasC.where('clu_vigencia',reporte?.anioVigencia!)
      })
      .where("identificacion", idVigilado)
      .first();

    let aprobado = true;
    const faltantes = new Array();
    const pasos = usuario?.clasificacionUsuario[0]?.clasificacion;
   
    
    const respuestas = await TblRespuestas.query()
      .where("id_reporte", idReporte)
      .orderBy("id_pregunta", "asc");

      let consecutivo: number = 1;
      let mostrar = ''

    pasos?.forEach((paso) => {
      paso.pregunta.forEach((preguntaPaso) => {
        let repuestaExiste = true;
        let archivoExiste = true;
        const respuesta = respuestas.find(
          (r) => r.idPregunta === preguntaPaso.id
        );
        if (preguntaPaso.obligatoria) {
          if (!respuesta) {
            //throw new NoAprobado('Faltan preguntas por responder')
            repuestaExiste = false;
          }

          if (respuesta && respuesta.valor === "") {
            repuestaExiste = false;
          }

          if (
            respuesta &&
            respuesta.valor === "N" &&
            (!respuesta.observacion || respuesta.observacion === "")
          ) {
            repuestaExiste = false;
          }

          if (
            respuesta &&
            respuesta.valor === "S" &&
            preguntaPaso.adjuntableObligatorio
          ) {
            console.log(respuesta.observacion);

            archivoExiste = this.validarDocumento(respuesta, preguntaPaso);
          }
        }

        if (!repuestaExiste || !archivoExiste) {
          aprobado = false;
          faltantes.push({
            preguntaId: preguntaPaso.id,
            archivoObligatorio: preguntaPaso.adjuntableObligatorio,
          });
          mostrar += consecutivo+', '
        }
        consecutivo++;
      });
    });

    if (confirmar) aprobado = true;

    if (aprobado) {
      this.servicioEstado.Log(
        idVigilado,
        1004,
        idEncuesta,
        undefined,
        confirmar
      );
      const reporte = await TblReporte.findOrFail(idReporte);
      const estado =
        reporte.estadoVerificacionId === 7 ||
        reporte.estadoVerificacionId === 1005
          ? 4
          : 1004;
      reporte.fechaEnviost = DateTime.fromJSDate(new Date());
      reporte.envioSt = "1";
      reporte.estadoVerificacionId = estado;
      reporte.save();

      this.servicioAuditoria.Auditar({
        accion: "Enviar a St",
        modulo: "Encuesta",
        usuario: idUsuario,
        jsonNuevo: JSON.stringify(respuestas),
        vigilado: idVigilado,
        descripcion: "Se envia a ST",
        encuestaId: idEncuesta,
        tipoLog: 5,
      });

      try {
        this.enviadorEmail = new EnviadorEmailAdonis();
        await this.enviadorEmail.enviarTemplate(
          {
            asunto: "Envío a ST.",
            destinatarios: usuario?.correo!,
            de: Env.get("SMTP_USERNAME"),
          },
          new EmailnotificacionCorreo({
            nombre: usuario?.nombre!,
            mensaje:
              "De la manera más cordial nos permitimos informarle que la información Plan Estratégico de Seguridad Vial fue enviado de manera correcta a la Superintendencia de Transporte.",
            logo: Env.get("LOGO"),
            nit: usuario?.identificacion!,
          })
        );
      } catch (error) {
        console.log(error);
      }
    } 

   /*  return { aprobado, faltantes, mostrar }; */
  }

  async enviarInformacion(params: any): Promise<any> {
    const {
      idEncuesta,
      idReporte,
      idVigilado,
      idUsuario,
      confirmar = false,
    } = params;
    /*  const parametrosDeEnvio = { idEncuesta, idReporte, idVigilado, idUsuario : idVigilado, confirmar } */

    const reporte = await TblReporte.findOrFail(idReporte);

    if (!reporte) {
      throw new ErroresEmpresa("El reporte no existe.", 400);
    }

    if (reporte.envioSt == "1") {
      throw new ErroresEmpresa("El reporte ya fue enviado a ST.", 400);
    }

    const { aprobado, faltantes } = await this.enviarSt(params);
    if (aprobado) {
      this.servicioEstadosEmpresas.Log(
        idVigilado,
        idUsuario,
        1,
        3004,
        DateTime.fromJSDate(new Date())
      );
    }

    return { aprobado, faltantes };
  }

  validarDocumento = (r: Respuesta, p: Pregunta): boolean => {
    if (!r.documento || r.documento.length <= 0) {
      //throw new NoAprobado('Faltan archivos adjuntar')
      return false;
    }
    return true;
  };
}
