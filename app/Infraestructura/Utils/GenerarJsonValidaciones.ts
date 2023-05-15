const generarJsonValidaciones= async (errores: string, alertas: []) => {

    let arrRegistros: any = [];
    arrRegistros['registros'] = errores;

    let arrCategorias: any = [];
    arrCategorias['categorias'] = [
        {
            "nombre":"Registros obligatorios",
            "registros": arrRegistros['registros']
        }
    ];

    let arrNovedades: any = [];
    arrNovedades['novedades'] = [
        {
            "nombre": "Errores",
            "categorias": arrCategorias['categorias']
        }
    ];

    let arrValidaciones: any = [];
    arrValidaciones['validaciones'] = [
        {
           "nombre":"Validacion de datos",
           "novedades":arrNovedades['novedades']
        }
    ]

  return arrValidaciones
}
export { generarJsonValidaciones }

