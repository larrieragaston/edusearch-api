/* globals ObjectId */

exports.name = 'create-postulations'
exports.description = 'Creates first postulations'

exports.isReversible = true
exports.isIgnored = false

exports.up = (db, done) => {
  db.collection('postulations').insert([
    {
      _id: new ObjectId('000000000000000000000000'),
      user: new ObjectId('000000000000000000000006'),
      contest: new ObjectId('000000000000000000000000'),
      date: new Date('2021-01-01')
    },
    {
      _id: new ObjectId('000000000000000000000001'),
      user: new ObjectId('000000000000000000000007'),
      contest: new ObjectId('000000000000000000000001'),
      date: new Date('2021-01-01')
    },
    {
      _id: new ObjectId('000000000000000000000002'),
      user: new ObjectId('000000000000000000000008'),
      contest: new ObjectId('000000000000000000000001'),
      date: new Date('2021-01-01')
    },
    {
      _id: new ObjectId('000000000000000000000003'),
      user: new ObjectId('000000000000000000000008'),
      contest: new ObjectId('000000000000000000000002'),
      date: new Date('2021-01-01')
    },
  ],
    done
  )
}

exports.down = (db, done) => {
  db.collection('postulations').deleteMany([
    {
      _id: new ObjectId('000000000000000000000000')
    },
    {
      _id: new ObjectId('000000000000000000000001')
    },
    {
      _id: new ObjectId('000000000000000000000002')
    },
    {
      _id: new ObjectId('000000000000000000000003')
    }],
    done
  )
}
