import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/Autenticacion/ControladorAutenticacion'

Route.group(() => {
  Route.post('/inicio-sesion/novafianza', controlador+'.inicioSesionNovafianza')
  Route.post('/inicio-sesion/empresa', controlador+'.inicioSesionEmpresa')
  Route.post('/cambiar-clave', controlador+'.cambiarClave')
}).prefix('/api/v1/autenticacion')
