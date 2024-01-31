/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import FormData from 'form-data';
/* import { ServicioRespuestas } from 'App/Dominio/Datos/Servicios/ServicioRespuestas'
import { RepositorioRespuestasDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioRespuestasDB' */
import Env from '@ioc:Adonis/Core/Env';

export default class ControladorReporte {

  public async temporal ({ request, response }:HttpContextContract) {
    response.status(200).send({
      nombreOriginalArchivo: "documento.pdf",
      nombreAlmacenado: "5_00000_06.pdf",
      ruta: "upload/archivos"
    })
  }

  public async archivos ({ request, response }:HttpContextContract) {

    const host = Env.get('URL_SERVICIO_ARCHIVOS')
    const rutaRaiz = 'pesv';
    const ruta = 'archivos';
    const endpoint = `/api/v1/${ruta}`
    const archivo = request.file('archivo');
    const {idVigilado, idPregunta} = request.all();
    if (!archivo) {
      return response.status(400).send({
        mensaje: 'No se encontro el archivo'
      })
    }

    if(!idPregunta){
      return response.status(400).send({
        mensaje: 'El campo idPregunta es obligatorio'
      })
    }


    const fs = require('fs');
    const path = require('path');
    
    const archivoTemporal = path.resolve(archivo.tmpPath);
    
    const formData = new FormData();
    formData.append('archivo', fs.createReadStream(archivoTemporal), {
      filename: archivo.clientName,
      contentType: archivo.headers['content-type'],
    });
    
    formData.append('idVigilado', idVigilado);
    formData.append('rutaRaiz', rutaRaiz);
    formData.append('idPregunta', idPregunta);
    
    const headers = {
      'Authorization': `Bearer d4a32a3b-def6-4cc2-8f77-904a67360b53`,
      ...formData.getHeaders(),
    };
    
    try {
      const respuesta = await axios.post(`${host}${endpoint}`, formData, { headers });
      return respuesta.data;
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }

   
  }

  public async evidencias ({ request, response }:HttpContextContract) {
   
    const host = Env.get('URL_SERVICIO_ARCHIVOS')
    const rutaRaiz = 'evidencias';
    const ruta = 'archivos/evidencias';
    const endpoint = `/api/v1/${ruta}`
    const archivo = request.file('archivo');
    const {idVigilado, extension} = request.all();
    if (!archivo) {
      return response.status(400).send({
        mensaje: 'No se encontro el archivo'
      })
    }

    if(!extension){
      return response.status(400).send({
        mensaje: 'El campo extension es obligatorio'
      })
    }


    const fs = require('fs');
    const path = require('path');
    
    const archivoTemporal = path.resolve(archivo.tmpPath);
    
    const formData = new FormData();
    formData.append('archivo', fs.createReadStream(archivoTemporal), {
      filename: archivo.clientName,
      contentType: archivo.headers['content-type'],
    });
    
    formData.append('idVigilado', idVigilado);
    formData.append('rutaRaiz', rutaRaiz);
    formData.append('extension', extension);
    
    const headers = {
      'Authorization': `Bearer d4a32a3b-def6-4cc2-8f77-904a67360b53`,
      ...formData.getHeaders(),
    };
    
    try {
      const respuesta = await axios.post(`${host}${endpoint}`, formData, { headers });
      return respuesta.data;
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }

  }



}
