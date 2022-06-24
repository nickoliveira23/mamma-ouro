//Importando arquivo de conexão com o banco de dados
const connection = require('../database/connection');

//Exportando nossos métodos de controle
module.exports = {
    //Método para criar uma doadora
    async register(request, response) {
        try {
            //Recebendo dados da doadora do corpo da requisição
            const { name, birth, street, number,
                city, district, uf, zipCode, phone, id_user } = request.body;

            /*Aqui é feito um insert na tabela de doadora com os dados que foram recebidos,
            no final a variável 'id' recebe o id do registro criado.*/
            const [id] = await connection('donor')
                .insert({
                    name: name,
                    birth: birth,
                    street: street,
                    number: number,
                    city: city,
                    district: district,
                    uf: uf,
                    zipCode: zipCode,
                    phone: phone,
                    id_user: id_user
                })

            //Em caso de sucesso é retornado o id para o cliente.
            return response.json({ id })
        } catch (err) {
            //Em caso de falha é retornado a mensagem de erro.
            return response.status(500).json({ error: 'Falha ao cadastrar doadora!' });
        }
    },

    //Método de listagem de todos os doadores
    async indexAll(request, response) {
        try {
            /*Aqui é feito um select na tabela de doadora que povoa a váriavel 'donor' 
            com um objeto contendo todos os registros*/
            const donor = await connection('donor')
                .select('*')

            //Em caso de sucesso é retornado o objeto com todos os registros
            return response.json(donor)
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

            /*Na tabela de doadora é feito um select onde o id_user é igual ao id recebido pelo cliente, 
            o retorno povoa a váriavel 'donor' com um objeto contendo o registro*/
            const donor = await connection('donor')
                .where('id_user', id)
                .select('*')
                .first();

            //Em caso de sucesso é retornado o objeto com o registro
            return response.json(donor)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            console.log(err)
            return response.json({ error: 'Falha ao exibir informações da doadora!' })
        }

    },

    //Método para atualizar o registro de uma doadora
    async updateDonor(request, response) {
        try {
            //Recebendo os dados da doadora e atribuindo cada informação a uma váriavel.
            const {
                name,
                birth,
                street,
                number,
                city,
                district,
                uf,
                zipCode,
                phone
            } = request.body;

            //Recebendo o 'id' de usuário que equivale a chave estrangeira 'id_user' da tabela da doadora.
            const { id } = request.params;

            /*Atualizando as informações da tabela 'donor', passando as váriaveis recebidas do lado do cliente.
            Será atualizado o registro onde o campo 'id_user' seja igual ao id recebido nos parâmetros da rota.*/
            const donor = await connection('donor')
                .update({
                    name,
                    birth,
                    street,
                    number,
                    city,
                    district,
                    uf,
                    zipCode,
                    phone,
                })
                .where({ id_user: id })

            //Em caso de sucesso é retornado o objeto com o registro atualizado
            return response.json(donor);

        } catch (err) {
            //Em caso de falha é retornado a mensagem de erro.
            return response.status(500).json({ error: 'Erro ao atualizar informações de perfil!' });
        }
    },

    //Método de validação dos dados da doadora
    async validate(request, response) {
        try {
            //Recebendo os dados da doadora e atribuindo cada informação a uma váriavel.
            const {
                name,
                birth,
                street,
                number,
                city,
                district,
                uf,
                zipCode,
                phone
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

            //Váriavel donorAge vai receber o retorno da função getAge que é a idade da doadora.
            const donorAge = getAge(birth)

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
                    if (donorAge < 80 && donorAge > 17) {
                        if (street !== "") {
                            if (number.length <= 4 && number !== "") {
                                if (district !== "") {
                                    if (city !== "") {
                                        if (uf.length == 2) {
                                            if (zipCode !== "") {
                                                if (phone.length == 11) {
                                                    return response.json({ message: "Atualizado com sucesso!" });
                                                } else {
                                                    return response.status(400).json({ error: 'Número de telefone inválido!' });
                                                }
                                            } else {
                                                return response.status(400).json({ error: 'CEP inválido!' })
                                            }
                                        } else {
                                            return response.status(400).json({ error: 'UF só pode conter 2 dígitos!' })
                                        }
                                    } else {
                                        return response.status(400).json({ error: 'Informe a cidade!' });
                                    }
                                } else {
                                    return response.status(400).json({ error: 'Informe o bairro!' })
                                }
                            } else {
                                return response.status(400).json({ error: 'Número inválido!' })
                            }
                        } else {
                            return response.status(400).json({ error: 'Informe o endereço!' });
                        }
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