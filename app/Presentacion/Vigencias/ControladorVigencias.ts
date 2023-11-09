import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { ServicioVigencias } from "App/Dominio/Datos/Servicios/ServicioVigencias";
import { RepositorioVigenciaDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioVigenciaDB";

export default class ControladorVigencias{
    private servicio: ServicioVigencias

    constructor(){
        this.servicio = new ServicioVigencias(new RepositorioVigenciaDB())
    }

    async obtener({response}: HttpContextContract){
        const vigencias = await this.servicio.obtenerVigencias()
        response.status(200).send(vigencias)
    }
}