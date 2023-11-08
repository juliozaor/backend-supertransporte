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
    const { historico, vigencia = 2023 } = request.all();


    if(!vigencia){
      return response.status(400).send({ error: 'La vigencia es obligatoria' })
    }
    let mesesSql;
    
    if (historico && historico == 'true') {
       if (vigencia == 2023) {
        mesesSql = await TblMeses.query().where('mes_habilitado', true).where('mes_vigencia', vigencia).orderBy('mes_id', 'asc');
      } else { 
        mesesSql = await TblMeses.query().where('mes_vigencia', vigencia).orderBy('mes_id', 'asc');
      }
    } else {
      mesesSql = await TblMeses.query().where('mes_estado', true).where('mes_vigencia', vigencia).orderBy('mes_id', 'asc');
    }


   const meses = mesesSql.map(m =>{
    return {
      idMes : m.visual,
      nombreMes:m.nombre
    }
   })
   return response.status(200).send({ meses })
  }




}
