import { QuestionsModel } from '../models';
import * as Categories from './categoriesController';
import { createNewEntity, mergeEntity } from '../utils/modelUtils';
import { errorMessages } from '../utils/errorUtils';

export async function getQuestions() {
  try {
    const questions = await QuestionsModel.find();
    return questions;
  } catch (error) {
    return error;
  }
}

export async function getQuestion(questionId) {
  if (!questionId) {
    return errorMessages.generals.missingId;
  }

  try {
    const question = QuestionsModel.findById(questionId).populate('category');

    return question;
  } catch (error) {
    return error;
  }
}

export async function getRandomQuestion() {
  try {
    const questions = await QuestionsModel.find();
    const random = Math.floor(Math.random() * (questions.length));
    console.log(random);
    return questions[random];
  } catch (error) {
    return error;
  }
}

export async function postQuestion(question) {
  const categoryId = question.category;

  const newQuestion = createNewEntity(question, QuestionsModel);

  try {
  const question = await newQuestion.save();
    await Categories.patchCategory(categoryId, { questions: question._id });
    return question;
  } catch (error) {
    return error;
  }
}

export async function patchQuestion(questionId, updatedAttributes) {
  if (!questionId) {
    return errorMessages.generals.missingId;
  }

  try {
    const question = await QuestionsModel.findById(questionId);

    if (!question) {
      return errorMessages.questions.notFound;
    }

    const updatedQuestion = mergeEntity(updatedAttributes, QuestionsModel);

    for (const key in updatedQuestion) {
      question[key] = updatedQuestion[key];
    }

    return await question.save();
  } catch (error) {
    return error;
  }
}

export async function deleteQuestion(questionId) {
  if (!questionId) {
    return errorMessages.generals.missingId;
  }

  try {
    const question = await QuestionsModel.findOneAndDelete({
      _id: questionId,
    });

    if (!question) {
      return errorMessages.questions.notFound;
    }

    return question;
  } catch (error) {
    return error;
  }
} 
