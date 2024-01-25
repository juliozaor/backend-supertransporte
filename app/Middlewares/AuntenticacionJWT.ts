import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioAutenticacionJWT } from 'App/Dominio/Datos/Servicios/ServicioJWT'
import JwtInvalidoException from 'App/Exceptions/JwtInvalidoException'

export default class AutenticacionJWT {
  public async handle (contexto: HttpContextContract, next: () => Promise<void>) {
    const cabeceraAutenticacion = contexto.request.header('Authorization')
    try {
      
      if(!cabeceraAutenticacion){
        throw new JwtInvalidoException('Falta el token de autenticación')
      }
      ServicioAutenticacionJWT.verificarToken(cabeceraAutenticacion)
      await next()
    } catch (error) {
      throw new JwtInvalidoException('Error en el token de autenticación')
    }
  }
}
