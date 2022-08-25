import Hapi from 'hapi'

import database from './config/database'
import userRoute from './routes/userRoute'

//L === Linha

const port = 3000
//Criação de um server Hapi, passando alguma opções como localhost (L11), port(12) e space(l5) para leitura melhor
const server = Hapi.server({
    host: 'localhost',
    port,
    routes: {
        json: {
            space: 4
        }
    }
})

//usando a rota de usuário (L21)
userRoute(server)

//Estrutura de uma rota bem simples do metodo GET, na L26 a url que será acessada e neste caso executa a função handler L27
server.route({
    method: 'GET',
    path: '/',
    handler: () => 'Hello World from Hapi!'
})

server.route({
    method: 'POST',
    path: '/',
    handler: () => 'Post'
})

//Basicamente a conexão com banco de dados e caso ocorrer erro esta sendo feito o tratamento
database.connect().then(async () => {

    try {
        await server.start()
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
    
    console.log('Server running at:', server.info.uri);
})