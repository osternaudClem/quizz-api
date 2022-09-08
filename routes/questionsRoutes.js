import express from 'express';
import * as Questions from '../controllers/questionsController';
const router = express.Router();

/**
 * @api {get} /api/questions Get all questions
 * @apiVersion 0.0.1
 * @apiName GetQuestions
 * @apiGroup Questions
 *
 * @apiSuccess {Object[]} questions
 *
 */
router.get('/', async (req, res) => {
  return res.json(await Questions.getQuestions());
});

/**
 * @api {get} /api/questions/random Get a random question
 * @apiVersion 0.0.1
 * @apiName GetRandomQuestion
 * @apiGroup Questions
 *
 * @apiSuccess {Object} question
 *
 */
router.get('/random', async (req, res) => {
  return res.json(await Questions.getRandomQuestion());
});

/**
 * @api {get} /api/questions/:id Get single question
 * @apiVersion 0.0.1
 * @apiName GetQuestion
 * @apiGroup Questions
 *
 * @apiParam (Params) {String} id
 * 
 * @apiSuccess {Object} question
 *
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  return res.json(await Questions.getQuestion(id));
});


/**
 * @api {post} /api/questions Create new question
 * @apiVersion 0.0.1
 * @apiName PostQuestions
 * @apiGroup Questions
 *
 * @apiSuccess {Object} question
 *
 */
router.post('/', async (req, res) => {
  const { question } = req.body;

  try {    
    const savedQuestion = await Questions.postQuestion(question);
    return res.json(savedQuestion);
  } catch (error) {
    return res.json(error);
  } 
});

/**
 * @api {patch} /api/questions Update a question
 * @apiVersion 0.0.1
 * @apiName PatchQuestions
 * @apiGroup Questions
 * 
 * @apiParam (Params) {String} id
 *
 * @apiSuccess {Object} question
 *
 */
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  return res.json(await Questions.patchQuestion(id, req.body));
});

/**
 * @api {post} /api/questions Delete a question
 * @apiVersion 0.0.1
 * @apiName DeleteQuestion
 * @apiGroup Questions
 *
 * @apiParam (Params) {String} id
 * 
 * @apiSuccess {Object} question
 *
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  return res.json(await Questions.deleteQuestion(id));
});

module.exports = router;