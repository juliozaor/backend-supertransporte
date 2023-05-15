import { Paginador } from "App/Dominio/Paginador";
import { v4 as uuidv4 } from 'uuid'
import { RepositorioArchivoEmpresa } from "App/Dominio/Repositorios/RepositorioArchivoEmpresa";
import { ArchivoEmpresa } from "../Entidades/ArchivoEmpresa";

export class ServicioArchivoEmpresa{
  constructor (private repositorio: RepositorioArchivoEmpresa) { }

  async obtenerArchivosEmpresas (params: any): Promise<{archivosEmpresas: ArchivoEmpresa[], paginacion: Paginador}> {
    return this.repositorio.obtenerArchivosEmpresas(params);
  }

  async obtenerArchivoEmpresaPorId (id: string): Promise<ArchivoEmpresa>{
    return this.repositorio.obtenerArchivoEmpresaPorId(id);
  }

  async obtenerArchivosPorEmpresa(idEmpresa: string): Promise<ArchivoEmpresa[]>{
    return this.repositorio.obtenerArchivosPorEmpresa(idEmpresa)
  }

  async guardarArchivoEmpresa (archivoEmpresa: ArchivoEmpresa): Promise<ArchivoEmpresa>{
    archivoEmpresa.id = uuidv4();
    return this.repositorio.guardarArchivoEmpresa(archivoEmpresa);
  }

  async guardarArchivosEmpresa(idArchivos: string[], idEmpresa: string){
    const archivosExistentes = await this.repositorio.obtenerArchivosPorEmpresa(idEmpresa)
    const idArchivosExistentes = archivosExistentes.map( archivoExistente => archivoExistente.idArchivo )
    const idArchivosAGuardar = idArchivos.filter( idArchivo => idArchivosExistentes.includes(idArchivo) === false )
    const archivosEmpresaAGuardar = idArchivosAGuardar.map( idArchivoAGuardar => {
      return ArchivoEmpresa.crear(idEmpresa, idArchivoAGuardar, true)
    })
    const archivosAEliminar = idArchivosExistentes.filter(idArchivoExistente => idArchivos.includes(idArchivoExistente) === false)
    await this.repositorio.eliminarArchivosEmpresa(idEmpresa, archivosAEliminar)
    return this.repositorio.guardarArchivosEmpresa(archivosEmpresaAGuardar)
  }

  async actualizarArchivoEmpresa (id: string, archivoEmpresa: ArchivoEmpresa): Promise<ArchivoEmpresa> {
    return this.repositorio.actualizarArchivoEmpresa(id, archivoEmpresa);
  }

  async cambiarEstado (id:string):Promise<ArchivoEmpresa>{
    let archivoEmpresa = await this.repositorio.obtenerArchivoEmpresaPorId(id)
    archivoEmpresa.estado = !archivoEmpresa.estado
    return await this.repositorio.actualizarArchivoEmpresa(id, archivoEmpresa);
  }
}
