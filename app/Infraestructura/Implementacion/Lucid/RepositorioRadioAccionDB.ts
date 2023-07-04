
import { RepositorioRadioAccion } from 'App/Dominio/Repositorios/RepositorioRadioAccion'
import { RadioAccion } from 'App/Dominio/Datos/Entidades/RadioAccion';
import TblRadioAcciones from 'App/Infraestructura/Datos/Entidad/RadioAccion';
import TblRestriccionRadio from 'App/Infraestructura/Datos/Entidad/Restriccion';

export class RepositorioRadioAccionDB implements RepositorioRadioAccion {

  async obtenerRadiosAccion(modalidad: number): Promise<{ radios: RadioAccion[] }> {
    const radios: RadioAccion[] = []
    let consulta = TblRadioAcciones.query()
    
    if (modalidad) {
      const restriccion = await TblRestriccionRadio.query().where('trr_modalidad_id',modalidad).first()
      if(restriccion){
        consulta = consulta.whereHas('restriccion', sql => {
           sql.where('id_mod', modalidad)
         })

      }



    }
    const radiosDB = await consulta.orderBy('nombre', 'asc')


    radiosDB.forEach(radiosDB => {
      radios.push(radiosDB.obtenerRadioAccion())
    })
    return { radios }
  }

}
