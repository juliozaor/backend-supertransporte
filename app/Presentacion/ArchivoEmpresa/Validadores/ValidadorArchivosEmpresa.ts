import { schema, rules } from "@ioc:Adonis/Core/Validator"

export const validadorArchivosEmpresa = schema.create({
    idEmpresa: schema.string({trim: true}),
    idArchivos: schema.array().members(
        schema.string({trim: true})
    )
})