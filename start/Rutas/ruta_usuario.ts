/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Usuario/ControladorUsuario'

Route.group(() => {
  Route.patch('/:identificacion', accion_path + '.actualizarUsuario')
}).prefix('api/v1/usuarios').middleware('autenticacionJwt')
