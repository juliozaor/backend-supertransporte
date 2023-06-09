/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/* import { ServicioRespuestas } from 'App/Dominio/Datos/Servicios/ServicioRespuestas'
import { RepositorioRespuestasDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioRespuestasDB' */

export default class ControladorArchivo {
/*   private service: ServicioRespuestas
  constructor () {
    this.service = new ServicioRespuestas(
      new RepositorioRespuestasDB()
    )
  } */

  public async asignacion ({ request, response }:HttpContextContract) {
    response.status(200).send({
      mensaje:'Reportes asignados correctamente'
    })
  }

  public async eliminarAsignacion ({ request, response }:HttpContextContract) {
    response.status(200).send({
      mensaje:'Se elimino correctamente'
    })
  }

  public async verificadores ({ request, response }:HttpContextContract) {
    response.status(200).send([
      {
        "nombre": "Jesid Polo",
        "documento": "1002999476"
      },{
        "nombre": "Julio Jimenez",
        "documento": "92555553"
      }
    ])
  }






}
