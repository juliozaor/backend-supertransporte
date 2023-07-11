import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Indicadores/ControladorIndicador'

Route.group(() => {
  Route.post('/', accion_path + '.listarReportesIndicador')
  Route.get('/formularios', accion_path + '.formularios')
  Route.post('/respuestas', accion_path + '.respuestas')
  Route.post('/enviar', accion_path + '.enviar')
}).prefix('api/v1/inidicador').middleware('autenticacionJwt')
