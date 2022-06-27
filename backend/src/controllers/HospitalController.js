//Importando arquivo de conexão com o banco de dados
const connection = require('../database/connection');

//Importando axios para que possamos fazer chamada de uma API externa nesse arquivo
const axios = require('axios');
const { json } = require('express/lib/response');

//Exportando nossos métodos de controle
module.exports = {
    //Método para criar um hospital
    async register(request, response) {
        try {
            //Recebendo dados do hospital do corpo da requisição
            const {
                company, cnpj, street, number,
                city, district, uf, zipCode, phone,
                place_id
            } = request.body;

            /*Aqui é feito um insert na tabela de hospital com os dados que foram recebidos,
            no final a variável 'id' recebe o id do registro criado.*/
            const [id] = await connection('hospital')
                .insert({
                    company: company,
                    cnpj: cnpj,
                    street: street,
                    number: number,
                    city: city,
                    district: district,
                    uf: uf,
                    zipCode: zipCode,
                    phone: phone,
                    place_id: place_id,
                })

            //Em caso de sucesso é retornado o id para o cliente.
            return response.json({ id })
        } catch (err) {
            //Em caso de falha é retornado a mensagem de erro.
            return response.status(500).json({ error: 'Falha ao cadastrar banco de leite!' });
        }
    },

    //Método de listagem de todos os hospitais
    async indexAll(request, response) {
        try {
            /*Aqui é feito um select na tabela de hospitais que povoa a váriavel 'hospitals' 
            com um objeto contendo todos os registros*/
            const hospitals = await connection('hospital')
                .select('*')

            //Em caso de sucesso é retornado o objeto com todos os registros
            return response.json(hospitals)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            console.log(err)
        }
    },

    //Método de listagem por id
    async indexById(request, response) {
        try {
            //Recebendo o id de colaborador pelos parâmetros da requisição
            const { id } = request.params;

            /*Na tabela de hospitais é feito um select onde o id_user é igual ao id recebido pelo cliente, 
            o retorno povoa a váriavel 'hospital' com um objeto contendo o registro*/
            const hospital = await connection('hospital')
                .where('id', id)
                .select('*')
                .first();

            //Em caso de sucesso é retornado o objeto com o registro
            return response.json(hospital)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            console.log(err)
            return response.json({ error: 'Falha ao exibir informações da doadora!' })
        }

    },

    //Método de listagem de hospitais por coordenadas
    async indexByCoords(request, response) {
        try {
            //Recebendo coordenadas pelo cabeçalho da requisição
            const { latitude, longitude } = request.headers

            //Váriavel 'key' recebe a chave da API do Google
            // const key = process.env.GOOGLE_API_KEY
            // const key = process.env.ACCESS_TOKEN
            const key = process.env.API_KEY

            /*Aqui é feito uma chamada a API externa do Google. Essa API é para localizar estabelecimentos
            próximos. Na URL da api é informado como parâmetros as coordenadas bem como a chave da API. Além
            disso será filtrado na busca somente a palavra chave 'hospital' em um raio de 1500 metros*/
            // const { data } = await axios.get(
            //     `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=hospital&location=${latitude},${longitude}&radius=1500&type=hospital&key=${key}`
            // )
            const { data } = await axios.get(
                `https://api.tomtom.com/search/2/poiSearch/maternidade.json?key=${key}&limit=10&countryset=BRA&lat=${latitude}&lon=${longitude}&radius=3000&language=pt-BR&extendedPostalCodesFor=POI`
            )

            const arrayHospital = []
            /*Para cada registro retornado pela API externa é povoado uma array somente com 
            o place_id de cada registro.*/
            for (let i = 0; i < data.results.length; ++i) {
                arrayHospital[i] = data.results[i].id
            }

            /*Na tabela de hospitals é feito um select em todos os registros onde o place_id 
            também esteja no array povoado pelo 'for'*/
            const hospitals = await connection('hospital')
                .select('*')
                .whereIn("place_id", arrayHospital)

            //Em caso de sucesso é retornado o objeto com todos os registros
            return response.json(hospitals)
        } catch (err) {
            //Em caso de falha é retornado a mensagem de erro.
            console.log(err)
            return response.status(500).json({ error: 'Falha ao exibir bancos de leite!' });
        }
    },

    async verifyAvailability(request, response) {
        try {
            // const hours = [
            //     '7:30:00', '8:00:00',
            //     '8:30:00', '9:00:00',
            //     '9:30:00', '10:00:00',
            //     '10:30:00', '11:00:00',
            //     '11:30:00', '12:00:00',
            //     '12:30:00', '13:00:00',
            //     '13:30:00', '14:00:00',
            //     '14:30:00', '15:00:00',
            //     '15:30:00', '16:00:00',
            //     '16:30:00', '17:00:00',
            // ];

            const hours = [
                '7:30:00', '8:00:00', '8:30:00', '9:00:00',
                '9:30:00', '10:00:00', '10:30:00', '11:00:00',
                '11:30:00'
            ];

            const { id } = request.params;

            const today = new Date();

            const selectedYear = today.getFullYear();
            const selectedMonth = today.getMonth();
            const selectedDay = today.getDate();

            let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
            let listDates = [];
            let newListDates = [];
            let occupiedDateTime = [];
            let occupiedDate = [];
            let occupiedHour = [];
            let occupiedDateHour = [];

            const available = await connection('schedule')
                .select('date_time', 'date', 'hour')
                .where('id_hospital', id)

            for (let i = 0; i < available.length; i++) {
                occupiedDateTime[i] = new Date(available[i].date_time).toLocaleDateString();
                occupiedDate[i] = available[i].date;
                occupiedHour[i] = available[i].hour
                occupiedDateHour[i] = { date: occupiedDateTime[i], hour: [occupiedHour[i]] }
            }

            for (let i = 1; i <= daysInMonth; i++) {
                let d = new Date(selectedYear, selectedMonth, i);

                let year = d.getFullYear();
                let month = d.getMonth();
                let day = d.getDate();
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                let selDate = new Date(`${year}`, `${month}`, `${day}`);

                listDates[i - 1] = { date: selDate.toLocaleDateString(), hour: hours };
            }

            let array2 = []

            occupiedDateHour.forEach(function (item) {
                let existing = array2.filter(function (v, i) {
                    return v.date == item.date;
                });
                if (existing.length) {
                    let existingIndex = array2.indexOf(existing[0]);
                    array2[existingIndex].hour = array2[existingIndex].hour.concat(item.hour);
                } else {
                    if (typeof item.hour == 'string')
                        item.hour = [item.hour];
                    array2.push(item);
                }
            });

            console.log(array2);


            newListDates = listDates.map((currentDateData) => {
                const currentOccupiedDateHour = array2.find(dateData => dateData.date === currentDateData.date)
                if (!currentOccupiedDateHour) {
                    return currentDateData
                }

                return {
                    date: currentDateData.date,
                    hour: currentDateData.hour.filter(currentHour => !currentOccupiedDateHour.hour.includes(currentHour))
                }
            })

            return response.json({ available: newListDates })
        } catch (error) {
            console.log(error)
            return response.status(500).json({ error: 'Falha ao verificar disponibilidade!' })
        }
    },

    //Método de validação dos dados da maternidade
    async validate(request, response) {
        try {
            //Recebendo os dados da maternidade e atribuindo cada informação a uma váriavel.
            const {
                name,
                cnpj,
                street,
                number,
                city,
                district,
                uf,
                zipCode,
                phone
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
                    if (cnpj.length >= 12 && cnpj.length <= 14) {
                        if (street !== "") {
                            if (number.length <= 4 && number !== "") {
                                if (district !== "") {
                                    if (city !== "") {
                                        if (uf.length == 2) {
                                            if (zipCode !== "") {
                                                if (phone.length >= 10 && phone.length <= 11) {
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
                        return response.status(400).json({ error: 'CNPJ Inválido!' });
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