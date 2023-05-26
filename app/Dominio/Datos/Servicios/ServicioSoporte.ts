import { RepositorioFichero } from "App/Dominio/Ficheros/RepositorioFichero";
import { RepositorioSoporte } from "App/Dominio/Repositorios/RepositorioSoporte";
import { PeticionCrearSoporte } from "./Dtos/PeticionCrearSoporte";
import { ServicioUsuario } from "./ServicioUsuario";
import { Usuario } from "../Entidades/Usuario";
import { Exception } from "@adonisjs/core/build/standalone";
import { Soporte } from "../Entidades/Soporte";
import { Fichero } from "App/Dominio/Ficheros/Fichero";
import { RUTAS_ARCHIVOS } from "App/Dominio/Ficheros/RutasFicheros";
import { FiltrosSoporte } from "App/Dominio/Dto/Soporte/FiltrosSoporte";
import { PeticionResponderSoporte } from "./Dtos/PeticionResponderSoporte";
import { DateTime } from "luxon";
import { EstadosSoportes } from "App/Dominio/EstadosSoporte";

export class ServicioSoporte{
    constructor(
        private repositorio: RepositorioSoporte,
        private repositorioFicheros: RepositorioFichero,
        private servicioUsuarios: ServicioUsuario
    ){}

    async responder(peticion: PeticionResponderSoporte){
        const usuario = await this.servicioUsuarios.obtenerUsuario(peticion.identificacionUsuarioAdmin)
        const soporte = await this.repositorio.obtenerPorId(peticion.soporteId)
        if(!soporte){
            throw new Exception(`No se encontró el soporte con id: ${peticion.soporteId}`)
        } 
        soporte.respuesta = peticion.respuesta
        soporte.fechaRespuesta = DateTime.now()
        soporte.usuarioRespuesta = `${usuario.nombre} ${usuario.apellido}`
        if(peticion.adjunto){
            this.guardarAdjunto(peticion.adjunto, soporte.id!, true)
            soporte.documentoRespuesta = peticion.adjunto.nombre
            soporte.identificadorDocumentoRespuesta = `R_${soporte.id}.${peticion.adjunto.extension}`
        }
        soporte.idEstado = EstadosSoportes.CERRADO;
        return await this.repositorio.actualizarSoporte(soporte)
    }

    async listar(pagina: number, limite: number, filtros: FiltrosSoporte){
        return this.repositorio.obtenerSoportes(pagina, limite, filtros)
    }
    
    async guardar(peticion: PeticionCrearSoporte){
        const usuario = await this.obtenerUsuario(peticion.documentoUsuario)
        
        let soporte = Soporte.crear({
            descripcion: peticion.descripcion,
            email: usuario.correo,
            nit: usuario.identificacion,
            razonSocial: usuario.nombre,
            ruta: 'RUTA PENDIENTE',
            documento: peticion.adjunto ? peticion.adjunto.nombre : undefined,
            telefono: usuario.telefono ?? ''
        })
        soporte = await this.repositorio.guardar(soporte)
        if(peticion.adjunto){
            soporte.identificadorDocumento = `${soporte.id!}.${peticion.adjunto.extension}`
            this.guardarAdjunto(peticion.adjunto, soporte.id!)
        }
        soporte.generarRadicado()
        return await this.repositorio.actualizarSoporte(soporte)
    }

    private async obtenerUsuario(documento: string): Promise<Usuario>{
        try{
            return this.servicioUsuarios.obtenerUsuario(documento)
        }catch{
            throw new Exception(`Error al buscar el usuario con identificación: ${documento}`, 500)
        }
    }

    private guardarAdjunto(adjunto: Fichero, idSoporte: number, esRespuesta: boolean = false){
        this.repositorioFicheros.guardarFichero(
            adjunto, 
            esRespuesta ? RUTAS_ARCHIVOS.ADJUNTOS_RESPUESTAS_SOPORTES : RUTAS_ARCHIVOS.ADJUNTOS_SOPORTES, 
            `${idSoporte}`, 
            adjunto.extension
        )
    }
}