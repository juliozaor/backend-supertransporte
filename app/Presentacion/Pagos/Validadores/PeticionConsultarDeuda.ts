import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const peticionConsultarDeudaValidador = schema.create({
    documento: schema.string(undefined, [rules.required()]),
    tipoDocumento: schema.enum(['CC'], [rules.required()])
})