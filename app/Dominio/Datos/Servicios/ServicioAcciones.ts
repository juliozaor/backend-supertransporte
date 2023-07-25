export class ServicioAcciones {

  public async obtenerAccion(estado: number) {

    console.log(estado);
    

    let encuestaEditable= false
    let verificacionVisible= false
    let verificacionEditable= false


    if(estado === 1001 || estado === 1002 || estado === 1003 || estado === 1005){
      encuestaEditable= true
    }

    if(estado === 7){
      encuestaEditable= true
      verificacionVisible = true
    }
    if(estado === 2 || estado === 4 || estado === 6 || estado === 1){
      encuestaEditable= false
      verificacionVisible= false
    }

    if(estado === 6{
      encuestaEditable= false
      verificacionVisible= true
    }


    return {
      encuestaEditable,
      verificacionVisible,
      verificacionEditable
    }
  }

}
