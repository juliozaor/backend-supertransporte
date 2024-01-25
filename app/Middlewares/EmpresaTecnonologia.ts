import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ErroresEmpresa from 'App/Exceptions/ErroresEmpresa';
import { TblEmpresaVigilados } from 'App/Infraestructura/Datos/Entidad/EmpresaVigilados';

export default class EmpresaTecnonologia {
  public async handle({request}: HttpContextContract, next: () => Promise<void>) {
    const {documento, idRol} = await request.obtenerPayloadJWT()
    const {idVigilado, token} = request.all();

    

    if (idRol !== '007') {
      throw new ErroresEmpresa('No tiene autorización, consulte con el vigilado.',401)
    }
    
    const empresaVigilado = await TblEmpresaVigilados.query().where({'tev_empresa': documento, 'tev_vigilado': idVigilado}).first()

     
    if(!empresaVigilado || !empresaVigilado.estado || empresaVigilado.token !== token){
      throw new ErroresEmpresa('No tiene autorización, consulte con el vigilado',401)
      
    }


    
    await next()
  }
}
