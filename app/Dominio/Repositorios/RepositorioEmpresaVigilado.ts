export interface RepositorioEmpresaVigilado{
    obtenerEmpresas(): Promise<any[]>
    obtenerSeleccionadas(documento: string): Promise<any[]>
    asignar(documento: string, params: any): Promise<any[]>
    editar(documento: string, params: any): Promise<any[]>
    activar(documento: string, params: any): Promise<any[]>
}
