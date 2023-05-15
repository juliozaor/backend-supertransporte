import { v4 as uuid } from 'uuid'

export class ArchivoEmpresa{
  id: string;
  idEmpresa: string;
  idArchivo: string;
  tipo?: string;
  estado: boolean;

  public static crear(idEmpresa: string, idArchivo: string, estado: boolean = true){
    const archivoEmpresa = new ArchivoEmpresa()
    archivoEmpresa.id = uuid()
    archivoEmpresa.idEmpresa = idEmpresa
    archivoEmpresa.idArchivo = idArchivo
    archivoEmpresa.estado = estado
    return archivoEmpresa
  }
}
