import { Exception } from "@adonisjs/core/build/standalone";
import { Mes } from "App/Dominio/Datos/Entidades/Mes";
import { RepositorioMes } from "App/Dominio/Repositorios/RepositorioMes";
import { TblMeses } from "App/Infraestructura/Datos/Entidad/Mes";

export class RepositorioMesDB implements RepositorioMes{

    async obtenerMesesPorVigencia(vigencia: number): Promise<Mes[]> {
        return (await TblMeses.query()
        .where('mes_vigencia', vigencia)
        .orderBy('mes_visual', 'asc'))
        .map(mesDb => mesDb.obtenerMes())
    }

    async actualizarMes(mes: Mes): Promise<Mes> {
        const mesDb = await TblMeses.find(mes.id)
        if(!mesDb){
            throw new Exception(`No se encontró el mes con id: ${mes.id}`, 404)
        }
        mesDb.establecerMesDb(mes, true)
        return (await mesDb.save()).obtenerMes()
    }

    async obtenerMesPorId(mesId: number): Promise<Mes | null> {
        const mesDb = await TblMeses.find(mesId)
        return mesDb ? mesDb.obtenerMes() : null
    }

}