import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblDatosIndicadores } from 'App/Infraestructura/Datos/Entidad/DatosIndicadores'
export default class extends BaseSeeder {
  public async run() {
    await TblDatosIndicadores.createMany([
      {
        nombre: 'Excesos en la jornada diaria de trabajo de los conductores primer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:22,
        visible:false
        },
        {
        nombre: 'Total de días trabajados por todos los conductores primer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:23,
        visible:false
        },
        {
        nombre: 'Vehículos propios incluidos en el programa primer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:24,
        visible:false
        },
        {
        nombre: 'Vehículos propios utilizados para desplazamientos laborales primer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:25,
        visible:false
        },
        {
        nombre: 'Vehículos de contratistas incluidos en el programa primer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:26,
        visible:false
        },
        {
        nombre: 'Vehículos de contratistas utilizados para desplazamientos laborales primer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:27,
        visible:false
        },
        {
        nombre: 'Vehículos de terceros incluidos en el programa primer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:28,
        visible:false
        },
        {
        nombre: 'Vehículos de terceros utilizados para desplazamientos laborales primer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:29,
        visible:false
        },
        {
        nombre: 'Desplazamientos laborales con exceso de velocidad primer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:30,
        visible:false
        },
        {
        nombre: 'Número total de desplazamientos laborales primer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:31,
        visible:false
        },
        {
        nombre: 'Promedio de vehículos inspeccionados diariamente primer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:32,
        visible:false
        },
        {
        nombre: 'Promedio de vehículos que operan diariamente primer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:33,
        visible:false
        },
        
        {
        nombre: 'Excesos en la jornada diaria de trabajo de los conductores segundo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:22,
        visible:false
        },
        {
        nombre: 'Total de días trabajados por todos los conductores segundo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:23,
        visible:false
        },
        {
        nombre: 'Vehículos propios incluidos en el programa segundo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:24,
        visible:false
        },
        {
        nombre: 'Vehículos propios utilizados para desplazamientos laborales segundo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:25,
        visible:false
        },
        {
        nombre: 'Vehículos de contratistas incluidos en el programa segundo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:26,
        visible:false
        },
        {
        nombre: 'Vehículos de contratistas utilizados para desplazamientos laborales segundo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:27,
        visible:false
        },
        {
        nombre: 'Vehículos de terceros incluidos en el programa segundo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:28,
        visible:false
        },
        {
        nombre: 'Vehículos de terceros utilizados para desplazamientos laborales segundo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:29,
        visible:false
        },
        {
        nombre: 'Desplazamientos laborales con exceso de velocidad segundo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:30,
        visible:false
        },
        {
        nombre: 'Número total de desplazamientos laborales segundo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:31,
        visible:false
        },
        {
        nombre: 'Promedio de vehículos inspeccionados diariamente segundo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:32,
        visible:false
        },
        {
        nombre: 'Promedio de vehículos que operan diariamente segundo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:33,
        visible:false
        },
        
        {
        nombre: 'Excesos en la jornada diaria de trabajo de los conductores tercer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:22,
        visible:false
        },
        {
        nombre: 'Total de días trabajados por todos los conductores tercer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:23,
        visible:false
        },
        {
        nombre: 'Vehículos propios incluidos en el programa tercer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:24,
        visible:false
        },
        {
        nombre: 'Vehículos propios utilizados para desplazamientos laborales tercer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:25,
        visible:false
        },
        {
        nombre: 'Vehículos de contratistas incluidos en el programa tercer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:26,
        visible:false
        },
        {
        nombre: 'Vehículos de contratistas utilizados para desplazamientos laborales tercer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:27,
        visible:false
        },
        {
        nombre: 'Vehículos de terceros incluidos en el programa tercer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:28,
        visible:false
        },
        {
        nombre: 'Vehículos de terceros utilizados para desplazamientos laborales tercer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:29,
        visible:false
        },
        {
        nombre: 'Desplazamientos laborales con exceso de velocidad tercer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:30,
        visible:false
        },
        {
        nombre: 'Número total de desplazamientos laborales tercer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:31,
        visible:false
        },
        {
        nombre: 'Promedio de vehículos inspeccionados diariamente tercer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:32,
        visible:false
        },
        {
        nombre: 'Promedio de vehículos que operan diariamente tercer mes',
        tipoId:0,
        orden:1,
        subIndicadorId:33,
        visible:false
        },
        
        {
        nombre: 'Excesos en la jornada diaria de trabajo de los conductores cuarto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:22,
        visible:false
        },
        {
        nombre: 'Total de días trabajados por todos los conductores cuarto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:23,
        visible:false
        },
        {
        nombre: 'Vehículos propios incluidos en el programa cuarto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:24,
        visible:false
        },
        {
        nombre: 'Vehículos propios utilizados para desplazamientos laborales cuarto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:25,
        visible:false
        },
        {
        nombre: 'Vehículos de contratistas incluidos en el programa cuarto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:26,
        visible:false
        },
        {
        nombre: 'Vehículos de contratistas utilizados para desplazamientos laborales cuarto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:27,
        visible:false
        },
        {
        nombre: 'Vehículos de terceros incluidos en el programa cuarto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:28,
        visible:false
        },
        {
        nombre: 'Vehículos de terceros utilizados para desplazamientos laborales cuarto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:29,
        visible:false
        },
        {
        nombre: 'Desplazamientos laborales con exceso de velocidad cuarto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:30,
        visible:false
        },
        {
        nombre: 'Número total de desplazamientos laborales cuarto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:31,
        visible:false
        },
        {
        nombre: 'Promedio de vehículos inspeccionados diariamente cuarto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:32,
        visible:false
        },
        {
        nombre: 'Promedio de vehículos que operan diariamente cuarto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:33,
        visible:false
        },
        
        {
        nombre: 'Excesos en la jornada diaria de trabajo de los conductores quinto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:22,
        visible:false
        },
        {
        nombre: 'Total de días trabajados por todos los conductores quinto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:23,
        visible:false
        },
        {
        nombre: 'Vehículos propios incluidos en el programa quinto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:24,
        visible:false
        },
        {
        nombre: 'Vehículos propios utilizados para desplazamientos laborales quinto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:25,
        visible:false
        },
        {
        nombre: 'Vehículos de contratistas incluidos en el programa quinto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:26,
        visible:false
        },
        {
        nombre: 'Vehículos de contratistas utilizados para desplazamientos laborales quinto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:27,
        visible:false
        },
        {
        nombre: 'Vehículos de terceros incluidos en el programa quinto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:28,
        visible:false
        },
        {
        nombre: 'Vehículos de terceros utilizados para desplazamientos laborales quinto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:29,
        visible:false
        },
        {
        nombre: 'Desplazamientos laborales con exceso de velocidad quinto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:30,
        visible:false
        },
        {
        nombre: 'Número total de desplazamientos laborales quinto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:31,
        visible:false
        },
        {
        nombre: 'Promedio de vehículos inspeccionados diariamente quinto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:32,
        visible:false
        },
        {
        nombre: 'Promedio de vehículos que operan diariamente quinto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:33,
        visible:false
        },
        
        {
        nombre: 'Excesos en la jornada diaria de trabajo de los conductores sexto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:22,
        visible:false
        },
        {
        nombre: 'Total de días trabajados por todos los conductores sexto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:23,
        visible:false
        },
        {
        nombre: 'Vehículos propios incluidos en el programa sexto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:24,
        visible:false
        },
        {
        nombre: 'Vehículos propios utilizados para desplazamientos laborales sexto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:25,
        visible:false
        },
        {
        nombre: 'Vehículos de contratistas incluidos en el programa sexto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:26,
        visible:false
        },
        {
        nombre: 'Vehículos de contratistas utilizados para desplazamientos laborales sexto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:27,
        visible:false
        },
        {
        nombre: 'Vehículos de terceros incluidos en el programa sexto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:28,
        visible:false
        },
        {
        nombre: 'Vehículos de terceros utilizados para desplazamientos laborales sexto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:29,
        visible:false
        },
        {
        nombre: 'Desplazamientos laborales con exceso de velocidad sexto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:30,
        visible:false
        },
        {
        nombre: 'Número total de desplazamientos laborales sexto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:31,
        visible:false
        },
        {
        nombre: 'Promedio de vehículos inspeccionados diariamente sexto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:32,
        visible:false
        },
        {
        nombre: 'Promedio de vehículos que operan diariamente sexto mes',
        tipoId:0,
        orden:1,
        subIndicadorId:33,
        visible:false
        },
        
        {
        nombre: 'Excesos en la jornada diaria de trabajo de los conductores septimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:22,
        visible:true
        },
        {
        nombre: 'Total de días trabajados por todos los conductores septimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:23,
        visible:true
        },
        {
        nombre: 'Vehículos propios incluidos en el programa septimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:24,
        visible:true
        },
        {
        nombre: 'Vehículos propios utilizados para desplazamientos laborales septimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:25,
        visible:true
        },
        {
        nombre: 'Vehículos de contratistas incluidos en el programa septimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:26,
        visible:true
        },
        {
        nombre: 'Vehículos de contratistas utilizados para desplazamientos laborales septimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:27,
        visible:true
        },
        {
        nombre: 'Vehículos de terceros incluidos en el programa septimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:28,
        visible:true
        },
        {
        nombre: 'Vehículos de terceros utilizados para desplazamientos laborales septimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:29,
        visible:true
        },
        {
        nombre: 'Desplazamientos laborales con exceso de velocidad septimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:30,
        visible:true
        },
        {
        nombre: 'Número total de desplazamientos laborales septimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:31,
        visible:true
        },
        {
        nombre: 'Promedio de vehículos inspeccionados diariamente septimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:32,
        visible:true
        },
        {
        nombre: 'Promedio de vehículos que operan diariamente septimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:33,
        visible:true
        },
        
        {
        nombre: 'Excesos en la jornada diaria de trabajo de los conductores octavo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:22,
        visible:true
        },
        {
        nombre: 'Total de días trabajados por todos los conductores octavo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:23,
        visible:true
        },
        {
        nombre: 'Vehículos propios incluidos en el programa octavo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:24,
        visible:true
        },
        {
        nombre: 'Vehículos propios utilizados para desplazamientos laborales octavo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:25,
        visible:true
        },
        {
        nombre: 'Vehículos de contratistas incluidos en el programa octavo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:26,
        visible:true
        },
        {
        nombre: 'Vehículos de contratistas utilizados para desplazamientos laborales octavo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:27,
        visible:true
        },
        {
        nombre: 'Vehículos de terceros incluidos en el programa octavo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:28,
        visible:true
        },
        {
        nombre: 'Vehículos de terceros utilizados para desplazamientos laborales octavo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:29,
        visible:true
        },
        {
        nombre: 'Desplazamientos laborales con exceso de velocidad octavo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:30,
        visible:true
        },
        {
        nombre: 'Número total de desplazamientos laborales octavo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:31,
        visible:true
        },
        {
        nombre: 'Promedio de vehículos inspeccionados diariamente octavo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:32,
        visible:true
        },
        {
        nombre: 'Promedio de vehículos que operan diariamente octavo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:33,
        visible:true
        },
        
        {
        nombre: 'Excesos en la jornada diaria de trabajo de los conductores noveno mes',
        tipoId:0,
        orden:1,
        subIndicadorId:22,
        visible:true
        },
        {
        nombre: 'Total de días trabajados por todos los conductores noveno mes',
        tipoId:0,
        orden:1,
        subIndicadorId:23,
        visible:true
        },
        {
        nombre: 'Vehículos propios incluidos en el programa noveno mes',
        tipoId:0,
        orden:1,
        subIndicadorId:24,
        visible:true
        },
        {
        nombre: 'Vehículos propios utilizados para desplazamientos laborales noveno mes',
        tipoId:0,
        orden:1,
        subIndicadorId:25,
        visible:true
        },
        {
        nombre: 'Vehículos de contratistas incluidos en el programa noveno mes',
        tipoId:0,
        orden:1,
        subIndicadorId:26,
        visible:true
        },
        {
        nombre: 'Vehículos de contratistas utilizados para desplazamientos laborales noveno mes',
        tipoId:0,
        orden:1,
        subIndicadorId:27,
        visible:true
        },
        {
        nombre: 'Vehículos de terceros incluidos en el programa noveno mes',
        tipoId:0,
        orden:1,
        subIndicadorId:28,
        visible:true
        },
        {
        nombre: 'Vehículos de terceros utilizados para desplazamientos laborales noveno mes',
        tipoId:0,
        orden:1,
        subIndicadorId:29,
        visible:true
        },
        {
        nombre: 'Desplazamientos laborales con exceso de velocidad noveno mes',
        tipoId:0,
        orden:1,
        subIndicadorId:30,
        visible:true
        },
        {
        nombre: 'Número total de desplazamientos laborales noveno mes',
        tipoId:0,
        orden:1,
        subIndicadorId:31,
        visible:true
        },
        {
        nombre: 'Promedio de vehículos inspeccionados diariamente noveno mes',
        tipoId:0,
        orden:1,
        subIndicadorId:32,
        visible:true
        },
        {
        nombre: 'Promedio de vehículos que operan diariamente noveno mes',
        tipoId:0,
        orden:1,
        subIndicadorId:33,
        visible:true
        },
        
        {
        nombre: 'Excesos en la jornada diaria de trabajo de los conductores decimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:22,
        visible:true
        },
        {
        nombre: 'Total de días trabajados por todos los conductores decimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:23,
        visible:true
        },
        {
        nombre: 'Vehículos propios incluidos en el programa decimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:24,
        visible:true
        },
        {
        nombre: 'Vehículos propios utilizados para desplazamientos laborales decimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:25,
        visible:true
        },
        {
        nombre: 'Vehículos de contratistas incluidos en el programa decimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:26,
        visible:true
        },
        {
        nombre: 'Vehículos de contratistas utilizados para desplazamientos laborales decimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:27,
        visible:true
        },
        {
        nombre: 'Vehículos de terceros incluidos en el programa decimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:28,
        visible:true
        },
        {
        nombre: 'Vehículos de terceros utilizados para desplazamientos laborales decimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:29,
        visible:true
        },
        {
        nombre: 'Desplazamientos laborales con exceso de velocidad decimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:30,
        visible:true
        },
        {
        nombre: 'Número total de desplazamientos laborales decimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:31,
        visible:true
        },
        {
        nombre: 'Promedio de vehículos inspeccionados diariamente decimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:32,
        visible:true
        },
        {
        nombre: 'Promedio de vehículos que operan diariamente decimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:33,
        visible:true
        },
        
        {
        nombre: 'Excesos en la jornada diaria de trabajo de los conductores undecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:22,
        visible:true
        },
        {
        nombre: 'Total de días trabajados por todos los conductores undecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:23,
        visible:true
        },
        {
        nombre: 'Vehículos propios incluidos en el programa undecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:24,
        visible:true
        },
        {
        nombre: 'Vehículos propios utilizados para desplazamientos laborales undecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:25,
        visible:true
        },
        {
        nombre: 'Vehículos de contratistas incluidos en el programa undecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:26,
        visible:true
        },
        {
        nombre: 'Vehículos de contratistas utilizados para desplazamientos laborales undecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:27,
        visible:true
        },
        {
        nombre: 'Vehículos de terceros incluidos en el programa undecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:28,
        visible:true
        },
        {
        nombre: 'Vehículos de terceros utilizados para desplazamientos laborales undecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:29,
        visible:true
        },
        {
        nombre: 'Desplazamientos laborales con exceso de velocidad undecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:30,
        visible:true
        },
        {
        nombre: 'Número total de desplazamientos laborales undecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:31,
        visible:true
        },
        {
        nombre: 'Promedio de vehículos inspeccionados diariamente undecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:32,
        visible:true
        },
        {
        nombre: 'Promedio de vehículos que operan diariamente undecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:33,
        visible:true
        },
        
        {
        nombre: 'Excesos en la jornada diaria de trabajo de los conductores duodecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:22,
        visible:true
        },
        {
        nombre: 'Total de días trabajados por todos los conductores duodecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:23,
        visible:true
        },
        {
        nombre: 'Vehículos propios incluidos en el programa duodecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:24,
        visible:true
        },
        {
        nombre: 'Vehículos propios utilizados para desplazamientos laborales duodecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:25,
        visible:true
        },
        {
        nombre: 'Vehículos de contratistas incluidos en el programa duodecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:26,
        visible:true
        },
        {
        nombre: 'Vehículos de contratistas utilizados para desplazamientos laborales duodecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:27,
        visible:true
        },
        {
        nombre: 'Vehículos de terceros incluidos en el programa duodecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:28,
        visible:true
        },
        {
        nombre: 'Vehículos de terceros utilizados para desplazamientos laborales duodecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:29,
        visible:true
        },
        {
        nombre: 'Desplazamientos laborales con exceso de velocidad duodecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:30,
        visible:true
        },
        {
        nombre: 'Número total de desplazamientos laborales duodecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:31,
        visible:true
        },
        {
        nombre: 'Promedio de vehículos inspeccionados diariamente duodecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:32,
        visible:true
        },
        {
        nombre: 'Promedio de vehículos que operan diariamente duodecimo mes',
        tipoId:0,
        orden:1,
        subIndicadorId:33,
        visible:true
        }


    ])
  }
}
