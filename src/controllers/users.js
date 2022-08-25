import Boom from 'boom'

//Classe que recebe o model para o BD, aqui tem as funções que lidarão com criação, listagem, atualização e exclusão do usuário
class UsersController {

    constructor(Users) {
        this.Users = Users;
    }

    async find(request) {
        const { id } = request.params
        const query = {}

        if (id) {
            query._id = id
        }

        try {

            const users = await this.Users.find(query)
            return { users } //Aqui não usamos o método de retorno, o hapi o tranforma em .json para usar na api
            
        } catch (error) {
            return Boom.badRequest('Failed to find user') //O Boom gerencia erros sem precisar de obj customizado
        }
    }

    //Criação do usuário
    async create(request, h, err) {
        
        try {

            const user = new this.Users(request.payload) //O ideal seria realizar o tratamento
            await user.save()

            return h.response().code(201) //Resposta customizada usando o h
        } catch (error) {
            return Boom.badRequest(error) //O boom retorna o erro customizado
        }
    }

    async update(request, h) {
        
        const { id } = request.params

        try {
            const updatedUser = await this.Users.findOneAndUpdate({ _id: id }, request.payload, {
                new: true,
            });

            if (updatedUser) {
                return h.response().code(200)
            }

            return Boom.badRequest('Could not update the user')

            
        } catch (error) {
            return Boom.badRequest(error)
        }
    }

    async delete(request) {
        return Boom.notImplemented()
    }
}

export default UsersController