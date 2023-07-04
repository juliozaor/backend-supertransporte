/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioRadioAccion } from 'App/Dominio/Repositorios/RepositorioRadioAccion'
import { RadioAccion } from '../Entidades/RadioAccion';

export class ServicioRadioAccion{
  constructor (private repositorio: RepositorioRadioAccion) { }

  async obtenerRadiosAccion (modalidad:number): Promise<{ radios: RadioAccion[]}> {
    return this.repositorio.obtenerRadiosAccion(modalidad);
  }

}
