import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/Encuestas/ControladorEncuestas'

Route.group(() => {
  Route.post('/', `${controlador}.inicioSesion`)
  Route.get('/reportadas', `${controlador}.listarReportadas`)
}).prefix('/api/v1/encuesta')
