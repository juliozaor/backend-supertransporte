import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblDatosIndicadores } from 'App/Infraestructura/Datos/Entidad/DatosIndicadores'
export default class extends BaseSeeder {
  public async run() {
    await TblDatosIndicadores.createMany([
      {
        nombre: 'Fatalidades primer trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:1,
        visible:false
        },
        {
        nombre: 'Heridos graves primer trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:2,
        visible:false
        },
        {
        nombre: 'Heridos leves primer trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:3,
        visible:false
        },
        {
        nombre: 'Choques simples primer trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:4,
        visible:false
        },
        {
        nombre: 'Kilómetros recorridos primer trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:5,
        visible:false
        },
        
        {
        nombre: 'Fatalidades segundo trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:1,
        visible:true
        },
        {
        nombre: 'Heridos graves segundo trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:2,
        visible:true
        },
        {
        nombre: 'Heridos leves segundo trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:3,
        visible:true
        },
        {
        nombre: 'Choques simples segundo trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:4,
        visible:true
        },
        {
        nombre: 'Kilómetros recorridos segundo trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:5,
        visible:true
        },
        
        {
        nombre: 'Fatalidades tercer trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:1,
        visible:true
        },
        {
        nombre: 'Heridos graves tercer trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:2,
        visible:true
        },
        {
        nombre: 'Heridos leves tercer trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:3,
        visible:true
        },
        {
        nombre: 'Choques simples tercer trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:4,
        visible:true
        },
        {
        nombre: 'Kilómetros recorridos tercer trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:5,
        visible:true
        },
        
        {
        nombre: 'Fatalidades cuarto trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:1,
        visible:true
        },
        {
        nombre: 'Heridos graves cuarto trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:2,
        visible:true
        },
        {
        nombre: 'Heridos leves cuarto trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:3,
        visible:true
        },
        {
        nombre: 'Choques simples cuarto trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:4,
        visible:true
        },
        {
        nombre: 'Kilómetros recorridos cuarto trimestre',
        tipoId:0,
        orden:1,
        subIndicadorId:5,
        visible:true
        },

      



    ])
  }
}
