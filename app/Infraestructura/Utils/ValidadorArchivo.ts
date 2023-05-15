/* eslint-disable no-array-constructor */
const fs = require('fs')
const validador = async (path: string) => {
  const archivo = fs.readFileSync(path).toString()
  const lineaDatos = archivo.split('\r\n')

  let listaObjetos = new Array()

  for (let i = 0; i < lineaDatos.length; i++) {
    if(lineaDatos[i] === ''){
      continue
    }
    let objeto = {}
    const dato = lineaDatos[i].split('|')
    for (let j = 0; j < lineaDatos[i].length; j++) {
      objeto['var_' + j] = dato[j]
    }
    listaObjetos.push(objeto)
  }

  const archivoJson = JSON.stringify(listaObjetos, null, 2)

  return archivoJson

  //return { errores, alertas }
}
export { validador }
