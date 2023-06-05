import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { ServicioSoporte } from "App/Dominio/Datos/Servicios/ServicioSoporte";
import { ServicioUsuario } from "App/Dominio/Datos/Servicios/ServicioUsuario";
import { RepositorioFicheroLocal } from "App/Infraestructura/Ficheros/RepositorioFicheroLocal";
import { RepositorioSoporteDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioSoporteDB";
import { RepositorioUsuariosDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioUsuariosDB";
import { crearSoporteSchema } from "./Validadores/CrearSoporte";
import { MapeadorFicheroAdonis } from "../Mapeadores/MapeadorFicheroAdonis";
import { FiltrosSoporte } from "App/Dominio/Dto/Soporte/FiltrosSoporte";
import { crearRespuesta } from "./Validadores/CrearRespuesta";

export default class ControladorSoporte{
    private servicio: ServicioSoporte
    constructor(){
        this.servicio = new ServicioSoporte( 
            new RepositorioSoporteDB(),
            new RepositorioFicheroLocal(),
            new ServicioUsuario( new RepositorioUsuariosDB() )
        )
    }

    async responder({ request, response }: HttpContextContract ){
        const payload = await request.obtenerPayloadJWT()
        const idSoporte = request.param('idSoporte')
        const { adjunto, respuesta } = await request.validate({ schema: crearRespuesta })
        const soporte = await this.servicio.responder({
            respuesta: respuesta,
            identificacionUsuarioAdmin: payload.documento,
            soporteId: idSoporte,
            adjunto: adjunto ? await MapeadorFicheroAdonis.obtenerFichero(adjunto) : undefined
        })
        response.status(200).send(soporte)
    }

    async guardar({ request, response }: HttpContextContract ){
        const payload = await request.obtenerPayloadJWT()
        const { adjunto, descripcion } = await request.validate({ schema: crearSoporteSchema })
        const soporte = await this.servicio.guardar({
            adjunto: adjunto ? await MapeadorFicheroAdonis.obtenerFichero(adjunto) : undefined,
            descripcion: descripcion,
            documentoUsuario: payload.documento
        }, false)
        response.status(201).send(soporte)
    }

    async guardarSinAcceso({ request, response }: HttpContextContract){
        const peticion = await request.validate({ schema: crearSoporteSchema })
        if(!peticion.nit){
            response.status(400).send({
                mensaje: 'El nit es obligatorio para soportes de problemas de acceso.'
            })
            return;
        }
        const soporte = await this.servicio.guardar({
            adjunto: peticion.adjunto ? await MapeadorFicheroAdonis.obtenerFichero(peticion.adjunto) : undefined,
            descripcion: peticion.descripcion,
            documentoUsuario: peticion.nit,
            correo: peticion.correo,
            telefono: peticion.telefono,
            razonSocial: peticion.razonSocial
        }, true)
        response.status(201).send(soporte)
    }

    async listar({ request, response }: HttpContextContract ){
        const querys = request.qs()
        const pagina = querys.pagina ?? 1
        const limite = querys.limite ?? 5
        const filtros = querys as FiltrosSoporte
        const paginable = await this.servicio.listar(pagina, limite, filtros)
        response.status(200).send(paginable)
    }
}