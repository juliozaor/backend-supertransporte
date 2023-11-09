import { RepositorioMes } from "App/Dominio/Repositorios/RepositorioMes";
import { Mes } from "../Entidades/Mes";
import { Exception } from "@adonisjs/core/build/standalone";

export class ServicioMes{
    constructor(private repositorio: RepositorioMes){}

    obtenerMeses(): Promise<Mes[]>{
        return this.repositorio.obtenerMeses()
    }

    async cambiarEstadoMes(idMes: number): Promise<Mes>{
        const mes = await this.repositorio.obtenerMesPorId(idMes)
        if(!mes){
            throw new Exception(`No se encontró el mes con id: ${idMes}`, 404)
        }
        mes.estado = !mes.estado
        return this.repositorio.actualizarMes(mes)
    }
}