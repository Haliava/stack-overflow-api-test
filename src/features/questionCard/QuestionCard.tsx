import { Button, Card, CardContent, CardFooter, CardHeader } from '@/shared/components/ui'
import { Question } from '@/shared/types'
import { compactize, unescape } from '@/shared/utils'
import { useNavigate } from 'react-router-dom'
import UserShortInfo from '../userShortInfo'

export type TQuestionCardProps = Question
export const QuestionCard = ({ title, view_count, is_answered, owner, question_id }: TQuestionCardProps) => {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`/question/${question_id}`)}
      className="grid grid-flow-row-dense m-auto md:min-w-[200px] md:w-full cursor-pointer hover:scale-105 hover:shadow-lg"
    >
      <CardHeader className="h-[200px]">
        <h3 className="text-lg line-clamp-5 text-ellipsis whitespace-break-spaces md:line-clamp-4">
          {unescape(title)}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-thin">Viewed {compactize(view_count)} times</p>
        <Button
          className={is_answered ? 'bg-green-300 hover:scale-x-125 transition-all duration-200' : 'bg-red-300'}
          variant="outline"
        >
          <p className="text-base font-light uppercase">{!is_answered && 'un'}answered</p>
        </Button>
      </CardContent>
      <CardFooter className="flex gap-3">
        <UserShortInfo {...owner} />
      </CardFooter>
    </Card>
  )
}
