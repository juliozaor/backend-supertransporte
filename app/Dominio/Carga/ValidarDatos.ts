import { ColumnaArchivo } from '../Dto/ColumnaArchivo';
export class ValidarDatos {

  datos = (columna: string, campo: any, ): boolean => {
    let errors: any[] = []
    let issues: any[] = []
let estado:boolean = false;
    switch (campo.TipoDato) {
      case "String":
        console.log({columna, campo});
        
         estado = this.validarString(columna, campo, errors, issues )
        break;

      case "Number":
        
        estado = this.validarNumber(columna, campo, errors, issues)
        break;

    }

    return estado
  }  

  validarString = (item: string, campo:ColumnaArchivo, errors: any[], issues: any[]) =>{    
let valueInsert = ''
         //TODO: VALIDAR MAX-MIN length
         if (item.length == 0 && campo.Obligatorio == 'S') {
          const error = {
              'error': "El campo no puede ser vacío",
              'datoOriginal': item,
              'variable': campo.NombreCampo

          }
          errors.push(error);

      }
      //TODO: INVERTIR SIGNO < POR >
      if (item.length == 0 && campo.Obligatorio == 'N') {
          const alerta = {
              'alerta': "El campo se encuentra vacío",
              'datoOriginal': item,
              'variable': campo.NombreCampo

          }

          issues.push(alerta);
      }
    
  }
  
  
  validarNumber =(item: string, campo:ColumnaArchivo, errors: any[], issues: any[]): boolean =>{
    
    
  }

}


