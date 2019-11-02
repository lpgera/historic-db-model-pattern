module.exports.up = async knex => {
  await knex.schema.createTable('example', table => {
    table.string('id', 36).primary()
    table.dateTime('createdAt', 3)
    table.dateTime('updatedAt', 3)
    table.string('firstProperty').notNullable()
    table.integer('secondProperty').notNullable()
  })
  await knex.schema.createTable('example_historic', table => {
    table.string('id', 36).primary()
    table.dateTime('createdAt', 3)
    table.dateTime('updatedAt', 3)
    table.dateTime('validFrom', 3)
    table.boolean('obsolete').notNullable()
    table.string('currentId')
    table.string('firstProperty').notNullable()
    table.integer('secondProperty').notNullable()
  })
}

module.exports.down = async knex => {
  await knex.schema.dropTable('example')
  await knex.schema.dropTable('example_historic')
}
