import { DateTime } from "luxon"

export interface Reportadas {
  idEncuestaDiligenciada: number,
    idVigilado: string,
    numeroReporte: number,
    encuesta: string ,
    descripcion : string,
    fechaInicio : DateTime,
    fechaFinal : DateTime,
    fechaEnvioST : DateTime,
    razonSocial : string,
    nit : string ,
    email :string,
    estado : string
}