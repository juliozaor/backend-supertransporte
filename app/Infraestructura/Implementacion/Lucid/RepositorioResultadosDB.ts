
import { RepositorioResultado } from 'App/Dominio/Repositorios/RepositorioResultado';
import { TblIndicadores } from 'App/Infraestructura/Datos/Entidad/Indicadores';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
export class RepositorioResultadosDB implements RepositorioResultado {

  async generar(datos: string, documento: string): Promise<any> {
    const { idReporte, idVigilado } = JSON.parse(datos);
    const indicadoresArr = new Array();
    const datosCalcular = new Array();
    const indicadoresBD = await TblIndicadores.query().preload('subIndicadores', sqlSub => {
      sqlSub.preload('datosIndicadores', subDatos => {
        subDatos.preload('detalleDatos', sqlDetalle => {
          if (idReporte) {
            sqlDetalle.where('ddt_reporte_id', idReporte)
          }
        })
       /*  if (idMes) {
          subDatos.where('dai_meses', idMes)
        } */
      })
      sqlSub.preload('periodo')

    })
    if (indicadoresBD) {
      indicadoresBD.forEach(indicador => {
        /*   let obj = {} as any;
        obj['nombre'] = indicador.nombre; */
        let valida = true
        indicador.subIndicadores.forEach(subIndicador => {
          subIndicador.datosIndicadores.forEach(datosIndicador => {
            if (datosIndicador) {
              datosIndicador.detalleDatos.forEach(detalle => {
                if (detalle) {
                  datosCalcular.push({
                    codigo: subIndicador.codigo,
                    valor: detalle.valor,
                    mes: datosIndicador.meses,
                    reporte: detalle.reporteId,
                    indicadorId: indicador.id
                  });
                }

              });

            }

          });
          if (valida) {
            valida = false;

            indicadoresArr.push({
              id: indicador.id,
              nombre: indicador.nombre,
              periodicidad: subIndicador.periodo.nombre
            })

          }
        });

      });
    }

    const {indicadores} = this.genrarCalculos(indicadoresArr, datosCalcular);
    const encabezado = await this.generarEncabezado(idReporte, idVigilado);

    return { indicadores, encabezado }

  }

  genrarCalculos = (indicadores: any[], datosCalcular: any[]) => {
    const anual = ['12']
    const trimestre = ["3", "6", "9", "12"]
    const mensual = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    indicadores.forEach(indicador => {
      const filas = new Array()
      switch (indicador.id) {
        case 1:
          const codigos = ['1.1', '1.2', '1.3', '1.4']
          for (const codigo of codigos) {
            const columnas = this.consultarDatos(trimestre, datosCalcular, codigo, '1.5', 1);
            filas.push({ columnas });

          }
          indicador.filas = filas
          break;

        case 2:
          const codigos2 = ['2.1', '2.3', '2.5', '2.7']
          const codigos3 = ['2.2', '2.4', '2.6', '2.8']
          for (let i = 0; i < codigos2.length; i++) {
            const columnas = this.consultarDatos(trimestre, datosCalcular, codigos2[i], codigos3[i], 2);
            filas.push({ columnas });
          };

          indicador.filas = filas
          break;

        case 3:
          const codigos4 = ['3.2', '3.4']
          const codigos5 = ['3.1', '3.3']
          for (let i = 0; i < codigos4.length; i++) {
            const columnas = this.consultarDatos(anual, datosCalcular, codigos4[i], codigos5[i], 3);
            filas.push({ columnas });
          };

          indicador.filas = filas
          break;

        case 4:
          const columnas4 = this.consultarDatos(trimestre, datosCalcular, '4.2', '4.1', 4);
          filas.push({ columnas: columnas4 });
          indicador.filas = filas
          break;

        case 5:
          const columnas5 = this.consultarDatos(trimestre, datosCalcular, '5.2', '5.1', 4);
          filas.push({ columnas: columnas5 });
          indicador.filas = filas
          break;

        case 6:
          const columnas6 = this.consultarDatos(mensual, datosCalcular, '6.1', '6.2', 4);
          filas.push({ columnas: columnas6 });
          indicador.filas = filas
          break;

        case 7:
          const codigos6 = ['7.1', '7.3', '7.5']
          const codigos7 = ['7.2', '7.4', '7.6']
          for (let i = 0; i < codigos6.length; i++) {
            const columnas = this.consultarDatos(mensual, datosCalcular, codigos6[i], codigos7[i], 4);
            filas.push({ columnas });
          };

          indicador.filas = filas
          break;

        case 8:
          const columnas8 = this.consultarDatos(mensual, datosCalcular, '8.1', '8.2', 4);
          filas.push({ columnas: columnas8 });
          indicador.filas = filas
          break;

        case 9:
          const columnas9 = this.consultarDatos(mensual, datosCalcular, '9.1', '9.2', 4);
          filas.push({ columnas: columnas9 });
          indicador.filas = filas
          break;

          case 10:
          const columnas10 = this.consultarDatos(trimestre, datosCalcular, '10.2', '10.1', 4);
          filas.push({ columnas: columnas10 });
          indicador.filas = filas
          break;

          case 11:
          const columnas11 = this.consultarDatos(trimestre, datosCalcular, '11.2', '11.1', 4);
          filas.push({ columnas: columnas11 });
          indicador.filas = filas
          break;

          case 12:
          const columnas12 = this.consultarDatos(trimestre, datosCalcular, '12.1', '12.2', 4);
          filas.push({ columnas: columnas12 });
          indicador.filas = filas
          break;

          case 13:
            const columnas13 = this.consultarDatos(anual, datosCalcular, '12.1', '12.2', 4);
            filas.push({ columnas: columnas13 });
            indicador.filas = filas
            break;
  

      }
    });
    return { indicadores }
  }

  consultarDatos = (periodicidad, datosCalcular, codigo1, codigo2, formula) => {
    const columnas = new Array()
    for (const mes of periodicidad) {
      const dato2 = datosCalcular.find(objeto => objeto.codigo === codigo2 && objeto.mes === mes)?.valor;
      const dato1 = datosCalcular.find(objeto => objeto.codigo === codigo1 && objeto.mes === mes)?.valor;
      const calculo = this.cacular(formula, dato1, dato2);
      let valor = 'Sin Información';
      if (!isNaN(calculo)) {
        valor = calculo;
      }
      columnas.push({
        valor,
        span: 3,
        mes
      })
    }

    return columnas
  }



  cacular = (funcion, v1, v2) => {
    let result;

    switch (funcion) {
      case 1:
        result = (parseFloat(v1) * 1000000) / parseFloat(v2)
        break;
      case 2:
        result = parseFloat(v1) + parseFloat(v2)
        break;
      case 3:
        result = parseFloat(v1) - parseFloat(v2)
        break;
      case 4:
        if (v2 !== 0) {
          result = (parseFloat(v1) / parseFloat(v2)) * 100

        }
        break;
    }
    return result
  }


  generarEncabezado = async (idReporte, idVigilado) => {
    const reporte = await TblReporte.query()
      .preload("estadoVerificado")
      .preload("estadoVigilado")
      .where("id_reporte", idReporte)
      .first();

    //BUscar la clasificacion del usuario
    const usuario = await TblUsuarios.query()
      .preload("clasificacionUsuario", (sqlClasC) => {
        sqlClasC.preload("clasificacion");
        sqlClasC.has("clasificacion");
      })
      .preload("modalidadesRadio", (sqlModal) => {
        sqlModal.preload("modalidades");
      })
      .where("identificacion", idVigilado)
      .first();

    let modalidad = "";
    const modalidadesradio = usuario?.modalidadesRadio;
    if (modalidadesradio) {
      for (const key in modalidadesradio) {
        if (parseInt(key) === 0) {
          modalidad += modalidadesradio[key].modalidades.nombre;
        } else {
          modalidad += ", " + modalidadesradio[key].modalidades.nombre;
        }
      }
    }

    const totalConductores =
      usuario?.clasificacionUsuario[0]?.$extras?.pivot_clu_conductores ?? "";
    const totalVehiculos =
      usuario?.clasificacionUsuario[0]?.$extras?.pivot_clu_vehiculos ?? "";

    const nombreClasificaion = usuario?.clasificacionUsuario[0]?.nombre;

    const observacionAdmin = reporte?.observacion ?? "";
    const aprobado = reporte?.aprobado;

 


    let variablesCompletadas = 0;
    let evidenciasCompletadas = 0;

    let estadoActual = "";

    estadoActual = reporte?.estadoVerificado?.nombre ?? estadoActual;
    estadoActual = reporte?.estadoVigilado?.nombre ?? estadoActual;

    const variablesEntregadas = (variablesCompletadas / 41) * 100;
    const evidenciasEntregadas = (evidenciasCompletadas / 28) * 100;


   

    return {
      idVigilado,
      razonSocila: usuario?.nombre,
      idReporte,
      idEncuesta: reporte?.idEncuesta,
      vigencia: reporte?.anioVigencia,
      mensaje:
        "Cumplimiento del paso #20 de la metodología definida en la Res. 40595 de 2022.",
      clasificaion: nombreClasificaion,
      modalidad,
      totalConductores,
      totalVehiculos,
      variablesEntregadas,
      evidenciasEntregadas,
      estadoActual,
      observacionAdmin,
      aprobado
    };
  }
}
