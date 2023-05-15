/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { LogExito } from 'App/Dominio/Datos/Entidades/LogExito';
import { Paginador } from 'App/Dominio/Paginador';
import { RepositorioLogExito } from 'App/Dominio/Repositorios/RepositorioLogExito';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import TblLogsExitos from '../../Datos/Entidad/LogExito';

export class RepositorioLogExitoDB implements RepositorioLogExito {
  async obtenerLogsExitos (params: any): Promise<{logsExitos: LogExito[], paginacion: Paginador}> {
    const logsExitos: LogExito[] = []
    const logsExitosDB = await TblLogsExitos.query().orderBy('id', 'desc').paginate(params.pagina, params.limite)
    logsExitosDB.forEach(logsExitosDB => {
      logsExitos.push(logsExitosDB.obtenerLogExito())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(logsExitosDB)
    return {logsExitos , paginacion}
  }

  async obtenerLogExitoPorId (id: string): Promise<LogExito> {
    const logExito = await TblLogsExitos.findOrFail(id)
    return logExito.obtenerLogExito()
  }

  async guardarLogExito (logExito: LogExito): Promise<LogExito> {
    let logExitoDB = new TblLogsExitos()
    logExitoDB.establecerLogExitoDb(logExito)
    await logExitoDB.save()
    return logExitoDB
  }

  async actualizarLogExito (id: string, logExito: LogExito): Promise<LogExito> {
    let logExitoRetorno = await TblLogsExitos.findOrFail(id)
    logExitoRetorno.establecerLogExitoConId(logExito)
    await logExitoRetorno.save()
    return logExitoRetorno
  }
}
