import { Empresa } from 'App/Dominio/Datos/Entidades/Empresa'
import { EmpresaDto } from '../Dato/EmpresaDato'

export class MapeadorEmpresa{
  public static convertirAEmpresa (empresaDto: EmpresaDto): Empresa{
    let empresa = new Empresa()

    empresa.id = empresaDto.id
    empresa.nombre = empresaDto.nombre
    empresa.nit = empresaDto.nit
    empresa.estado = empresaDto.estado
    return empresa
  }
}
