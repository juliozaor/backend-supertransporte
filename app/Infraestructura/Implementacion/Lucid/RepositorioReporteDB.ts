
import { Reportadas } from 'App/Dominio/Dto/Encuestas/Reportadas';
import { Paginador } from '../../../Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioReporte } from 'App/Dominio/Repositorios/RepositorioReporte'
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import { EstadosVerificado } from 'App/Dominio/Datos/Entidades/EstadosVerificado';
import TblEstadosVerificado from 'App/Infraestructura/Datos/Entidad/EstadoVerificado';
import { PayloadJWT } from 'App/Dominio/Dto/PayloadJWT';
import TblReporteEstadoVerificado from 'App/Infraestructura/Datos/Entidad/ReporteEstadoVerificado';
import { ServicioEstadosVerificado } from 'App/Dominio/Datos/Servicios/ServicioEstadosVerificado';
import TbClasificacion from 'App/Infraestructura/Datos/Entidad/Clasificacion';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import TblEncuestas from 'App/Infraestructura/Datos/Entidad/Encuesta';

export class RepositorioReporteDB implements RepositorioReporte {
  private servicioEstadoVerificado = new ServicioEstadosVerificado()
  async obtenerAsignadas(params: any): Promise<{ asignadas: Reportadas[], paginacion: Paginador }> {
    const { idVerificador, pagina, limite, rol} = params;

    const asignadas: any[] = []
    const consulta = TblReporte.query().preload('usuario');
    consulta.preload('encuesta')
    consulta.preload('reporteEstadoVerificado', sqlEstado =>{
      sqlEstado.orderBy('rev_creacion', 'desc').first()
    })

    if(rol === '006'){
      consulta.where('asignado', true);
      if(idVerificador){
        consulta.andWhere('ultimo_usuario_asignado', idVerificador)
      }
    }
    
    if(rol === '002'){      
      consulta.where({ 'asignado': true, 'ultimo_usuario_asignado': idVerificador });
    }

    let reportadasBD = await consulta.paginate(pagina, limite)
    

    reportadasBD.map(reportada => {
      asignadas.push({
        idReporte: reportada.id!,
        nit: reportada.nitRues,
        idEncuesta:reportada.idEncuesta,
        razonSocial: reportada.razonSocialRues,
        asignador: reportada.asignador,
        fechaAsignacion: reportada.fechaAsignacion,
        asignado: reportada.asignado,
        estadoValidacion: reportada.reporteEstadoVerificado[0]?.nombre  
      });
    })




    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(reportadasBD)
    return { asignadas, paginacion }
  }

  async asignar(datos: string, asignador: string): Promise<any> {
    const reportesAsignar = JSON.parse(datos)
    //Guardar asignado por primera vez
    for (const i in reportesAsignar) {
      const { reporte, verificador } = reportesAsignar[i]
      const reporteDb = await TblReporte.findBy('id_reporte', reporte)
      reporteDb?.establecerVerificador(true, verificador, asignador)
      reporteDb?.save()

      this.servicioEstadoVerificado.Log(reporte,1,verificador)

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
    const { pagina, limite } = params;

    let usuarioCreacion: string = "";

    const reportadas: Reportadas[] = []
    const consulta = TblReporte.query().preload('usuario');
      consulta.preload('encuesta')
      consulta.whereNotNull('fecha_enviost')
    let reportadasBD = await consulta.paginate(pagina, limite)

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

  //Visualizar respuestas validadas
  async visualizar(params: any): Promise<any> {

    const { idEncuesta, idUsuario, idVigilado, idReporte, rol } = params;
 //   const tipoAccion = (idUsuario === idVigilado) ? 2 : 1;

 const tipoAccion = (rol === '006') ? 2 : 1;

    let clasificacionesArr: any = [];


    let clasificacion = '';

    const consulta = TblEncuestas.query().preload('pregunta', sql => {
      sql.preload('clasificacion')
      sql.preload('tiposPregunta')
      sql.preload('respuesta', sqlResp => {
        sqlResp.where('id_reporte', idReporte)
      })
    
    })
    consulta.preload('reportes', sqlReporte =>{
      sqlReporte.preload('reporteEstadoVerificado')
      sqlReporte.where('id_reporte', idReporte)
    })

    consulta.where({ 'id_encuesta': idEncuesta })
    const encuestaSql = await consulta.first();


//BUscar la clasificacion del usuario
const usuario = await TblUsuarios.query().preload('clasificacionUsuario', (sqlClasC) => {
  sqlClasC.preload('clasificacion')
  sqlClasC.has('clasificacion')}).where('identificacion', idVigilado).first()

  const nombreClasificaion = usuario?.clasificacionUsuario[0].nombre;
  const pasos = usuario?.clasificacionUsuario[0].clasificacion


    const claficiacionesSql = await TbClasificacion.query().orderBy('id_clasificacion', 'asc');
    let consecutivo: number = 1;
    claficiacionesSql.forEach(clasificacionSql => {
      let preguntasArr: any = [];
      clasificacion = clasificacionSql.nombre;

      //validar si el paso es obligatorio
      
      const obligatorio = pasos?.find(paso => paso.id === clasificacionSql.id)?true:false;

     
      


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

    const estadoActual = encuestaSql?.reportes[0].reporteEstadoVerificado[0].nombre??''

    const encuesta = {
      tipoAccion,
      razonSocila: usuario?.nombre,
      idVigilado,
      idEncuesta,
      estadoActual,
      nombreEncuesta:encuestaSql?.nombre,
      clasificaion: nombreClasificaion,
      observacion:encuestaSql?.observacion,
      clasificaciones: clasificacionesArr
    }

    return encuesta
  }

}
