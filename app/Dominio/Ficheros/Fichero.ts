export interface Fichero {
    contenido: Buffer
    extension?: string
    nombre: string
    tamano: number // tamaño del archivo
}