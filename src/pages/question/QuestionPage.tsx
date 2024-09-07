import { fetchAnswersWithCommentsByQuestionId, fetchPostAnswersByQuestionId } from "@/entities/answer/api";
import { fetchFullDetailsByQuestionId } from "@/entities/post/api";
import QuestionCardSkeleton from "@/features/questionCardSkeleton";
import AnswerCard from "@/widgets/answerCard";
import QuestionContent from "@/widgets/questionContent";
import { Suspense } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export type TQuestionPageProps = {
}
export const QuestionPage = () => {
  const params = useParams()
  const questionId = Number(params.questionId) || 0

  const {isLoading: isQuestionDetailsLoading, data: questionDetails} = useQuery({
    queryKey: ['questionDetails'],
    queryFn: () => fetchFullDetailsByQuestionId(questionId),
    refetchOnWindowFocus: false,
    cacheTime: 10000,
    retry: false,
  })

  const {isLoading: isAnswersLoading, data: answers} = useQuery({
    queryKey: ['answers'],
    queryFn: () => fetchAnswersWithCommentsByQuestionId(questionId),
    refetchOnWindowFocus: false,
    cacheTime: 10000,
    retry: false,
  })

  if (isAnswersLoading || isQuestionDetailsLoading || !questionDetails) {
    return (
      <div>
        <QuestionCardSkeleton />
      </div>
    )
  }

  return (
    <div className="w-full md:w-[80%] max-w-[700px] m-auto">
      <Suspense fallback={<QuestionCardSkeleton />}>
        <QuestionContent {...questionDetails} />
        <h2>{questionDetails?.answer_count} Answers</h2>
        {answers && answers.length > 0 && answers.map(answer => (
          <AnswerCard {...answer} />
        ))}
      </Suspense>
    </div>
  )
};
