/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/LogAdvertencia/ControladorLogAdvertencia'

Route.group(() => {
  Route.post('/registro', accion_path + '.guardarLogAdvertencia')
  Route.get('/listar/:pagina?/:limite?', accion_path + '.listar')
  Route.get('/:id', accion_path + '.obtenerLogAdvertenciaPorId')
  Route.patch('/:id', accion_path + '.actualizarLogAdvertencia')
  Route.put('/estado/:id', accion_path + '.cambiarEstado')
}).prefix('api/v1/logsAdvertencias').middleware('autenticacionJwt')
