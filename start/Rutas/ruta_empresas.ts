import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Empresas/ControladorEmpresa'

Route.group(() => {
  Route.get('listar', accion_path + '.listar')
  Route.get('seleccionadas', accion_path + '.seleccionadas')
  Route.post('asignar', accion_path + '.asignar')
  Route.put('editar', accion_path + '.editar')
  Route.patch('activar', accion_path + '.activar')
}).prefix('api/v1/empresas').middleware('autenticacionJwt')