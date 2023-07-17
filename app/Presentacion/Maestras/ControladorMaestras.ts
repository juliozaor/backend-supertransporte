/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ControladorReporte {
  //private service: ServicioIndicadores
  constructor () {
    /* this.service = new ServicioIndicadores(
      new RepositorioIndicadoresDB()
    ) */
  }


  public async listarMeses ({ request, response }:HttpContextContract) {

     response.status(200).send({
      "meses": [{
        idMes : 1,
        nombreMes:"Enero"
      },{
        idMes : 2,
        nombreMes:"Febrero"
      },{
        idMes : 3,
        nombreMes:"Marzo"
      },{
        idMes : 4,
        nombreMes:"Abril"
      },{
        idMes : 5,
        nombreMes:"Mayo"
      },{
        idMes : 6,
        nombreMes:"Junio"
      },{
        idMes : 7,
        nombreMes:"Julio"
      },{
        idMes : 8,
        nombreMes:"Agosto"
      },{
        idMes : 9,
        nombreMes:"Septiembre"
      },{
        idMes : 10,
        nombreMes:"Octubre"
      },{
        idMes : 11,
        nombreMes:"Noviembre"
      },{
        idMes : 12,
        nombreMes:"Diciembre"
      }]
  }) 
  }




}
