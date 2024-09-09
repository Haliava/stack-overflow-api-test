import { ApiResponse, EntityWithComments, Question, TSortBy } from '@/shared/types'
import { BASE_URL, PAGE_SIZE } from '@/shared/consts'
import { fetchPostCommentsByQuestionId } from '../comment/api'

type TFetchQuestionsByQuery = (query: string, sortBy: TSortBy, page: number) => Promise<[Question[], boolean]>
export const fetchQuestionsByQuery: TFetchQuestionsByQuery = async (query, sortBy, page) => {
  if (query.length <= 0) {
    return [[], false]
  }

  const data: ApiResponse<Question> = await fetch(
    `${BASE_URL}/search/advanced?page=${page}&pagesize=${PAGE_SIZE}&order=desc&sort=${sortBy}&title=${query}&site=stackoverflow`
  ).then(res => res.json())

  return [data.items, data.has_more] as const
}

type TFetchDetailsByQuestionId = (questionId: number | string) => Promise<Question>
export const fetchDetailsByQuestionId: TFetchDetailsByQuestionId = async questionId => {
  if (questionId === 0) {
    return {} as Question
  }

  const data: ApiResponse<Question> = await fetch(
    `${BASE_URL}/questions/${questionId}?order=desc&sort=votes&site=stackoverflow&filter=withbody`
  ).then(res => res.json())

  return data.items[0]
}

type TFetchFullDetailsByQuestionId<T> = (q: number) => Promise<EntityWithComments<T>>
export const fetchFullDetailsByQuestionId: TFetchFullDetailsByQuestionId<Question> = async questionId => {
  const [question, comments] = await Promise.all([
    fetchDetailsByQuestionId(questionId),
    fetchPostCommentsByQuestionId(questionId),
  ])

  return {
    ...question,
    comments,
  }
}
