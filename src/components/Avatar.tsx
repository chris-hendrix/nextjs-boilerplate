import Image from 'next/image'
import { User } from '@prisma/client'

interface Props {
  user?: Partial<User> | null
  size?: number | string
}

const Avatar: React.FC<Props> = ({ user = null, size = '24px' }) => (
  <div className="avatar">
    <div style={{ width: size, height: size }} className="relative rounded-full">
      <Image src={user?.bucketImage || user?.image || '/avatar.svg'} alt="avatar.svg" fill />
    </div>
  </div>
)

export default Avatar
