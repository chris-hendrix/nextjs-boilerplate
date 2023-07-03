import { useGetSessionQuery, useGetUserQuery } from '@/store'

const useSessionUser = () => {
  const { data: session, isLoading: isSessionLoading } = useGetSessionQuery()
  const userId = session?.user?.id
  const { data: user, isLoading } = useGetUserQuery(userId || '', { skip: isSessionLoading || !userId })
  return { user, isLoading }
}

export default useSessionUser
