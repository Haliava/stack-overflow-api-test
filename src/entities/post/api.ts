import { ApiResponse, EntityWithComments, Question } from '@/shared/types';
import { BASE_URL } from '@/shared/consts';
import { fetchPostCommentsByQuestionId } from '../comment/api';

type TFetchQuestionsByQuery = (query: string) => Promise<Question[]>
export const fetchQuestionsByQuery: TFetchQuestionsByQuery = async (query) => {
  if (query.length <= 0) {
    return []
  }

  const data: ApiResponse<Question> = await fetch(`${BASE_URL}/search/advanced?order=desc&sort=votes&title=${query}&site=stackoverflow`).then(res => res.json())

  return data.items
}

type TFetchDetailsByQuestionId = (questionId: number | string) => Promise<Question>
export const fetchDetailsByQuestionId: TFetchDetailsByQuestionId = async (questionId) => {
  if (questionId === 0) {
    return {} as Question
  }

  const data: ApiResponse<Question> = await fetch(`${BASE_URL}/questions/${questionId}?order=desc&sort=votes&site=stackoverflow&filter=withbody`).then(res => res.json())

  return data.items[0]
}

type TFetchFullDetailsByQuestionId<T> = (q: number) => Promise<EntityWithComments<T>> 
export const fetchFullDetailsByQuestionId: TFetchFullDetailsByQuestionId<Question> = async (questionId) => {
  const [question, comments] = await Promise.all([
    fetchDetailsByQuestionId(questionId),
    fetchPostCommentsByQuestionId(questionId),
  ])

  return {
    ...question,
    comments
  }
}
