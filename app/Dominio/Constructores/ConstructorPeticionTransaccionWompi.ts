import { PeticionTransaccionWompi } from "../Dto/Wompi/PeticionTransaccionWompi";

export class ConstructorPeticionTransaccionWompi {
    private peticion: PeticionTransaccionWompi

    public constructor(){
        this.peticion = {}
        this.peticion.currency = "COP"
    }

    public informacionCliente({
        nombre,
        documento,
        tipoDocumento,
        telefono
    }:{
        nombre?:string,
        documento?:string,
        tipoDocumento?:string,
        telefono?:string
    }): ConstructorPeticionTransaccionWompi{
        this.peticion.customer_data = {}
        this.peticion.customer_data.full_name = nombre ?? null
        this.peticion.customer_data.legal_id  = documento ?? null
        this.peticion.customer_data.legal_id_type  = tipoDocumento ?? null
        this.peticion.customer_data.phone_number = telefono ?? null
        return this
    }

    public email(correo:string):ConstructorPeticionTransaccionWompi{
        this.peticion.customer_email = correo
        return this
    }

    public token(token:string):ConstructorPeticionTransaccionWompi{
        this.peticion.acceptance_token = token
        return this
    }

    public valor(valor:number):ConstructorPeticionTransaccionWompi{
        this.peticion.amount_in_cents = valor * 100
        return this
    }

    public referencia(referencia:string):ConstructorPeticionTransaccionWompi{
        this.peticion.reference = referencia
        return this
    }

    public direccion({
        linea1,
        linea2,
        pais,
        departamento,
        ciudad,
        nombre,
        telefono,
        codigoPostal
    }:{
        linea1?: string,
        linea2?: string,
        pais?: string,
        departamento?: string,
        ciudad?: string,
        nombre?: string,
        telefono?: string,
        codigoPostal?: string
    }):ConstructorPeticionTransaccionWompi{
        this.peticion.shipping_address = {}
        this.peticion.shipping_address.address_line_1 = linea1 ?? null
        this.peticion.shipping_address.address_line_2 = linea2 ?? null
        this.peticion.shipping_address.country = pais ?? null
        this.peticion.shipping_address.region = departamento ?? null
        this.peticion.shipping_address.city = ciudad ?? null
        this.peticion.shipping_address.postal_code = codigoPostal ?? null
        this.peticion.shipping_address.name = nombre ?? null
        this.peticion.shipping_address.phone_number = telefono ?? null
        return this
    }

    public metodoPago({
        tipo,
        tipoUsuario, 
        descripcionPago, 
        estadoSandbox
    }:{
        tipo: string,
        tipoUsuario: string, 
        descripcionPago: string, 
        estadoSandbox?: string
    }):ConstructorPeticionTransaccionWompi{
        this.peticion.payment_method = {}
        this.peticion.payment_method.payment_description = descripcionPago
        this.peticion.payment_method.type = tipo
        this.peticion.payment_method.user_type = tipoUsuario
        this.peticion.payment_method.sandbox_status = estadoSandbox ?? null
        return this
    }

    public construir():PeticionTransaccionWompi{
        if(!this.peticion.customer_email) throw Error('El email es requerido para construir el objeto de tipo PeticionTransaccionWompi');
        if(!this.peticion.payment_method) throw Error('El metodo de pago es requerido para construir el objeto de tipo PeticionTransaccionWompi');
        if(!this.peticion.reference) throw Error('La referencia es requerida para construir el objeto de tipo PeticionTransaccionWompi');
        if(!this.peticion.acceptance_token) throw Error('El token de aceptación es requerido para construir el objeto de tipo PeticionTransaccionWompi');
        return this.peticion
    }
}