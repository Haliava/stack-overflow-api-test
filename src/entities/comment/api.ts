import { ApiResponse, Comment } from '@/shared/types';
import { BASE_URL } from '@/shared/consts';

type TFetchPostCommentsByQuestionId = (id: number) => Promise<Comment[]>
export const fetchPostCommentsByQuestionId: TFetchPostCommentsByQuestionId = async (questionId) => {
  const data: ApiResponse<Comment> = await fetch(`${BASE_URL}/questions/${questionId}/comments?order=desc&site=stackoverflow&filter=withbody`).then(res => res.json())

  return data.items
}

type TFetchAnswerCommentsByAnswerId = (answerId: number) => Promise<Comment[]>
export const fetchAnswerCommentsByAnswerId: TFetchAnswerCommentsByAnswerId = async (answerId) => {
  const data: ApiResponse<Comment> = await fetch(`${BASE_URL}/answers/${answerId}/comments?order=desc&sort=creation&site=stackoverflow&filter=withbody`).then(res => res.json())

  return data.items
}