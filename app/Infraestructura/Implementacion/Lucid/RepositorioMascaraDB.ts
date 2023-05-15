/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Paginador } from 'App/Dominio/Paginador';
import { RepositorioMascara } from 'App/Dominio/Repositorios/RepositorioMascara';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { Mascara } from 'App/Dominio/Datos/Entidades/Mascara';
import TblMascaras from 'App/Infraestructura/Datos/Entidad/Mascara';

export class RepositorioMascaraDB implements RepositorioMascara {
  async obtenerMascaras (params: any): Promise<{mascaras: Mascara[], paginacion: Paginador}> {
    const mascaras: Mascara[] = []
    const mascarasDB = await TblMascaras.query().orderBy('id', 'desc').paginate(params.pagina, params.limite)
    mascarasDB.forEach(mascarasDB => {
      mascaras.push(mascarasDB.obtenerMascara())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(mascarasDB)
    return {mascaras , paginacion}
  }

  async obtenerMascaraPorId (id: string): Promise<Mascara> {
    const mascara = await TblMascaras.findOrFail(id)
    return mascara.obtenerMascara()
  }

  async guardarMascara (mascara: Mascara): Promise<Mascara> {
    let mascaraDB = new TblMascaras()
    mascaraDB.establecerMascaraDb(mascara)
    await mascaraDB.save()
    return mascaraDB
  }

  async actualizarMascara (id: string, mascara: Mascara): Promise<Mascara> {
    let mascaraRetorno = await TblMascaras.findOrFail(id)
    mascaraRetorno.establecerMascaraConId(mascara)
    await mascaraRetorno.save()
    return mascaraRetorno
  }
}
