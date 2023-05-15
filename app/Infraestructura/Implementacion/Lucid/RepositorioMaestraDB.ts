/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Paginador } from 'App/Dominio/Paginador';
import { RepositorioMaestra } from 'App/Dominio/Repositorios/RepositorioMaestra';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import TblMaestras from '../../Datos/Entidad/Maestra';
import { Maestra } from 'App/Dominio/Datos/Entidades/Maestra';

export class RepositorioMaestraDB implements RepositorioMaestra {
  async obtenerMaestras (params: any): Promise<{maestras: Maestra[], paginacion: Paginador}> {
    const maestras: Maestra[] = []
    const maestrasDB = await TblMaestras.query().orderBy('id', 'desc').paginate(params.pagina, params.limite)
    maestrasDB.forEach(maestrasDB => {
      maestras.push(maestrasDB.obtenerMaestra())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(maestrasDB)
    return {maestras , paginacion}
  }

  async obtenerMaestraPorId (id: string): Promise<Maestra> {
    const maestra = await TblMaestras.findOrFail(id)
    return maestra.obtenerMaestra()
  }

  async guardarMaestra (maestra: Maestra): Promise<Maestra> {
    let maestraDB = new TblMaestras()
    maestraDB.establecerMaestraDb(maestra)
    await maestraDB.save()
    return maestraDB
  }

  async actualizarMaestra (id: string, maestra: Maestra): Promise<Maestra> {
    let maestraRetorno = await TblMaestras.findOrFail(id)
    maestraRetorno.establecerMaestraConId(maestra)
    await maestraRetorno.save()
    return maestraRetorno
  }
}
