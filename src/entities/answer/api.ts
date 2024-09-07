import { Answer, ApiResponse, EntityWithComments } from '@/shared/types';
import { BASE_URL } from '@/shared/consts';
import { fetchAnswerCommentsByAnswerId } from '../comment/api';

type TFetchPostAnswersByQuestionId = (id: number) => Promise<Answer[]>
export const fetchPostAnswersByQuestionId: TFetchPostAnswersByQuestionId = async (questionId) => {
  const data: ApiResponse<Answer> = await fetch(`${BASE_URL}/questions/${questionId}/answers?order=desc&sort=activity&site=stackoverflow&filter=withbody`).then(res => res.json())

  return data.items
}

type TFetchAnswersWithComments = (questionId: number) => Promise<EntityWithComments<Answer>[]>
export const fetchAnswersWithCommentsByQuestionId: TFetchAnswersWithComments = async (questionId) => {
  if (questionId === 0) {
    return []
  }

  const answers = await fetchPostAnswersByQuestionId(questionId)

  return Promise.all(
    answers.map(({answer_id}) =>
      fetchAnswerCommentsByAnswerId(answer_id))
  ).then(
    comments =>
      answers.map((answer, i) => (
        {...answer, comments: comments[i]}
      ))
  )
}
