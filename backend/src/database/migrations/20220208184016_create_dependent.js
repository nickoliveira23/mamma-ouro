
exports.up = function (knex) {
    return knex.schema.createTable('dependent', function (table) {
        table.increments('id');
        table.string('name').notNullable();
        table.date('birth').notNullable();

        table.integer('id_donor').references('donor.id').notNullable().onDelete('CASCADE');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('dependent');
};
