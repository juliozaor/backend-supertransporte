import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Validador/ControladorValidador'

Route.group(() => {
  Route.get('/lista-corresponde', `${accion_path}.obtenerCorresponde`)
  Route.get('/lista-cumple', `${accion_path}.obtenerCumple`)
}).prefix('api/v1/validador').middleware('autenticacionJwt')
