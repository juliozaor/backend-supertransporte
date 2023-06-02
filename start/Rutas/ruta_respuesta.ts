import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Respuesta/ControladorRespuesta'

Route.group(() => {
  Route.post('/:idReporte', accion_path + '.guardar')
}).prefix('api/v1/respuestas').middleware('autenticacionJwt')
