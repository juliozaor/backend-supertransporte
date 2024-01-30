import { RepositorioEmpresaVigilado } from "App/Dominio/Repositorios/RepositorioEmpresaVigilado";

export class ServicioEmpresaVigilado{
  constructor (private repositorio: RepositorioEmpresaVigilado) { }

  async obtenerEmpresas (): Promise<any[]> {
    return this.repositorio.obtenerEmpresas();
  }

  async obtenerSeleccionadas (documento:string): Promise<any[]> {
    return this.repositorio.obtenerSeleccionadas(documento);
  }

  async asignar (documento:string, params:any): Promise<any[]> {
    return this.repositorio.asignar(documento, params);
  }

  async editar (documento:string, params:any): Promise<any[]> {
    return this.repositorio.editar(documento, params);
  }

  async activar (documento:string, params:any): Promise<any[]> {
    return this.repositorio.activar(documento, params);
  }

}
