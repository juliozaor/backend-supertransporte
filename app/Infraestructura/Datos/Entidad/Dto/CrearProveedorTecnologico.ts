export interface CrearProveedorTecnologico{
    razonSocial: string
    nit: string
    dv: number
    sigla: string
    estadoMatricula: string 
    correoNotificacion: string
    direccion: string
    
    nombresRepLegal: string
    apellidosRepLegal: string
    tipoDocumentoRepLegal: string
    identificacionRepLegal: string
    correoRepLegal: string
    direccionRepLegal: string
    
    nombresContTecnico: string
    apellidosContTecnico: string
    tipoDocumentoContTecnico: string
    identificacionContTecnico: string
    correoContTecnico: string
    direccionContTecnico: string

    docCertificacionRuta: string
    docCertificacionNombre: string
    docCertificacionNombreOriginal: string
    
    docCamaraRuta: string
    docCamaraNombre: string
    docCamaraNombreOriginal: string
}