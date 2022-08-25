import Joi from 'joi'

import UsersController from '../controllers/users'
import UserModel from '../models/users'

const usersController = new UsersController(UserModel)

const userRoute = (server) => {

    //Primeira rota baseada em usuários, na L14 temos um parâmetro opcional, o controle usa este parametro no met. find
    //GET
    server.route({
        method: 'GET',
        path: '/users/{id?}',
        handler: (request, h) => usersController.find(request, h) // O h pode ser usado para customizar respostas
    })

    //POST
    server.route({
        method: 'POST',
        path: '/users',
        handler: function (request, h) {

            return 'I did something!';
        }
        
        /*
        handler: (request, h) => usersController.create(request, h),
        options: {
            //Temos aqui a validação de dados usando o joi, valida string, obrigatorio e email 
            validate: {
                payload: {
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    email: Joi.string().email().required(),
                }
            }
        }
        */
    })

    server.route({
        method: 'PUT',
        path: '/users/{id}',
        handler: function (request, h) {

            return 'I did something!';
        }
        
        /*
        handler: (request, h) => usersController.update(request, h),
        options: {
            validate: {
                payload: {
                    firstName: Joi.string(),
                    lastName: Joi.string(),
                    email: Joi.string().email()
                }
            }
        }
        */
    })

    server.route({
        method: 'DELETE',
        path: '/users/{id}',
        handler: (request, h) => usersController.delete(request, h)
    })
}

module.exports = userRoute
