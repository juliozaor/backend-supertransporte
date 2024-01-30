import { EmpresaVigilado } from "App/Dominio/Datos/Entidades/EmpresaVigilado";
import { RepositorioEmpresaVigilado } from "App/Dominio/Repositorios/RepositorioEmpresaVigilado";
import { TblEmpresaVigilados } from "App/Infraestructura/Datos/Entidad/EmpresaVigilados";
import TblUsuarios from "App/Infraestructura/Datos/Entidad/Usuario";
import { v4 as uuid } from "uuid";

export class RepositorioEmpresaVigiladoDB
  implements RepositorioEmpresaVigilado
{
  async obtenerEmpresas(): Promise<any[]> {
    try {
      const usuariosEmpresa = await TblUsuarios.query().where({
        usn_rol_id: "007",
        usn_estado: true,
      });
      return usuariosEmpresa.map((usuario) => {
        return {
          idEmpresa: usuario.usuario,
          nombre: usuario.nombre,
        };
      });
    } catch (error) {
      throw new Error(`Se presento un error durante la consulta`);
    }
  }

  async obtenerSeleccionadas(documento: string): Promise<any[]> {
    try {
        const empresas:any[]= [];
      const empresasSeleccionadas = await TblEmpresaVigilados.query().preload('empresaTecno')
        .where("tev_vigilado", documento)
        .orderBy("tev_id", "desc");
      empresasSeleccionadas.map((empresa) => {
        empresas.push({
        idEmpresa: empresa.idEmpresa,
        nombre: empresa.empresaTecno.nombre,
        token: empresa.token,
        estado: empresa.estado,
        fechaInicialMostrar: new Date(empresa.fechaInicial).toLocaleDateString(),
        fechaFinalMostrar: new Date(empresa.fechaFinal).toLocaleDateString(),
        fechaInicial: empresa.fechaInicial,
        fechaFinal: empresa.fechaFinal
        })
        
    });
    return empresas;
    } catch (error) {
      throw new Error(`Se presento un error durante la consulta  ${error}`);
    }
  }

  async asignar(documento: string, params: any): Promise<any[]> {
    const { idEmpresa, fechaInicial, fechaFinal } = params;
    try {
      //Verificar si exite la relacion
      const existe = await TblEmpresaVigilados.query().where({
        tev_empresa: idEmpresa,
        tev_vigilado: documento,
      });
      if (existe.length >= 1) {
        return [{ mensaje: "ya existe un registro con esta empresa" , estado:false}];
      }
      
      //Actualizar el estado a false de los demas registros
      await TblEmpresaVigilados.query()
        .where("tev_vigilado", documento)
        .update({ tev_updated_at: new Date(), tev_estado: false });

      // Crear el nuevo registro
      const empresaVigilado = new TblEmpresaVigilados();
      empresaVigilado.estableceEmpresaVigiladoConId({
        idEmpresa: idEmpresa,
        idVigilado: documento,
        token: uuid(),
        estado: true,
        fechaInicial,
        fechaFinal,
      });

      await empresaVigilado.save();

      return this.obtenerSeleccionadas(documento);
    } catch (error) {
      throw new Error(`Se presento un error durante la consulta`);
    }
  }

  async editar(documento: string, params: any): Promise<any[]> {
    const { idEmpresa, fechaInicial, fechaFinal } = params;

    
    
    try {
      //Verificar si exite la relacion
      const empresaVigilado = await TblEmpresaVigilados.query().where({
        tev_empresa: idEmpresa,
        tev_vigilado: documento,
      }).first();

      if (!empresaVigilado) {
        return [{ mensaje: "No existe un registro con esta empresa" }];
      }

      
    //Actualizar el estado a false de los demas registros
      await TblEmpresaVigilados.query()
        .where("tev_vigilado", documento)
        .where("tev_empresa","<>",idEmpresa)
        .update({ tev_updated_at: new Date(), tev_estado: false });

        // actualizar el registro
      empresaVigilado.establecerEmpresaVigilado({
        id: empresaVigilado.id,
        idEmpresa: idEmpresa,
        idVigilado: documento,
        token: uuid(),
        estado: true,
        fechaInicial,
        fechaFinal,
      });
      
      await empresaVigilado.save();

      return this.obtenerSeleccionadas(documento);
    } catch (error) {
      throw new Error(`Se presento un error durante la consulta`);
    }
  }

  async activar(documento: string, params: any): Promise<any[]> {
    const { idEmpresa } = params;
    try {
      //Verificar si exite la relacion
      const empresaVigilado = await TblEmpresaVigilados.query().where({
        tev_empresa: idEmpresa,
        tev_vigilado: documento,
      }).first();

      if (!empresaVigilado) {
        return [{ mensaje: "No existe un registro con esta empresa" }];
      }

      
    //Actualizar el estado a false de los demas registros
      await TblEmpresaVigilados.query()
        .where("tev_vigilado", documento)
        .where("tev_empresa","<>",idEmpresa)
        .update({ tev_updated_at: new Date(), tev_estado: false });

        // Cambiar estado del registro
      empresaVigilado.establecerEstado();

      await empresaVigilado.save();

      return this.obtenerSeleccionadas(documento);
    } catch (error) {
      throw new Error(`Se presento un error durante la consulta`);
    }
  }
}
