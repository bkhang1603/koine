import Filter from '@/app/(public)/product/components/filter'
import List from '@/app/(public)/product/components/list'

function ProductPage() {
  return (
    <main className='grid grid-cols-4 gap-6'>
      <Filter />

      <List />
    </main>
  )
}

export default ProductPage
