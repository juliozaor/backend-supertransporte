import { Soporte } from "App/Dominio/Datos/Entidades/Soporte";
import { FiltrosSoporte } from "App/Dominio/Dto/Soporte/FiltrosSoporte";
import { RepositorioSoporte } from "App/Dominio/Repositorios/RepositorioSoporte";
import { Paginable } from "App/Dominio/Tipos/Tipos";
import { Soportes } from "App/Infraestructura/Datos/Entidad/Soporte";
import { MapeadorPaginacionDB } from "./MapeadorPaginacionDB";

export class RepositorioSoporteDB implements RepositorioSoporte{

    async guardar(soporte: Soporte): Promise<Soporte> {
        soporte.id = await this.obtenerProximoId()
        const soporteDb = new Soportes()
        soporteDb.establecer(soporte)
        return (await soporteDb.save()).obtenerSoporte()
    }

    async obtenerPorId(id: number): Promise<Soporte | null> {
        const soporteDb = await Soportes.find(id)
        return soporteDb ? await soporteDb.obtenerSoporte() : soporteDb;
    }

    async obtenerSoportes(pagina: number, limite: number, filtros: FiltrosSoporte): Promise<Paginable<Soporte>> {
        const query = Soportes.query()
        if(filtros.estado){
            query.andWhere('id_estado', filtros.estado)
        }
        /* if(filtros.fechaCreacion){
        } */
        if(filtros.termino){
            query.andWhere( subquery => {
                subquery.where('radicado', 'ilike', `%${filtros.termino}%`)
                subquery.orWhere('razon_social', 'ilike', `%${filtros.termino}%`)
                subquery.orWhere('email', 'ilike', `%${filtros.termino}%`)
                subquery.orWhere('usuario_respuesta', 'ilike', `%${filtros.termino}%`)
            })
        }
        if(filtros.fechaCreacion){
            query.orderBy('fecha_creacion', filtros.fechaCreacion)
            
        }else{
            query.orderBy('fecha_creacion', 'asc') //por defecto los mas antiguos primero
        }
        const paginableDb = await query.paginate(pagina, limite) 
        const paginacion = MapeadorPaginacionDB.obtenerPaginacion(paginableDb)
        const datos = paginableDb.all().map( soporteDb => soporteDb.obtenerSoporte())
        return {
            datos,
            paginacion
        }
    }

    async actualizarSoporte(soporte: Soporte): Promise<Soporte> {
        const soporteDb = await Soportes.findOrFail(soporte.id)
        soporteDb.establecer(soporte, true)
        return (await soporteDb.save()).obtenerSoporte()
    }

    async obtenerProximoId(): Promise<number>{
        const resultados = await Soportes.query().max('id_soporte').as('max')
        return +resultados[0].$extras['max'] + 1;
    }

}