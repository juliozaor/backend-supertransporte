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
    
    let mesesSql;
    
    if (historico && historico == 'true') {
      const vigencia = await TblAnioVigencias.query().where('anv_estado', true).first();
      if (vigencia?.anio == 2023) {
        mesesSql = await TblMeses.query().where('mes_habilitado', true).orderBy('mes_id', 'asc');
      } else {
        mesesSql = await TblMeses.query().orderBy('mes_id', 'asc');
      }
    } else {
      mesesSql = await TblMeses.query().where('mes_estado', true).orderBy('mes_id', 'asc');
    }


   const meses = mesesSql.map(m =>{
    return {
      idMes : m.id,
      nombreMes:m.nombre
    }
   })
    response.status(200).send({ meses })
  }




}
