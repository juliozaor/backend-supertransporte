/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/ArchivoVariable/ControladorArchivoVariable'

Route.group(() => {
  Route.post('/registro', accion_path + '.guardarArchivoVariable')
  Route.get('/listar/:pagina?/:limite?', accion_path + '.listar')
  Route.get('/:id', accion_path + '.obtenerArchivoVariablePorId')
  Route.patch('/:id', accion_path + '.actualizarArchivoVariable')
  Route.put('/estado/:id', accion_path + '.cambiarEstado')
  Route.put('/tipo/:id', accion_path + '.cambiarTipo')
}).prefix('api/v1/archivo_variable').middleware('autenticacionJwt')
