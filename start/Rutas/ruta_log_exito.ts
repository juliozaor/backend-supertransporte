/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/LogExito/ControladorLogExito'

Route.group(() => {
  Route.post('/registro', accion_path + '.guardarLogExito')
  Route.get('/listar/:pagina?/:limite?', accion_path + '.listar')
  Route.get('/:id', accion_path + '.obtenerLogExitoPorId')
  Route.patch('/:id', accion_path + '.actualizarLogExito')
  Route.put('/estado/:id', accion_path + '.cambiarEstado')
}).prefix('api/v1/logsExitos').middleware('autenticacionJwt')
