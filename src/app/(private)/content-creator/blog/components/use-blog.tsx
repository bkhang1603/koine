const UseBlog = () => {
  const headerColumns = [
    {
      id: 0,
      name: 'Stt',
      className: 'hidden w-[5%] sm:table-cell'
    },
    {
      id: 1,
      name: 'Tiêu đề',
      className: 'hidden lg:table-cell w-[20%]'
    },
    {
      id: 2,
      name: 'Ảnh bìa',
      className: 'hidden lg:table-cell w-[20%]'
    },
    {
      id: 3,
      name: 'Trạng thái',
      className: 'hidden lg:table-cell w-[10%]'
    },
    {
      id: 4,
      name: 'Ngày tạo',
      className: 'w-[15%]'
    },
    {
      id: 5,
      name: 'Tương tác',
      className: 'w-[10%]'
    },
    {
      id: 5,
      name: 'Bình luận',
      className: 'w-[10%]'
    },
    {
      id: 6,
      name: <span className='sr-only'>Actions</span>,
      className: 'w-[10%]'
    }
  ]

  const bodyColumns = [
    {
      id: 0,
      render: (data: any) => <span>{data.code}</span>,
      className: 'font-medium'
    },
    {
      id: 1,
      render: (data: any) => <span>{data.name}</span>,
      className: 'font-medium'
    },
    {
      id: 2,
      render: (data: any) => <span>{data.status}</span>,
      className: 'hidden lg:table-cell'
    },
    {
      id: 3,
      render: (data: any) => <span>{data.createdAtFormat}</span>,
      className: 'font-medium'
    },
    {
      id: 4,
      render: (data: any) => <span>{data.name}</span>
    }
  ]

  return {
    headerColumns,
    bodyColumns
  }
}

export default UseBlog
