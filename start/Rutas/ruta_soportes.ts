import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/Soporte/ControladorSoporte'

Route.group(() => {
  Route.post('/', `${controlador}.guardar`)
}).prefix('/api/v1/soportes')
