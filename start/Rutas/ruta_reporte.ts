import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Reporte/ControladorReporte'

Route.group(() => {
  Route.post('/asignacion', accion_path + '.asignacion')
  Route.delete('/asignacion/:idReporte', accion_path + '.eliminarAsignacion')
  Route.get('/verificadores', accion_path + '.verificadores')
  Route.get('/estados', accion_path + '.estadosVerificado')  
  Route.get('/asignados', accion_path + '.asignados')
  Route.get('/enviadas', accion_path + '.enviadas')
  Route.get('/visualizar', `${accion_path}.visualizar`)
}).prefix('api/v1/reportes').middleware('autenticacionJwt')
