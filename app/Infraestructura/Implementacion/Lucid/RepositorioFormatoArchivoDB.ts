/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { FormatoArchivo } from 'App/Dominio/Datos/Entidades/FormatoArchivo';
import { Paginador } from 'App/Dominio/Paginador';
import { RepositorioFormatoArchivo } from 'App/Dominio/Repositorios/RepositorioFormatoArchivo';
import TblFormatoArchivo from 'App/Infraestructura/Datos/Entidad/FormatoArchivo';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';

export class RepositorioFormatoArchivoDB implements RepositorioFormatoArchivo {
  async obtenerFormatosArchivos (params: any): Promise<{formatosArchivos: FormatoArchivo[], paginacion: Paginador}> {
    const formatosArchivos: FormatoArchivo[] = []
    const formatosArchivosDB = await TblFormatoArchivo.query().orderBy('id', 'desc').paginate(params.pagina, params.limite)
    formatosArchivosDB.forEach(formatosArchivosDB => {
      formatosArchivos.push(formatosArchivosDB.obtenerFormatoArchivo())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(formatosArchivosDB)
    return {formatosArchivos , paginacion}
  }

  async obtenerFormatoArchivoPorId (id: string): Promise<FormatoArchivo> {
    const formatoArchivo = await TblFormatoArchivo.findOrFail(id)
    return formatoArchivo.obtenerFormatoArchivo()
  }

  async guardarFormatoArchivo (formatoArchivo: FormatoArchivo): Promise<FormatoArchivo> {
    let formatoArchivoDb = new TblFormatoArchivo()
    formatoArchivoDb.establecerFormatoArchivoDb(formatoArchivo)
    await formatoArchivoDb.save()
    return formatoArchivoDb
  }

  async actualizarFormatoArchivo (id: string, formatoArchivo: FormatoArchivo): Promise<FormatoArchivo> {
    let formatoArchivoRetorno = await TblFormatoArchivo.findOrFail(id)
    formatoArchivoRetorno.establecerFormatoArchivoConId(formatoArchivo)
    await formatoArchivoRetorno.save()
    return formatoArchivoRetorno
  }
}
