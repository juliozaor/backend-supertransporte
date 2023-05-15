/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioArchivoEmpresa } from 'App/Dominio/Repositorios/RepositorioArchivoEmpresa';
import { ArchivoEmpresa } from 'App/Dominio/Datos/Entidades/ArchivoEmpresa';
import TblArchivoEmpresa from '../../Datos/Entidad/ArchivoEmpresa';

export class RepositorioArchivoEmpresaDB implements RepositorioArchivoEmpresa {

  async eliminarArchivosEmpresa(idEmpresa: string, idArchivos: string[]): Promise<number> {
    const resultado = await TblArchivoEmpresa.query()
    .delete()
    .where('idEmpresa', idEmpresa)
    .andWhereIn('idArchivo', idArchivos)
    return resultado[0]
  }

  async obtenerArchivosPorEmpresa(idEmpresa: string): Promise<ArchivoEmpresa[]> {
    const archivosEmpresaDb = await TblArchivoEmpresa.query().where('idEmpresa', idEmpresa)
    return archivosEmpresaDb.map( archivoEmpresaDb => {
      return archivoEmpresaDb.obtenerArchivoEmpresa()
    })
  }

  async guardarArchivosEmpresa(archivosEmpresa: ArchivoEmpresa[]): Promise<ArchivoEmpresa[]> {
    const archivosEmpresaDb = archivosEmpresa.map( archivoEmpresa  => {
      const archivoEmpresaDb = new TblArchivoEmpresa()
      archivoEmpresaDb.establecerArchivoEmpresaDb(archivoEmpresa)
      return archivoEmpresaDb
    })
    return (await TblArchivoEmpresa.createMany(archivosEmpresaDb)).map( archivoEmpresaDbGuardado => {
      return archivoEmpresaDbGuardado.obtenerArchivoEmpresa()
    })
  }
  
  async obtenerArchivosEmpresas (params: any): Promise<{archivosEmpresas: ArchivoEmpresa[], paginacion: Paginador}> {
    const archivosEmpresas: ArchivoEmpresa[] = []
    const archivosEmpresasDB = await TblArchivoEmpresa.query().orderBy('id', 'desc').paginate(params.pagina, params.limite)
    archivosEmpresasDB.forEach(archivosEmpresasDB => {
      archivosEmpresas.push(archivosEmpresasDB.obtenerArchivoEmpresa())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(archivosEmpresasDB)
    return {archivosEmpresas , paginacion}
  }

  async obtenerArchivoEmpresaPorId (id: string): Promise<ArchivoEmpresa> {
    const archivoEmpresa = await TblArchivoEmpresa.findOrFail(id)
    return archivoEmpresa.obtenerArchivoEmpresa()
  }

  async guardarArchivoEmpresa (archivoEmpresa: ArchivoEmpresa): Promise<ArchivoEmpresa> {
    let archivoEmpresaDB = new TblArchivoEmpresa()
    archivoEmpresaDB.establecerArchivoEmpresaDb(archivoEmpresa)
    await archivoEmpresaDB.save()
    return archivoEmpresaDB
  }

  async actualizarArchivoEmpresa (id: string, archivoEmpresa: ArchivoEmpresa): Promise<ArchivoEmpresa> {
    let archivoEmpresaRetorno = await TblArchivoEmpresa.findOrFail(id)
    archivoEmpresaRetorno.establecerArchivoEmpresaConId(archivoEmpresa)
    await archivoEmpresaRetorno.save()
    return archivoEmpresaRetorno
  }
}
