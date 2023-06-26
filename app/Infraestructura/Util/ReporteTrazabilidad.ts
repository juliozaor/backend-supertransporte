import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import TblEncuestas from 'App/Infraestructura/Datos/Entidad/Encuesta';
export class ReporteTrazabilidad{

  
  public async Trazabilidad() {
    let consulta = TblReporte.query()
     consulta = consulta.preload('usuario', sqlUsuario =>{
      sqlUsuario.preload('clasificacionUsuario')
      /* sqlUsuario.preload('usuarioEncuesta', sqlEncuesta =>{
        sqlEncuesta.where('use_idEncuesta','reporte.id_encuesta' )
      }) */
      //sqlUsuario.preload('usuarioEstadoVigilado')
      sqlUsuario.first()
    })
  /*   consulta.preload('encuesta', sqlEncuesta =>{
      sqlEncuesta.preload()
    }) */


   
    const traza = await consulta.where('id_reporte', '5').first();   
    
    console.log(traza?.usuario.clasificacionUsuario[0].$extras.pivot_clu_vehiculos);
    
return traza
    
  }

  public async Encuesta(idReporte:number) {

    const datos: any[] = []

  const reporte = await TblReporte.query().preload('encuesta', sqlEncuesta =>{
  sqlEncuesta.preload('pregunta', sqlPregunta =>{
    sqlPregunta.preload('respuesta', sqlResp => {
      sqlResp.where('id_reporte', idReporte)
    })
    sqlPregunta.orderBy('id_pregunta', 'asc');
  }).first()
}).where('id_reporte', idReporte).first()


reporte?.encuesta.pregunta.forEach(pregunta => {
  datos.push({
    no:pregunta.orden,
    pregunta: pregunta.pregunta,
    existe: pregunta.respuesta[0]?pregunta.respuesta[0].valor:'',
    tipoEvidencia: pregunta.tipoEvidencia,
    documento: pregunta.respuesta[0]?pregunta.respuesta[0].documento:''
  })
})


return datos

  }

}