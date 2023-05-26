
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioEncuesta } from 'App/Dominio/Repositorios/RepositorioEncuesta';
import { Reportadas } from 'App/Dominio/Dto/Encuestas/Reportadas';
import TblEncuestas from 'App/Infraestructura/Datos/Entidad/Encuesta';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import { Usuario } from '../../../Dominio/Datos/Entidades/Usuario';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';

export class RepositorioEncuestasDB implements RepositorioEncuesta {
  async obtenerReportadas(params: any): Promise<{ reportadas: Reportadas[], paginacion: Paginador }> {
    const reportadas: Reportadas[] = []

    const consulta = TblReporte.query().preload('encuesta').preload('usuario');

    if (params.idUsuario) {
      consulta.where('login_vigilado', params.idUsuario);
    }

    const reportadasBD = await consulta.paginate(params.pagina, params.limite)

    reportadasBD.map(reportada => {
      reportadas.push({
        idEncuestaDiligenciada: reportada.encuesta.id,
        idVigilado: reportada.loginVigilado,
        numeroReporte: reportada.id,
        encuesta: reportada.encuesta.nombre,
        descripcion: reportada.encuesta.descripcion,
        fechaInicio: reportada.encuesta.fechaInicio,
        fechaFinal: reportada.encuesta.fechaFin,
        fechaEnvioST: reportada.fechaEnviost,
        razonSocial: reportada.razonSocialRues,
        nit: reportada.nitRues,
        email: reportada.usuario.correo,
        estado: (reportada.envioSt == "1") ? "FORMULARIO ENVIADO ST" : "FORMULARIO EN BORRADOR",
      });
    })


    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(reportadasBD)
    return { reportadas, paginacion }
  }

  async visualizar(params: any): Promise<{ encuesta: any}> {

const consulta = TblEncuestas.query().preload('pregunta', sql =>{
  sql.preload('clasificacion')
});

    const encuesta = await consulta
    console.log(encuesta);
    
   return encuesta
  }


}
