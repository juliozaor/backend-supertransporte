/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioArchivoEmpresaFormato } from 'App/Dominio/Repositorios/RepositorioArchivoEmpresaFormato';
import { ArchivoEmpresaFormato } from 'App/Dominio/Datos/Entidades/ArchivoEmpresaFormato';
import TblArchivoEmpresaFormatos from '../../Datos/Entidad/ArchivoEmpresaFormato';

export class RepositorioArchivoEmpresaFormatoDB implements RepositorioArchivoEmpresaFormato {
  async obtenerArchivosEmpresasFormatos (params: any): Promise<{archivosEmpresasFormatos: ArchivoEmpresaFormato[], paginacion: Paginador}> {
    const archivosEmpresasFormatos: ArchivoEmpresaFormato[] = []
    const archivosEmpresasFormatosDB = await TblArchivoEmpresaFormatos.query().orderBy('id', 'desc').paginate(params.pagina, params.limite)
    archivosEmpresasFormatosDB.forEach(archivosEmpresasFormatosDB => {
      archivosEmpresasFormatos.push(archivosEmpresasFormatosDB.obtenerArchivoEmpresaFormato())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(archivosEmpresasFormatosDB)
    return {archivosEmpresasFormatos , paginacion}
  }

  async obtenerArchivoEmpresaFormatoPorId (id: string): Promise<ArchivoEmpresaFormato> {
    const archivoEmpresaFormato = await TblArchivoEmpresaFormatos.findOrFail(id)
    return archivoEmpresaFormato.obtenerArchivoEmpresaFormato()
  }

  async guardarArchivoEmpresaFormato (archivoEmpresaFormato: ArchivoEmpresaFormato): Promise<ArchivoEmpresaFormato> {
    let archivoEmpresaFormatoDB = new TblArchivoEmpresaFormatos()
    archivoEmpresaFormatoDB.establecerArchivoEmpresaFormatoDb(archivoEmpresaFormato)
    await archivoEmpresaFormatoDB.save()
    return archivoEmpresaFormatoDB
  }

  async actualizarArchivoEmpresaFormato (id: string, archivoEmpresaFormato: ArchivoEmpresaFormato): Promise<ArchivoEmpresaFormato> {
    let archivoEmpresaFormatoRetorno = await TblArchivoEmpresaFormatos.findOrFail(id)
    archivoEmpresaFormatoRetorno.establecerArchivoEmpresaFormatoConId(archivoEmpresaFormato)
    await archivoEmpresaFormatoRetorno.save()
    return archivoEmpresaFormatoRetorno
  }
}
