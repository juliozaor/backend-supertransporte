/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/FormatoArchivo/ControladorFormatoArchivo'

Route.group(() => {
  Route.post('/registro', accion_path + '.guardarFormatoArchivo')
  Route.get('/listar/:pagina?/:limite?', accion_path + '.listar')
  Route.get('/:id', accion_path + '.obtenerFormatoArchivoPorId')
  Route.patch('/:id', accion_path + '.actualizarFormatoArchivo')
  Route.put('/estado/:id', accion_path + '.cambiarEstado')
}).prefix('api/v1/formato_archivo').middleware('autenticacionJwt')
