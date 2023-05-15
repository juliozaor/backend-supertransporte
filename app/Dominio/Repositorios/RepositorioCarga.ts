export interface RepositorioCarga {
  procesarArchivo(archivo: any, datos:string): Promise<void>
  archivosCargados(parametros:string): Promise<{}>
  obtenerLogs(parametros:string): Promise<{}>
  buscarCargados(parametros:string): Promise<{}>
}
