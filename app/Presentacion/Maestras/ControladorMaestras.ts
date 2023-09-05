/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TblAnioVigencias } from 'App/Infraestructura/Datos/Entidad/AnioVigencia';
import { TblMeses } from 'App/Infraestructura/Datos/Entidad/Mes'

export default class ControladorReporte {
  //private service: ServicioIndicadores
  constructor() {
    /* this.service = new ServicioIndicadores(
      new RepositorioIndicadoresDB()
    ) */
  }


  public async listarMeses({ request, response }: HttpContextContract) {
    const { historico } = request.only(['historico']);
    const h = !!historico;
    let meses;
    if (h) {
      const vigencia = await TblAnioVigencias.query().where('anv_estado', true).first();
      console.log(vigencia?.anio);
      if (vigencia?.anio == 2023) {
        meses = await TblMeses.query().where('mes_habilitado', true);
      } else {
        meses = await TblMeses.query();
      }
    } else {
      meses = await TblMeses.query().where('mes_estado', true);
    }
    response.status(200).send({ meses })
  }




}
