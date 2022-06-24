//Importando arquivo de conexão com o banco de dados
const connection = require('../database/connection');

//Exportando nossos métodos de controle
module.exports = {
    async register(request, response) {
        try {
            //Recebendo dados do agendamento do corpo da requisição
            const { date_time, date, hour, status, id_donor, id_hospital } = request.body;

            /*Aqui é feito um insert na tabela de agendamentos com os dados que foram recebidos,
            no final a variável 'id' recebe o id do registro criado.*/
            const [id] = await connection('schedule').insert({
                date_time: date_time,
                date: date,
                hour: hour,
                status: status,
                id_donor: id_donor,
                id_hospital: id_hospital,
            })

            //Em caso de sucesso é retornado o id para o cliente.
            return response.json({ id });
        } catch (err) {
            //Em caso de falha é retornado a mensagem de erro.
            console.log(err)
            return response.status(500).json({ error: 'Falha ao cadastrar agendamento!' })
        }
    },

    //Método de listagem de todos os agendamentos
    async indexAll(request, response) {
        try {
            /*Aqui é feito um select na tabela de agendamentos que povoa a váriavel 'schedule' 
            com um objeto contendo todos os registros*/
            const schedule = await connection('schedule')
                .select('*')

            //Em caso de sucesso é retornado o objeto com todos os registros
            return response.json(schedule)
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

            /*Na tabela de agendamentos é feito um select onde o id é igual ao id recebido pelo cliente, 
            o retorno povoa a váriavel 'schedule' com um objeto contendo o registro*/
            const schedule = await connection('schedule')
                .select('*')
                .where('id', id)

            //Em caso de sucesso é retornado o objeto com o registro
            return response.json(schedule)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            return response.json({ error: 'Falha ao exibir agendamentos!' })
            console.log(err)
        }
    },

    //Método de listagem por id
    async indexWithHospital(request, response) {
        try {
            //Recebendo o id de usuário pelos parâmetros da requisição
            const { user } = request.params;

            /*Na tabela de doadora é feito um select onde o id é igual ao id recebido pelo cliente, 
            o retorno será somente o id da doadora*/
            const [donor] = await connection('donor')
                .select('id')
                .where('id_user', user)

            /*Na tabela de agendamentos é feito um select onde o id é igual ao id retornado pela consulta,
            além disso é feito um inner join na tabela hospital para trazer os registros do hospital também, 
            o retorno povoa a váriavel 'schedule' com um objeto contendo o registro*/
            const schedule = await connection('schedule')
                .join('hospital', 'id_hospital', '=', 'hospital.id')
                .where('schedule.id_donor', donor.id)
                .select([
                    'hospital.*',
                    'schedule.*'
                ]);

            //Em caso de sucesso é retornado o objeto com o registro
            return response.json(schedule)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            console.log(err)
            return response.json({ error: 'Falha ao exibir agendamentos!' })
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;

            await connection('schedule')
                .where('id', id)
                .delete()

            return response.json({ message: 'Registro deletado com sucesso' });
        } catch (err) {
            console.log(err)
            return response.json({ error: 'Falha ao deletar registro' })
        }
    }
}