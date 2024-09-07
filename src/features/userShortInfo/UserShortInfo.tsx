import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui'
import { compactize, unescape } from '@/shared/utils'
import { User } from '@/shared/types'

export type TUserShortInfoProps = Pick<User, 'display_name' | 'profile_image' | 'reputation'>

export const UserShortInfo = ({ display_name, profile_image, reputation }: TUserShortInfoProps) => {
  return (
    <>
      <Avatar>
        <AvatarImage src={profile_image} alt={display_name} />
        <AvatarFallback>
          {display_name
            .split(' ')
            .map(elem => elem[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      <p className="text-md">{unescape(display_name)}</p>
      <p className="text-xs font-light">{compactize(reputation)} rep</p>
    </>
  )
}
