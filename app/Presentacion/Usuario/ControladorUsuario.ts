import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ServicioUsuario } from "App/Dominio/Datos/Servicios/ServicioUsuario";
import { RepositorioUsuarioEmpresaDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioUsuarioEmpresaDB";
import { RepositorioUsuarioNovafianzaDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioUsuarioNovafianzaDB";
import { validarActualizarUsuario } from "./Validadores/ActualizarUsuario";

export default class ControladorUsuario {
    private servicio = new ServicioUsuario(new RepositorioUsuarioNovafianzaDB(), new RepositorioUsuarioEmpresaDB())

    constructor() { }

    async actualizarUsuario({ request, response }: HttpContextContract) {
        const identificacion = request.param('identificacion')
        const payload = await request.validate({ schema: validarActualizarUsuario })
        const usuario = await this.servicio.actualizarInformacionUsuario(payload, identificacion)
        response.status(200).send(usuario)
    }
}