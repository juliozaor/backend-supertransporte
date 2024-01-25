import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Indicadores/ControladorIndicador'

Route.group(() => {
  Route.post('/', accion_path + '.listarReportesIndicador')
  Route.post('/verificar', accion_path + '.verificar')  
  Route.get('/formularios', accion_path + '.formularios')
  Route.get('/obtener-formularios', accion_path + '.obtenerFormularios').middleware('empresatecnologica')
  Route.post('/respuestas', accion_path + '.respuestas')
  Route.post('/guardar-respuestas', accion_path + '.guardarRespuestas').middleware('empresatecnologica')
  Route.post('/enviar', accion_path + '.enviar')
  Route.post('/enviar-reporte', accion_path + '.enviarInformacion').middleware('empresatecnologica')
}).prefix('api/v1/inidicador').middleware('autenticacionJwt')

Route.get('api/v1/inidicador/finalizar-fase-dos/:mes', accion_path + '.finalizarFaseDos')