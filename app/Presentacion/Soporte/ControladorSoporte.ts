import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { ServicioSoporte } from "App/Dominio/Datos/Servicios/ServicioSoporte";
import { ServicioUsuario } from "App/Dominio/Datos/Servicios/ServicioUsuario";
import { RepositorioFicheroLocal } from "App/Infraestructura/Ficheros/RepositorioFicheroLocal";
import { RepositorioSoporteDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioSoporteDB";
import { RepositorioUsuariosDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioUsuariosDB";
import { crearSoporteSchema } from "./Validadores/CrearSoporte";
import { MapeadorFicheroAdonis } from "../Mapeadores/MapeadorFicheroAdonis";

export default class ControladorSoporte{
    private servicio: ServicioSoporte
    constructor(){
        this.servicio = new ServicioSoporte( 
            new RepositorioSoporteDB(),
            new RepositorioFicheroLocal(),
            new ServicioUsuario( new RepositorioUsuariosDB() )
        )
    }

    async guardar({ request, response }: HttpContextContract ){
        const payload = await request.obtenerPayloadJWT()
        const { adjunto, descripcion } = await request.validate({ schema: crearSoporteSchema })
        const soporte = await this.servicio.guardar({
            adjunto: adjunto ? await MapeadorFicheroAdonis.obtenerFichero(adjunto) : undefined,
            descripcion: descripcion,
            documentoUsuario: payload.documento
        })
        response.status(201).send(soporte)
    }
}