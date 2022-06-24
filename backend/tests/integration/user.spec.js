const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('user', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new user', async () => {
        const response = await request(app)
            .post('/user/register')
            .send({
                email: 'test@gmail.com',
                password: '123Test456!',
                type: 'donor'
            });
        expect(response.body).toHaveProperty('id');
        console.log(response.body);
    });
});