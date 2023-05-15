/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Empresa/ControladorEmpresa'

Route.group(() => {
  Route.post('/registro', accion_path + '.guardarEmpresa')
  Route.get('/listar/:pagina?/:limite?', accion_path + '.listar')
  Route.get('/buscar', accion_path + '.buscar')
  Route.get('/:id', accion_path + '.obtenerEmpresaPorId')
  Route.patch('/:id', accion_path + '.actualizarEmpresa')
  Route.put('/estado/:id', accion_path + '.cambiarEstado')
}).prefix('api/v1/empresa').middleware('autenticacionJwt')
