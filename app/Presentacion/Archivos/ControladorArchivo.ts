/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/* import { ServicioRespuestas } from 'App/Dominio/Datos/Servicios/ServicioRespuestas'
import { RepositorioRespuestasDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioRespuestasDB' */

export default class ControladorReporte {
/*   private service: ServicioRespuestas
  constructor () {
    this.service = new ServicioRespuestas(
      new RepositorioRespuestasDB()
    )
  } */

  public async temporal ({ request, response }:HttpContextContract) {
    response.status(200).send({
      nombreOriginalArchivo: "documento.pdf",
      nombreAlmacenado: "5_00000_06.pdf",
      ruta: "upload/archivos"
    })
  }



}
