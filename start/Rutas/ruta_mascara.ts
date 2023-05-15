/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Mascara/ControladorMascara'

Route.group(() => {
  Route.post('/registro', accion_path + '.guardarMascara')
  Route.get('/listar/:pagina?/:limite?', accion_path + '.listar')
  Route.get('/:id', accion_path + '.obtenerMascaraPorId')
  Route.patch('/:id', accion_path + '.actualizarMascara')
  Route.put('/estado/:id', accion_path + '.cambiarEstado')
}).prefix('api/v1/mascara').middleware('autenticacionJwt')
