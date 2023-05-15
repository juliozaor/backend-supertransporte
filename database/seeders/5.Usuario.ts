import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { DateTime } from 'luxon'
import TblUsuariosNovafianzas from 'App/Infraestructura/Datos/Entidad/UsuarioNovafianza'
import { ROLES } from 'App/Dominio/DiccionarioAutorizacion'
import { v4 } from 'uuid'


export default class extends BaseSeeder {
  public async run () {
    await TblUsuariosNovafianzas.createMany([
        {
            nombre: 'Novafianza',
            clave: '$bcrypt$v=98$r=10$a+n/pw/rCOQbrJ/i88VuLg$WSNEHXC0TuDUSCA99Qn2waR5OodV9+0',
            correo: 'operaciones@novafianza.com',
            fechaNacimiento: DateTime.now(),
            identificacion: '0000000',
            idRol: ROLES.SUPER,
            usuario: '0000000',
            id: v4() 
        }
    ])
  }
}
