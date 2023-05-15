import { Group, test } from '@japa/runner'

test('display welcome page', async ({ client }) => {
  const response = await client.get('/')
  response.assertStatus(200)
  response.assertTextIncludes('¡Bienvenido al API de Novafianza!')
})

test('consultar empresas', async ({ client })=>{
  const respuestaToken = await client.post('/api/v1/autenticacion/inicio-sesion/empresa')
  const token = respuestaToken.body().token
  console.log('este es el supuesto token', token)
  const response = await client.get('/api/v1/empresa/listar/1/100')
    .header('Authorization', `Bearer ${token}`)
  response.assertTextIncludes('"empresas":[')
})
