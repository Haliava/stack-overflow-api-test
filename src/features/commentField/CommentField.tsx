import { Comment } from '@/shared/types'
import { convertDateToString } from '@/shared/utils'

export type TCommentField = Comment
export const CommentField = ({ body, creation_date, score, owner }: TCommentField) => {
  return (
    <div className="grid gap-5 align-top grid-cols-fit-auto">
      <p>{score}</p>
      <div className="max-w-full overflow-x-scroll">
        <div dangerouslySetInnerHTML={{ __html: body }} />
        <p className="text-blue-400 text-sm font-light">
          {owner.display_name} on
          <p className="text-gray-400">{convertDateToString(creation_date)}</p>
        </p>
      </div>
    </div>
  )
}
