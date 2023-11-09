export class Mes {
  public id?: number;
  public nombre: string; 
  public estado: boolean;
  
  constructor({
    id,
    nombre,
    estado = true
  }:{
    id?: number,
    nombre: string
    estado: boolean
  }){
    this.id = id
    this.nombre = nombre
    this.estado = estado
  }

  actualizar({
    nombre,
    estado = true
  }:{
    nombre?: string
    estado?: boolean
  }){
    this.nombre = nombre ?? this.nombre
    this.estado = estado ?? this.estado
  }
}


