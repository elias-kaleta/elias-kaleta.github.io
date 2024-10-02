import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { Announcement } from '../../types/Announcement'

export default function useFetchAnnouncements(flatId: string) {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await request.get(`/api/v1/announcements/${flatId}`)
      return res.body as Announcement[]
    },
  })
}
