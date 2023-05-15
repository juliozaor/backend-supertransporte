import { Rol } from "../Datos/Entidades/Autorizacion/Rol";

export interface RepositorioAutorizacion {
    obtenerRolConModulosYPermisos(idRol: string): Promise<Rol>
}