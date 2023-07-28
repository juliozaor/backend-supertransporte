import { Fichero } from "../Ficheros/Fichero"

export interface ConfiguracionEmail{
    de?: string, // de quien viene el email
    alias?: string,
    destinatarios: string | string[]
    copias?: string | string[]
    asunto: string
    adjunto?: Fichero
}