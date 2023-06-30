/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioReportes } from 'App/Dominio/Datos/Servicios/ServicioReportes'
import { ServicioUsuario } from 'App/Dominio/Datos/Servicios/ServicioUsuario'
import { RepositorioReporteDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioReporteDB'
import { RepositorioUsuariosDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioUsuariosDB'

export default class ControladorArchivo {
  private service: ServicioReportes
  constructor() {
    this.service = new ServicioReportes(
      new RepositorioReporteDB(),
      new ServicioUsuario(new RepositorioUsuariosDB())
    )
  }

  public async asignacion({ request }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    return await this.service.asignar(JSON.stringify(request.all()), payload)
     
  }

  public async eliminarAsignacion({ request, params }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    return await this.service.eliminar(params.idReporte, payload)
  }

  public async verificadores() {
    return this.service.obtenerVerificadores();
  }

  public async estadosVerificado() {
    return this.service.obtenerEstadosVerificado();
  }

  public async asignados({ request, params, response }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const parametros = request.all()
    if (payload.idRol !== '006' && payload.idRol !== '002' && payload.idRol !== '001') {      
      return response.status(401).send('No tiene perminos para acceder a esta consulta')
    }
    if(payload.idRol === '002'){
      parametros.idVerificador = payload.documento
    }
    parametros.rol = payload.idRol

    console.log(parametros);
    
    const encuestas = await this.service.obtenerAsignadas(parametros)
    return encuestas
  }


  public async enviadas({ request, response }:HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    if (payload.idRol !== '001') {
      
      return response.status(401).send('No tiene perminos para acceder a esta consulta')
    }
    return this.service.obtenerEnviadas(request.all());
  }

  public async visualizar ({ request }:HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const encuestas = await this.service.visualizar(request.all(), payload)
    return encuestas
  }

}
