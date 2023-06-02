
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioUsuario } from 'App/Dominio/Repositorios/RepositorioUsuario';
import { Usuario } from 'App/Dominio/Datos/Entidades/Usuario';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import TblDetallesClasificaciones from 'App/Infraestructura/Datos/Entidad/detalleClasificacion';
import TblEncuestas from 'App/Infraestructura/Datos/Entidad/Encuesta';
import TblClasificacionesUsuario from 'App/Infraestructura/Datos/Entidad/ClasificacionesUsuario';
export class RepositorioUsuariosDB implements RepositorioUsuario {
  async obtenerUsuarios (params: any): Promise<{usuarios: Usuario[], paginacion: Paginador}> {
    const usuarios: Usuario[] = []
    const usuariosDB = await TblUsuarios.query().orderBy('id', 'desc').paginate(params.pagina, params.limite)
    usuariosDB.forEach(usuariosDB => {
      usuarios.push(usuariosDB.obtenerUsuario())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(usuariosDB)
    return {usuarios , paginacion}
  }

  async obtenerUsuarioPorId (id: string): Promise<Usuario> {
    const usuario = await TblUsuarios.findOrFail(id)
    return usuario.obtenerUsuario()
  }

  async obtenerUsuarioPorUsuario (nombreUsuario: string): Promise<Usuario | null>{
    const usuario = await TblUsuarios.query().where('usuario', '=', nombreUsuario).first()
    if(usuario){
      return usuario.obtenerUsuario()
    }
    return null
  }

  async guardarUsuario (usuario: Usuario): Promise<Usuario> {
    let usuarioDB = new TblUsuarios()
    usuarioDB.establecerUsuarioDb(usuario)
    await usuarioDB.save()
    return usuarioDB
  }

  async actualizarUsuario (id: string, usuario: Usuario): Promise<Usuario> {
    let usuarioRetorno = await TblUsuarios.findOrFail(id)
    usuarioRetorno.estableceUsuarioConId(usuario)
    await usuarioRetorno.save()
    return usuarioRetorno
  }

  public async caracterizacion(idUsuario: string, idEncuesta?: number): Promise<any> {


    //const categorizadoBd = await TblDetallesClasificaciones.query().where('usuarioId', idUsuario).first();
    const categorizadoBd = await TblClasificacionesUsuario.query().where('usuarioId', idUsuario).first();



    const categorizado = (categorizadoBd) ? true : false;

    let encuestaCategorizable: boolean = false;
    if (idEncuesta) {
        const encuestaBd = await TblEncuestas.query().where('id', idEncuesta).first();
        if (encuestaBd && encuestaBd.categorizable === true) {
            encuestaCategorizable = true;

        }
    }


    return { categorizado, encuestaCategorizable }
}
}
