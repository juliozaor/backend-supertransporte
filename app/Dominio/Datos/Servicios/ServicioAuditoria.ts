import axios from "axios";
import Env from '@ioc:Adonis/Core/Env';

export class ServicioAuditoria{

  public async Auditar (datos: {}) {
    try {
      axios.post(`${Env.get('LOGS')}/auditoria`, datos)
    } catch (error) {
      console.log("Fallo auditoria", error);
      
    }
  }

}
