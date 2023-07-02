import { useGetSessionQuery, useGetUserQuery } from '@/store'

const useSessionUser = () => {
  const { data: session, isLoading } = useGetSessionQuery()
  const userId = session?.user?.id
  useGetUserQuery(userId || '', { skip: isLoading || !userId })
  return { user: session?.user, isLoading }
}

export default useSessionUser
