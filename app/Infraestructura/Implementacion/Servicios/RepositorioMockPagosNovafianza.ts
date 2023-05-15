import { RepositorioPagosNovafianza } from "App/Dominio/Repositorios/RepositorioPagosNovafianza";

export class RepositorioMockPagosNovafianzaAxios implements RepositorioPagosNovafianza{
    public constructor(private readonly deuda:boolean){}
    
    public async consultarDeuda(tipoDocumento: string, documento: string): Promise<number> {
        if(!this.deuda){
            return 0;
        }
        return 100000;
    }
    
}