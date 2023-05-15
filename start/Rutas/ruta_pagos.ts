import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Pagos/ControladorPagos'

Route.group(() => {
    Route.post('/transaccion', `${accion_path}.transaccion`)
    Route.post('/consultar', `${accion_path}.consultar`)
}).prefix('api/v1/pagos')
