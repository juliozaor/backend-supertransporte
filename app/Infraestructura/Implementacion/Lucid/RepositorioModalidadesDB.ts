
import { RepositorioModalidad } from 'App/Dominio/Repositorios/RepositorioModalidad'
import { Paginador } from '../../../Dominio/Paginador';
import { Modalidad } from 'App/Dominio/Datos/Entidades/Modalidad';
import TblModalidades from 'App/Infraestructura/Datos/Entidad/modalidad';
import TblTiposCategorias from 'App/Infraestructura/Datos/Entidad/TipoCategoria';
import { ModalidadRadio } from 'App/Dominio/Datos/Entidades/ModalidadRadio';
import Database from '@ioc:Adonis/Lucid/Database';
import TblModalidadesRadios from 'App/Infraestructura/Datos/Entidad/ModalidadRadio';
import TblFilasColumnas from 'App/Infraestructura/Datos/Entidad/FilasColumnas';
import TblDetallesClasificaciones from 'App/Infraestructura/Datos/Entidad/detalleClasificacion';
import TblClasificacionesUsuario from 'App/Infraestructura/Datos/Entidad/ClasificacionesUsuario';

export class RepositorioModalidadDB implements RepositorioModalidad {

  async obtenerModalidades(): Promise<{ modalidades: Modalidad[] }> {
    const modalidades: Modalidad[] = []
    const modalidadDB = await TblModalidades.query().orderBy('nombre', 'asc')
    modalidadDB.forEach(modalidadDB => {
      modalidades.push(modalidadDB.obtenerModalidad())
    })
    return { modalidades }
  }

  async filtros(idUsuario: string): Promise<{}> {
    if (!idUsuario) return { mensaje: 'Usuario requerido' }

    const cabecerasModalidades = [
      {
        nombre: "Modalidad",
        leyenda: ''
      },
      {
        nombre: "Radio de acción u operación",
        leyenda: 'Para la identificación de el radio de acción en el formulario orientar al Capitulo II de la Resolución MT Nro. 20223040040595'
      }];
    const filasModalidades: any[] = [];

    const modalidades = await TblModalidades.query().preload('radios', (sql) => {
      sql.where('tmr_usuario_id', idUsuario)
    }).has('radios')

    //Modalidades Radios
    modalidades.forEach(modalidad => {
      modalidad.radios.forEach(radio => {
        filasModalidades.push({
          id: radio.$extras.pivot_tmr_id,
          modalidad: modalidad.nombre,
          radio: radio.nombre
        })
      });

    });

    const modalidadRadio = {
      cabeceras: cabecerasModalidades,
      filas: filasModalidades
    };

    //Tipos Categoria
    const tipoCategoria: any[] = [];
    const tiposCategoria = await TblTiposCategorias.query().preload('categoriaClasificacion', (sqlCat) => {
      sqlCat.preload('filaClasificacion', (sqlFila) => {
        sqlFila.preload('filasColumas', (sqlFilaCol) => {
          sqlFilaCol.preload('detalles', (sqlDet) => {
            sqlDet.where('usuarioId', idUsuario)
          })
        }).preload('filasColumnasDet')
      })
    }).orderBy('orden', 'asc')

    tiposCategoria.forEach(tipCategoria => {
      // console.log(tipoCategoria); //conductores
      const categoriaClasificacion: any[] = [];
      tipCategoria.categoriaClasificacion.forEach(catClasificacion => {
        //  console.log(catClasificacion); //Tipo contratación'

        const cabeceras: any[] = [];
        const filas: any[] = [];
        catClasificacion.filaClasificacion.forEach(filClasificacion => {
          const datos: any[] = [];
          filClasificacion.filasColumas.forEach(filColumas => {
            if (filColumas.detalles.length >= 1) {
              datos.push({
                idFila: filClasificacion.id,
                idColumna: filColumas.columnaClasificacionId,
                //idDetalle: (filColumas.detalles[0].id)??'',
                valor: parseInt((filColumas.detalles[0].valor) ?? 0),
                estado: filColumas.estado
              })
            } else {
              datos.push({
                idFila: filClasificacion.id,
                idColumna: filColumas.columnaClasificacionId,
                //  idDetalle:null,
                valor: null,
                estado: filColumas.estado
              })
            }
          });

          filas.push(
            {
              nombre: filClasificacion.nombre,
              datos
            }
          )



          filClasificacion.filasColumnasDet.forEach(filColumnasDet => {
            if (!cabeceras.includes(filColumnasDet.nombre)) {
              cabeceras.push(filColumnasDet.nombre)
            }
          });


        });

        categoriaClasificacion.push({
          id: catClasificacion.id,
          nombre: catClasificacion.nombre,
          titulo: catClasificacion.titulo,
          orden: catClasificacion.orden,
          cabeceras,
          filas
        })

      });

      tipoCategoria.push({
        idTipo: tipCategoria.id,
        nombre: tipCategoria.nombre,
        orden: tipCategoria.orden,
        categoriaClasificacion
      })

    });


    return { modalidadRadio, tipoCategoria }
  }

  async crearActualizar(idUsuario: string, datosIn: string): Promise<{}> {
    const { modalidadesRadio, datos, modalidadesRadioEliminar, totales } = JSON.parse(datosIn);
    const totalConductores = totales.conductores;
    const totalVehiculos = totales.vehiculos;

    //Guardar Modalidades Radios
    if (modalidadesRadio.length >= 1) {
      //const datosMR: ModalidadRadio[] = [];
      modalidadesRadio.forEach(async mr => {
        // buscar si existe y guardar sino
        const modalidad = await TblModalidadesRadios.query().where({ 'tmr_modalidad_id': mr.idModalidad, 'tmr_radio_id': mr.idRadio, 'tmr_usuario_id': idUsuario }).first()

        if (!modalidad) {
          const modalidadesRadiosBd = new TblModalidadesRadios();
          modalidadesRadiosBd.establecerModalidadRadioDb({
            modalidadId: mr.idModalidad,
            radioId: mr.idRadio,
            usuarioId: idUsuario,
            estado: true
          })

          modalidadesRadiosBd.save();
        }

      });

    }

    //Eliminar Modalidades
    if (modalidadesRadioEliminar.length >= 1) {
      try {
        await Database.from('tbl_modalidades_radios').whereIn('tmr_id', modalidadesRadioEliminar).delete();
      } catch (error) {
        console.log(error);
      }

    }


    if (datos.length >= 1) {
      datos.forEach(async dato => {

        const filaColumna = await TblFilasColumnas.query().where({ 'cls_fila_clasificacion_id': dato.idFila, 'cls_columna_clasificacion_id': dato.idColumna }).first()
        if (filaColumna) {
          const detalle = await TblDetallesClasificaciones.query().where({ 'tdc_fila_columna_id': filaColumna.id, 'tdc_usuario_id': idUsuario }).first()
          //  const detalleClasificacion = new TblDetallesClasificaciones();
          if (detalle) {

            detalle.estableceDetalleDetalleClasificacionConId({
              valor: dato.valor,
              filaColumnaId: detalle.filaColumnaId,
              usuarioId: detalle.usuarioId
            })

            detalle.save();

          } else {

            const detalleClasificacion = new TblDetallesClasificaciones();
            detalleClasificacion.estableceDetalleDetalleClasificacionConId({
              valor: dato.valor,
              filaColumnaId: filaColumna.id,
              usuarioId: idUsuario
            })
            detalleClasificacion.save();
          }


        }

      });


    }


    //Clasificar
    const { nombre, clasificado } = await this.clasificar(totalConductores, totalVehiculos, idUsuario);

    return { nombre, clasificado }

  }

  clasificar = async (totalConductores: number, totalVehiculos: number, idUsuario: string) => {

    let idClasificado: number = 4;
    let clasificado: boolean = true;
    let nombre = 'Sin clasificar';
    /*  if ((totalVehiculos >= 11 && totalVehiculos <= 19) || (totalConductores >= 2 && totalConductores <= 19)) {
       console.log("entro 1");
 
       idClasificado = 1;
       nombre = 'Básico';
     } else */
     if (totalVehiculos > 50 || totalConductores > 50) {
      console.log("entro 3");
      idClasificado = 3;
      nombre = 'Avanzado';
    }else

    if ((totalVehiculos >= 20 && totalVehiculos <= 50) || (totalConductores >= 20 && totalConductores <= 50)) {
      console.log("entro 2");
      idClasificado = 2;
      nombre = 'Estándar';
    } else {
        idClasificado = 1;
        nombre = 'Básico';
      }

    /*     if (totalVehiculos <= 10 || totalConductores <= 1) {
          console.log("entro 4");
          clasificado = false;
        } */

    const estaClasificado = await TblClasificacionesUsuario.query().where('clu_usuario_id', idUsuario).first();
    if (!estaClasificado) {
      const clasificacionUsuario = new TblClasificacionesUsuario()
      clasificacionUsuario.estableceClasificacionesUsuarioConId({
        usuarioId: idUsuario,
        clasificacionId: idClasificado,
        estado: clasificado, 
        vehiculos: totalVehiculos,
        conductores: totalConductores
      })
      clasificacionUsuario.save()
    }

    if (estaClasificado) {
      estaClasificado.estableceClasificacionesUsuarioConId({
        usuarioId: idUsuario,
        clasificacionId: idClasificado,
        estado: clasificado, 
        vehiculos: totalVehiculos,
        conductores: totalConductores
      })
      estaClasificado.save()
    }


    return { nombre, clasificado }
  }


}
