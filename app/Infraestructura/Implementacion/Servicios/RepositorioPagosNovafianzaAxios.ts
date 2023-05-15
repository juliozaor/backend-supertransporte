import { RepositorioPagosNovafianza } from "App/Dominio/Repositorios/RepositorioPagosNovafianza";
import Env from "@ioc:Adonis/Core/Env"
import { RespuestaDeudaNovafianza } from "App/Dominio/Dto/RespuestaDeudaNovafianza";
import { ClienteHttp } from "App/Dominio/ClienteHttp";

export class RepositorioPagosNovafianzaHttp implements RepositorioPagosNovafianza{

    constructor(private clienteHttp:ClienteHttp){}

    private readonly HOST = Env.get('URL_PAGOS_NOVAFIANZA')

    public async consultarDeuda(tipoDocumento: string, documento: string): Promise<number> {
        const endpoint = `CarteraClienteConsultar/GetCliente?pTipoIdCliente=${tipoDocumento}&pIdCliente=${documento}`
        const respuesta = await this.clienteHttp.get<RespuestaDeudaNovafianza>(`${this.HOST}${endpoint}`)
        const IdRetorno = respuesta.RespuestaMetodo.IdRetorno  //Este valor es la deuda en caso de existir o 1.0 en caso de no existir el cliente o 0.0 en caso de no tener deudas
        if(IdRetorno === 1.0) return 0;
        return respuesta.RespuestaMetodo.IdRetorno
    }
    
}