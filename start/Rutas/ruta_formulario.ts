import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Formulario/ControladorFormularios'

Route.group(() => {
    Route.post('aspirante_tecnologico', `${accion_path}.guardarAspiranteTecnologico`)
}).prefix('api/v1/formularios')//.middleware('autenticacionJwt')
