import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Vigencias/ControladorVigencias'

Route.group(() => {
  Route.get('', accion_path + '.obtener')
}).prefix('api/v1/vigencias').middleware('autenticacionJwt')
