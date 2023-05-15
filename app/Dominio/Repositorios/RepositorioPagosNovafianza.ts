export interface RepositorioPagosNovafianza {
    consultarDeuda(tipoDocumento:string, documento:string):Promise<number>
}