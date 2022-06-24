
exports.up = function (knex) {
    return knex.schema.createTable('donor', function (table) {
        table.increments('id');
        table.string('name').notNullable();
        table.date('birth').notNullable();
        table.string('street').notNullable();
        table.integer('number').notNullable();
        table.string('city').notNullable();
        table.string('district').notNullable();
        table.string('uf').notNullable();
        table.string('zipCode').notNullable();
        table.string('phone').notNullable();

        table.integer('id_user').references('user.id').notNullable().onDelete('CASCADE');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('donor');
};
