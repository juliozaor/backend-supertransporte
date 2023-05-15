/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import { ConfiguracionEmail } from 'App/Dominio/Email/ConfiguracionEmail';
import { Email } from 'App/Dominio/Email/Email';
import { EnviadorEmail } from 'App/Dominio/Email/EnviadorEmail'

export class EnviadorEmailAdonis implements EnviadorEmail {

  enviarTemplate<T>(configuracion: ConfiguracionEmail, email: Email<T>): void {
    const {destinatarios, de, alias, copias, asunto} = configuracion
    Mail.send(mensaje => {
      mensaje.subject(asunto).from(de, alias);

      if(typeof destinatarios === 'string') mensaje.to(destinatarios);
      else mensaje.to(destinatarios.join(','));

      if(copias){
        if(typeof copias === 'string') mensaje.to(copias);
        else mensaje.to(copias.join(','));
      }

      mensaje.htmlView(email.rutaTemplate, email.modelo)
    })
  }

  enviarEmail (asunto:string, texto: string, destinatarios: string[], etiquetas?: string[] | undefined): void {
    Mail.send(mensaje => {
      mensaje
        .subject(asunto)
        .from(Env.get('SMTP_USERNAME'), Env.get('EMAIL_ALIAS'))
        .cc(destinatarios.join(';'))
        .text(texto)
    })
  }
}
