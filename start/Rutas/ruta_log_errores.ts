/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/LogErrores/ControladorLogErrores'

Route.group(() => {
  Route.post('/registro', accion_path + '.guardarLogErrores')
  Route.get('/listar/:pagina?/:limite?', accion_path + '.listar')
  Route.get('/:id', accion_path + '.obtenerLogErroresPorId')
  Route.patch('/:id', accion_path + '.actualizarLogErrores')
  Route.put('/estado/:id', accion_path + '.cambiarEstado')
}).prefix('api/v1/logsErrores').middleware('autenticacionJwt')
