import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Modalidad/ControladorModalidad'

Route.group(() => {
  Route.get('', accion_path + '.listar')
  Route.get('filtro', accion_path + '.filtro')
  Route.get('filtrar', accion_path + '.filtrar').middleware('empresatecnologica')
  Route.post('', accion_path + '.crearActualizar')
  Route.post('guardar', accion_path + '.guardar').middleware('empresatecnologica')
}).prefix('api/v1/modalidad').middleware('autenticacionJwt')
