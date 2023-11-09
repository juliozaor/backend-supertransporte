export class Mes {
  public id?: number;
  public nombre: string; 
  public estado: boolean;
  public visual: number;
  public vigencia: number
  
  constructor({
    id,
    nombre,
    visual,
    vigencia,
    estado = true
  }:{
    id?: number,
    nombre: string,
    visual: number,
    vigencia: number,
    estado: boolean
  }){
    this.id = id
    this.nombre = nombre
    this.estado = estado
    this.visual = visual
    this.vigencia = vigencia
  }

  actualizar({
    nombre,
    visual,
    vigencia,
    estado = true
  }:{
    nombre?: string,
    visual?: number,
    vigencia?: number,
    estado?: boolean
  }){
    this.nombre = nombre ?? this.nombre
    this.visual = visual ?? this.visual
    this.vigencia = vigencia ?? this.vigencia
    this.estado = estado ?? this.estado
  }
}


