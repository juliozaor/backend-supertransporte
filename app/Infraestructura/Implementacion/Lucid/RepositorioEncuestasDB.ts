
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioEncuesta } from 'App/Dominio/Repositorios/RepositorioEncuesta';
import { Reportadas } from 'App/Dominio/Dto/Encuestas/Reportadas';
import TblEncuestas from 'App/Infraestructura/Datos/Entidad/Encuesta';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import { Usuario } from '../../../Dominio/Datos/Entidades/Usuario';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import TbClasificacion from 'App/Infraestructura/Datos/Entidad/Clasificacion';

export class RepositorioEncuestasDB implements RepositorioEncuesta {
  async obtenerReportadas(params: any): Promise<{ reportadas: Reportadas[], paginacion: Paginador }> {
    const reportadas: Reportadas[] = []

    const consulta = TblReporte.query().preload('usuario');

    if (params.idUsuario) {
      consulta.where('login_vigilado', params.idUsuario);
    }

    if (params.idEncuesta) {
      consulta.preload('encuesta', sqlE =>{
        sqlE.where('id_encuesta', params.idEncuesta);
      })
    }else{
      consulta.preload('encuesta')
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

  async visualizar(params: any): Promise<any> {

    const { idEncuesta, idUsuario, idVigilado } = params;
    const tipoAccion = (idUsuario === idVigilado) ? 2 : 1;   
    let clasificacionesArr: any = [];
    

    let clasificacion = '';

    const consulta = TblEncuestas.query().preload('pregunta', sql => {
      sql.preload('clasificacion').preload('tiposPregunta').orderBy('preguntas.orden')
    }).where('id_encuesta',idEncuesta).first();
    const encuestaSql = await consulta

    const claficiacionesSql = await TbClasificacion.query();    
    claficiacionesSql.forEach(clasificacionSql => {
      let preguntasArr: any = [];
      clasificacion = clasificacionSql.nombre;
      
      encuestaSql?.pregunta.forEach( pregunta=> { 
        console.log(pregunta.tiposPregunta);
        
        
        if (clasificacionSql.id === pregunta.clasificacion.id) {
            preguntasArr.push({
              idPregunta: pregunta.id,
            numeroPregunta: pregunta.orden,
            pregunta: pregunta.pregunta,
            obligatoria : pregunta.obligatoria,
            respuesta : '',
            tipoDeEvidencia : pregunta.tipoEvidencia,
            documento : '',
            adjuntable : pregunta.adjuntable,
            adjuntableObligatorio : pregunta.adjuntableObligatorio,
            tipoPregunta: pregunta.tiposPregunta.nombre,
            valoresPregunta: pregunta.tiposPregunta.opciones,
            validaciones: pregunta.tiposPregunta.validaciones
            });
            
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


}
