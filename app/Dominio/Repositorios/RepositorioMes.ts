import { Mes } from "../Datos/Entidades/Mes";

export interface RepositorioMes{
    obtenerMesesPorVigencia(vigencia: number): Promise<Mes[]>
    actualizarMes(mes: Mes): Promise<Mes>
    obtenerMesPorId(mesId: number): Promise<Mes | null>
}