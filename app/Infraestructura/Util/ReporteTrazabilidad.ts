import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import TblEncuestas from 'App/Infraestructura/Datos/Entidad/Encuesta';
export class ReporteTrazabilidad {


  public async Trazabilidad() {
    let consulta = TblReporte.query()
    consulta = consulta.preload('usuario', sqlUsuario => {
      sqlUsuario.preload('clasificacionUsuario')
      sqlUsuario.preload('usuarioEncuesta')
      sqlUsuario.preload('usuarioEstadoVigilado'/* , sqlEstadoVigilado =>{
        sqlEstadoVigilado.orderBy('esv_id', 'desc').first()
      } */)
    //  sqlUsuario.first()
    })

    

    const reportes = await consulta.preload('reporteEstadoVerificado')

  //  const reportes = await consulta.where('id_reporte', '5');
   // const reportes = await consulta;
//console.log(traza?.reporteEstadoVerificado);

//const pendiente = (traza?.reporteEstadoVerificado)
return reportes


const reporte: any[] = []

reportes.forEach(traza => {

 // const inicioDiligenciamiento = traza.usuario?.usuarioEncuesta.forEach(e => e.id == traza.idEncuesta)//?.map(e => e.id == traza.idEncuesta)//?.$extras.pivot_use_creacion
let inicioDiligenciamiento = ''
console.log((traza.usuario?.usuarioEstadoVigilado[0]?.$attributes)??'no encntrado');

const estadoActual = (traza.usuario?.usuarioEstadoVigilado[0]?.$attributes.nombre)??'Inactivo'
let acceso = '';

  traza.usuario?.usuarioEncuesta?.forEach(e => {
    if (e.id == traza.idEncuesta) {
     if(e.$extras.pivot_use_estado_vigilado_id == 1){
      acceso = e.$extras.pivot_use_creacion
      }
      if(e.$extras.pivot_use_estado_vigilado_id == 2){
        inicioDiligenciamiento = e.$extras.pivot_use_creacion
      }
    }
  
});


  reporte.push({
    id: traza.id,
    nit: traza.nitRues,
    razonSocial: traza.razonSocialRues,
    acceso,
    cantConductores:traza.usuario?.clasificacionUsuario[0]?.$extras.pivot_clu_conductores??'',
    cantVehiculos: (traza.usuario?.clasificacionUsuario[0]?.$extras.pivot_clu_vehiculos)??'',
    clasificacion: (traza.usuario?.clasificacionUsuario[0]?.nombre)??'',
    inicioDiligenciamiento,
    envioSt:traza.fechaEnviost,
    estadoActual,
    asignador:traza.asignador,
    fechaAsignacion: traza.fechaAsignacion,
    validador:traza.ultimoUsuarioAsignado,
    pendiente: traza.reporteEstadoVerificado?.find(r => r.id == 1)?.$extras.pivot_rev_creacion??'',
    proceso: traza.reporteEstadoVerificado?.find(r => r.id == 2)?.$extras.pivot_rev_creacion??'',
    validado: traza.reporteEstadoVerificado?.find(r => r.id == 3)?.$extras.pivot_rev_creacion??'',
  })
});




    //return traza
    return reporte

  }

  public async Encuesta(idReporte: number) {

    const datos: any[] = []

    const reporte = await TblReporte.query().preload('encuesta', sqlEncuesta => {
      sqlEncuesta.preload('pregunta', sqlPregunta => {
        sqlPregunta.preload('respuesta', sqlResp => {
          sqlResp.where('id_reporte', idReporte)
        })
        sqlPregunta.orderBy('id_pregunta', 'asc');
      }).first()
    }).where('id_reporte', idReporte).first()


    reporte?.encuesta.pregunta.forEach(pregunta => {
      datos.push({
        no: pregunta.orden,
        pregunta: pregunta.pregunta,
        existe: pregunta.respuesta[0] ? pregunta.respuesta[0].valor : '',
        tipoEvidencia: pregunta.tipoEvidencia,
        documento: pregunta.respuesta[0] ? pregunta.respuesta[0].documento : ''
      })
    })


    return datos

  }

}