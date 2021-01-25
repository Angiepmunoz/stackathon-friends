'use strict'

const db = require('../server/db')
const {User, Answer, Question, Survey} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const surveys = await Promise.all([Survey.create({name: 'DoYouEvenKnowMe'})])

  const questions = Promise.all([
    Question.create({
      question:
        'If I could eat any soup for the rest of my life, which would it be?'
    }),
    Question.create({
      question: 'What was my college degree?'
    })
  ])

  const answers = Promise.all([
    Answer.create({response: 'sancocho', correct: true}),
    Answer.create({response: 'ramen'}),
    Answer.create({response: 'economics', correct: true}),
    Answer.create({response: 'environmental science'}),
    Answer.create({response: 'political science'})
  ])

  const [survey] = await Survey.findAll()

  const [q1, q2] = await Question.findAll()

  const [q1a1, q1a2, q2a1, q2a2, q2a3] = await Answer.findAll()

  await survey.addQuestions([q1, q2])
  await q1.addAnswers([q1a1, q1a2])
  await q2.addAnswers([q2a1, q2a2, q2a3])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
