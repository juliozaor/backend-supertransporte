import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/Soporte/ControladorSoporte'

Route.group(() => {
  Route.get('/', `${controlador}.listar`)
  Route.post('/', `${controlador}.guardar`)
  Route.post('/responder/:idSoporte', `${controlador}.responder`)
}).prefix('/api/v1/soportes')
