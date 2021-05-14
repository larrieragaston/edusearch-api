/* globals ObjectId */

exports.name = 'create-first-user'
exports.description = 'Creates an admin user'

exports.isReversible = true
exports.isIgnored = false

exports.up = (db, done) => {
  db.collection('users').insertOne(
    {
      _id: new ObjectId('000000000000000000000000'),
      firstName: 'admin',
      lastName: 'root',
      email: 'admin@edusearch.com',
      password: '$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO', // Password1
      role: 'Teacher',
      __v: 0
    },
    done
  )
}

exports.down = (db, done) => {
  db.collection('users').remove(
    {
      _id: new ObjectId('000000000000000000000000')
    },
    done
  )
}
