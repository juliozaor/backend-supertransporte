import { RepositorioModalidad } from "App/Dominio/Repositorios/RepositorioModalidad";
import { Paginador } from "../../../Dominio/Paginador";
import { Modalidad } from "App/Dominio/Datos/Entidades/Modalidad";
import TblModalidades from "App/Infraestructura/Datos/Entidad/modalidad";
import TblTiposCategorias from "App/Infraestructura/Datos/Entidad/TipoCategoria";
import { ModalidadRadio } from "App/Dominio/Datos/Entidades/ModalidadRadio";
import Database from "@ioc:Adonis/Lucid/Database";
import TblModalidadesRadios from "App/Infraestructura/Datos/Entidad/ModalidadRadio";
import TblFilasColumnas from "App/Infraestructura/Datos/Entidad/FilasColumnas";
import TblDetallesClasificaciones from "App/Infraestructura/Datos/Entidad/detalleClasificacion";
import TblClasificacionesUsuario from "App/Infraestructura/Datos/Entidad/ClasificacionesUsuario";
import { ServicioEstadosEmpresas } from "App/Dominio/Datos/Servicios/ServicioEstadosEmpresas";
import ErroresEmpresa from "App/Exceptions/ErroresEmpresa";
import TblRadioAccion from "App/Infraestructura/Datos/Entidad/RadioAccion";
import { TblAnioVigencias } from "App/Infraestructura/Datos/Entidad/AnioVigencia";

export class RepositorioModalidadDB implements RepositorioModalidad {
  private servicioEmpresa = new ServicioEstadosEmpresas();

  async obtenerModalidades(): Promise<{ modalidades: Modalidad[] }> {
    const modalidades: Modalidad[] = [];
    const modalidadDB = await TblModalidades.query().orderBy("nombre", "asc");
    modalidadDB.forEach((modalidadDB) => {
      modalidades.push(modalidadDB.obtenerModalidad());
    });
    return { modalidades };
  }

  async filtros(idUsuario: string): Promise<{}> {
    if (!idUsuario) return { mensaje: "Usuario requerido" };

    const cabecerasModalidades = [
      {
        nombre: "Modalidad",
        leyenda: "",
      },
      {
        nombre: "Radio de acción u operación",
        leyenda:
          "Para la identificación de el radio de acción en el formulario orientar al Capitulo II de la Resolución MT Nro. 20223040040595",
      },
    ];
    const filasModalidades: any[] = [];

    const anioVigencia = await TblAnioVigencias.query()
    .where("anv_estado", true)
    .orderBy("anv_id", "desc")
    .select("anv_anio")
    .first();


    const modalidades = await TblModalidades.query()
      .preload("radios", (sql) => {
        sql.where({"tmr_usuario_id": idUsuario, 'tmr_vigencia': anioVigencia?.anio});
      })
      .has("radios");

    //Modalidades Radios
    modalidades.forEach((modalidad) => {
      modalidad.radios.forEach((radio) => {
        filasModalidades.push({
          id: radio?.$extras?.pivot_tmr_id,
          modalidad: modalidad.nombre,
          radio: radio.nombre,
        });
      });
    });

    const modalidadRadio = {
      cabeceras: cabecerasModalidades,
      filas: filasModalidades,
    };

    //Tipos Categoria
    const tipoCategoria: any[] = [];
    const tiposCategoria = await TblTiposCategorias.query()
      .preload("categoriaClasificacion", (sqlCat) => {
        sqlCat.preload("filaClasificacion", (sqlFila) => {
          sqlFila
            .preload("filasColumas", (sqlFilaCol) => {
              sqlFilaCol.preload("detalles", (sqlDet) => {
                sqlDet.where({"usuarioId": idUsuario, 'vigencia':anioVigencia?.anio});
              });
            })
            .preload("filasColumnasDet");
        });
      })
      .orderBy("orden", "asc");

    tiposCategoria.forEach((tipCategoria) => {
      // console.log(tipoCategoria); //conductores
      const categoriaClasificacion: any[] = [];
      tipCategoria.categoriaClasificacion.forEach((catClasificacion) => {
        //  console.log(catClasificacion); //Tipo contratación'

        const cabeceras: any[] = [];
        const filas: any[] = [];
        catClasificacion.filaClasificacion.forEach((filClasificacion) => {
          const datos: any[] = [];
          filClasificacion.filasColumas.forEach((filColumas) => {
            if (filColumas.detalles.length >= 1) {
              datos.push({
                idFila: filClasificacion.id,
                idColumna: filColumas.columnaClasificacionId,
                //idDetalle: (filColumas.detalles[0].id)??'',
                valor: parseInt(filColumas.detalles[0].valor ?? 0),
                estado: filColumas.estado,
              });
            } else {
              datos.push({
                idFila: filClasificacion.id,
                idColumna: filColumas.columnaClasificacionId,
                //  idDetalle:null,
                valor: null,
                estado: filColumas.estado,
              });
            }
          });

          filas.push({
            nombre: filClasificacion.nombre,
            datos,
          });

          filClasificacion.filasColumnasDet.forEach((filColumnasDet) => {
            if (!cabeceras.includes(filColumnasDet.nombre)) {
              cabeceras.push(filColumnasDet.nombre);
            }
          });
        });

        categoriaClasificacion.push({
          id: catClasificacion.id,
          nombre: catClasificacion.nombre,
          titulo: catClasificacion.titulo,
          orden: catClasificacion.orden,
          cabeceras,
          filas,
        });
      });

      tipoCategoria.push({
        idTipo: tipCategoria.id,
        nombre: tipCategoria.nombre,
        orden: tipCategoria.orden,
        categoriaClasificacion,
      });
    });

    return { modalidadRadio, tipoCategoria };
  }

  async crearActualizar(idUsuario: string, datosIn: string): Promise<{}> {
    const { modalidadesRadio, datos, modalidadesRadioEliminar, totales } =
      JSON.parse(datosIn);
    const totalConductores = totales.conductores;
    const totalVehiculos = totales.vehiculos;


    const anioVigencia = await TblAnioVigencias.query()
    .where("anv_estado", true)
    .orderBy("anv_id", "desc")
    .select("anv_anio")
    .first();



    //Guardar Modalidades Radios
    if (modalidadesRadio.length >= 1) {
      //const datosMR: ModalidadRadio[] = [];
      modalidadesRadio.forEach(async (mr) => {
        // buscar si existe y guardar sino
        const modalidad = await TblModalidadesRadios.query()
          .where({
            tmr_modalidad_id: mr.idModalidad,
            tmr_radio_id: mr.idRadio,
            tmr_usuario_id: idUsuario,
            tmr_vigencia: anioVigencia?.anio,
          })
          .first();

        if (!modalidad) {
          const modalidadesRadiosBd = new TblModalidadesRadios();
          modalidadesRadiosBd.establecerModalidadRadioDb({
            modalidadId: mr.idModalidad,
            radioId: mr.idRadio,
            usuarioId: idUsuario,
            estado: true,
            vigencia: anioVigencia?.anio!
          });

          modalidadesRadiosBd.save();
        }
      });
    }

    //Eliminar Modalidades
    if (modalidadesRadioEliminar.length >= 1) {
      try {
        await Database.from("tbl_modalidades_radios")
          .whereIn("tmr_id", modalidadesRadioEliminar)
          .delete();
      } catch (error) {
        console.log(error);
      }
    }

    if (datos.length >= 1) {
      datos.forEach(async (dato) => {
        const filaColumna = await TblFilasColumnas.query()
          .where({
            cls_fila_clasificacion_id: dato.idFila,
            cls_columna_clasificacion_id: dato.idColumna,
          })
          .first();
        if (filaColumna) {
          const detalle = await TblDetallesClasificaciones.query()
            .where({
              tdc_fila_columna_id: filaColumna.id,
              tdc_usuario_id: idUsuario,
              tdc_vigencia: anioVigencia?.anio
            })
            .first();
          //  const detalleClasificacion = new TblDetallesClasificaciones();
          if (detalle) {
            detalle.estableceDetalleDetalleClasificacionConId({
              valor: dato.valor,
              filaColumnaId: detalle.filaColumnaId,
              usuarioId: detalle.usuarioId,
              vigencia: anioVigencia?.anio!
            });

            detalle.save();
          } else {
            const detalleClasificacion = new TblDetallesClasificaciones();
            detalleClasificacion.estableceDetalleDetalleClasificacionConId({
              valor: dato.valor,
              filaColumnaId: filaColumna.id,
              usuarioId: idUsuario,
              vigencia: anioVigencia?.anio!
            });
            detalleClasificacion.save();
          }
        }
      });
    }

    //Clasificar
    const { nombre, clasificado } = await this.clasificar(
      totalConductores,
      totalVehiculos,
      idUsuario,
      anioVigencia?.anio!
    );

    return { nombre, clasificado };
  }

  clasificar = async (
    totalConductores: number,
    totalVehiculos: number,
    idUsuario: string,
    vigencia:number
  ) => {
    let idClasificado;
    let clasificado: boolean = true;
    let nombre = "";
    

    const modalidad = await TblModalidadesRadios.query()
      .whereIn("tmr_modalidad_id", [1, 2, 3, 4])
      .andWhere({"tmr_usuario_id": idUsuario,'tmr_vigencia':vigencia});

    if (modalidad.length >= 1) {
      if (totalVehiculos > 50 || totalConductores > 50) {
        idClasificado = 3;
        nombre = "Avanzado";
      } else if (
        (totalVehiculos >= 20 && totalVehiculos <= 50) ||
        (totalConductores >= 20 && totalConductores <= 50)
      ) {
        idClasificado = 2;
        nombre = "Estándar";
      } else {
        idClasificado = 1;
        nombre = "Básico";
      }
    } else {
      if (totalVehiculos > 100 || totalConductores > 100) {
        idClasificado = 3;
        nombre = "Avanzado";
      } else if (
        (totalVehiculos >= 50 && totalVehiculos <= 100) ||
        (totalConductores >= 50 && totalConductores <= 100)
      ) {
        idClasificado = 2;
        nombre = "Estándar";
      } else {
        idClasificado = 1;
        nombre = "Básico";
      }
    }

    const estaClasificado = await TblClasificacionesUsuario.query()
      .where({"usuarioId": idUsuario,'vigencia':vigencia})
      .first();
    if (!estaClasificado) {
      const clasificacionUsuario = new TblClasificacionesUsuario();
      clasificacionUsuario.estableceClasificacionesUsuarioConId({
        usuarioId: idUsuario,
        clasificacionId: idClasificado,
        estado: clasificado,
        vehiculos: totalVehiculos,
        conductores: totalConductores,
        vigencia
      });
      clasificacionUsuario.save();
    }

    if (estaClasificado) {
      estaClasificado.estableceClasificacionesUsuarioConId({
        usuarioId: idUsuario,
        clasificacionId: idClasificado,
        estado: clasificado,
        vehiculos: totalVehiculos,
        conductores: totalConductores,
        vigencia
      });
      estaClasificado.save();
    }

    return { nombre, clasificado };
  };

  async filtrar(idUsuario: string, idEmpresa: string): Promise<{}> {
    const { nombre, clasificado } = await this.verificarClasificacion(
      idUsuario
    );
    if (clasificado) {
      return { nombre, clasificado };
    }

    this.servicioEmpresa.Log(idUsuario, idEmpresa, 1, 3001);
    return this.filtros(idUsuario);
  }

  async guardar(
    idUsuario: string,
    datosIn: string,
    idEmpresa: string
  ): Promise<{}> {
     /* const { nombre, clasificado } = await this.verificarClasificacion(
      idUsuario
    );
    if (clasificado) {
      return { nombre, clasificado };
    } */

    
    const { modalidadesRadio } = JSON.parse(datosIn);
    if(!modalidadesRadio){
      throw new ErroresEmpresa('Es necesario cargar minimo una modalidad',400)
    }
    for await (const modalidadRadio of modalidadesRadio) {
      if(modalidadRadio.idModalidad === '' || modalidadRadio.idRadio === ''){
        throw new ErroresEmpresa('Es necesario cargar minimo una modalidad',400)
      }
        const modalidad = await TblModalidades.find(modalidadRadio.idModalidad);
        if (!modalidad) {
          throw new ErroresEmpresa('error al cargar la modalidad, verifique los IDs',400)
        }
  
        const radio = await TblRadioAccion.find(modalidadRadio.idRadio);
        if (!radio) {
          throw new ErroresEmpresa('error al cargar la modalidad, verifique los IDs',400)
        }
    }

    this.servicioEmpresa.Log(idUsuario, idEmpresa, 1, 3002);
    return this.crearActualizar(idUsuario, datosIn);
  }

  verificarClasificacion = async (idUsuario: string): Promise<any> => {
    const anioVigencia = await TblAnioVigencias.query()
    .where("anv_estado", true)
    .orderBy("anv_id", "desc")
    .select("anv_anio")
    .first();


    const estaClasificado = await TblClasificacionesUsuario.query()
      .preload("clasificacion")
      .where({ usuarioId: idUsuario, estado: true, vigencia:anioVigencia?.anio })
      .first();

      
    if (!estaClasificado) {
      return { nombre: "", clasificado: false };
    }

    return { nombre: estaClasificado.clasificacion.nombre, clasificado: true };
  };
}
