export interface RespuestaDeudaNovafianza {
    RespuestaMetodo: RespuestaDeudaNovafianzaRespuestaMetodo 
}

export interface RespuestaDeudaNovafianzaRespuestaMetodo{
    IdRetorno: number 
    MensajeRetorno: string
    TrazaError: string
}