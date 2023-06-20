
import { RepositorioRadioAccion } from 'App/Dominio/Repositorios/RepositorioRadioAccion'
import { RadioAccion } from 'App/Dominio/Datos/Entidades/RadioAccion';
import TblRadioAcciones from 'App/Infraestructura/Datos/Entidad/RadioAccion';

export class RepositorioRadioAccionDB implements RepositorioRadioAccion {

  async obtenerRadiosAccion (): Promise<{radios: RadioAccion[]}> {
    const radios: RadioAccion[] = []    
    const radiosDB = await TblRadioAcciones.query().orderBy('nombre', 'asc')
    radiosDB.forEach(radiosDB => {
      radios.push(radiosDB.obtenerRadioAccion())
    })
    return {radios}
  }

}
