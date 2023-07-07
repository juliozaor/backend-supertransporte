import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Indicadores/ControladorIndicador'

Route.group(() => {
  Route.post('/', accion_path + '.listarReportesIndicador')
  Route.get('/formularios', accion_path + '.formularios')
}).prefix('api/v1/inidicador').middleware('autenticacionJwt')
