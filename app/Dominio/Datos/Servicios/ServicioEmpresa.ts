import { Paginador } from "App/Dominio/Paginador";
import { RepositorioEmpresa } from "App/Dominio/Repositorios/RepositorioEmpresa";
import { Empresa } from "../Entidades/Empresa";
import { v4 as uuidv4 } from 'uuid'
import { RepositorioFichero } from "App/Dominio/Ficheros/RepositorioFichero";
import { Fichero } from "App/Dominio/Ficheros/Fichero";
import { RUTAS_ARCHIVOS } from "App/Dominio/Ficheros/RutasFicheros";
import Env from "@ioc:Adonis/Core/Env"

export class ServicioEmpresa{
  constructor (private repositorio: RepositorioEmpresa, private repositorioFichero: RepositorioFichero) { }

  async obtenerEmpresas (params: any): Promise<{ empresas: Empresa[], paginacion: Paginador }> {
    return this.repositorio.obtenerEmpresas(params);
  }

  async obtenerEmpresaPorId (id: string): Promise<Empresa>{
    return this.repositorio.obtenerEmpresaPorId(id);
  }

  async guardarEmpresa (
    {nombre, nit, convenio, logo}:
    {nombre: string, nit: string, convenio?:number, logo?:Fichero}
  ): Promise<Empresa>{
    const empresa = new Empresa()
    empresa.id = uuidv4();
    empresa.nombre = nombre
    empresa.nit = nit
    if(convenio) empresa.convenio = convenio;
    if(logo){
      this.repositorioFichero.guardarFichero(logo, RUTAS_ARCHIVOS.LOGOS_EMPRESAS, empresa.id, logo.extension)
      empresa.logo = `${Env.get('HOSTING')}${Env.get('ENDPOINT_FICHEROS')}${RUTAS_ARCHIVOS.LOGOS_EMPRESAS}/${empresa.id}`
      //Se agrega extensión al nombre del archivo si la tuviera.
      if(logo.extension) empresa.logo+=`.${logo.extension}`;
    };
    return this.repositorio.guardarEmpresa(empresa);
  }

  async actualizarEmpresa (id: string, empresa: Empresa): Promise<Empresa> {
    return this.repositorio.actualizarEmpresa(id, empresa);
  }

  async cambiarEstado (id:string):Promise<Empresa>{
    let empresa = await this.repositorio.obtenerEmpresaPorId(id)
    empresa.estado = !empresa.estado
    return await this.repositorio.actualizarEmpresa(id, empresa);
  }

  async  buscar (parametros: string): Promise<{}> {
    return this.repositorio.buscar(parametros)
  }


}
