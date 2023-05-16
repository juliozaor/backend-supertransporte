import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { v4 as uuid } from "uuid"
import TblFuncionalidades from 'App/Infraestructura/Datos/Entidad/Autorizacion/Submodulo'
import { DateTime } from 'luxon'
import { FUNCIONALIDADES, MODULOS, ROLES } from 'App/Dominio/DiccionarioAutorizacion'

export default class extends BaseSeeder {
    public async run() {
        await this.asignarPermisosSuperUsuario()
    }

    private async asignarPermisosSuperUsuario(){
        await Database
            .table('tbl_roles_modulos_funcionalidades')
            .multiInsert([
                /* Modulo Archivos */
                {
                    rmf_id: uuid(),
                    rmf_rol_id: ROLES.SUPER,
                    rmf_modulo_id: MODULOS.ARCHIVOS,
                    rmf_funcionalidad_id: FUNCIONALIDADES.CREAR,
                },
                {
                    rmf_id: uuid(),
                    rmf_rol_id: ROLES.SUPER,
                    rmf_modulo_id: MODULOS.ARCHIVOS,
                    rmf_funcionalidad_id: FUNCIONALIDADES.LEER,
                },
                {
                    rmf_id: uuid(),
                    rmf_rol_id: ROLES.SUPER,
                    rmf_modulo_id: MODULOS.ARCHIVOS,
                    rmf_funcionalidad_id: FUNCIONALIDADES.ACTUALIZAR,
                },
                {
                    rmf_id: uuid(),
                    rmf_rol_id: ROLES.SUPER,
                    rmf_modulo_id: MODULOS.ARCHIVOS,
                    rmf_funcionalidad_id: FUNCIONALIDADES.ELIMINAR,
                },
                /* Modulo Usuarios */
            ])
    }

    private async asignarPermisosUsuario(){
        await Database
            .table('tbl_roles_modulos_funcionalidades')
            .multiInsert([
                {
                    rmf_id: uuid(),
                    rmf_rol_id: ROLES.SUPER,
                    rmf_modulo_id: MODULOS.ARCHIVOS,
                    rmf_funcionalidad_id: FUNCIONALIDADES.CREAR,
                },
                {
                    rmf_id: uuid(),
                    rmf_rol_id: ROLES.SUPER,
                    rmf_modulo_id: MODULOS.ARCHIVOS,
                    rmf_funcionalidad_id: FUNCIONALIDADES.LEER,
                },
                {
                    rmf_id: uuid(),
                    rmf_rol_id: ROLES.SUPER,
                    rmf_modulo_id: MODULOS.ARCHIVOS,
                    rmf_funcionalidad_id: FUNCIONALIDADES.ACTUALIZAR,
                },
                {
                    rmf_id: uuid(),
                    rmf_rol_id: ROLES.SUPER,
                    rmf_modulo_id: MODULOS.ARCHIVOS,
                    rmf_funcionalidad_id: FUNCIONALIDADES.ELIMINAR,
                },
            ])
    }
}
