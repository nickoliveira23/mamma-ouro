
exports.up = function (knex) {
    return knex.schema.createTable('hospital', function (table) {
        table.increments('id');
        table.string('company').notNullable();
        table.string('cnpj').notNullable();
        table.string('street').notNullable();
        table.string('number').notNullable();
        table.string('city').notNullable();
        table.string('district').notNullable();
        table.string('uf').notNullable();
        table.string('zipCode').notNullable();
        table.string('phone').notNullable();
        table.string('place_id').notNullable();

        table.integer('id_collaborator').references('collaborator.id').notNullable().onDelete('CASCADE');
        table.integer('id_donor').references('donor.id').onDelete('CASCADE');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('hospital');
};
