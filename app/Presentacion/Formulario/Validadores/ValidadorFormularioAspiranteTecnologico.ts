import { schema, rules } from "@ioc:Adonis/Core/Validator" 

export const schemaFormularioAspiranteTecnologico = schema.create({
    razonSocial: schema.string(),
    nit: schema.string(),
    dv: schema.number(),
    sigla: schema.string(),
    estadoMatricula: schema.string(), 
    correoNotificacion: schema.string(),
    direccion: schema.string(),
    
    nombresRepLegal: schema.string(),
    apellidosRepLegal: schema.string(),
    tipoDocumentoRepLegal: schema.string(),
    identificacionRepLegal: schema.string(),
    correoRepLegal: schema.string(),
    direccionRepLegal: schema.string(),
    numeroContactoRepLegal: schema.string(),
    
    nombresContTecnico: schema.string(),
    apellidosContTecnico: schema.string(),
    tipoDocumentoContTecnico: schema.string(),
    identificacionContTecnico: schema.string(),
    correoContTecnico: schema.string(),
    direccionContTecnico: schema.string(),
    numeroContactoContTecnico: schema.string(),

    docCertificacionRuta: schema.string(),
    docCertificacionNombre: schema.string(),
    docCertificacionNombreOriginal: schema.string(),
    
    docCamaraRuta: schema.string(),
    docCamaraNombre: schema.string(),
    docCamaraNombreOriginal: schema.string(),
})