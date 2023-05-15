
import { schema } from '@ioc:Adonis/Core/Validator'

export const esquemaEmpresa = schema.create({
    nit: schema.string(),
    nombre: schema.string(),
    convenio: schema.number.optional(),
    logo: schema.file.optional({extnames: ['png', 'jpg', 'jpeg', 'txt']})
  })