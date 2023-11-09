import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblEvidencias } from 'App/Infraestructura/Datos/Entidad/Evidencias'
export default class extends BaseSeeder {
  public async run() {
    await TblEvidencias.createMany([
      {
        id: 1,
        nombre: 'Copia de las actas de reunión del comité PESV, donde conste la investigación interna de los siniestros viales',
        orden: 1,
        formularioId: 1,
        subTipoId: 3,
        periodoId: 1,
        tamanio:5
      },{
        id: 2,
        nombre: 'Evidencia de la divulgación de las lecciones aprendidas diferentes a capacitaciones y certificación del área de RRHH, donde conste la retroalimentación de los implicados',
        orden: 1,
        formularioId: 1,
        subTipoId: 3,
        periodoId: 1,
        tamanio:5
      },{
        id: 3,
        nombre: 'Certificación suscrita por el Representante Legal de la señalización, puestos de control, gastos de GPS, etc, implementados para reducir la accidentalidad',
        orden: 1,
        formularioId: 1,
        subTipoId: 3,
        periodoId: 1,
        tamanio:5
      },{
        id: 4,
        nombre: 'Detalle de cuentas a nivel de terceros de los costos directos e indirectos ocasionados por los accidentes (Reparaciones, demandas)',
        orden: 1,
        formularioId: 1,
        subTipoId: 4,
        periodoId: 1,
        tamanio:5
      }

      ,{
        id: 5,
        nombre: 'Certificación del Representante Legal donde se describa el mecanismo empleado para la medición de los riesgos ',
        orden: 1,
        formularioId: 2,
        subTipoId: 3,
        periodoId: 3,
        tamanio:5
      },{
        id: 6,
        nombre: 'Evidencia de los controles implementados para minimizar los riesgos identificados al incio del año',
        orden: 1,
        formularioId: 2,
        subTipoId: 3,
        periodoId: 3,
        tamanio:5
      },{
        id: 7,
        nombre: 'Evidencia de los controles implementados para minimizar los riesgos identificados al final del año',
        orden: 1,
        formularioId: 2,
        subTipoId: 3,
        periodoId: 3,
        tamanio:5
      },{
        id: 8,
        nombre: 'Copia del informe presentado trimestralmente por el lider PESV al comité sobre la ejecución de los planes y los avances respectos a las metas',
        orden: 1,
        formularioId: 2,
        subTipoId: 3,
        periodoId: 1,
        tamanio:5
      },{
        id: 9,
        nombre: 'Certificación suscrita por el Contador y Revisor Fiscal (si aplica) de los recursos empleados trimestralmente para el desarrollo del plan anual de trabajo PESV, con el detalle de la destinación de los mismos',
        orden: 1,
        formularioId: 2,
        subTipoId: 3,
        periodoId: 1,
        tamanio:5
      },{
        id: 10,
        nombre: 'Certificación del Representante Legal donde consten los límites de velocidad definidos para desplazamientos laborales en las diferentes sedes que posee la organización, desagregados por departamento, ciudad y recorrido (origen-destino)',
        orden: 1,
        formularioId: 2,
        subTipoId: 3,
        periodoId: 5,
        tamanio:5
      },{
        id: 11,
        nombre: 'Copia del informe mensual presentado por el lider del PESV al comité sobre el total de desplazamientos laborales realizados, las multas impuestas por exceso de velocidad, llamados de atención dentro de las instalaciones y las mediciones realizadas',
        orden: 1,
        formularioId: 2,
        subTipoId: 3,
        periodoId: 5,
        tamanio:5
      }

      ,{
        id: 12,
        nombre: 'Listado unficado de asistentes a capacitaciones, con nombre, cedula, fecha capacitación y tematica dictada.',
        orden: 1,
        formularioId: 2,
        subTipoId: 4,
        periodoId: 1,
        tamanio:5
      },{
        id: 13,
        nombre: 'Evidencias (listados de asistencia, imágenes, videos, etc.) de las actividades de capacitación adelantadas a los conductores',
        orden: 1,
        formularioId: 2,
        subTipoId: 5,
        periodoId: 1,
        tamanio:5
      },{
        id: 14,
        nombre: 'Listado unificado de colaboradores de la organización, con nombre, cedula, telefono, correo electronico y cargo',
        orden: 1,
        formularioId: 2,
        subTipoId: 4,
        periodoId: 1,
        tamanio:5
      },{
        id: 15,
        nombre: 'Informe del lider del PESV sobre las acciones correctivas y oportunidades de mejora implementadas conforme a la auditoría realizada desde el año 2021',
        orden: 1,
        formularioId: 2,
        subTipoId: 3,
        periodoId: 3,
        tamanio:5
      }

      ,{
        id: 16,
        nombre: 'Listado de rutas de desplazamientos laborales (origen, destino), número de kilometros por ruta',
        orden: 1,
        formularioId: 3,
        subTipoId: 4,
        periodoId: 3,
        tamanio:5
      }
      ,{
        id: 17,
        nombre: 'Frecuencia de uso trimestral por cada ruta',
        orden: 1,
        formularioId: 3,
        subTipoId: 1,
        periodoId: 1,
        tamanio:5
      }
      ,{
        id: 18,
        nombre: 'Total horas laboradas personal administrativo',
        orden: 1,
        formularioId: 3,
        subTipoId: 1,
        periodoId: 5,
        tamanio:5
      },{
        id: 19,
        nombre: 'Total personal administrativo',
        orden: 1,
        formularioId: 3,
        subTipoId: 2,
        periodoId: 5,
        tamanio:5
      },{
        id: 20,
        nombre: 'Total horas laboradas personal operativo',
        orden: 1,
        formularioId: 3,
        subTipoId: 1,
        periodoId: 5,
        tamanio:5
      },{
        id: 21,
        nombre: 'Total personal operativo',
        orden: 1,
        formularioId: 3,
        subTipoId: 2,
        periodoId: 5,
        tamanio:5
      },{
        id: 22,
        nombre: 'Control horario aplicado a todo el personal con la siguiente información: Nombre completo, identificación, cargo, fecha, hora entrada, hora salida',
        orden: 1,
        formularioId: 3,
        subTipoId: 4,
        periodoId: 5,
        tamanio:5
      }

      ,{
        id: 23,
        nombre: 'Copia del informe mensual presentado por el lider del PESV al comité sobre el programa de gestión de velocidad y las mediciones realizadas.',
        orden: 1,
        formularioId: 4,
        subTipoId: 3,
        periodoId: 5,
        tamanio:5
      },{
        id: 24,
        nombre: 'Desplazamientos laborales realizados',
        orden: 1,
        formularioId: 4,
        subTipoId: 2,
        periodoId: 5,
        tamanio:5
      },{
        id: 25,
        nombre: 'Multas impuestas por exceso de velocidad',
        orden: 1,
        formularioId: 4,
        subTipoId: 2,
        periodoId: 5,
        tamanio:5
      },{
        id: 26,
        nombre: 'Llamados de atención dentro de las instalaciones',
        orden: 1,
        formularioId: 4,
        subTipoId: 2,
        periodoId: 5,
        tamanio:5
      },{
        id: 27,
        nombre: 'Copia de los formatos empleados para las inspecciones diarias de vehículos, seleccionados en forma aleatoria para el 10% del parque automotor, siempre y cuando no sea inferior a 10 vehículos.',
        orden: 1,
        formularioId: 4,
        subTipoId: 3,
        periodoId: 5,
        tamanio:5
      },{
        id: 28,
        nombre: 'Cantidad de vehículos que reportaron fallas durante el mes',
        orden: 1,
        formularioId: 4,
        subTipoId: 2,
        periodoId: 5,
        tamanio:5
      },{
        id: 29,
        nombre: 'Relación de mantenimientos preventivos ejecutados para el 10% del parque automoto, seleccionado en forma aleatoria, siempre y cuando no sea inferior a 10 vehículos.',
        orden: 1,
        formularioId: 4,
        subTipoId: 4,
        periodoId: 1,
        tamanio:5
      }])
  }
}
