import blogApiRequest from '@/apiRequests/blog'
import { wrapServerApi } from '@/lib/server-utils'

async function DynamicData({ id }: { id: string }) {
  const data = await wrapServerApi(() => blogApiRequest.getBlog(id))

  const blog = data?.payload?.data

  return (
    <span className='text-gray-500 text-sm'>
      {blog?.totalReact} lượt thích • {blog?.totalComment} bình luận
    </span>
  )
}

export default DynamicData
