/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Maestra/ControladorMaestra'

Route.group(() => {
  Route.post('/registro', accion_path + '.guardarMaestra')
  Route.get('/listar/:pagina?/:limite?', accion_path + '.listar')
  Route.get('/:id', accion_path + '.obtenerMaestraPorId')
  Route.patch('/:id', accion_path + '.actualizarMaestra')
  Route.put('/estado/:id', accion_path + '.cambiarEstado')
}).prefix('api/v1/maestra').middleware('autenticacionJwt')
