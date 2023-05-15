import { DateTime } from "luxon"

export class Funcionalidad {
    public constructor(
        private _id: string,
        private _nombre: string,
        private _estado: boolean = true,
        private _creacion: DateTime = DateTime.now(),
        private _actualizacion: DateTime = DateTime.now()
    ){}

    public get id(){
        return this._id
    }

    public get nombre(){
        return this._nombre
    }

    public get estado(){
        return this._estado
    }

    public get creacion(){
        return this._creacion
    }

    public get actualizacion(){
        return this._actualizacion
    }
}