/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/ArchivoEmpresaFormato/ControladorArchivoEmpresaFormato'

Route.group(() => {
  Route.post('/registro', accion_path + '.guardarArchivoEmpresaFormato')
  Route.get('/listar/:pagina?/:limite?', accion_path + '.listar')
  Route.get('/:id', accion_path + '.obtenerArchivoEmpresaFormatoPorId')
  Route.patch('/:id', accion_path + '.actualizarArchivoEmpresaFormato')
  Route.put('/estado/:id', accion_path + '.cambiarEstado')
}).prefix('api/v1/archivo_empresa_formato').middleware('autenticacionJwt')
