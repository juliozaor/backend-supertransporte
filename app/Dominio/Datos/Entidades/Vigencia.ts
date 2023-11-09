export class Vigencia{
    id?: number
    anio: number
    estado: boolean

    constructor({
        id,
        anio,
        estado = true
    }:{
        id?: number,
        anio: number,
        estado: boolean
    }){
        this.id = id
        this.anio = anio
        this.estado = estado
    }
}