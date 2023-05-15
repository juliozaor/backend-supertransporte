import { Funcionalidad } from "App/Dominio/Datos/Entidades/Autorizacion/Funcionalidad";
import { Modulo } from "App/Dominio/Datos/Entidades/Autorizacion/Modulo";
import { Rol } from "App/Dominio/Datos/Entidades/Autorizacion/Rol";
import { RepositorioAutorizacion } from "App/Dominio/Repositorios/RepositorioAutorizacion";
import TblFuncionalidades from "App/Infraestructura/Datos/Entidad/Autorizacion/Funcionalidad";
import TblModulos from "App/Infraestructura/Datos/Entidad/Autorizacion/Modulo";
import TblRoles from "App/Infraestructura/Datos/Entidad/Autorizacion/Rol";

export class RepositorioAutorizacionDB implements RepositorioAutorizacion {
    private readonly TABLA_ROLES = 'tbl_roles'
    private readonly TABLA_MODULOS = 'tbl_modulos'
    private readonly TABLA_FUNCIONALIDADES = 'tbl_funcionalidades'
    private readonly TABLA_AUTORIZACION = 'tbl_roles_modulos_funcionalidades'

    async obtenerRolConModulosYPermisos(idRol: string): Promise<Rol> {
        const rol = (await TblRoles.findOrFail(idRol)).obtenerRol()
        let modulos = await this.obtenerModulosDeUnRol(idRol)
        modulos = await this.obtenerFuncionalidadesModulos(modulos, idRol)
        modulos.forEach(modulo => {
            rol.agregarModulo(modulo)
        })
        return rol
    }

    private async obtenerModulosDeUnRol(idRol: string): Promise<Modulo[]> {
        const modulosDb = await TblModulos.query()
            .innerJoin(this.TABLA_AUTORIZACION, `${this.TABLA_MODULOS}.mod_id`, '=', `${this.TABLA_AUTORIZACION}.rmf_modulo_id`)
            .innerJoin(this.TABLA_ROLES, `${this.TABLA_AUTORIZACION}.rmf_rol_id`, '=', `${this.TABLA_ROLES}.rol_id`)
            .where(`${this.TABLA_ROLES}.rol_id`, idRol)
            .distinct(
                `${this.TABLA_ROLES}.rol_id`,
                `${this.TABLA_ROLES}.rol_nombre`,
                `${this.TABLA_AUTORIZACION}.rmf_rol_id`,
                `${this.TABLA_AUTORIZACION}.rmf_modulo_id`,
                `${this.TABLA_MODULOS}.mod_id`,
                `${this.TABLA_MODULOS}.mod_nombre`,
                `${this.TABLA_MODULOS}.mod_nombre_mostrar`,
                `${this.TABLA_MODULOS}.mod_ruta`,
                `${this.TABLA_MODULOS}.mod_icono`,
            )
        return modulosDb.map(moduloDb => {
            return new Modulo(
                moduloDb.id,
                moduloDb.nombre,
                moduloDb.nombreMostrar,
                moduloDb.ruta,
                moduloDb.icono,
                moduloDb.estado,
                moduloDb.creacion,
                moduloDb.actualizacion
            )
        })
    }

    private async obtenerFuncionalidadesModulos(modulos: Modulo[], idRol: string): Promise<Modulo[]> {
        const funcionalidadesDb = await TblFuncionalidades.query()
            .rightJoin(this.TABLA_AUTORIZACION, `${this.TABLA_FUNCIONALIDADES}.fun_id`, '=', `${this.TABLA_AUTORIZACION}.rmf_funcionalidad_id`)
            .rightJoin(this.TABLA_MODULOS, `${this.TABLA_AUTORIZACION}.rmf_modulo_id`, '=', `${this.TABLA_MODULOS}.mod_id`)
            .rightJoin(this.TABLA_ROLES, `${this.TABLA_AUTORIZACION}.rmf_rol_id`, '=', `${this.TABLA_ROLES}.rol_id`)
            .where(`${this.TABLA_ROLES}.rol_id`, idRol)
            .select(`${this.TABLA_FUNCIONALIDADES}.*`, `${this.TABLA_MODULOS}.mod_id`)
        //Funcionalidades por modulos obtenidas
        modulos.forEach(modulo => {
            funcionalidadesDb.forEach(funcionalidadDb => {
                if (modulo.id == funcionalidadDb.$extras['mod_id']) {
                    modulo.agregarFuncionalidad(new Funcionalidad(
                        funcionalidadDb.id,
                        funcionalidadDb.nombre,
                        funcionalidadDb.estado,
                        funcionalidadDb.creacion,
                        funcionalidadDb.actualizacion
                    ))
                }
            })

        })
        return modulos
    }
}