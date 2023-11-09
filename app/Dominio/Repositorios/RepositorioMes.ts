import { Mes } from "../Datos/Entidades/Mes";

export interface RepositorioMes{
    obtenerMeses(): Promise<Mes[]>
    actualizarMes(mes: Mes): Promise<Mes>
    obtenerMesPorId(mesId: number): Promise<Mes | null>
}