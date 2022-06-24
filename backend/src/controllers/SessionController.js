//Importando arquivo de conexão com o banco de dados
const connection = require('../database/connection');

//Importando bcrypt para fazer a critografia/descriptografia da senha
const bcrypt = require('bcrypt');

/*Importando jwt para que as requisições da aplicação só possam ser feitas
com um token*/
const jwt = require('jsonwebtoken');

//Exportando nossos métodos de controle
module.exports = {
    //Método para efetuar login na aplicação
    async login(request, response) {
        try {
            //Recebendo credencias para o login do corpo da requisição
            const { email, password, type } = request.body;

            /*Aqui é feito um select na tabela de usuários para validar se o e-mail informado existe,
            o retorno preenche a váriavel 'user' com o registro do usuário filtrado*/
            const user = await connection('user')
                .where({
                    email: email,
                    type: type
                })
                .select('*')
                .first();

            /*Em caso de haver de fato um usuário com o e-mail informado, por meio do bcrypt é comparado
            a senha recebida com a senha registrada no banco que se encontra criptografada.*/
            if (user) {
                const validPass = await bcrypt.compare(password, user.password);
                /*Em caso da senha estar correta, é criado um token a partir do e-mail, e é retornado para
                o cliente o usuário logado, o token e uma mensagem de 'login realizado com sucesso'.*/
                if (validPass) {
                    const token = jwt.sign({ email: email }, 'superSecretThing', { expiresIn: 120000 });
                    return response.json({ user, token: token, message: 'Login realizado com sucesso!' });
                    //Validações para o caso de a senha for inválida ou não tiver sido preenchida
                } else {
                    if (validPass == '') {
                        return response.status(400).json({ error: 'Digite uma senha!' });
                    } else {
                        return response.status(400).json({ error: 'Senha errada!' });
                    }
                }
            } else {
                return response.status(404).json({ error: 'Nenhum usuário encontrado' });
            }
        } catch (err) {
            console.log(err);
            return response.status(500).json({ error: 'Erro ao fazer login no aplicativo!' });
        }
    }
};