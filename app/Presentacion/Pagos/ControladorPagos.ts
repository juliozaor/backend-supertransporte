import { ServicioPagos } from "App/Dominio/Datos/Servicios/ServicioPagos";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { peticionTransaccionValidador } from "./Validadores/PeticionTransaccion";
import { peticionConsultarDeudaValidador } from "./Validadores/PeticionConsultarDeuda";
import { RepositorioPagosNovafianzaHttp } from "App/Infraestructura/Implementacion/Servicios/RepositorioPagosNovafianzaAxios";
import { ClienteHttpAxios } from "App/Infraestructura/ClientesHttp/ClienteHttpAxios";

export default class ControladorPagos {
    private servicioWompi:ServicioPagos

    public constructor(){
        this.servicioWompi = new ServicioPagos(new RepositorioPagosNovafianzaHttp(new ClienteHttpAxios()))
    }

    public async consultar({request, response}:HttpContextContract){
        const peticion = await request.validate({schema: peticionConsultarDeudaValidador})
        const respuesta = await this.servicioWompi.tieneDeuda(peticion.tipoDocumento, peticion.documento)
        response.status(201).send({
            deuda: respuesta
        })
    }

    public async transaccion({request, response}:HttpContextContract){
        const peticion = await request.validate({schema: peticionTransaccionValidador})
        const respuesta = await this.servicioWompi.generarTransaccion(peticion)
        response.status(201).send(respuesta)
    }
}