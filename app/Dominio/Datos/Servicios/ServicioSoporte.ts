import { RepositorioFichero } from "App/Dominio/Ficheros/RepositorioFichero";
import { RepositorioSoporte } from "App/Dominio/Repositorios/RepositorioSoporte";
import { PeticionCrearSoporte } from "./Dtos/PeticionCrearSoporte";
import { ServicioUsuario } from "./ServicioUsuario";
import { Usuario } from "../Entidades/Usuario";
import { Exception } from "@adonisjs/core/build/standalone";
import { Soporte } from "../Entidades/Soporte";
import { Fichero } from "App/Dominio/Ficheros/Fichero";
import { RUTAS_ARCHIVOS } from "App/Dominio/Ficheros/RutasFicheros";

export class ServicioSoporte{
    constructor(
        private repositorio: RepositorioSoporte,
        private repositorioFicheros: RepositorioFichero,
        private servicioUsuarios: ServicioUsuario
    ){}
    
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
        if(peticion.adjunto){
            soporte.identificadorDocumento = `${soporte.id!}.${peticion.adjunto.extension}`
            this.guardarAdjunto(peticion.adjunto, soporte.id!)
        }
        soporte = await this.repositorio.guardar(soporte)
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

    private guardarAdjunto(adjunto: Fichero, idSoporte: number){
        this.repositorioFicheros.guardarFichero(
            adjunto, RUTAS_ARCHIVOS.ADJUNTOS_SOPORTES, 
            `${idSoporte}`, 
            adjunto.extension
        )
    }
}