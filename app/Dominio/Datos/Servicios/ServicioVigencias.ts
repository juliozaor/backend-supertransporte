import { RepositorioVigencia } from "App/Dominio/Repositorios/RepositorioVigencia";

export class ServicioVigencias{
    constructor(private repositorio: RepositorioVigencia){}

    obtenerVigencias(){
        return this.repositorio.obtenerVigencias()
    }
}