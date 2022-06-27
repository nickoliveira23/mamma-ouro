//Importando arquivo de conexão com o banco de dados
const connection = require('../database/connection');

//Exportando nossos métodos de controle
module.exports = {
    //Método para criar um dependente
    async register(request, response) {
        try {
            //Recebendo nome, data de nascimento e id da doadora pelo corpo da requisição
            const { name, birth, id_donor } = request.body;

            /*Aqui é feito um insert na tabela de dependentes com os dados que foram recebidos,
            no final a variável 'id' recebe o id do registro criado.*/
            const [id] = await connection('dependent')
                .insert({
                    name: name,
                    birth: birth,
                    id_donor: id_donor
                })
            //Em caso de sucesso é retornado o id para o cliente.
            return response.json({ id })
        } catch (err) {
            //Em caso de falha é retornado a mensagem de erro.
            return response.status(500).json({ error: 'Falha ao cadastrar dependentes!' });
        }
    },

    //Método de listagem de todos os dependentes
    async indexAll(request, response) {
        try {
            /*Aqui é feito um select na tabela de dependentes que povoa a váriavel 'dependent' 
            com um objeto contendo todos os registros*/
            const dependent = await connection('dependent')
                .select('*')

            //Em caso de sucesso é retornado o objeto com todos os registros
            return response.json(dependent)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            console.log(err)
        }
    },

    //Método de listagem por id
    async indexById(request, response) {
        try {
            //Aqui é recebido o id de doadora que serve como chave estrangeira na tabela de dependentes
            const { id } = request.params;

            /*Na tabela de dependentes é feito um select onde o id de doadora é igual 
            ao id recebido pelo cliente, o retorno povoa a váriavel 'dependent' com um 
            objeto contendo o registro*/
            const dependent = await connection('dependent')
                .select('*')
                .where('id_donor', id)

            //Em caso de sucesso é retornado o objeto com o registro
            return response.json(dependent)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            return response.json({ error: 'Falha ao exibir dependentes!' })
            console.log(err)
        }
    },

    //Método para atualizar o registro de um dependente
    async updateDependent(request, response) {
        try {
            //Recebendo os dados do dependente e atribuindo cada informação a uma váriavel.
            const {
                name,
                birth,
            } = request.body;

            //Recebendo o 'id' de dependente.
            const { id } = request.params;

            /*Atualizando as informações da tabela 'dependent', passando as váriaveis recebidas do lado do cliente.
            Será atualizado o registro onde o campo 'id' seja igual ao id recebido nos parâmetros da rota.*/
            const donor = await connection('dependent')
                .update({
                    name,
                    birth
                })
                .where({ id: id })

            //Em caso de sucesso é retornado o objeto com o registro atualizado
            return response.json(donor);

        } catch (err) {
            //Em caso de falha é retornado a mensagem de erro.
            return response.status(500).json({ error: 'Erro ao atualizar informações!' });
        }
    },

    //Método de validação dos dados de um dependente
    async validate(request, response) {
        try {
            //Recebendo os dados do dependente e atribuindo cada informação a uma váriavel.
            const {
                name,
                birth,
            } = request.body;

            //Função para calcular a idade a partir da data de nascimento
            function getAge(dateString) {
                //váriavel today vai receber a data atual
                let today = new Date();
                //váriavel birthDate vai receber o data de nascimento
                let birthDate = new Date(dateString);
                //váriavel age vai receber o ano atual subtraido pelo ano de nascimento
                let age = today.getFullYear() - birthDate.getFullYear();
                //váriavel 'm' vai receber o mês atual subtraido pelo mês de nascimento
                let m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                //Retorna a idade
                return age;
            }

            //Váriavel dependentAge vai receber o retorno da função getAge que é a idade do dependente.
            const dependentAge = getAge(birth)


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
                    if (dependentAge < 4 && dependentAge > 0) {
                        return response.json({ message: "Atualizado com sucesso!" });
                    } else {
                        return response.status(400).json({ error: 'Idade não está de acordo com os termos de uso do aplicativo!' });
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