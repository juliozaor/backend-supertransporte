import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Modalidad/ControladorModalidad'

Route.group(() => {
  Route.get('', accion_path + '.listar')
  Route.get('filtro', accion_path + '.filtro')
}).prefix('api/v1/modalidad').middleware('autenticacionJwt')
