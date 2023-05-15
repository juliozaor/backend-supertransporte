/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { EnviadorEmail } from 'App/Dominio/Email/EnviadorEmail'
import { RepositorioCarga } from '../../Repositorios/RepositorioCarga'
//import Env from '@ioc:Adonis/Core/Env'
//import { EmailNotificarCargaArchivo } from 'App/Dominio/Email/Emails/EmailNotificarCargaArchivo'
import { DateTime } from 'luxon'
import { ClienteHttp } from 'App/Dominio/ClienteHttp'
//import { NotificacionCargaArchivo } from 'App/Dominio/Email/Modelos/NotificacionCargaArchivo'
export class ServicioCarga{
  constructor (private repositorio: RepositorioCarga, private enviadorEmail:EnviadorEmail, private clienteHttp:ClienteHttp) { }

  async procesarArchivo (archivo: any, datos: string): Promise<void> {
    this.repositorio.procesarArchivo(archivo, datos)
 /*    this.enviadorEmail.enviarTemplate({
      asunto: 'Carga completada',
      de: Env.get('SMTP_USERNAME'),
      destinatarios: 'jesing482@gmail.com',
      alias: Env.get('EMAIL_ALIAS')
    }, new EmailNotificarCargaArchivo({
      fechaCargue: DateTime.now(),
      nombreArchivo: 'Nombre archivo',
      numeroRadicado: 'Numero radicado',
      resultado: 'Pasó',
      tipoArchivo: 'Tipo archivo'
    })) */
  }

  async  archivosCargados (parametros: string): Promise<{}> {
    return this.repositorio.archivosCargados(parametros)
  }

  async  obtenerLogs (parametros: string): Promise<{}> {
    return this.repositorio.obtenerLogs(parametros)
  }

  async  buscarCargados (parametros: string): Promise<{}> {
    return this.repositorio.buscarCargados(parametros)
  }

}
