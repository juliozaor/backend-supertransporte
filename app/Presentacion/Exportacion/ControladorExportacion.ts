import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ServicioExportacion } from 'App/Dominio/Datos/Servicios/ServicioExportacion';
import { ReporteTrazabilidad } from 'App/Infraestructura/Util/ReporteTrazabilidad';

const data = [
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Smith', email: 'jane@example.com' },
  // Otros elementos del arreglo
];

export default class ControladorExportacion {
  private servicioExportacion = new ServicioExportacion();
  private reporteTrazabilidad = new ReporteTrazabilidad();
  public async exportToXLSX({ response }: HttpContextContract) {
    const cabeceras = [
      { header: 'ID', key: "id", width: 40 },
      { header: 'NIT', key: "nit", width: 40 },
      { header: 'RAZON SOCIAL', key: "razonSocial", width: 40 },
      { header: 'ACCESO', key: "acceso", width: 40 },
      { header: ' CANTIDAD CONDUCTORES', key: "cantConductores", width: 40 },
      { header: 'CANTIDAD  VEHÍCULOS', key: "cantVehiculos", width: 40 },
      { header: 'CLASIFICACIÓN SEGÚN RESOLUCIÓN 20223040040595 DE 2022', key: "clasificacion", width: 40 },
      { header: 'INICIO DILIGENCIAMIENTO ', key: "inicioDiligenciamiento", width: 40 },
      { header: 'ENVIÓ LA INFORMACIÓN A LA ST ', key: "envioSt", width: 40 },
      { header: 'ESTADO', key: "estadoActual", width: 40 },
      { header: 'LIDER(administrador que asigno)', key: "asignador", width: 40 },
      { header: 'FECHA HORA ', key: "fechaAsignacion", width: 40 },
      { header: 'VALIDADOR', key: "validador", width: 40 },
      { header: 'PENDIENTE ', key: "pendiente", width: 40 },
      { header: 'EN PROCESO ', key: "proceso", width: 40 },
      { header: 'VALIDADO ', key: "validado", width: 40 },]


 const data = await this.reporteTrazabilidad.Trazabilidad();

 return data
    
   /*  const buffer = await this.servicioExportacion.encuestaToXLSX(data, cabeceras)

    // Configurar opciones de respuesta
    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.header('Content-Disposition', 'attachment; filename=datos.xlsx');

    // Enviar el archivo XLSX como respuesta
    response.send(buffer); */
  }

  

  public async encuestaToXLSX({ request, response }: HttpContextContract) {
const {idReporte} = request.all()
const data = await this.reporteTrazabilidad.Encuesta(idReporte)
const cabeceras = [
  { header: 'No', key: 'no', width: 10 },
  { header: 'Pregunta', key: 'pregunta', width: 100 },
  { header: '¿Existe?', key: 'existe', width: 10 },
  { header: 'Tipo de evidencia', key: 'tipoEvidencia', width: 40 },
  { header: 'Documento', key: 'documento', width: 30 },
]
const buffer = await this.servicioExportacion.encuestaToXLSX(data, cabeceras)

    // Configurar opciones de respuesta
    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.header('Content-Disposition', 'attachment; filename=datos.xlsx');

    // Enviar el archivo XLSX como respuesta
    response.send(buffer);
    //response.send(await this.reporteTrazabilidad.Encuesta(idReporte))
       
     }
}
