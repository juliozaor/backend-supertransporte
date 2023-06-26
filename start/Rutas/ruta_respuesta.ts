import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Respuesta/ControladorRespuesta'

Route.group(() => {
  Route.post('/verificar', accion_path + '.verificar')  
  Route.post('/finalizar-verificacion', accion_path + '.finalizar')  
  Route.post('/:idReporte', accion_path + '.guardar')  
}).prefix('api/v1/respuestas').middleware('autenticacionJwt')
