import { Card, CardContent, CardHeader } from "@/shared/components/ui";
import { Question, EntityWithComments } from "@/shared/types";
import UserShortInfo from "../../features/userShortInfo";
import CommentField from "../../features/commentField";

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
        <p className="text-2xl">{title}</p>
        <div className="flex gap-10">
          {[['Views:', view_count], ['Created:', creation_date], ['Score:', score]].map(([text, data]) => (
            <p key={text} className="font-bold text-sm">
              <p className="font-light text-gray-500">{text}</p>
              {data}
            </p>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-36 divide-y">
        <div className="flex flex-col gap-5" dangerouslySetInnerHTML={{__html: body}} />
        <UserShortInfo {...owner} />
        {comments.map(comment => (
          <CommentField key={comment.comment_id} {...comment} />
        ))}
      </CardContent>
    </Card>
  )
};
