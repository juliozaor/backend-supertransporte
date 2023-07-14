import { RepositorioIndicador } from 'App/Dominio/Repositorios/RepositorioIndicador';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import TblRespuestas from 'App/Infraestructura/Datos/Entidad/Respuesta';
import { ServicioAuditoria } from 'App/Dominio/Datos/Servicios/ServicioAuditoria';
import { DateTime } from 'luxon';
import { TblFormulariosIndicadores } from 'App/Infraestructura/Datos/Entidad/FormularioIndicadores';
import { TblDetalleDatos } from 'App/Infraestructura/Datos/Entidad/DetalleDatos';
import { DetalleDatos } from 'App/Dominio/Datos/Entidades/DetalleDatos';


export class RepositorioIndicadoresDB implements RepositorioIndicador {
  private servicioAuditoria = new ServicioAuditoria();


  async visualizar(params: any): Promise<any> {
    const { idUsuario, idVigilado, idReporte } = params;
    //let tipoAccion = (idUsuario === idVigilado) ? 2 : 1;
    const formularios: any = [];
    const reporte = await TblReporte.findOrFail(idReporte)

    const consulta = TblFormulariosIndicadores.query()
    let vigencia = '';

    consulta.preload('subIndicadores', subIndicador => {
      if (reporte && reporte.anioVigencia == 2023) {
        vigencia = `Año de vigencia ${reporte.anioVigencia}`
        subIndicador.preload('datosIndicadores', datos => {
          datos.preload('detalleDatos', detalle => {
            detalle.where('ddt_reporte_id', idReporte)
          })
          datos.where('dai_visible', true)
        })
      } else {
        subIndicador.preload('datosIndicadores', datos => {
          datos.preload('detalleDatos', detalle => {
            detalle.where('ddt_reporte_id', idReporte)
          })
        })

      }
      subIndicador.preload('periodo')

    })

    const formulariosBD = await consulta

    formulariosBD.forEach(formulario => {
      const nombre = formulario.nombre
      const subIndicador: any = [];
      formulario.subIndicadores.forEach(subInd => {
        const preguntas: any = []
        subInd.datosIndicadores.forEach(datos => {
          preguntas.push({
            idPregunta: datos.id,
            pregunta: datos.nombre,
            obligatoria: true,
            respuesta: datos.detalleDatos[0]?.valor ?? '',
            tipoDeEvidencia: "",
            documento: "",
            nombreOriginal: "",
            ruta: "",
            adjuntable: false,
            adjuntableObligatorio: false,
            tipoPregunta: "NUMBER",
            valoresPregunta: [],
            validaciones: {
              tipoDato: subInd.periodo.tipo,
              cantDecimal: subInd.periodo.decimal
            },
            observacion: "",
            cumple: "",
            observacionCumple: "",
            corresponde: "",
            observacionCorresponde: ""
          })
        });
        subIndicador.push({
          nombreSubIndicador: subInd.nombre,
          codigo: subInd.codigo,
          preguntas
        })
      });
      formularios.push({
        nombre,
        subIndicador
      })

    });

    return { 
      idVigilado, idReporte ,
      idEncuesta: reporte.idEncuesta,
      vigencia, 
      formularios }
  }

    async enviarSt(params: any): Promise<any> {
      const { idEncuesta, idReporte, idVigilado, idUsuario } = params
      
        let aprobado = true;
      const faltantes = new Array();
      const respuestas = await TblRespuestas.query().where('id_reporte', idReporte).orderBy('id_pregunta', 'asc')
      pasos?.forEach(paso => {
        paso.pregunta.forEach(preguntaPaso => {
          let repuestaExiste = true
          let archivoExiste = true
          const respuesta = respuestas.find(r => r.idPregunta === preguntaPaso.id)
          if (preguntaPaso.obligatoria) {
            if (!respuesta) {
              //throw new NoAprobado('Faltan preguntas por responder')     
              repuestaExiste = false
            }
  
            if (respuesta && respuesta.valor === 'N' && respuesta.observacion === '') {
              repuestaExiste = false
            }
  
  
            if (respuesta && respuesta.valor === 'S' && preguntaPaso.adjuntableObligatorio) {
              console.log(respuesta.observacion);
  
              archivoExiste = this.validarDocumento(respuesta, preguntaPaso);
            }
  
          }
  
  
          if (!repuestaExiste || !archivoExiste) {
            aprobado = false
            faltantes.push({
              preguntaId: preguntaPaso.id,
              archivoObligatorio: preguntaPaso.adjuntableObligatorio
            })
  
          }
  
  
        });
  
      });
  
      if (aprobado) {
        this.servicioEstado.Log(idUsuario, 1004, idEncuesta)
        const reporte = await TblReporte.findOrFail(idReporte)
        reporte.fechaEnviost = DateTime.fromJSDate(new Date())
        reporte.envioSt = '1'
        reporte.estadoVerificacionId = 1004
        reporte.save();
      }
  
      return { aprobado, faltantes }
  
    }

 
  async guardar(datos: string, documento: string): Promise<any> {
    const { respuestas, reporteId } = JSON.parse(datos);

    //const { usuarioCreacion, loginVigilado, idEncuesta } = await TblReporte.findByOrFail('id', idReporte)

    /*   this.servicioEstado.Log(loginVigilado, 1003, idEncuesta, idReporte)
      this.servicioAuditoria.Auditar({
        accion: "Guardar Respuesta",
        modulo: "Encuesta",
        usuario: usuarioCreacion ?? '',
        vigilado: loginVigilado ?? '',
        descripcion: 'Primer guardado de la encuesta',
        encuestaId: idEncuesta,
        tipoLog: 4
      }) */

    respuestas.forEach(async respuesta => {
      //Evaluar si el archivo en la tabla temporal y borrarlo
      //validar si existe
      //   const existeRespuesta = await TblRespuestas.query().where({ 'id_pregunta': respuesta.preguntaId, 'id_reporte': idReporte }).first()

      const existeDatos = await TblDetalleDatos.query().where({ 'ddt_dato_indicador_id': respuesta.preguntaId, 'ddt_reporte_id': reporteId }).first()

      let data: DetalleDatos = {
        datoIndicadorId: respuesta.preguntaId,
        valor: respuesta.valor,
        reporteId: reporteId,
        fechaActualizacion: DateTime.fromJSDate(new Date),
        anioActivoId: 2023
      }

       if (respuesta.documento) {
         data.documento = respuesta.documento
       }
       if (respuesta.nombreArchivo) {
         data.nombredocOriginal = respuesta.nombreArchivo
       }
       if (respuesta.ruta) {
         data.ruta = respuesta.ruta
       }
       if (respuesta.observacion) {
         data.observacion = respuesta.observacion
       }

      if (existeDatos) {
        existeDatos.estableceDetalleDatosConId(data)
        const respuesta = await existeDatos.save();


      /*   this.servicioAuditoria.Auditar({
          accion: "Actualizar Respuesta",
          modulo: "Encuesta",
          jsonAnterior: JSON.stringify(existeRespuesta.$attributes),
          jsonNuevo: JSON.stringify(respuesta.$attributes),
          usuario: usuarioCreacion ?? '',
          vigilado: loginVigilado ?? '',
          descripcion: 'Actualización de respuesta',
          encuestaId: idEncuesta
        }) */


      } else {
        const respuestaDB = new TblDetalleDatos();
        respuestaDB.establecerDetalleDatosDb(data)
        respuestaDB.save();
      }


    });


    return {
      mensaje: "Formulario guardado correctamente"
    }


  }

}
