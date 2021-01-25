const router = require('express').Router()
const {Survey, Question, Answer} = require('../db/models')
module.exports = router

// get all surveys

router.get('/', async (req, res, next) => {
  const surveys = await Survey.findAll()
  res.send(surveys)
})

//get survey with questions and answers (entire survey)
router.get('/:surveyId', async (req, res, next) => {
  const survey = await Survey.findOne({
    where: {
      id: req.params.surveyId
    },
    include: {
      model: Question,
      include: {
        model: Answer
      }
    }
  })
  res.send(survey)
})

// get specific survey question with answers
router.get('/:surveyId/:questionId', async (req, res, next) => {
  const question = await Question.findOne({
    where: {
      id: req.params.questionId,
      surveyId: req.params.surveyId
    },
    include: {
      model: Answer
    }
  })
  res.send(question)
})
