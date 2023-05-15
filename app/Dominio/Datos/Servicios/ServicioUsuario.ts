import { PeticionActualizarUsuario } from "App/Dominio/Dto/Usuarios/PeticionActualizacionUsuario";
import { RepositorioUsuarioEmpresa } from "App/Dominio/Repositorios/RepositorioUsuarioEmpresa";
import { RepositorioUsuarioNovafianza } from "App/Dominio/Repositorios/RepositorioUsuarioNovafianza";
import { UsuarioEmpresa } from "../Entidades/UsuarioEmpresa";
import { UsuarioNovafianza } from "../Entidades/UsuarioNovafianza";
import { Exception } from "@adonisjs/core/build/standalone";

export class ServicioUsuario {
    constructor(
        private repositorioUsuariosNovafianza: RepositorioUsuarioNovafianza,
        private repositorioUsuariosEmpresas: RepositorioUsuarioEmpresa
    ) { }

    async actualizarInformacionUsuario(informacion: PeticionActualizarUsuario, identificacion: string):Promise<UsuarioEmpresa | UsuarioNovafianza>{
        let usuario = await this.obtenerUsuario(identificacion)
        usuario = this.actualizarInformacion(usuario, informacion)
        if(usuario instanceof UsuarioEmpresa){
            await this.repositorioUsuariosEmpresas.actualizarUsuarioEmpresa(usuario.id, usuario)
        }else{
            await this.repositorioUsuariosNovafianza.actualizarUsuarioNovafianza(usuario.id, usuario)
        }
        return usuario
    }

    public async obtenerUsuario(identificacion: string):Promise<UsuarioEmpresa | UsuarioNovafianza>{
        let usuario: UsuarioEmpresa | UsuarioNovafianza | null = await this.repositorioUsuariosEmpresas.obtenerUsuarioEmpresaPorUsuario(identificacion)
        if(!usuario){
            usuario = await this.repositorioUsuariosNovafianza.obtenerUsuarioNovafianzaPorUsuario(identificacion)
            if(!usuario) throw new Exception(`No se encontró el usuario ${identificacion}` , 404);
        }
        return usuario
    }

    private actualizarInformacion(
        usuario:UsuarioEmpresa | UsuarioNovafianza, 
        informacion: PeticionActualizarUsuario): UsuarioEmpresa | UsuarioNovafianza{
        for (const nuevoDato in informacion) {
            if (usuario[nuevoDato]) {
                usuario[nuevoDato] = informacion[nuevoDato]
            }
        }
        return usuario
    }
}