import { ClienteHttp } from '../ClienteHttp';
import Env from '@ioc:Adonis/Core/Env';
import axios from 'axios';
import { ExtructuraArchivos } from './Estructura';
import { ValidarDatos } from './ValidarDatos';
const fs = require("fs");
export class ValidarEstructura {
  private readonly HOST = Env.get('URL_SERVICIOS2')
  validar = async (entidad: string, prefijo: string, archivo: string) => {

    try {
      const endpoint = `ConsultarParametrizacionEntidad/ConsultarParamEntidad`
      const parametros = {
        "pEntidad": entidad,
        "pTipoProceso": prefijo
      }


      //Cargar estructura
      /* await axios.post(`${this.HOST}${endpoint}`,parametros).then( respuesta =>{
         console.log(respuesta);
         
      }).catch( err =>{
       console.log('Archivo no encontrado' +err);
       
      }) */

      const e = new ExtructuraArchivos();
      const campos = e.estructura.Campos

      // console.log(campos);


      //   console.log(e.estructura.Campos.find(elemento => elemento.Posicion = 1));



      const archivoTxt = fs.createReadStream(archivo, "utf8")
      archivoTxt.on('data', (chunk) => {

        const archivoArreglo = chunk.split('\r\n')
        
        this.validarFilas(archivoArreglo, campos);

      });



    } catch (error) {

    }
  }

  private validarFilas = async (archivoArreglo: [], campos: any) => {
    const validarDatos = new ValidarDatos()
    

    for await (const filas of archivoArreglo) {
      if (!filas) break
      const fila = (<string>filas).split('|');
    
      
      //Validar longitud      
      if (fila.length < campos.length) {          
        
        const nombresCampo = campos.map(campo => {
          return campo.NombreCampo;
        })
        throw new Error(`Los campos del archivo no corresponden , los campos necesarios son: ${nombresCampo}`);
      }

      for  (const key in fila) {
        const columna = campos.find(campo => campo.Posicion == parseInt(key)+1)        
        validarDatos.datos(fila[key], columna )

      }

    }

  }

  


}