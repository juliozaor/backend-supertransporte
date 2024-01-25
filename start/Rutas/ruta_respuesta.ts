import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Respuesta/ControladorRespuesta'

Route.group(() => {
  Route.post('/verificar', accion_path + '.verificar')  
  Route.post('/finalizar-verificacion', accion_path + '.finalizar')  
  Route.post('/finalizar-verificacion-fasedos', accion_path + '.finalizarF2')  
  Route.post('/:idReporte', accion_path + '.guardar')  
  Route.post('guardar/:idReporte', accion_path + '.guardarReporte').middleware('empresatecnologica')
}).prefix('api/v1/respuestas').middleware('autenticacionJwt')
