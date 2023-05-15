export interface RespuestaGenerarTransaccion {
    datosUsuarios:     DatosUsuarios;
    moneda:            string;
    valorEnCentavos:   number;
    referencia:        string;
    urlRedireccion:    string;
    llavePublicaWompi: string;
}

export interface DatosUsuarios {
    documento:     string;
    tipoDocumento: string;
    telefono:      string;
    valor:         number;
    email:         string;
}
