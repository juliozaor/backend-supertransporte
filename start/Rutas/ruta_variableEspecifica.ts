/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/VariableEspecifica/ControladorVariableEspecifica'

Route.group(() => {
  Route.post('/registro', accion_path + '.guardarVariableEspecifica')
  Route.get('/listar/:pagina?/:limite?', accion_path + '.listar')
  Route.get('/:id', accion_path + '.obtenerVariableEspecificaPorId')
  Route.patch('/:id', accion_path + '.actualizarVariableEspecifica')
  Route.put('/estado/:id', accion_path + '.cambiarEstado')
}).prefix('api/v1/variable_especifica').middleware('autenticacionJwt')
