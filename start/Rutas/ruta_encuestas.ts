import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/Encuestas/ControladorEncuesta'

Route.group(() => {
  Route.get('/visualizar', `${controlador}.visualizar`)
  Route.get('/listar', `${controlador}.listarReportadas`)  
}).prefix('/api/v1/encuestas')
