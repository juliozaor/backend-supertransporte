/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioLogErrores } from 'App/Dominio/Repositorios/RepositorioLogErrores';
import { LogErrores } from 'App/Dominio/Datos/Entidades/LogErrores';
import TblLogsErrores from 'App/Infraestructura/Datos/Entidad/LogErrores';

export class RepositorioLogErroresDB implements RepositorioLogErrores {
  async obtenerLogsErrores (params: any): Promise<{logsErrores: LogErrores[], paginacion: Paginador}> {
    const logsErrores: LogErrores[] = []
    const logsErroresDB = await TblLogsErrores.query().orderBy('id', 'desc').paginate(params.pagina, params.limite)
    logsErroresDB.forEach(logsErroresDB => {
      logsErrores.push(logsErroresDB.obtenerLogErrores())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(logsErroresDB)
    return {logsErrores , paginacion}
  }

  async obtenerLogErroresPorId (id: string): Promise<LogErrores> {
    const logErrores = await TblLogsErrores.findOrFail(id)
    return logErrores.obtenerLogErrores()
  }

  async guardarLogErrores (logErrores: LogErrores): Promise<LogErrores> {
    let logErroresDB = new TblLogsErrores()
    logErroresDB.establecerLogErroresDb(logErrores)
    await logErroresDB.save()
    return logErroresDB
  }

  async actualizarLogErrores (id: string, logErrores: LogErrores): Promise<LogErrores> {
    let logErroresRetorno = await TblLogsErrores.findOrFail(id)
    logErroresRetorno.establecerLogErroresConId(logErrores)
    await logErroresRetorno.save()
    return logErroresRetorno
  }
}
