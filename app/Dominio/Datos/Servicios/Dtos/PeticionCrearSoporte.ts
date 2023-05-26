import { Fichero } from "App/Dominio/Ficheros/Fichero"

export interface PeticionCrearSoporte{
    documentoUsuario: string
    descripcion: string
    adjunto?: Fichero
}