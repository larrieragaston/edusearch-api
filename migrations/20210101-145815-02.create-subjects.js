/* globals ObjectId */

exports.name = 'create-subjects'
exports.description = 'Creates first subjects'

exports.isReversible = true
exports.isIgnored = false

exports.up = (db, done) => {
  db.collection('subjects').insert([
    {
      _id: new ObjectId('000000000000000000000000'),
      career: new ObjectId('000000000000000000000000'),
      name: 'Programación I',
      curriculum: null
    }, 
    {
      _id: new ObjectId('000000000000000000000001'),
      career: new ObjectId('000000000000000000000000'),
      name: 'Programación II',
      curriculum: null
    }, 
    {
      _id: new ObjectId('000000000000000000000002'),
      career: new ObjectId('000000000000000000000000'),
      name: 'Programación III',
      curriculum: null
    }, 
    {
      _id: new ObjectId('000000000000000000000003'),
      career: new ObjectId('000000000000000000000001'),
      name: 'Electrónica I',
      curriculum: null
    }, 
    {
      _id: new ObjectId('000000000000000000000004'),
      career: new ObjectId('000000000000000000000001'),
      name: 'Electrónica II',
      curriculum: null
    }, 
    {
      _id: new ObjectId('000000000000000000000005'),
      career: new ObjectId('000000000000000000000001'),
      name: 'Electrónica III',
      curriculum: null
    }, 
    {
      _id: new ObjectId('000000000000000000000006'),
      career: new ObjectId('000000000000000000000002'),
      name: 'Programación I',
      curriculum: null
    }, 
    {
      _id: new ObjectId('000000000000000000000007'),
      career: new ObjectId('000000000000000000000002'),
      name: 'Programación II',
      curriculum: null
    }, 
    {
      _id: new ObjectId('000000000000000000000008'),
      career: new ObjectId('000000000000000000000002'),
      name: 'Programación III',
      curriculum: null
    }, 
    {
      _id: new ObjectId('000000000000000000000009'),
      career: new ObjectId('000000000000000000000003'),
      name: 'Electrónica I',
      curriculum: null
    }, 
    {
      _id: new ObjectId('000000000000000000000010'),
      career: new ObjectId('000000000000000000000003'),
      name: 'Electrónica II',
      curriculum: null
    }, 
    {
      _id: new ObjectId('000000000000000000000011'),
      career: new ObjectId('000000000000000000000003'),
      name: 'Electrónica III',
      curriculum: null
    }
  ],
    done
  )
}

exports.down = (db, done) => {
  db.collection('subjects').deleteMany(
    [
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
      },
      {
        _id: new ObjectId('000000000000000000000004')
      },
      {
        _id: new ObjectId('000000000000000000000005')
      },
      {
        _id: new ObjectId('000000000000000000000006')
      },
      {
        _id: new ObjectId('000000000000000000000007')
      },
      {
        _id: new ObjectId('000000000000000000000008')
      },
      {
        _id: new ObjectId('000000000000000000000009')
      },
      {
        _id: new ObjectId('000000000000000000000010')
      },
      {
        _id: new ObjectId('000000000000000000000011')
      }
    ],
    done
  )
}
