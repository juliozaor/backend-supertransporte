import { DateTime } from "luxon"

export interface Reportadas {
  idEncuestaDiligenciada: number,
    idVigilado: string,
    clasificacion:string,
    numeroReporte: number,
    encuesta: string ,
    descripcion : string,
    fechaInicio : DateTime,
    fechaFinal : DateTime,
    fechaEnvioST : DateTime,
    razonSocial : string,
    nit : string ,
    email :string,
    usuarioCreacion?: string,
    estado : string,
    asignado?: boolean,
    ultimoUsuarioAsignado?: string,
    vigencia?:number
}