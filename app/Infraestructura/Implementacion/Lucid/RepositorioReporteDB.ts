
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

export class RepositorioReporteDB implements RepositorioReporte {
  private servicioEstadoVerificado = new ServicioEstadosVerificado()
  async obtenerAsignadas(params: any): Promise<{ asignadas: Reportadas[], paginacion: Paginador }> {
    const { idVerificador, pagina, limite } = params;

    const asignadas: any[] = []
    const consulta = TblReporte.query().preload('usuario');
    consulta.preload('encuesta')
    consulta.preload('reporteEstadoVerificado', sqlEstado =>{
      sqlEstado.orderBy('rev_creacion', 'desc').first()
    })


    consulta.where({ 'asignado': true, 'ultimo_usuario_asignado': idVerificador });

    let reportadasBD = await consulta.paginate(pagina, limite)

    console.log(reportadasBD[0].reporteEstadoVerificado);
    

    reportadasBD.map(reportada => {
      asignadas.push({
        numeroReporte: reportada.id!,
        nit: reportada.nitRues,
        razonSocial: reportada.razonSocialRues,
        asignador: reportada.asignador,
        fechaAsignacion: reportada.fechaAsignacion,
        asignado: reportada.asignado,
        estadoValidacion: reportada.reporteEstadoVerificado[0].nombre  
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

}
