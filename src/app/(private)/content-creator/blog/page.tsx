import UseBlog from '@/app/(private)/content-creator/blog/components/use-blog'
import { TableCustom } from '@/components/table-custom'
import configRoute from '@/config/route'

const data = {
  data: [],
  message: '',
  pagination: {
    pageSize: 10,
    totalItem: 0,
    currentPage: 1,
    totalPage: 1,
    maxPageSize: 10
  }
}

function BlogPage() {
  const { bodyColumns, headerColumns } = UseBlog()

  return (
    <>
      <TableCustom
        title='Bài viết'
        data={data}
        headerColumn={headerColumns}
        bodyColumn={bodyColumns}
        href={configRoute.home}
      />
    </>
  )
}

export default BlogPage
