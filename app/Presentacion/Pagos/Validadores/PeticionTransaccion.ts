import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const peticionTransaccionValidador = schema.create({
    documento: schema.string(),
    tipoDocumento: schema.enum(['CC']),
    valor: schema.number([rules.unsigned()]),
    email: schema.string({trim: true}, [rules.email()]),
    telefono: schema.string({trim: true}, [rules.mobile()])
})