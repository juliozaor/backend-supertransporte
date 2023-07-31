import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { schemaFormularioAspiranteTecnologico } from "./Validadores/ValidadorFormularioAspiranteTecnologico"
import { ProveedorTecnologicoLucid } from "App/Infraestructura/Datos/Entidad/ProveedorTecnologico"

export default class ControladorFormularios{

    async guardarAspiranteTecnologico({request, response}: HttpContextContract){
        const payload = await request.validate({schema: schemaFormularioAspiranteTecnologico })
        let proveedor = ProveedorTecnologicoLucid.instanciar(payload)
        proveedor = await proveedor.save()
        response.status(201).send(proveedor)
    }
}