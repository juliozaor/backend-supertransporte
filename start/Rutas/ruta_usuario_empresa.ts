/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/UsuarioEmpresa/ControladorUsuarioEmpresa'

Route.group(() => {
  Route.post('/registro', accion_path + '.guardarUsuarioEmpresa')
  Route.get('/listar/:pagina?/:limite?', accion_path + '.listar')
  Route.get('/listar-entidad/:idEmpresa/:pagina?/:limite?', accion_path + '.obtenerUsuariosEmpresaPorIdEmpresa')
  Route.get('/:id', accion_path + '.obtenerUsuarioEmpresaPorId')
  Route.get('/usuario/:usuario', accion_path + '.obtenerUsuarioEmpresaPorUsuario')
  Route.patch('/:id', accion_path + '.actualizarUsuarioEmpresa')
  Route.put('/estado/:id', accion_path + '.cambiarEstado')
}).prefix('api/v1/usuario_empresa')
