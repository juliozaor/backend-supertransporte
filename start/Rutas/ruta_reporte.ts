import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Reporte/ControladorReporte'

Route.group(() => {
  Route.post('/asignacion', accion_path + '.asignacion')
  Route.delete('/asignacion/:idReporte', accion_path + '.eliminarAsignacion')
  Route.get('/verificadores', accion_path + '.verificadores')
}).prefix('api/v1/reportes').middleware('autenticacionJwt')
