import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Meses/ControladorMes'

Route.group(() => {
  Route.get('', accion_path + '.listar')
  Route.put('estado/:id', accion_path + '.cambiarEstado')
}).prefix('api/v1/meses').middleware('autenticacionJwt')
