import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblIndicadores } from 'App/Infraestructura/Datos/Entidad/Indicadores'
export default class extends BaseSeeder {
  public async run() {
    await TblIndicadores.createMany([
      {
        id: 1,
        nombre: 'Tasa de siniestros viales por nivel de pérdida',
        descripcion:'Registro de siniestros viales ocurridos por trimestre y por nivel de perdida, medidos en forma acumulativa',
        codigo: '1'
      },{
        id: 2,
        nombre: 'Costos siniestros viales por nivel de pérdida',
        descripcion:'Registro de datos de costos directos e indirectos trimestrales por siniestros viales y por nivel de pérdida, medidos en forma acumulativa',
        codigo: '2'
      },{
        id: 3,
        nombre: 'Riesgos de seguridad vial',
        descripcion:'Variación anual en la cantidad de riesgos evaluados en el paso 6, Variación anual en la cantidad de riesgos que fueron identificados con valoración alta',
        codigo: '3'
      },{
        id: 4,
        nombre: 'Cumplimiento de metas del PESV',
        descripcion:'Registro de metas establecidas trimestralmente y reporte del porcentaje de cumplimiento, medido en forma acumulativa',
        codigo: '4'
      },{
        id: 5,
        nombre: 'Cumplimiento de actividades plan anual',
        descripcion:'Registro trimestral de avances en el plan de trabajo y reporte del porcentaje de cumplimiento de  actividades, medido en forma acumulativa',
        codigo: '5'
      },{
        id: 6,
        nombre: 'Exceso de jornadas laborales',
        descripcion:'Porcentaje de veces mensuales en las cuales se excedieron las jornadas laborales conforme los controles de hora de inicio y fin de cada turno de trabajo por conductor (calcular el indicador desde la plataforma) medido en forma acumulativa',
        codigo: '6'
      },{
        id: 7,
        nombre: 'Cobertura programa de gestión velocidad',
        descripcion:'Porcentaje de vehículos incluidos en el programa  que son utilizados mensualmente para los desplazamientos laborales con el fin de calcular el indicador, medido en forma acumulativa',
        codigo: '7'
      },{
        id: 8,
        nombre: 'Exceso Límite de velocidad laboral',
        descripcion:'Registro de control de reportes diario de desplazamientos laborales y porcentaje mensual de los mismos donde se presentó  exceso de velocidad, medido en forma acumulativa',
        codigo: '8'
      },{
        id: 9,
        nombre: 'Inspecciones diarias preoperacionales',
        descripcion:'Registro de reportes preoperacionales y porcentaje de inspecciones realizadas mensualmente a la totalidad de vehículos puestos en operación, medido en forma acumulativa',
        codigo: '9'
      },{
        id: 10,
        nombre: 'Cumplimiento plan de mantenimiento preventivo de vehículos',
        descripcion:'Registro de mantenimientos preventivos planificados programados trimestralmente y porcentaje de mantenimientos ejecutados, medido en forma acumulativa',
        codigo: '10'
      },{
        id: 11,
        nombre: 'Cumplimiento plan de formación en seguridad vial CPF PESV',
        descripcion:'Registro de avance trimestral del plan de formación en seguridad vial CPF PESV, respecto a la programación de las capacitaciones reportado en la plataforma y el porcentaje de ejecución de estas, medido en forma acumulativa',
        codigo: '11'
      },{
        id: 12,
        nombre: 'Cobertura plan de formación en seguridad vial CPF PESV',
        descripcion:'Registro de colaboradores que asisten trimestralmente a cada capacitación en seguridad vial y porcentaje respecto al total de colaboradores, medido en forma acumulativa',
        codigo: '12'
      },{
        id: 13,
        nombre: 'Nro. conformidades auditorias cerradas NCAC',
        descripcion:'Registro de auditorías y desviaciones identificadas, reportadas anualmente, así como el porcentaje gestionado y cerrado',
        codigo: '13'
      }
    ])
  }
}
