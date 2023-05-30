import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FilasClasificacion from 'App/Infraestructura/Datos/Entidad/FilasClasificacion'


export default class extends BaseSeeder {
  public async run() {
    await FilasClasificacion.createMany([
      {
        id: 1,
        nombre: 'Contrato indefinido',
        orden: 1,
        categoriaClasificacionId: 1
      },
      {
        id: 2,
        nombre: 'Contrato término fijo',
        orden: 2,
        categoriaClasificacionId: 1
      },
      {
        id: 3,
        nombre: 'Contrato obra labor',
        orden: 3,
        categoriaClasificacionId: 1
      },
      {
        id: 4,
        nombre: 'Contrato prestación de servicios',
        orden: 4,
        categoriaClasificacionId: 1
      },
      {
        id: 5,
        nombre: 'Tercerizado',
        orden: 5,
        categoriaClasificacionId: 1
      },

      {
        id: 6,
        nombre: 'Ciclista',
        orden: 6,
        categoriaClasificacionId: 2
      },
      {
        id: 7,
        nombre: 'Motociclista',
        orden: 7,
        categoriaClasificacionId: 2
      },
      {
        id: 8,
        nombre: 'Conductor vehículo particular',
        orden: 8,
        categoriaClasificacionId: 2
      },
      {
        id: 9,
        nombre: 'Conductor vehículo público',
        orden: 9,
        categoriaClasificacionId: 2
      },
      {
        id: 10,
        nombre: 'Conductor vehículo oficia',
        orden: 10,
        categoriaClasificacionId: 2
      },
      {
        id: 11,
        nombre: 'Conductor vehículo diplomático',
        orden: 11,
        categoriaClasificacionId: 2
      },

      {
        id: 12,
        nombre: 'Público',
        orden: 12,
        categoriaClasificacionId: 3
      },
      {
        id: 13,
        nombre: 'Particular',
        orden: 13,
        categoriaClasificacionId: 3
      },
      {
        id: 14,
        nombre: 'Oficial',
        orden: 14,
        categoriaClasificacionId: 3
      },
      {
        id: 15,
        nombre: 'Servicio',
        orden: 15,
        categoriaClasificacionId: 3
      },
      {
        id: 16,
        nombre: 'Diplomático',
        orden: 16,
        categoriaClasificacionId: 3
      },
      {
        id: 17,
        nombre: 'Consular',
        orden: 17,
        categoriaClasificacionId: 3
      },
      {
        id: 18,
        nombre: 'Misiones',
        orden: 18,
        categoriaClasificacionId: 3
      },
      {
        id: 19,
        nombre: 'Especiales',
        orden: 19,
        categoriaClasificacionId: 3
      },

      {
        id: 20,
        nombre: 'Bicicleta',
        orden: 20,
        categoriaClasificacionId: 4
      },
      {
        id: 21,
        nombre: 'Ciclomotor',
        orden: 21,
        categoriaClasificacionId: 4
      },
      {
        id: 22,
        nombre: 'Motocicleta',
        orden: 22,
        categoriaClasificacionId: 4
      },
      {
        id: 23,
        nombre: 'Motocarro',
        orden: 23,
        categoriaClasificacionId: 4
      },
      {
        id: 24,
        nombre: 'Automóvil',
        orden: 24,
        categoriaClasificacionId: 4
      },
      {
        id: 25,
        nombre: 'Campero',
        orden: 25,
        categoriaClasificacionId: 4
      },
      {
        id: 26,
        nombre: 'Camioneta',
        orden: 26,
        categoriaClasificacionId: 4
      },
      {
        id: 27,
        nombre: 'Microbús',
        orden: 27,
        categoriaClasificacionId: 4
      },
      {
        id: 28,
        nombre: 'Bus',
        orden: 28,
        categoriaClasificacionId: 4
      },
      {
        id: 29,
        nombre: 'Buseta',
        orden: 29,
        categoriaClasificacionId: 4
      },
      {
        id: 30,
        nombre: 'Volqueta',
        orden: 30,
        categoriaClasificacionId: 4
      },
      {
        id: 31,
        nombre: 'Camión rígido',
        orden: 31,
        categoriaClasificacionId: 4
      },
      {
        id: 32,
        nombre: 'Camión articulado',
        orden: 32,
        categoriaClasificacionId: 4
      }

    ])
  }
}
