import { Card, CardContent, CardHeader } from '@/shared/components/ui'
import { Question, EntityWithComments } from '@/shared/types'
import UserShortInfo from '../../features/userShortInfo'
import CommentField from '../../features/commentField'
import { compactize, convertDateToString } from '@/shared/utils'

export type TQuestionContentProps = EntityWithComments<Question>
export const QuestionContent = ({
  title,
  body,
  view_count,
  creation_date,
  owner,
  score,
  comments,
}: TQuestionContentProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-20">
        <p className="text-xl font-sans font-extrabold" dangerouslySetInnerHTML={{ __html: title }} />
        <div className="flex gap-10">
          {[
            ['Views:', compactize(view_count)],
            ['Created:', convertDateToString(creation_date)],
            ['Score:', score],
          ].map(([text, data]) => (
            <p key={text} className="font-bold text-sm">
              <p className="font-light text-gray-500">{text}</p>
              {data}
            </p>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-20 divide-y">
        <div className="flex flex-col gap-5 overflow-x-scroll" dangerouslySetInnerHTML={{ __html: body }} />
        <div>
          <UserShortInfo {...owner} />
        </div>
        {comments.map(comment => (
          <CommentField key={comment.comment_id} {...comment} />
        ))}
      </CardContent>
    </Card>
  )
}
