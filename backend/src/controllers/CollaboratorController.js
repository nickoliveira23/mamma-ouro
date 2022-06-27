//Importando arquivo de conexão com o banco de dados
const connection = require('../database/connection');

//Exportando nossos métodos de controle
module.exports = {
    //Método para criar um colaborador
    async register(request, response) {
        try {
            //Recebendo nome e id de usuário do corpo da requisição
            const { name, id_user, role, id_hospital } = request.body;

            /*Aqui é feito um insert na tabela de colaboradores com os dados que foram recebidos,
            no final a variável 'id' recebe o id do registro criado.*/
            const [id] = await connection('collaborator')
                .insert({
                    name: name,
                    role: role,
                    id_user: id_user,
                    id_hospital: id_hospital
                })

            //Em caso de sucesso é retornado o id para o cliente.
            return response.json({ id })
        } catch (err) {
            //Em caso de falha é retornado a mensagem de erro.
            return response.status(500).json({ error: 'Algo deu errado!' });
        }
    },

    //Método de listagem de todos os colaboradores
    async indexAll(request, response) {
        try {
            /*Aqui é feito um select na tabela de colaboradores que povoa a váriavel 'collaborator' 
            com um objeto contendo todos os registros*/
            const collaborator = await connection('collaborator')
                .select('*');

            //Em caso de sucesso é retornado o objeto com todos os registros
            return response.json(collaborator)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            console.log(err)
        }
    },

    //Método de listagem por id
    async indexById(request, response) {
        try {
            //Recebendo o id de usuário pelos parâmetros da requisição
            const { id } = request.params;

            /*Na tabela de colaboradores é feito um select onde o id é igual ao id recebido pelo cliente, 
            o retorno povoa a váriavel 'collaborator' com um objeto contendo o registro*/
            const collaborator = await connection('collaborator')
                .select('*')
                .where('id_user', id)
                .first()

            //Em caso de sucesso é retornado o objeto com o registro
            return response.json(collaborator)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            console.log(err)
        }
    },

    //Método de listagem por id do hospital
    async indexByHospitalId(request, response) {
        try {
            //Recebendo o id do hospital pelos parâmetros da requisição
            const { id_hospital } = request.params;
            const { id_collaborator } = request.headers;

            /*Na tabela de colaboradores é feito um select onde no campo id, exista algum dos valores do array id_collaborators, 
            o retorno povoa a váriavel 'collaborator' com um objeto contendo o registro*/
            const collaborator = await connection('collaborator')
                .where('id_hospital', id_hospital)
                .whereNot('id', id_collaborator)
                .select('*')


            //Em caso de sucesso é retornado o objeto com o registro
            return response.json(collaborator)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            console.log(err)
        }
    },

    //Método para atualizar o registro de um colaborador
    async updateCollaborator(request, response) {
        try {
            //Recebendo os dados do colaborador e atribuindo cada informação a uma váriavel.
            const {
                name,
                role,
            } = request.body;

            //Recebendo o 'id' de colaborador.
            const { id } = request.params;

            /*Atualizando as informações da tabela 'collaborator', passando as váriaveis recebidas do lado do cliente.
            Será atualizado o registro onde o campo 'id' seja igual ao id recebido nos parâmetros da rota.*/
            const collaborator = await connection('collaborator')
                .update({
                    name,
                    role
                })
                .where({ id: id })

            //Em caso de sucesso é retornado o objeto com o registro atualizado
            return response.json(collaborator);

        } catch (err) {
            //Em caso de falha é retornado a mensagem de erro.
            return response.status(500).json({ error: 'Erro ao atualizar informações!' });
        }
    },

    //Método de validação dos dados de um colaborador
    async validate(request, response) {
        try {
            //Recebendo os dados do dependente e atribuindo cada informação a uma váriavel.
            const {
                name,
                role,
            } = request.body;

            /*Váriaveis contendo todos os números decimais e caracteres especiais para que possamos
            verificar se o nome é valido*/
            const numeros = /[0-9]/;
            const caracteresEspeciais = /[,|.|!|@|#|$|%|^|&|*|(|)|-|_]/;
            var auxNumero = 0;
            var auxEspecial = 0;

            //A cada vez que o 'for' executar é verificado se não há caracteres especiais nem números no nome
            for (var i = 0; i < name.length; i++) {
                if (numeros.test(name[i]))
                    auxNumero++;
                else if (caracteresEspeciais.test(name[i]))
                    auxEspecial++;
            }

            if (name !== "") {
                if (auxNumero == 0 && auxEspecial == 0) {
                    if (role == 'Administrator' || role == 'Manager') {
                        return response.json({ message: "Atualizado com sucesso!" });
                    } else {
                        return response.status(400).json({ error: 'Função do colaborador inválida!' });
                    }
                } else {
                    return response.status(400).json({ error: 'Formato de nome inválido' });
                }
            } else {
                return response.status(400).json({ error: 'Digite um nome!' });
            }
        } catch (err) {
            return response.status(500).json({ error: 'Algo deu errado!' });
        }
    }
}