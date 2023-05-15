/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioLogAdvertencia } from 'App/Dominio/Repositorios/RepositorioLogAdvertencia';
import { LogAdvertencia } from 'App/Dominio/Datos/Entidades/LogAdvertencia';
import TblLogsAdvertencias from 'App/Infraestructura/Datos/Entidad/LogAdvertencia';

export class RepositorioLogAdvertenciaDB implements RepositorioLogAdvertencia {
  async obtenerLogsAdvertencias (params: any): Promise<{logsAdvertencias: LogAdvertencia[], paginacion: Paginador}> {
    const logsAdvertencias: LogAdvertencia[] = []
    const logsAdvertenciasDB = await TblLogsAdvertencias.query().orderBy('id', 'desc').paginate(params.pagina, params.limite)
    logsAdvertenciasDB.forEach(logsAdvertenciasDB => {
      logsAdvertencias.push(logsAdvertenciasDB.obtenerLogAdvertencia())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(logsAdvertenciasDB)
    return {logsAdvertencias , paginacion}
  }

  async obtenerLogAdvertenciaPorId (id: string): Promise<LogAdvertencia> {
    const logAdvertencia = await TblLogsAdvertencias.findOrFail(id)
    return logAdvertencia.obtenerLogAdvertencia()
  }

  async guardarLogAdvertencia (logAdvertencia: LogAdvertencia): Promise<LogAdvertencia> {
    let logAdvertenciaDB = new TblLogsAdvertencias()
    logAdvertenciaDB.establecerLogAdvertenciaDb(logAdvertencia)
    await logAdvertenciaDB.save()
    return logAdvertenciaDB
  }

  async actualizarLogAdvertencia (id: string, logAdvertencia: LogAdvertencia): Promise<LogAdvertencia> {
    let logAdvertenciaRetorno = await TblLogsAdvertencias.findOrFail(id)
    logAdvertenciaRetorno.establecerLogAdvertenciaConId(logAdvertencia)
    await logAdvertenciaRetorno.save()
    return logAdvertenciaRetorno
  }
}
