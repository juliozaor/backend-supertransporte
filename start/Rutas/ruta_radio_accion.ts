
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/RadioAccion/ControladorRadioAccion'

Route.group(() => {
  Route.get('', accion_path + '.listar')
}).prefix('api/v1/radio').middleware('autenticacionJwt')
