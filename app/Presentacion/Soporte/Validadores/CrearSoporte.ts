import { schema, rules } from "@ioc:Adonis/Core/Validator"

export const crearSoporteSchema = schema.create({
    descripcion: schema.string(),
    adjunto: schema.file.optional()
}) 