/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioUsuarioNovafianza } from 'App/Dominio/Repositorios/RepositorioUsuarioNovafianza';
import { UsuarioNovafianza } from 'App/Dominio/Datos/Entidades/UsuarioNovafianza';
import TblUsuariosNovafianzas from 'App/Infraestructura/Datos/Entidad/UsuarioNovafianza';

export class RepositorioUsuarioNovafianzaDB implements RepositorioUsuarioNovafianza {
  async obtenerUsuariosNovafianza (params: any): Promise<{usuariosNovafianza: UsuarioNovafianza[], paginacion: Paginador}> {
    const usuariosNovafianza: UsuarioNovafianza[] = []
    const usuariosNovafianzaDB = await TblUsuariosNovafianzas.query().orderBy('id', 'desc').paginate(params.pagina, params.limite)
    usuariosNovafianzaDB.forEach(usuariosNovafianzaDB => {
      usuariosNovafianza.push(usuariosNovafianzaDB.obtenerUsuarioNovafianza())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(usuariosNovafianzaDB)
    return {usuariosNovafianza , paginacion}
  }

  async obtenerUsuarioNovafianzaPorId (id: string): Promise<UsuarioNovafianza> {
    const usuarioNovafianza = await TblUsuariosNovafianzas.findOrFail(id)
    return usuarioNovafianza.obtenerUsuarioNovafianza()
  }

  async obtenerUsuarioNovafianzaPorUsuario (nombreUsuario: string): Promise<UsuarioNovafianza | null>{
    const usuario = await TblUsuariosNovafianzas.query().where('usuario', '=', nombreUsuario).first()
    if(usuario){
      return usuario.obtenerUsuarioNovafianza()
    }
    return null
  }

  async guardarUsuarioNovafianza (usuarioNovafianza: UsuarioNovafianza): Promise<UsuarioNovafianza> {
    let usuarioNovafianzaDB = new TblUsuariosNovafianzas()
    usuarioNovafianzaDB.establecerUsuarioNovafianzaDb(usuarioNovafianza)
    await usuarioNovafianzaDB.save()
    return usuarioNovafianzaDB
  }

  async actualizarUsuarioNovafianza (id: string, usuarioNovafianza: UsuarioNovafianza): Promise<UsuarioNovafianza> {
    let usuarioNovafianzaRetorno = await TblUsuariosNovafianzas.findOrFail(id)
    usuarioNovafianzaRetorno.estableceUsuarioNovafianzaConId(usuarioNovafianza)
    await usuarioNovafianzaRetorno.save()
    return usuarioNovafianzaRetorno
  }
}
