import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/Carga/ControladorCarga'

Route.group(() => {
  Route.post('/', controlador+'.cargar')
  Route.get('/', controlador+'.cargados')
  Route.get('/logs', controlador+'.logs')
  Route.get('/buscar', controlador+'.buscar')
}).prefix('/api/v1/cargas').middleware('autenticacionJwt')
