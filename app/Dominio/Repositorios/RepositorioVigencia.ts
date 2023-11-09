import { Vigencia } from "../Datos/Entidades/Vigencia";

export interface RepositorioVigencia{
    obtenerVigencias(): Promise<Vigencia[]>
}