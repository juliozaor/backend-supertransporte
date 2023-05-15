import { Encriptador } from 'App/Dominio/Encriptacion/Encriptador'
import Hash from '@ioc:Adonis/Core/Hash'

export class EncriptadorAdonis implements Encriptador {
  public async encriptar (cadena: string): Promise<string> {
    return await Hash.make(cadena)
  }

  public async comparar (cadena: string, hash: string): Promise<boolean> {
    return await Hash.verify(hash, cadena)
  }
}
