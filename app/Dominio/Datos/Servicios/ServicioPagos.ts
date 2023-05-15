import Env from "@ioc:Adonis/Core/Env"
import { RespuestaGenerarTransaccion } from "App/Dominio/Dto/Wompi/RespuestaGenerarTransaccion";
import { v4 as uuidv4 } from 'uuid';
import { PeticionTransaccion } from "App/Dominio/Dto/Wompi/PeticionTransaccion";
import { RepositorioPagosNovafianza } from "App/Dominio/Repositorios/RepositorioPagosNovafianza";
import { Exception } from "@adonisjs/core/build/standalone";

export class ServicioPagos {
    private readonly KEY_PUBLICA = Env.get("KEY_PUBLICA_WOMPI")
    private readonly URL_REDIRECCION = Env.get("URL_REDIRECCION_PAGO")

    public constructor(private repositorioNovafianza:RepositorioPagosNovafianza){}

    public async tieneDeuda(tipoDocumento:string, documento:string):Promise<boolean>{
        const deuda = await this.consultarDeuda(tipoDocumento, documento)
        return deuda > 0 ? true : false
    }

    public async consultarDeuda(tipoDocumento:string, documento:string):Promise<number>{
        return this.repositorioNovafianza.consultarDeuda(tipoDocumento, documento)
    }

    public async generarTransaccion(peticion:PeticionTransaccion):Promise<RespuestaGenerarTransaccion>{
        const totalDeuda = await this.consultarDeuda(peticion.tipoDocumento, peticion.documento)
        if(peticion.valor > totalDeuda){
            throw new Exception(`El valor a pagar supera el monto total de la deuda.`, 400)
        }
        return {
            referencia: `${peticion.documento}_${uuidv4()}`, //uuidv4(),
            moneda: "COP",
            llavePublicaWompi: this.KEY_PUBLICA,
            urlRedireccion: this.URL_REDIRECCION,
            valorEnCentavos: peticion.valor * 100,
            datosUsuarios: {
                documento: peticion.documento,
                tipoDocumento: peticion.tipoDocumento,
                email: peticion.email,
                telefono: peticion.telefono,
                valor: peticion.valor
            }
        }
    }
}