import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import { CrearProveedorTecnologico } from "./Dto/CrearProveedorTecnologico";

export class ProveedorTecnologicoLucid extends BaseModel{
    public static table = 'tbl_proveedores_tecnologicos';

    @column({ isPrimary: true })
    id: number
    @column({ columnName: 'razon_social_ot' })
    razonSocial: string
    @column({ columnName: 'nit_ot' })
    nit: string
    @column({ columnName: 'dv_ot' })
    dv: number
    @column({ columnName: 'siglas_ot' })
    sigla: string
    @column({ columnName: 'estado_matricula_ot' })
    estadoMatricula: string 
    @column({ columnName: 'correo_notificacion_ot' })
    correoNotificacion: string
    @column({ columnName: 'direccion_ot' })
    direccion: string

    @column({ columnName: 'nombres_rl' })
    nombresRepLegal: string 
    @column({ columnName: 'apellidos_rl' })
    apellidosRepLegal: string
    @column({ columnName: 'tipo_identificacion_rl' })
    tipoDocumentoRepLegal: string
    @column({ columnName: 'identificacion_rl' })
    identificacionRepLegal: string
    @column({ columnName: 'correo_electronico_rl' })
    correoRepLegal: string
    @column({ columnName: 'direccion_rl' })
    direccionRepLegal: string
    @column({ columnName: 'numero_contacto_rl'})
    numeroContactoRepLegal

    @column({ columnName: 'nombres_ct' })
    nombresContTecnico: string
    @column({ columnName: 'apellidos_ct' })
    apellidosContTecnico: string
    @column({ columnName: 'tipo_identificacion_ct' })
    tipoDocumentoContTecnico: string
    @column({ columnName: 'identificacion_ct' })
    identificacionContTecnico: string
    @column({ columnName: 'correo_electronico_ct' })
    correoContTecnico: string
    @column({ columnName: 'direccion_ct' })
    direccionContTecnico: string
    @column({ columnName: 'numero_celular_ct'})
    numeroContactoContTecnico

    @column({ columnName: 'ruta_cc'})
    docCertificacionRuta: string
    @column({ columnName: 'nombre_cc' })
    docCertificacionNombre: string
    @column({ columnName: 'nombre_original_cc' })
    docCertificacionNombreOriginal: string
    
    @column({ columnName: 'ruta_cr' })
    docCamaraRuta: string
    @column({ columnName: 'nombre_cr' })
    docCamaraNombre: string
    @column({ columnName: 'nombre_original_cr' })
    docCamaraNombreOriginal: string

    @column.dateTime({ columnName: 'creado', autoCreate: true })
    creado: DateTime
    @column.dateTime({ columnName: 'actualizado', autoCreate: true, autoUpdate: true })
    actualizado: DateTime

    public static instanciar(payload: CrearProveedorTecnologico): ProveedorTecnologicoLucid{
        const proveedor = new ProveedorTecnologicoLucid()
        proveedor.razonSocial = payload.razonSocial
        proveedor.nit = payload.nit
        proveedor.dv = payload.dv
        proveedor.sigla = payload.sigla
        proveedor.estadoMatricula = payload.estadoMatricula
        proveedor.correoNotificacion = payload.correoNotificacion
        proveedor.direccion = payload.direccion

        proveedor.nombresRepLegal = payload.nombresRepLegal
        proveedor.apellidosRepLegal = payload.apellidosRepLegal
        proveedor.tipoDocumentoRepLegal = payload.tipoDocumentoRepLegal
        proveedor.identificacionRepLegal = payload.identificacionRepLegal
        proveedor.correoRepLegal = payload.correoRepLegal
        proveedor.direccionRepLegal = payload.direccionRepLegal
        proveedor.numeroContactoRepLegal = payload.numeroContactoRepLegal

        proveedor.nombresContTecnico = payload.nombresContTecnico
        proveedor.apellidosContTecnico = payload.apellidosContTecnico
        proveedor.tipoDocumentoContTecnico = payload.tipoDocumentoContTecnico
        proveedor.identificacionContTecnico = payload.identificacionContTecnico
        proveedor.correoContTecnico = payload.correoContTecnico
        proveedor.direccionContTecnico = payload.direccionContTecnico
        proveedor.numeroContactoContTecnico = payload.numeroContactoContTecnico

        proveedor.docCertificacionRuta = payload.docCertificacionRuta
        proveedor.docCertificacionNombre = payload.docCertificacionNombre
        proveedor.docCertificacionNombreOriginal = payload.docCertificacionNombreOriginal
        proveedor.docCamaraRuta = payload.docCamaraRuta
        proveedor.docCamaraNombre = payload.docCamaraNombre
        proveedor.docCamaraNombreOriginal = payload.docCamaraNombreOriginal

        return proveedor
    }
}