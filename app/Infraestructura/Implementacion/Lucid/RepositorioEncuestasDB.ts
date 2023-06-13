
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioEncuesta } from 'App/Dominio/Repositorios/RepositorioEncuesta';
import { Reportadas } from 'App/Dominio/Dto/Encuestas/Reportadas';
import TblEncuestas from 'App/Infraestructura/Datos/Entidad/Encuesta';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import TbClasificacion from 'App/Infraestructura/Datos/Entidad/Clasificacion';
import TblRespuestas from 'App/Infraestructura/Datos/Entidad/Respuesta';
import NoAprobado from 'App/Exceptions/NoAprobado';
import { Respuesta } from 'App/Dominio/Datos/Entidades/Respuesta';
import { Pregunta } from 'App/Dominio/Datos/Entidades/Pregunta';
import { ServicioAuditoria } from 'App/Dominio/Datos/Servicios/ServicioAuditoria';

export class RepositorioEncuestasDB implements RepositorioEncuesta {
  private servicioAuditoria = new ServicioAuditoria();
  async obtenerReportadas(params: any): Promise<{ reportadas: Reportadas[], paginacion: Paginador }> {
    const { idUsuario, idEncuesta, pagina, limite, idVigilado, idRol } = params;

    let usuarioCreacion: string = "";

    const reportadas: Reportadas[] = []
    const consulta = TblReporte.query().preload('usuario');

    if (idEncuesta) {
      consulta.preload('encuesta', sqlE => {
        sqlE.where('id', idEncuesta);
      }).whereHas('encuesta', sqlE => {
        sqlE.where('id', idEncuesta);
      })
    } else {
      consulta.preload('encuesta')
    }

    if (idRol === '003') {
      console.log("vigilado");

      consulta.where('login_vigilado', idVigilado);
    }



    /* if (idVigilado && idVigilado === idUsuario) {
      console.log("Entro iguales");

      consulta.where('login_vigilado', idVigilado);
    } *//* else{
      console.log("Entro diferentes");
      consulta.where('usuario_creacion', idUsuario);
    } */

    let reportadasBD = await consulta.paginate(pagina, limite)

    //console.log(reportadasBD.length <= 0 && idUsuario);


    if (reportadasBD.length <= 0 && idEncuesta == 1 && idRol === '003') {
      const usuario = await TblUsuarios.query().where('identificacion', idUsuario).first()


      const reporte = new TblReporte()
      reporte.estableceReporteConId({
        idEncuesta: idEncuesta,
        envioSt: '0',
        loginVigilado: idVigilado,
        razonSocialRues: usuario?.nombre!,
        nitRues: idVigilado,
        usuarioCreacion: idUsuario
      })

      await reporte.save();
      reportadasBD = await consulta.paginate(pagina, limite)

      this.servicioAuditoria.Auditar({
        accion: "Listar Encuestas",
        modulo: "Encuesta",
        usuario: idUsuario,
        vigilado: idVigilado,
        descripcion: 'Entra por primera vez a la encuesta',
        encuestaId:idEncuesta,
        tipoLog: 3
      })
    }


    reportadasBD.map(reportada => {
      reportadas.push({
        idEncuestaDiligenciada: reportada.encuesta.id,
        idVigilado: reportada.loginVigilado,
        numeroReporte: reportada.id!,
        encuesta: reportada.encuesta.nombre,
        descripcion: reportada.encuesta.descripcion,
        fechaInicio: reportada.encuesta.fechaInicio,
        fechaFinal: reportada.encuesta.fechaFin,
        fechaEnvioST: reportada.fechaEnviost!,
        razonSocial: reportada.razonSocialRues,
        nit: reportada.nitRues,
        email: reportada.usuario.correo,
        usuarioCreacion: reportada.usuarioCreacion,
        asignado: reportada.asignado,
        ultimoUsuarioAsignado: reportada.ultimoUsuarioAsignado,
        estado: (reportada.envioSt == "1") ? "FORMULARIO ENVIADO ST" : "FORMULARIO EN BORRADOR",
      });
    })




    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(reportadasBD)
    return { reportadas, paginacion }
  }

  async visualizar(params: any): Promise<any> {

    const { idEncuesta, idUsuario, idVigilado, idReporte } = params;
    const tipoAccion = (idUsuario === idVigilado) ? 2 : 1;
    let clasificacionesArr: any = [];


    let clasificacion = '';

    const consulta = TblEncuestas.query().preload('pregunta', sql => {
      sql.preload('clasificacion')
      sql.preload('tiposPregunta')
      sql.preload('respuesta', sqlResp => {
        sqlResp.where('id_reporte', idReporte)
      })
      sql.orderBy('preguntas.orden')
    }).where({ 'id_encuesta': idEncuesta }).first();
    const encuestaSql = await consulta





    const claficiacionesSql = await TbClasificacion.query();
    claficiacionesSql.forEach(clasificacionSql => {
      let preguntasArr: any = [];
      let consecutivo: number = 1;
      clasificacion = clasificacionSql.nombre;

      encuestaSql?.pregunta.forEach(pregunta => {

        if (clasificacionSql.id === pregunta.clasificacion.id) {
          preguntasArr.push({
            idPregunta: pregunta.id,
            numeroPregunta: consecutivo,
            pregunta: pregunta.pregunta,
            obligatoria: pregunta.obligatoria,
            respuesta: pregunta.respuesta[0]?.valor ?? '',
            tipoDeEvidencia: pregunta.tipoEvidencia,
            documento: pregunta.respuesta[0]?.documento ?? '',
            adjuntable: pregunta.adjuntable,
            adjuntableObligatorio: pregunta.adjuntableObligatorio,
            tipoPregunta: pregunta.tiposPregunta.nombre,
            valoresPregunta: pregunta.tiposPregunta.opciones,
            validaciones: pregunta.tiposPregunta.validaciones
          });
          consecutivo++;
        }

      });
      if (preguntasArr.length >= 1) {
        clasificacionesArr.push(
          {
            clasificacion,
            preguntas: preguntasArr
          }

        );
      }



    });



    const encuesta = {
      tipoAccion,
      clasificaciones: clasificacionesArr
    }

    return encuesta
  }

  async enviarSt(params: any): Promise<any> {
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
    const pasos = usuario?.clasificacionUsuario[0].clasificacion
    const repuestas = await TblRespuestas.query().where('id_reporte', idReporte).orderBy('id_pregunta', 'asc')
    pasos?.forEach(paso => {
      paso.pregunta.forEach(preguntaPaso => {
        const respuesta = repuestas.find(r => r.idPregunta === preguntaPaso.id)
        if (preguntaPaso.obligatoria) {
          if (!respuesta) {
            throw new NoAprobado('Faltan preguntas por responder')
          }
        //  if (repuestas) {
            this.validarRespuesta(respuesta, preguntaPaso);
            
        //  }

        }

      });

    });

    return aprobado

  }

  validarRespuesta = (r: Respuesta, p: Pregunta): boolean => {
    if (p.adjuntable && p.adjuntableObligatorio) {
      if (r.documento.length <= 0) {
        throw new NoAprobado('Faltan archivos adjuntar')
      }
    }
    return true
  }


}
