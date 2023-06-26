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

 response.send(await this.reporteTrazabilidad.Trazabilidad())
    
    /* const buffer = await this.servicioExportacion.exportDataToXLSX(data)

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
