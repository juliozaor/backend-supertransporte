import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/Encuesta/ControladorEncuesta'

Route.group(() => {
  Route.get('/visualizar', `${controlador}.visualizar`)
  Route.get('/listar', `${controlador}.listarReportadas`)  
  Route.get('/listar-motivo', `${controlador}.motivos`)  
  Route.post('/enviar', `${controlador}.enviarSt`)
}).prefix('/api/v1/encuestas').middleware('autenticacionJwt')
