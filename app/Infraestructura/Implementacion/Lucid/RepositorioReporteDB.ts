
import { Reportadas } from 'App/Dominio/Dto/Encuestas/Reportadas';
import { Paginador } from '../../../Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioReporte } from 'App/Dominio/Repositorios/RepositorioReporte'
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import { EstadosVerificado } from 'App/Dominio/Datos/Entidades/EstadosVerificado';
import TblEstadosVerificado from 'App/Infraestructura/Datos/Entidad/EstadoVerificado';
import { PayloadJWT } from 'App/Dominio/Dto/PayloadJWT';

export class RepositorioReporteDB implements RepositorioReporte {
  async obtenerAsignadas(params: any): Promise<{ reportadas: Reportadas[], paginacion: Paginador }> {
    const { idVerificador, pagina, limite } = params;

    const reportadas: Reportadas[] = []
    const consulta = TblReporte.query().preload('usuario');
    consulta.preload('encuesta')
    consulta.where({ 'asignado': true, 'ultimo_usuario_asignado': idVerificador });

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

  async asignar(datos: string, asignador: string): Promise<any> {
    const reportesAsignar = JSON.parse(datos)
    //Guardar asignado por primera vez
    for (const i in reportesAsignar) {
      const { reporte, verificador } = reportesAsignar[i]
      const reporteDb = await TblReporte.findBy('id_reporte', reporte)

      reporteDb?.establecerVerificador(true, verificador, asignador)
      reporteDb?.save()
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

  async verificar(datos: string, payload:PayloadJWT): Promise<any> {

    const {idReporte, estado} = JSON.parse(datos)
    const reporteDb = await TblReporte.findBy('id_reporte', idReporte)  
    if(payload.documento !== reporteDb?.ultimoUsuarioAsignado){
      throw new Error("Usted no tiene autorización para hacer esta verificación");  
    }

    reporteDb?.establecerEstadoVerificado(estado)
    reporteDb?.save()
    return { mensaje: 'Se establecio el estado verificado' }
  }

}
