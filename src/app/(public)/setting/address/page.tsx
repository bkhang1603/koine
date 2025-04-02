'use client'

import { Button } from '@/components/ui/button'
import {
  useDeleteAccountAddressMutation,
  useGetAccountAddress,
  useUpdateAccountAddressMutation
} from '@/queries/useAccount'
import { Filter, MapPin, Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import AddressForm from '@/components/public/parent/setting/address-form'
import { handleErrorApi } from '@/lib/utils'
import { AccountAddressBodyType, AccountOneAddressResType } from '@/schemaValidations/account.schema'
import { toast } from '@/components/ui/use-toast'
import { EmptyAddress } from '@/components/public/parent/setting/empty-address'
import { AddressSkeleton } from '@/components/public/parent/setting/address-skeleton'
import { AddressCard } from '@/components/public/parent/setting/address/address-card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function AddressPage() {
  const { data, isLoading } = useGetAccountAddress()
  const editMutation = useUpdateAccountAddressMutation()
  const deleteMutation = useDeleteAccountAddressMutation()

  const addresses = useMemo(() => data?.payload.data ?? [], [data?.payload.data])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<AccountOneAddressResType['data']>()
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('recent')

  // Xử lý xóa địa chỉ
  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id)
      toast({
        description: 'Xóa địa chỉ thành công'
      })
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  // Xử lý đặt địa chỉ mặc định
  const handleSetDefault = async ({ id, address }: { id: string; address: AccountAddressBodyType }) => {
    try {
      await editMutation.mutateAsync({
        id,
        name: address.name,
        phone: address.phone,
        address: address.address,
        tag: address.tag,
        isDefault: true
      })
      toast({
        description: 'Đặt mặc định thành công'
      })
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  // Lọc địa chỉ dựa trên tab và tìm kiếm
  const filteredAddresses = useMemo(() => {
    let filtered = [...addresses]

    // Lọc theo tab
    if (activeTab === 'default') {
      filtered = filtered.filter((address) => address.isDefault)
    } else if (activeTab === 'home') {
      filtered = filtered.filter((address) => address.tag === 'Nhà riêng')
    } else if (activeTab === 'office') {
      filtered = filtered.filter((address) => address.tag === 'Văn phòng')
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (address) =>
          address.name.toLowerCase().includes(search) ||
          address.phone.toLowerCase().includes(search) ||
          address.address.toLowerCase().includes(search)
      )
    }

    // Sắp xếp
    if (sortOption === 'recent') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortOption === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [addresses, activeTab, searchTerm, sortOption])

  return (
    <div className='space-y-6'>
      {/* Header with Title and Add Button */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <div className='flex items-center gap-2'>
            <MapPin className='h-5 w-5 text-primary' />
            <h2 className='text-xl font-medium text-gray-900'>Sổ địa chỉ</h2>
          </div>
          <p className='text-sm text-gray-500 mt-1 md:ml-7'>Quản lý danh sách địa chỉ giao hàng của bạn</p>
        </div>

        <Button onClick={() => setShowAddForm(true)} className='bg-gradient-to-r from-primary to-primary/90 shadow-md'>
          <Plus className='mr-2 h-4 w-4' />
          Thêm địa chỉ mới
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className='bg-white border border-gray-100 shadow-sm rounded-lg overflow-hidden'>
        <div className='p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3'>
          <Tabs defaultValue='all' value={activeTab} onValueChange={setActiveTab} className='w-full sm:w-auto'>
            <TabsList className='bg-gray-100/90 grid w-full grid-cols-4 h-9'>
              <TabsTrigger value='all' className='text-xs'>
                Tất cả
              </TabsTrigger>
              <TabsTrigger value='default' className='text-xs'>
                Mặc định
              </TabsTrigger>
              <TabsTrigger value='home' className='text-xs'>
                Nhà riêng
              </TabsTrigger>
              <TabsTrigger value='office' className='text-xs'>
                Văn phòng
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className='flex-1 flex gap-2'>
            <div className='relative flex-1'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
              <Input
                type='search'
                placeholder='Tìm kiếm địa chỉ...'
                className='pl-9 h-9 text-sm focus-visible:ring-primary'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='h-9 gap-1 border-gray-200'>
                  <Filter className='h-3.5 w-3.5' />
                  <span className='text-xs'>Sắp xếp</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuItem
                  onClick={() => setSortOption('recent')}
                  className={sortOption === 'recent' ? 'bg-primary/5 text-primary' : ''}
                >
                  Mới nhất
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOption('name')}
                  className={sortOption === 'name' ? 'bg-primary/5 text-primary' : ''}
                >
                  Theo tên A-Z
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Address List */}
      {isLoading ? (
        <AddressSkeleton />
      ) : filteredAddresses.length === 0 ? (
        searchTerm ? (
          <div className='text-center py-14 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-dashed border-gray-200'>
            <div className='flex flex-col items-center'>
              <Search className='h-12 w-12 text-gray-300 mb-3' />
              <h3 className='text-lg font-medium text-gray-800 mb-2'>Không tìm thấy địa chỉ</h3>
              <p className='text-sm text-gray-500 max-w-md'>
                Không tìm thấy địa chỉ nào phù hợp với từ khóa &quot;{searchTerm}&quot;.
              </p>
            </div>
          </div>
        ) : addresses.length === 0 ? (
          <EmptyAddress onAddAddress={() => setShowAddForm(true)} />
        ) : (
          <div className='text-center py-14 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-dashed border-gray-200'>
            <div className='flex flex-col items-center'>
              <MapPin className='h-12 w-12 text-gray-300 mb-3' />
              <h3 className='text-lg font-medium text-gray-800 mb-2'>Không có địa chỉ nào</h3>
              <p className='text-sm text-gray-500 max-w-md'>Không tìm thấy địa chỉ nào trong danh mục này.</p>
            </div>
          </div>
        )
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
          {filteredAddresses.map((address) => (
            <AddressCard
              key={address.id}
              address={{
                id: address.id,
                name: address.name,
                phone: address.phone,
                address: address.address,
                tag: address.tag,
                isDefault: address.isDefault
              }}
              onSetDefault={() => handleSetDefault({ id: address.id, address })}
              onEdit={() => setEditingAddress(address)}
              onDelete={() => handleDeleteAddress(address.id)}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Address Form */}
      <AddressForm open={showAddForm} onOpenChange={setShowAddForm} mode='add' />

      <AddressForm
        open={!!editingAddress}
        onOpenChange={(open) => !open && setEditingAddress(undefined)}
        defaultValues={editingAddress}
        mode='edit'
      />
    </div>
  )
}
