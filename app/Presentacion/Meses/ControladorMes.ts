import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { ServicioMes } from "App/Dominio/Datos/Servicios/ServicioMes";
import { RepositorioMesDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioMesDB";

export default class ControladorMes {
    private servicio: ServicioMes

    constructor() {
        this.servicio = new ServicioMes(new RepositorioMesDB());
    }

    async listar({ request, response }: HttpContextContract) {
        let vigencia = request.qs()["vigencia"]
        if(!vigencia){
            response.status(400).send({
                mensaje: 'Vigencia requerida',
                estado: 400
            })
            return;
        }
        vigencia = Number(vigencia)
        const meses = await this.servicio.obtenerMeses(vigencia)
        response.status(200).send(meses)
    }

    async cambiarEstado({ request, response }: HttpContextContract){
        const id = Number(request.param("id"))
        const mes = await this.servicio.cambiarEstadoMes(id)
        response.status(200).send(mes) 
    }
}