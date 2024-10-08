import { fetchAnswersWithCommentsByQuestionId } from '@/entities/answer/api'
import { fetchFullDetailsByQuestionId } from '@/entities/post/api'
import QuestionCardSkeleton from '@/features/questionCardSkeleton'
import AnswerCard from '@/widgets/answerCard'
import QuestionContent from '@/widgets/questionContent'
import { Suspense } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export type TQuestionPageProps = {}
export const QuestionPage = () => {
  const params = useParams()
  const questionId = Number(params.questionId) || 0

  const { isLoading: isQuestionDetailsLoading, data: questionDetails } = useQuery({
    queryKey: ['questionDetails'],
    queryFn: () => fetchFullDetailsByQuestionId(questionId),
    refetchOnWindowFocus: false,
    cacheTime: 10000,
    retry: false,
  })

  const { isLoading: isAnswersLoading, data: answers } = useQuery({
    queryKey: ['answers'],
    queryFn: () => fetchAnswersWithCommentsByQuestionId(questionId),
    refetchOnWindowFocus: false,
    cacheTime: 10000,
    retry: false,
  })

  if (isAnswersLoading || isQuestionDetailsLoading || !questionDetails) {
    return (
      <div className="w-[95vmin] md:w-[80%] max-w-[700px] m-auto pt-20">
        <QuestionCardSkeleton />
      </div>
    )
  }

  return (
    <div className="w-[95vmin] md:w-[80%] max-w-[700px] m-auto pt-20 pb-20">
      <Suspense fallback={<QuestionCardSkeleton />}>
        <QuestionContent {...questionDetails} />
        <h2 className="text-2xl mt-10 mb-10 uppercase font-extrabold text-center">
          {questionDetails?.answer_count} Answers
        </h2>
        <div className="flex flex-col gap-10">
          {answers && answers.length > 0 && answers.map(answer => <AnswerCard {...answer} />)}
        </div>
      </Suspense>
    </div>
  )
}
