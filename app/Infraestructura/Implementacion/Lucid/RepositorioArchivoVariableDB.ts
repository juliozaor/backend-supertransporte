/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioArchivoVariable } from 'App/Dominio/Repositorios/RepositorioArchivoVariable';
import { ArchivoVariable } from 'App/Dominio/Datos/Entidades/ArchivoVariable';
import TblArchivosVariables from 'App/Infraestructura/Datos/Entidad/ArchivoVariable';

export class RepositorioArchivoVariableDB implements RepositorioArchivoVariable {
  async obtenerArchivosVariables (params: any): Promise<{archivosVariables: ArchivoVariable[], paginacion: Paginador}> {
    const archivosVariables: ArchivoVariable[] = []
    const archivosVariablesDB = await TblArchivosVariables.query().orderBy('id', 'desc').paginate(params.pagina, params.limite)
    archivosVariablesDB.forEach(archivosVariablesDB => {
      archivosVariables.push(archivosVariablesDB.obtenerArchivoVariable())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(archivosVariablesDB)
    return {archivosVariables , paginacion}
  }

  async obtenerArchivoVariablePorId (id: string): Promise<ArchivoVariable> {
    const archivoVariable = await TblArchivosVariables.findOrFail(id)
    return archivoVariable.obtenerArchivoVariable()
  }

  async guardarArchivoVariable (archivoVariable: ArchivoVariable): Promise<ArchivoVariable> {
    let archivoVariableDB = new TblArchivosVariables()
    archivoVariableDB.establecerArchivoVariableDb(archivoVariable)
    await archivoVariableDB.save()
    return archivoVariableDB
  }

  async actualizarArchivoVariable (id: string, archivoVariable: ArchivoVariable): Promise<ArchivoVariable> {
    let archivoVariableRetorno = await TblArchivosVariables.findOrFail(id)
    archivoVariableRetorno.establecerArchivoVariableConId(archivoVariable)
    await archivoVariableRetorno.save()
    return archivoVariableRetorno
  }
}
