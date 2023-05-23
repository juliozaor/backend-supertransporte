/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/UsuarioNovafianza/ControladorUsuarioNovafianza'

Route.group(() => {
  Route.post('/registro', accion_path + '.guardarUsuarioNovafianza')
  Route.get('/listar/:pagina?/:limite?', accion_path + '.listar')
  Route.get('/:id', accion_path + '.obtenerUsuarioNovafianzaPorId')
  Route.get('/usuario/:usuario', accion_path + '.obtenerUsuarioNovafianzaPorUsuario')
  Route.patch('/:id', accion_path + '.actualizarUsuarioNovafianza')
  Route.put('/estado/:id', accion_path + '.cambiarEstado')
}).prefix('api/v1/usuarios')
