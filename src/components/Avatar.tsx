import Image from 'next/image'
import { User } from '@prisma/client'

interface Props {
  user?: Partial<User> | null
  size?: number
}

const Avatar: React.FC<Props> = ({ user = null }) => (
  <div className="relative w-12 h-12 rounded-full">
    <Image src={user?.bucketImage || user?.image || '/avatar.svg'} alt="avatar.svg" fill />
  </div>
)

export default Avatar
