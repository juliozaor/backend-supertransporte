import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/Encuesta/ControladorEncuesta'

Route.group(() => {
  Route.get('/visualizar', `${controlador}.visualizar`)
  Route.get('/obtener', `${controlador}.visualizar`).middleware('empresatecnologica')
  Route.get('/listar', `${controlador}.listarReportadas`)  
  Route.get('/listar-reportes', `${controlador}.listarReportadas`).middleware('empresatecnologica')
  Route.get('/listar-motivo', `${controlador}.motivos`)  
  Route.post('/enviar', `${controlador}.enviarSt`)
  Route.post('/enviar-reporte', `${controlador}.enviarInformacion`).middleware('empresatecnologica')
}).prefix('/api/v1/encuestas').middleware('autenticacionJwt')
