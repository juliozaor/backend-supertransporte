export interface RepositorioRespuesta {
  guardar(datos: string, idReporte: number, documento:string): Promise<any>
}
