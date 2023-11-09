import { Vigencia } from "App/Dominio/Datos/Entidades/Vigencia";
import { RepositorioVigencia } from "App/Dominio/Repositorios/RepositorioVigencia";
import { TblVigencias } from "App/Infraestructura/Datos/Entidad/Vigencia";

export class RepositorioVigenciaDB implements RepositorioVigencia{
    async obtenerVigencias(): Promise<Vigencia[]> {
        return (await TblVigencias.query().orderBy('anv_anio', 'desc')).map( vigenciaDb => vigenciaDb.obtenerVigencia() )
    }
}