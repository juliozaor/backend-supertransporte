/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/* import { ServicioRespuestas } from 'App/Dominio/Datos/Servicios/ServicioRespuestas'
import { RepositorioRespuestasDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioRespuestasDB' */

export default class ControladorReporte {
/*   private service: ServicioRespuestas
  constructor () {
    this.service = new ServicioRespuestas(
      new RepositorioRespuestasDB()
    )
  } */

  public async formularios ({ request, response }:HttpContextContract) {
    response.status(200).send({
      "vigencia": "Año de vigencia 2023",
      "formularios": [{
          "nombre": "A. Siniestros",
          "subIndicador": [{
              "nombreSubIndicador": "Fatalidades",
              "codigo": 1.1,
              "preguntas": [{
                  "idPregunta": 1,
                  "pregunta": "Fatalidades trimenstre Enero - Marzo",
                  "obligatoria": true,
                  "respuesta": "S",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato":"real",
                    "cantDecimal":1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
              }, {
                  "idPregunta": 2,
                  "pregunta": "Fatalidades trimenstre abril - junio",
                  "obligatoria": true,
                  "respuesta": "S",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato":"real",
                    "cantDecimal":1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
              }]
          }, {
              "nombreSubIndicador": "Heridos graves",
              "codigo": 1.2,
              "preguntas": [{
                  "idPregunta": 4,
                  "pregunta": "Heridos graves trimenstre Enero - Marzo",
                  "obligatoria": true,
                  "respuesta": "S",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato":"real",
                    "cantDecimal":1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
              }, {
                  "idPregunta": 5,
                  "pregunta": "Heridos graves trimenstre abril - junio",
                  "obligatoria": true,
                  "respuesta": "S",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato":"entero",
                    "cantDecimal":0
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
              }]
          }]
      }, {
          "nombre": "B. Administrativo",
          "subIndicador": [{
              "nombreSubIndicador": "Cantidad de riesgos identificados al inicio del año",
              "codigo": 3.1,
              "preguntas": [{
                  "idPregunta": 5,
                  "pregunta": "Cantidad de riesgos identificados al inicio del año, Enero - Diciembre",
                  "obligatoria": true,
                  "respuesta": "S",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato":"entero",
                    "cantDecimal":0
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
              }]
          }, {
              "nombreSubIndicador": "Cantidad de metas alcanzadas o logradas",
              "codigo": 4.2,
              "preguntas": [{
                  "idPregunta": 7,
                  "pregunta": "Cantidad de metas alcanzadas o logradas Enero - Marzo",
                  "obligatoria": true,
                  "respuesta": "S",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato":"entero",
                    "cantDecimal":0
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
              }, {
                  "idPregunta": 8,
                  "pregunta": "Cantidad de metas alcanzadas o logradas abril - junio",
                  "obligatoria": true,
                  "respuesta": "S",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato":"entero",
                    "cantDecimal":0
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
              }]
          }]
      }]
  })
  }


  public async respuestas ({ request, response }:HttpContextContract) {
      response.status(200).send({
      mensaje: "Formulario guardado correctamente"
    }) 
  }

  public async enviar ({ request, response }:HttpContextContract) {
    response.status(200).send({
      aprobado:true, faltantes:[]
  }) 
}



}
