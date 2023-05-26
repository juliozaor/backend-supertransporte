
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioUser } from 'App/Dominio/Repositorios/RepositorioUser';
import { User } from 'App/Dominio/Datos/Entidades/User';
import TblUsers from 'App/Infraestructura/Datos/Entidad/User';
export class RepositorioUsersDB implements RepositorioUser {
  

  async obtenerUserPorId (id: string): Promise<User> {
    const user = await TblUsers.findOrFail(id)
    return user.obtenerUser()
  }

}
