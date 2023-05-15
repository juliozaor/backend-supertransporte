/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { VariableEspecifica } from 'App/Dominio/Datos/Entidades/VariableEspecifica'
import { Paginador } from 'App/Dominio/Paginador'
import { RepositorioVariableEspecifica } from 'App/Dominio/Repositorios/RepositorioVariableEspecifica'
import TblVariablesEspecificas from 'App/Infraestructura/Datos/Entidad/VariableEspecifica'
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB'

export class RepositorioVariableEspecificaDB implements RepositorioVariableEspecifica {
  async obtenerVariablesEspecificas (params: any): Promise<{ variablesEspecificas: VariableEspecifica[], paginacion: Paginador }> {
    const variablesEspecificas: VariableEspecifica[] = []
    const variableEspecificaDB = await TblVariablesEspecificas.query().orderBy('id', 'desc').paginate(params.pagina, params.limite)
    variableEspecificaDB.forEach(variableEspecificaDB => {
      variablesEspecificas.push(variableEspecificaDB.obtenerVariableEspecifica())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(variableEspecificaDB)
    return { variablesEspecificas, paginacion }
  }

  async obtenerVariableEspecificaPorId (id: string): Promise<VariableEspecifica> {
    const variableEspecifica = await TblVariablesEspecificas.findOrFail(id)
    return variableEspecifica.obtenerVariableEspecifica()
  }

  async guardarVariableEspecifica (variableEspecifica: VariableEspecifica): Promise<VariableEspecifica> {
    let variableEspecificaDb = new TblVariablesEspecificas()
    variableEspecificaDb.establecerVariableEspecificaDb(variableEspecifica)
    await variableEspecificaDb.save()
    return variableEspecificaDb
  }

  async actualizarVariableEspecifica (id: string, variableEspecifica: VariableEspecifica): Promise<VariableEspecifica> {
    let variableEspecificaRetorno = await TblVariablesEspecificas.findOrFail(id)
    variableEspecificaRetorno.establecerVariableEspecificaConId(variableEspecifica)
    await variableEspecificaRetorno.save()
    return variableEspecificaRetorno
  }
}
