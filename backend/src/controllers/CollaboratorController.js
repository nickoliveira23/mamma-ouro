//Importando arquivo de conexão com o banco de dados
const connection = require('../database/connection');

//Exportando nossos métodos de controle
module.exports = {
    //Método para criar um colaborador
    async register(request, response) {
        try {
            //Recebendo nome e id de usuário do corpo da requisição
            const { name, id_user, role } = request.body;

            /*Aqui é feito um insert na tabela de colaboradores com os dados que foram recebidos,
            no final a variável 'id' recebe o id do registro criado.*/
            const [id] = await connection('collaborator')
                .insert({
                    name: name,
                    role: role,
                    id_user: id_user
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
                .where('id', id)

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
            const { id } = request.params;

            //Aqui é retornado somente as chave estrangeira "id_collaborator" de todos os registros da tabela hospital onde o id seja igual ao recebido na requisição
            const id_collaborators = await connection('hospital')
                .select('id_collaborator')
                .where('id', id)

            //Aqui é feito um for somente para que o array id_collaborators extraia o valor dos objetos que nele existem
            for (let i = 0; i < id_collaborators.length; i++) {
                id_collaborators[i] = id_collaborators[i].id_collaborator
            }

            /*Na tabela de colaboradores é feito um select onde no campo id, exista algum dos valores do array id_collaborators, 
            o retorno povoa a váriavel 'collaborator' com um objeto contendo o registro*/
            const collaborator = await connection('collaborator')
                .select('*')
                .whereIn('id', id_collaborators)

            //Em caso de sucesso é retornado o objeto com o registro
            return response.json(collaborator)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            console.log(err)
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