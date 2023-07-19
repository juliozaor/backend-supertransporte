/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioIndicadores } from 'App/Dominio/Datos/Servicios/ServicioIndicadores'
import { RepositorioIndicadoresDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioIndicadoresDB'
/* import { ServicioRespuestas } from 'App/Dominio/Datos/Servicios/ServicioRespuestas'
import { RepositorioRespuestasDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioRespuestasDB' */

export default class ControladorReporte {
  private service: ServicioIndicadores
  constructor() {
    this.service = new ServicioIndicadores(
      new RepositorioIndicadoresDB()
    )
  }


  public async formularios({ request, response }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const encuestas = await this.service.visualizar(request.all(), payload)
    return encuestas
    /* response.status(200).send({
      "idVigilado": "0000000",
      "idReporte": "7028",
      "idEncuesta": 2,
      "vigencia": "Año de vigencia 2023",
      "formularios": [
        {
          "nombre": "A. Formulario sobre siniestros",
          "subIndicador": [
            {
              "nombreSubIndicador": "Fatalidades",
              "codigo": "1.1",
              "preguntas": [
                {
                  "idPregunta": 6,
                  "pregunta": "Fatalidades segundo trimestre",
                  "obligatoria": true,
                  "respuesta": 1,
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "real",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Heridos graves",
              "codigo": "1.2",
              "preguntas": [
                {
                  "idPregunta": 7,
                  "pregunta": "Heridos graves segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "real",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Heridos leves",
              "codigo": "1.3",
              "preguntas": [
                {
                  "idPregunta": 8,
                  "pregunta": "Heridos leves segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "real",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Choques simples",
              "codigo": "1.4",
              "preguntas": [
                {
                  "idPregunta": 9,
                  "pregunta": "Choques simples segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "real",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Costos directos de fatalidades",
              "codigo": "2.1",
              "preguntas": [
                {
                  "idPregunta": 29,
                  "pregunta": "Costos directos de fatalidades segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "moneda",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Costos indirectos de fatalidades",
              "codigo": "2.2",
              "preguntas": [
                {
                  "idPregunta": 30,
                  "pregunta": "Costos indirectos de fatalidades segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "moneda",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Costos directos de heridos graves",
              "codigo": "2.3",
              "preguntas": [
                {
                  "idPregunta": 31,
                  "pregunta": "Costos directos de heridos graves segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "moneda",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Costos indirectos de heridos graves",
              "codigo": "2.4",
              "preguntas": [
                {
                  "idPregunta": 32,
                  "pregunta": "Costos indirectos de heridos graves segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "moneda",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Costos directos de heridos leves",
              "codigo": "2.5",
              "preguntas": [
                {
                  "idPregunta": 33,
                  "pregunta": "Costos directos de heridos leves segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "moneda",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Costos indirectos de heridos leves",
              "codigo": "2.6",
              "preguntas": [
                {
                  "idPregunta": 34,
                  "pregunta": "Costos indirectos de heridos leves segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "moneda",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Costos directos de choques simples",
              "codigo": "2.7",
              "preguntas": [
                {
                  "idPregunta": 35,
                  "pregunta": "Costos directos de choques simples segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "moneda",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Costos indirectos de choques simples",
              "codigo": "2.8",
              "preguntas": [
                {
                  "idPregunta": 36,
                  "pregunta": "Costos indirectos de choques simples segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "moneda",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            }
          ],
          "evidencias": [
            {
              "idEvidencia": 1,
              "nombre": "Copia de las actas de reunión del comité PESV, donde conste la investigación interna de los siniestros viales ",
              "tipoEvidencia":"FILE",
              "validaciones": {
                "tipoDato": "WinRAR",
                "cantDecimal": 0
              },
              "respuesta":"",
              "documento": "",
              "nombreOriginal": "",
              "ruta": ""
            }
          ]
        },
        {
          "nombre": "B. Formulario Administrativo",
          "subIndicador": [
            {
              "nombreSubIndicador": "Cantidad de metas definidas",
              "codigo": "4.1",
              "preguntas": [
                {
                  "idPregunta": 61,
                  "pregunta": "Cantidad de metas definidas segundo trimestre ",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Cantidad de metas alcanzadas o logradas",
              "codigo": "4.2",
              "preguntas": [
                {
                  "idPregunta": 62,
                  "pregunta": "Cantidad de metas alcanzadas o logradas segundo trimestre ",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Actividades programadas a partir del plan anual de trabajo PESV",
              "codigo": "5.1",
              "preguntas": [
                {
                  "idPregunta": 63,
                  "pregunta": "Actividades programadas a partir del plan anual de trabajo PESV segundo trimestre ",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Actividades ejecutadas a partir del plan anual de trabajo PESV",
              "codigo": "5.2",
              "preguntas": [
                {
                  "idPregunta": 64,
                  "pregunta": "Actividades ejecutadas a partir del plan anual de trabajo PESV segundo trimestre ",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Capacitaciones en seguridad vial programadas",
              "codigo": "11.1",
              "preguntas": [

                {
                  "idPregunta": 225,
                  "pregunta": "Capacitaciones en seguridad vial programadas segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Capacitaciones en seguridad vial programadas",
              "codigo": "11.2",
              "preguntas": [
                {
                  "idPregunta": 226,
                  "pregunta": "Capacitaciones en seguridad vial programadas segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Colaboradores capacitados en seguridad vial",
              "codigo": "12.1",
              "preguntas": [
                {
                  "idPregunta": 227,
                  "pregunta": "Colaboradores capacitados en seguridad vial segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Colaboradores de la organización",
              "codigo": "12.2",
              "preguntas": [
                {
                  "idPregunta": 228,
                  "pregunta": "Colaboradores de la organización segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            }
          ],
          "evidencias": [
            {
              "idEvidencia": 2,
              "nombre": "Certificación del Representante Legal donde se describa el mecanismo empleado para la medición de los riesgos ",
              "tipoEvidencia":"FILE",
              "validaciones": {
                "tipoDato": "pdf",
                "cantDecimal": 0
              },
              "respuesta":"",
              "documento": "",
              "nombreOriginal": "",
              "ruta": ""
            }
          ]
        },
        {
          "nombre": "C. Formulario sobre accidentes",
          "subIndicador": [
            {
              "nombreSubIndicador": "Kilómetros recorridos",
              "codigo": "1.5",
              "preguntas": [
                {
                  "idPregunta": 10,
                  "pregunta": "Kilómetros recorridos segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "real",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Excesos en la jornada diaria de trabajo de los conductores",
              "codigo": "6.1",
              "preguntas": [
                {
                  "idPregunta": 145,
                  "pregunta": "Excesos en la jornada diaria de trabajo de los conductores Sexto mes",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Total de días trabajados por todos los conductores",
              "codigo": "6.2",
              "preguntas": [
                {
                  "idPregunta": 146,
                  "pregunta": "Total de días trabajados por todos los conductores Sexto mes",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Desplazamientos laborales con exceso de velocidad",
              "codigo": "8.1",
              "preguntas": [
                {
                  "idPregunta": 153,
                  "pregunta": "Desplazamientos laborales con exceso de velocidad Sexto mes",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Número total de desplazamientos laborales",
              "codigo": "8.2",
              "preguntas": [
                {
                  "idPregunta": 154,
                  "pregunta": "Número total de desplazamientos laborales Sexto mes",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            }
          ],
          "evidencias": [
            {
              "idEvidencia": 3,
              "nombre": "Listado de rutas de desplazamientos laborales (origen, destino), número de kilometros por ruta",
              "tipoEvidencia":"FILE",
              "validaciones": {
                "tipoDato": "excel",
                "cantDecimal": 0
              },
              "respuesta":"",
              "documento": "",
              "nombreOriginal": "",
              "ruta": ""
            }
          ]
        },
        {
          "nombre": "D. Formulario Vehículos",
          "subIndicador": [
            {
              "nombreSubIndicador": "Vehículos propios incluidos en el programa",
              "codigo": "7.1",
              "preguntas": [
                {
                  "idPregunta": 147,
                  "pregunta": "Vehículos propios incluidos en el programa Sexto mes",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Vehículos propios utilizados para desplazamientos laborales",
              "codigo": "7.2",
              "preguntas": [
                {
                  "idPregunta": 148,
                  "pregunta": "Vehículos propios utilizados para desplazamientos laborales Sexto mes",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Vehículos de contratistas incluidos en el programa",
              "codigo": "7.3",
              "preguntas": [
                {
                  "idPregunta": 149,
                  "pregunta": "Vehículos de contratistas incluidos en el programa Sexto mes",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Vehículos de contratistas utilizados para desplazamientos laborales",
              "codigo": "7.4",
              "preguntas": [
                {
                  "idPregunta": 150,
                  "pregunta": "Vehículos de contratistas utilizados para desplazamientos laborales Sexto mes",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Vehículos de terceros incluidos en el programa",
              "codigo": "7.5",
              "preguntas": [
                {
                  "idPregunta": 151,
                  "pregunta": "Vehículos de terceros incluidos en el programa Sexto mes",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Vehículos de terceros utilizados para desplazamientos laborales",
              "codigo": "7.6",
              "preguntas": [
                {
                  "idPregunta": 152,
                  "pregunta": "Vehículos de terceros utilizados para desplazamientos laborales Sexto mes",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Promedio de vehículos inspeccionados diariamente",
              "codigo": "9.1",
              "preguntas": [
                {
                  "idPregunta": 155,
                  "pregunta": "Promedio de vehículos inspeccionados diariamente Sexto mes",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Promedio de vehículos que operan diariamente",
              "codigo": "9.2",
              "preguntas": [
                {
                  "idPregunta": 156,
                  "pregunta": "Promedio de vehículos que operan diariamente Sexto mes",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Actividades de mantenimiento programadas a los vehículos con los cuales se presta el servicio",
              "codigo": "10.1",
              "preguntas": [
                {
                  "idPregunta": 223,
                  "pregunta": "Actividades de mantenimiento programadas a los vehículos con los cuales se presta el servicio segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            },
            {
              "nombreSubIndicador": "Actividades de mantenimiento ejecutadas a los vehículos con los cuales se presta el servicio",
              "codigo": "10.2",
              "preguntas": [
                {
                  "idPregunta": 224,
                  "pregunta": "Actividades de mantenimiento ejecutadas a los vehículos con los cuales se presta el servicio segundo trimestre",
                  "obligatoria": true,
                  "respuesta": "",
                  "tipoDeEvidencia": "",
                  "documento": "",
                  "nombreOriginal": "",
                  "ruta": "",
                  "adjuntable": false,
                  "adjuntableObligatorio": false,
                  "tipoPregunta": "NUMBER",
                  "valoresPregunta": [],
                  "validaciones": {
                    "tipoDato": "porcentaje",
                    "cantDecimal": 1
                  },
                  "observacion": "",
                  "cumple": "",
                  "observacionCumple": "",
                  "corresponde": "",
                  "observacionCorresponde": ""
                }
              ]
            }
          ],
          "evidencias": [
            {
              "idEvidencia": 4,
              "nombre": "Desplazamientos laborales realizados",
              "tipoEvidencia":"NUMBER",
              "validaciones": {
                "tipoDato": "real",
                "cantDecimal": 1
              },
              "respuesta":"3",
              "documento": "",
              "nombreOriginal": "",
              "ruta": ""
            }
          ]
        }
      ]
    }) */
  }


  public async respuestas({ request, response }: HttpContextContract) {
    /*   response.status(200).send({
      mensaje: "Formulario guardado correctamente"
    })  */
    const payload = await request.obtenerPayloadJWT()
    const respuesta = await this.service.guardar(JSON.stringify(request.all()), payload)

    response.status(200).send(respuesta)
  }

  public async enviar({ request, response }: HttpContextContract) {
    /* response.status(200).send({
      aprobado:true, faltantes:[]
  }) */ 
    const payload = await request.obtenerPayloadJWT()
    const enviado = await this.service.enviarSt(request.all(), payload)
    if (enviado && !enviado.aprobado) {
      return response.status(400).send(enviado)
    }
    return enviado
  }



}
