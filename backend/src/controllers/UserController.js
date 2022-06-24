//Importando arquivo de conexão com o banco de dados
const connection = require('../database/connection');

//Importando bcrypt para fazer a critografia/descriptografia da senha
const bcrypt = require('bcrypt');

//Exportando nossos métodos de controle
module.exports = {
    //Método para criar um usuário
    async register(request, response) {
        try {
            //Recebendo dados do usuário do corpo da requisição
            const { email, password, type } = request.body;

            console.log(email, password, type)

            //váriavel 'hash' vai receber a senha criptografada pelo bcrypt
            const hash = await bcrypt.hash(password, 10);

            /*Aqui é feito um insert na tabela de usuários com os dados que foram recebidos,
            no final a variável 'id' recebe o id do registro criado.*/
            const [id] = await connection('user')
                .insert({
                    email: email,
                    password: hash,
                    type: type
                })

            //Em caso de sucesso é retornado o id para o cliente.
            return response.json({ id })
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro e retornando uma mensagem de erro para o cliente.
            console.log(err)
            return response.json({ error: 'Falha no cadastro de usuário!' })
        }
    },

    //Método de listagem de usuários por id
    async indexById(request, response) {
        try {
            //Recebendo o id de usuário pelos parâmetros da requisição
            const { id } = request.params;

            /*Aqui é feito um select na tabela de usuários que povoa a váriavel 'user' 
            com um objeto contendo o registro*/
            const user = await connection('user')
                .where('id', id)
                .select('*')
                .first();

            //Em caso de sucesso é retornado o objeto com o registro
            return response.json(user)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            console.log(err)
            return response.json({ error: 'Falha ao exibir informações do usuário!' })

        }
    },

    //Método de listagem de todos os usuários
    async indexAll(request, response) {
        try {
            /*Aqui é feito um select na tabela de usuários que povoa a váriavel 'user' 
            com um objeto contendo todos os registros*/
            const user = await connection('user')
                .select('*');

            //Em caso de sucesso é retornado o objeto com todos os registros
            return response.json(user)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            console.log(err)
        }
    },

    //Método de validação do e-mail
    async validateEmail(request, response) {
        try {
            //Recebendo e-mail do corpo da requisição
            const { email } = request.body;

            /*Aqui é feito um select na tabela de usuários onde o e-mail é igual ao recebido,
            no final a variável 'user' recebe registro encontrado.*/
            const user = await connection('user')
                .where({ email: email })
                .select('*')
                .first();

            //Validações para o e-mail
            if (user) {
                return response.status(400).json({
                    error: "Bad Request",
                    message: "Validation failed",
                    statusCode: 400,
                    validation: {
                        body: {
                            keys: [
                                "email",
                            ],
                            message: "E-mail já cadastrado!",
                            source: "body",
                        },
                    },
                });
            } else {
                //Em caso de sucesso é retornado o email para o cliente.
                return response.json({ email: email })

            }
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro e também é retornado para o cliente.
            console.log(err);
            return response.status(500).json({ error: 'Falha na validação do e-mail!' });
        }

    },

    //Método de validação da senha
    async validatePassword(request, response) {
        try {
            const password = request.body;

            const passwordString = JSON.stringify(password.password).replace(/"/g, '');

            console.log(password)

            return response.json({ password: passwordString })
        } catch (err) {
            console.log(err);
            return response.status(500).json({ error: 'Falha na validação da senha!' });
        }
    },
}