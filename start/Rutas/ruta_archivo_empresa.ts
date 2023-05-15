/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/ArchivoEmpresa/ControladorArchivoEmpresa'

Route.group(() => {
  /* Gets */
  Route.get('/listar_por_empresa/:idEmpresa', accion_path + '.listarPorEmpresa')
  Route.get('/listar/:pagina?/:limite?', accion_path + '.listar')
  Route.get('/:id', accion_path + '.obtenerArchivoEmpresaPorId')
  /* Posts */
  Route.post('/registro', accion_path + '.guardarArchivoEmpresa')
  Route.post('/registro-multiple', accion_path + '.guardarMultiplesArchivosEmpresa')
  /* Patchs */
  Route.patch('/:id', accion_path + '.actualizarArchivoEmpresa')
  /* Puts */
  Route.put('/estado/:id', accion_path + '.cambiarEstado')
}).prefix('api/v1/archivo_empresa').middleware('autenticacionJwt')
