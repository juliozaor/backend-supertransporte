export class ServicioAcciones {

  public async obtenerAccion(estado: number, idRol: string) {

    switch (idRol) {
      case '003':
        return this.vigilados(estado);
      case '007':
        return this.vigilados(estado);
      case '002':
        return this.verificador(estado);
      default:
        return {
          encuestaEditable: false,
          verificacionVisible: false,
          verificacionEditable: false
        }
    }


  }

  vigilados = (estado: number) => {
    let encuestaEditable = true
    let verificacionVisible = false
    let verificacionEditable = false


    if (estado === 7) {
      verificacionVisible = true
    }
    if (estado === 2 || estado === 3 || estado === 4 || estado === 6 || estado === 1 || estado === 1004) {
      encuestaEditable = false
      verificacionVisible = false
    }

    if (estado === 6) {
      encuestaEditable = false
      verificacionVisible = true
    }


    return {
      encuestaEditable,
      verificacionVisible,
      verificacionEditable
    }
  }

  verificador = (estado: number) => {
    let encuestaEditable = false
    let verificacionVisible = true
    let verificacionEditable = true



    if (estado === 3 || estado === 6 || estado === 7) {
      verificacionEditable = false
    }


    if (estado === 1001 || estado === 1002 || estado === 1003 || estado === 1005) {
      verificacionEditable = false
    }

    return {
      encuestaEditable,
      verificacionVisible,
      verificacionEditable
    }
  }

}
