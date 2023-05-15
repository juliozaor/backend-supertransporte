/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { VariableTransversal } from 'App/Dominio/Datos/Entidades/VariableTransversal'
import { Paginador } from 'App/Dominio/Paginador'
import { RepositorioVariableTransversal } from 'App/Dominio/Repositorios/RepositorioVariableTransversal'
import TblVariablesTransversales from 'App/Infraestructura/Datos/Entidad/VariableTransversal'
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB'

export class RepositorioVariableTransversalDB implements RepositorioVariableTransversal {
  async obtenerVariablesTransversales (params: any): Promise<{ variableTransversales: VariableTransversal[], paginacion: Paginador }> {
    const variableTransversales: VariableTransversal[] = []
    const variableTransversalDB = await TblVariablesTransversales.query().orderBy('id', 'desc').paginate(params.pagina, params.limite)
    variableTransversalDB.forEach(variableTransversalDB => {
      variableTransversales.push(variableTransversalDB.obtenerVariableTransversal())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(variableTransversalDB)
    return { variableTransversales, paginacion }
  }

  async obtenerVariableTransversalPorId (id: string): Promise<VariableTransversal> {
    const variableTransversal = await TblVariablesTransversales.findOrFail(id)
    return variableTransversal.obtenerVariableTransversal()
  }

  async guardarVariableTransversal (variableTransversal: VariableTransversal): Promise<VariableTransversal> {
    let variableTransversalDb = new TblVariablesTransversales()
    variableTransversalDb.establecerVariableTransversalDb(variableTransversal)
    await variableTransversalDb.save()
    return variableTransversalDb
  }

  async actualizarVariableTransversal (id: string, variableTransversal: VariableTransversal): Promise<VariableTransversal> {
    let variableTransversalRetorno = await TblVariablesTransversales.findOrFail(id)
    variableTransversalRetorno.establecerVariableTransversalConId(variableTransversal)
    await variableTransversalRetorno.save()
    return variableTransversalRetorno
  }
}
