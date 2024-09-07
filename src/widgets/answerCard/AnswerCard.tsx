import CommentField from '../../features/commentField'
import UserShortInfo from '../../features/userShortInfo'
import { Answer, Comment } from '@/shared/types'
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/components/ui'
import { convertDateToString } from '@/shared/utils'

export type TAnswerCardProps = Answer & { comments: Comment[] }
export const AnswerCard = ({ body, owner, score, creation_date, comments, is_accepted }: TAnswerCardProps) => {
  return (
    <Card className="divide-y">
      <CardHeader className="flex gap-10">
        <h3 className={`text-lg font-bold text-center rounded-sm ${is_accepted ? 'bg-green-200' : 'bg-gray-200'}`}>
          This answer has a score of {score}
        </h3>
        <div
          className="flex flex-col overflow-x-scroll gap-5 [&_pre]:decoration-sky-400"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-10 mr-0 ml-auto">
        <p className="text-sm text-gray-400">answered on {convertDateToString(creation_date)}</p>
        <div className="">
          <UserShortInfo {...owner} />
        </div>
      </CardContent>
      {comments && comments.length > 0 && (
        <CardFooter className="flex flex-col gap-5 divide-y">
          {comments.map(comment => (
            <CommentField key={comment.comment_id} {...comment} />
          ))}
        </CardFooter>
      )}
    </Card>
  )
}
