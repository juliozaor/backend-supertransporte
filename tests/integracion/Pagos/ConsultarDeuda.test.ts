import { Group, test } from '@japa/runner'


test('Consulta la deuda de un usuario correctamente (usuario con deuda)', async ({assert, client}) => {
    const enpoint = "/api/v1/pagos/consultar"
    const respuesta = await client.post(enpoint).json({
        tipoDocumento: "cc",
        documento: "1002999476"
    }).send()
    respuesta.assertBodyContains({
        deuda: true
    })
})

test('Consulta la deuda de un usuario correctamente (usuario con deuda)', async ({assert, client}) => {
    const enpoint = "/api/v1/pagos/consultar"
    const respuesta = await client.post(enpoint).json({
        tipoDocumento: "cc",
        documento: "1002999477"
    }).send()
    respuesta.assertBodyContains({
        deuda: false
    })
})