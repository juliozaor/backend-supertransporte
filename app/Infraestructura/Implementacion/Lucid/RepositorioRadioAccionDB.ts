
import { RepositorioRadioAccion } from 'App/Dominio/Repositorios/RepositorioRadioAccion'
import { RadioAccion } from 'App/Dominio/Datos/Entidades/RadioAccion';
import TblRadioAcciones from 'App/Infraestructura/Datos/Entidad/RadioAccion';

export class RepositorioRadioAccionDB implements RepositorioRadioAccion {

  async obtenerRadiosAccion(modalidad: number): Promise<{ radios: RadioAccion[] }> {
    const radios: RadioAccion[] = []
    let consulta = TblRadioAcciones.query()
    
    if (modalidad) {
     consulta = consulta.whereHas('restriccion', sql => {
        sql.where('id_mod', modalidad)
      })
    }
    const radiosDB = await consulta.orderBy('nombre', 'asc')


    radiosDB.forEach(radiosDB => {
      radios.push(radiosDB.obtenerRadioAccion())
    })
    return { radios }
  }

}
