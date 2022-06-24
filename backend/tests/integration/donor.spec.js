const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('donor', () => {
    // beforeAll(async () => {
    //     await connection.migrate.rollback();
    //     await connection.migrate.latest();
    // })

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new donor', async () => {
        const response = await request(app)
            .post('/donor/register')
            .send({
                name: 'Test',
                birth: '2000-01-24',
                street: 'Rua Lara',
                number: 38,
                city: 'Mogi das Cruzes',
                district: 'Centro',
                uf: 'SP',
                zipCode: '08717260',
                phone: '11911111111',
                id_user: 1

            });
        expect(response.body).toHaveProperty('id');
        console.log(response.body);
    });
});