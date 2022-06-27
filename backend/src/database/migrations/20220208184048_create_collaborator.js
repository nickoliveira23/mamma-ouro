
exports.up = function (knex) {
    return knex.schema.createTable('collaborator', function (table) {
        table.increments('id');
        table.string('name').notNullable();
        table.string('role').notNullable();

        table.integer('id_user').references('user.id').notNullable().onDelete('CASCADE');
        table.integer('id_hospital').references('hospital.id').onDelete('CASCADE');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('collaborator');
};
