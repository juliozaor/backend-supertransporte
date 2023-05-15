/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioCarga } from 'App/Dominio/Repositorios/RepositorioCarga'
/* import { validador } from '../../Utils/ValidadorArchivo' */
import Env from "@ioc:Adonis/Core/Env"
import axios from 'axios';
import TblCargaDatos from '../../Datos/Entidad/CargaDato';
import { v4 as uuidv4 } from 'uuid';
import Tblarchivos from 'App/Infraestructura/Datos/Entidad/Archivo';
import TblLogsErrores from '../../Datos/Entidad/LogErrores';
import { LogErrores } from '../../../Dominio/Datos/Entidades/LogErrores';
import { generarJsonValidaciones } from 'App/Infraestructura/Utils/GenerarJsonValidaciones';
/* import { UsuarioEmpresa } from 'App/Dominio/Datos/Entidades/UsuarioEmpresa';
import { UsuarioNovafianza } from '../../../Dominio/Datos/Entidades/UsuarioNovafianza'; */
import { ServicioUsuario } from "App/Dominio/Datos/Servicios/ServicioUsuario";
import { RepositorioUsuarioNovafianzaDB } from './RepositorioUsuarioNovafianzaDB';
import { RepositorioUsuarioEmpresaDB } from './RepositorioUsuarioEmpresaDB';
import { ValidarEstructura } from '../../../Dominio/Carga/ValidarEstructura';
const fs = require('fs')
export class RepositorioCargaDB implements RepositorioCarga {
  private servicioUsuario = new ServicioUsuario(new RepositorioUsuarioNovafianzaDB(), new RepositorioUsuarioEmpresaDB())

  async procesarArchivo(archivo: any, datos: string): Promise<void> {
    //Validar estructura

    
    // llamar a la funcion para guardar el estado de la carga
    const idDatosGuardados = await this.guardarCarga(datos, archivo.clientName);

    console.log({idDatosGuardados});
    

    const { usuario, ...datosCarga } = JSON.parse(datos);
    const tipoDeProceso = await Tblarchivos.find(datosCarga.tipoArchivo)

    const [entidad, convenio] = this.validarNombre(archivo.clientName, tipoDeProceso);

    
    
    //Carga de archivo
    await archivo.moveToDisk('./', { name: archivo.clientName });
    const path = `./uploads/${archivo.clientName}`;
  
    /* //Validar estructura
    const validatEstructura = new ValidarEstructura();
const esCorreta = validatEstructura.validar('890914526', 'IA', path) */





    const archivoBase64 = fs.readFileSync(path, { encoding: "base64" });
    fs.unlinkSync(path);

    



    //Validacion de datos

    try {
      const data = {
        "pEntidad": entidad,
        "pConvenio": convenio,
        "pFechaInicio": datosCarga.fechaInicial,
        "pFechaFin": datosCarga.fechaFinal,
        "pTipoProceso": tipoDeProceso?.prefijo,
        "pRutaArchivo": "",
        "pArchivoBase64": archivoBase64
      }
      const headers = {
        'Content-Type': 'application/json'
      }
  /*     const respuesta = await axios.post(`${Env.get('URL_CARGA')}/${tipoDeProceso?.tipo}/api/ValidarArchivo/ValidarCargarArchivo`, data, { headers })


      this.validarRespuesta(respuesta.data, idDatosGuardados); */

    } catch (error) {
      console.log(error);

    }

  }

  formatearRespuesta = (archivo: string, id: string) => {
    const re1 = /:  :/gi;
    const re2 = /::/gi;
    const re = /: :/gi;
    let formateoArchivo = archivo.replace(re1, ': :')
    formateoArchivo = formateoArchivo.replace(re2, ': :')
    formateoArchivo = formateoArchivo.replace(re, '&&')

    formateoArchivo = formateoArchivo.replace(/[']/g, "");

    const filas = formateoArchivo.split('\n')

    let errores: any = [];

    for (const fila of filas) {
      const columnas = fila.split('&&')
      let nFila: string = '';
      for (let i = 0; i < columnas.length; i++) {
        if (columnas[i] !== '') {
          if (i == 0) {
            const primerColumna = columnas[i].split('|');
            nFila = primerColumna[0];
            const descripcion = primerColumna[2].split(':')
            errores.push({
              "descripcion": descripcion[1],
              "linea": nFila,
              "variable": ""
            })
          } else {
            //  console.log(i, columnas[i]);

            //const otrasColumnas = columnas[i].split(',')
            errores.push({
              "descripcion": columnas[i] ?? '',
              "linea": nFila,
              "variable": ''
            })

            /*  console.log({
               "descripcion": otrasColumnas[1]??'',
               "linea": nFila,
               "variable": otrasColumnas[0]??''
             }); */
          }
        }

      }

    }


    this.guardarErrores(id, errores)



  }


  async archivosCargados(parametros: string): Promise<any> {
    let archivos = {};
    try {
    
      

      const { entidadId, usuario, pagina = 1, limite = 5 } = JSON.parse(parametros);
    /*   console.log(usuario);
      
      const usuarioN = await this.servicioUsuario.obtenerUsuario(usuario)
      console.log({usuarioN}); */
      
      const archivosBd = await TblCargaDatos.query().preload('archivo').preload('estadoCarga')
        .where('car_empresa_id', entidadId).paginate(pagina, limite)

      let arrArchivos: any = []
      for (const sql of archivosBd) {
        arrArchivos.push({
          idArchivoCargado: sql.id,
          fechaYHora: sql.createdAt,
          nombreArchivo: sql.nombre,
          nombreTipoArchivo: sql.archivo.nombre,
          estadoValidacion: sql.estadoCarga.nombre
        })

      }
      archivos['archivosCargados'] = arrArchivos;
      archivos['paginacion'] = {
        "totalRegistros": archivosBd.getMeta().total,
        "totalPaginas": archivosBd.getMeta().last_page,
        "paginaActual": archivosBd.getMeta().current_page
      };


    } catch (error) {
      //  console.error(error);

    }

    return archivos;
  }



  guardarCarga = async (datos: string, nombre: string): Promise<string> => {
    const obtenerDatos = JSON.parse(datos);

    let empresa = ''
    const usuario = await this.servicioUsuario.obtenerUsuario(obtenerDatos.usuario)
    empresa = (usuario['idEmpresa'])??''

    let datosGuardar = {
      id: uuidv4(),
      nombre,
      fechaInicial: obtenerDatos.fechaInicial,
      fechaFinal: obtenerDatos.fechaFinal,
      usuario: obtenerDatos.usuario,
      tipoArchivo: obtenerDatos.tipoArchivo,
      empresa,
      estadoProceso: 1,
    }
    
    let cargaArchivo = new TblCargaDatos();
    cargaArchivo.establecerCargaArcivoDb(datosGuardar)
    cargaArchivo.save()

    return datosGuardar.id;

  }

  actualizarEstadoCarga = async (id: string, estado: number) => {
    let cargaEspecifica = await TblCargaDatos.findOrFail(id)
    cargaEspecifica.actualizarCargaArchivoConId(estado)
    await cargaEspecifica.save()
  }

  validarNombre = (nombreArchivo: string, tipoDeProceso: any): [string, number] => {
    const arrNombre = nombreArchivo.split('_');
    const entidad = arrNombre[1];
    const convenio = parseInt(arrNombre[2]);

    //TODO: validar entidad(empresa)
    return [entidad, convenio];
  }

  validarRespuesta = (respuestaAxio: any, idCarga: string) => {
    const idRetorno = respuestaAxio.RespuestaMetodo.IdRetorno;
    const archivoLog = respuestaAxio.ArchivoLog;
    if (idRetorno === 0) {
      if (archivoLog === '') {
        return this.actualizarEstadoCarga(idCarga, 2)
      } else if (archivoLog !== '') {
        const archivoRecibido = Buffer.from(archivoLog, "base64")
        this.formatearRespuesta(archivoRecibido.toString(), idCarga)
      }
    } else {
      return this.actualizarEstadoCarga(idCarga, 3)
    }

  }

  guardarErrores = async (idCarga: string, errores: []) => {
    let datosGuardar: LogErrores = {
      id: uuidv4(),
      error: JSON.stringify(errores),
      idCarga,
      tipo: '1',
      estado: true
    }
    let guardarErr = new TblLogsErrores()
    guardarErr.establecerLogErroresDb(datosGuardar)
    await guardarErr.save()
    return this.actualizarEstadoCarga(idCarga, 3)
  }


  async obtenerLogs(parametros: string): Promise<any> {
    try {

      const { id } = JSON.parse(parametros);

      const archivoCargado = await TblCargaDatos.findBy('car_id', id)
      const usuario_id = archivoCargado?.usuario ?? ''

      const usuario = await this.servicioUsuario.obtenerUsuario(usuario_id)



      const logsBd = await TblLogsErrores.query()
        .where('err_carga_datos_id', id)



      const formatearLogs = await generarJsonValidaciones(logsBd[0].error, [])

      const logs = {
        "nombreArchivo": archivoCargado?.nombre,
        "cargadoPor": `${usuario.nombre} ${usuario.apellido}`,
        "fechaYHora": archivoCargado?.createdAt,
        "fechaCorteFinal": archivoCargado?.fechaFinal,
        "fechaCorteInicial": archivoCargado?.fechaInicial,
        "validaciones": formatearLogs.validaciones
      }

      return logs


    } catch (error) {
      //  console.error(error);

    }


  }

  async buscarCargados(parametros: string): Promise<any> {
    let archivos = {};
    try {

      const { usuario, pagina = 1, limite = 5, frase } = JSON.parse(parametros);


      const archivosBd = await TblCargaDatos.query().preload('archivo').preload('estadoCarga')
        .where('car_usuario_id', usuario).whereILike('car_nombre', `%${frase}%`).paginate(pagina, limite)

      let arrArchivos: any = []
      for (const sql of archivosBd) {
        arrArchivos.push({
          idArchivoCargado: sql.id,
          fechaYHora: sql.createdAt,
          nombreArchivo: sql.nombre,
          nombreTipoArchivo: sql.archivo.nombre,
          estadoValidacion: sql.estadoCarga.nombre
        })

      }
      archivos['archivosCargados'] = arrArchivos;
      archivos['paginacion'] = {
        "totalRegistros": archivosBd.getMeta().total,
        "totalPaginas": archivosBd.getMeta().last_page,
        "paginaActual": archivosBd.getMeta().current_page
      };


    } catch (error) {
      console.error(error);

    }

    return archivos;
  }
}
