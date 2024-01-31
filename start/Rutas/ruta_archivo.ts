import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Archivos/ControladorArchivo'

Route.group(() => {
  Route.post('/', accion_path + '.archivos').middleware('empresatecnologica')
  Route.post('/evidencias', accion_path + '.evidencias').middleware('empresatecnologica')
  Route.post('/temporales', accion_path + '.temporal')
}).prefix('api/v1/archivos').middleware('autenticacionJwt')
