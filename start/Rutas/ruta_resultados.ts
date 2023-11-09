import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Resultados/ControladorResultados'

Route.group(() => {
  Route.get('/', accion_path + '.resultado')  
}).prefix('api/v1/resultados').middleware('autenticacionJwt')
