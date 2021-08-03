/* globals ObjectId */

exports.name = 'create-contests'
exports.description = 'Creates first contests'

exports.isReversible = true
exports.isIgnored = false

exports.up = (db, done) => {
  db.collection('contests').insert(
    [
      {
        _id: new ObjectId('000000000000000000000000'),
        university: new ObjectId('000000000000000000000000'),
        career: new ObjectId('000000000000000000000000'),
        subject: new ObjectId('000000000000000000000000'),
        day: 'Lunes',
        startsAt: '08:00',
        endsAt: '12:00',
        createdDate: new Date('2021-01-01'),
        dueDate: new Date('2022-01-01'),
        active: true,
        requirements: [
          { name: 'Acá enlistas los requisitos del docente', optional: false },
          { name: 'Como cinco o seis cosas.', optional: false },
          { name: 'Asi se veria algo que no cumple', optional: true },
          { name: 'Y que evidentemente queden cinco ítems.', optional: false },
          { name: 'Con un interlineado más grande', optional: true },
          { name: 'Que los textos normales.', optional: false }],
        hasColloquium: true,
        activeStage: 4
      },
      {
        _id: new ObjectId('000000000000000000000001'),
        university: new ObjectId('000000000000000000000000'),
        career: new ObjectId('000000000000000000000000'),
        subject: new ObjectId('000000000000000000000001'),
        day: 'Lunes',
        startsAt: '08:00',
        endsAt: '12:00',
        createdDate: new Date('2021-01-01'),
        dueDate: new Date('2022-01-01'),
        active: true,
        requirements: [
          { name: 'Acá enlistas los requisitos del docente', optional: true },
          { name: 'Como cinco o seis cosas.', optional: true },
          { name: 'Asi se veria algo que no cumple', optional: true },
          { name: 'Y que evidentemente queden cinco ítems.', optional: true },
          { name: 'Con un interlineado más grande', optional: true },
          { name: 'Que los textos normales.', optional: true }],
        hasColloquium: false,
        activeStage: 1
      },
      {
        _id: new ObjectId('000000000000000000000002'),
        university: new ObjectId('000000000000000000000000'),
        career: new ObjectId('000000000000000000000001'),
        subject: new ObjectId('000000000000000000000003'),
        day: 'Lunes',
        startsAt: '08:00',
        endsAt: '12:00',
        createdDate: new Date('2021-01-01'),
        dueDate: new Date('2022-01-01'),
        active: true,
        requirements: [
          { name: 'Acá enlistas los requisitos del docente', optional: false },
          { name: 'Como cinco o seis cosas.', optional: false },
          { name: 'Asi se veria algo que no cumple', optional: false },
          { name: 'Y que evidentemente queden cinco ítems.', optional: false },
          { name: 'Con un interlineado más grande', optional: false },
          { name: 'Que los textos normales.', optional: false }],
        hasColloquium: true,
        activeStage: 2
      },
      {
        _id: new ObjectId('000000000000000000000003'),
        university: new ObjectId('000000000000000000000000'),
        career: new ObjectId('000000000000000000000001'),
        subject: new ObjectId('000000000000000000000004'),
        day: 'Lunes',
        startsAt: '08:00',
        endsAt: '12:00',
        createdDate: new Date('2021-01-01'),
        dueDate: new Date('2022-01-01'),
        active: true,
        requirements: [
          { name: 'Acá enlistas los requisitos del docente', optional: false },
          { name: 'Con un interlineado más grande', optional: true },
          { name: 'Que los textos normales.', optional: false }],
        hasColloquium: false,
        activeStage: 5
      },
      {
        _id: new ObjectId('000000000000000000000004'),
        university: new ObjectId('000000000000000000000001'),
        career: new ObjectId('000000000000000000000002'),
        subject: new ObjectId('000000000000000000000006'),
        day: 'Lunes',
        startsAt: '08:00',
        endsAt: '12:00',
        createdDate: new Date('2021-01-01'),
        dueDate: new Date('2022-01-01'),
        active: true,
        requirements: [
          { name: 'Que los textos normales.', optional: false },
          { name: 'Asi se veria algo que no cumple', optional: false },
          { name: 'Como cinco o seis cosas.', optional: false },
          { name: 'Con un interlineado más grande', optional: false },
          { name: 'Y que evidentemente queden cinco ítems.', optional: false },
          { name: 'Acá enlistas los requisitos del docente', optional: false }],
        hasColloquium: false,
        activeStage: 3
      },
      {
        _id: new ObjectId('000000000000000000000005'),
        university: new ObjectId('000000000000000000000001'),
        career: new ObjectId('000000000000000000000002'),
        subject: new ObjectId('000000000000000000000007'),
        day: 'Lunes',
        startsAt: '08:00',
        endsAt: '12:00',
        createdDate: new Date('2021-01-01'),
        dueDate: new Date('2022-01-01'),
        active: true,
        requirements: [
          { name: 'Acá enlistas los requisitos del docente', optional: false },
          { name: 'Como cinco o seis cosas.', optional: false },
          { name: 'Asi se veria algo que no cumple', optional: false },
          { name: 'Y que evidentemente queden cinco ítems.', optional: false },
          { name: 'Con un interlineado más grande', optional: false },
          { name: 'Que los textos normales.', optional: false }],
        hasColloquium: true,
        activeStage: 2
      },
      {
        _id: new ObjectId('000000000000000000000006'),
        university: new ObjectId('000000000000000000000001'),
        career: new ObjectId('000000000000000000000003'),
        subject: new ObjectId('000000000000000000000009'),
        day: 'Lunes',
        startsAt: '08:00',
        endsAt: '12:00',
        createdDate: new Date('2021-01-01'),
        dueDate: new Date('2022-01-01'),
        active: true,
        requirements: [
          { name: 'Acá enlistas los requisitos del docente', optional: false },
          { name: 'Como cinco o seis cosas.', optional: false },
          { name: 'Asi se veria algo que no cumple', optional: false },
          { name: 'Y que evidentemente queden cinco ítems.', optional: false },
          { name: 'Con un interlineado más grande', optional: false },
          { name: 'Que los textos normales.', optional: false }],
        hasColloquium: true,
        activeStage: 2
      },
      {
        _id: new ObjectId('000000000000000000000007'),
        university: new ObjectId('000000000000000000000001'),
        career: new ObjectId('000000000000000000000003'),
        subject: new ObjectId('000000000000000000000010'),
        day: 'Lunes',
        startsAt: '08:00',
        endsAt: '12:00',
        createdDate: new Date('2021-01-01'),
        dueDate: new Date('2022-01-01'),
        active: true,
        requirements: [
          { name: 'Acá enlistas los requisitos del docente', optional: false },
          { name: 'Como cinco o seis cosas.', optional: false },
          { name: 'Asi se veria algo que no cumple', optional: false },
          { name: 'Y que evidentemente queden cinco ítems.', optional: false },
          { name: 'Con un interlineado más grande', optional: false },
          { name: 'Que los textos normales.', optional: false }],
        hasColloquium: true,
        activeStage: 2
      }
    ],
    done
  )
}

exports.down = (db, done) => {
  db.collection('contests').deleteMany([
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
  ],
    done
  )
}
