import ipApiRequest from '@/apiRequests/ip'
import { useQuery } from '@tanstack/react-query'

export const useGetIpMutation = () => {
  return useQuery({
    queryKey: ['ip'],
    queryFn: ipApiRequest.getIp
  })
}
