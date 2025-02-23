import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { courseCategories } from '../../../../app/(private)/content-creator/_mock/data'

interface CourseBasicInfoProps {
  title: string
  description: string
  categories: string[]
  level: string
  ageGroup: string
  onFieldChange: (field: 'title' | 'description' | 'categories' | 'level' | 'ageGroup', value: any) => void
}

export function CourseBasicInfo({
  title,
  description,
  categories,
  level,
  ageGroup,
  onFieldChange
}: CourseBasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin cơ bản</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label>Tiêu đề khóa học</Label>
            <Input
              value={title}
              onChange={(e) => onFieldChange('title', e.target.value)}
              placeholder='Nhập tiêu đề khóa học'
            />
          </div>

          <div className='space-y-2'>
            <Label>Mô tả</Label>
            <Textarea
              value={description}
              onChange={(e) => onFieldChange('description', e.target.value)}
              placeholder='Mô tả chi tiết về khóa học'
              className='h-32'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label>Danh mục</Label>
              <Select value={categories[0]} onValueChange={(value) => onFieldChange('categories', [value])}>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn danh mục' />
                </SelectTrigger>
                <SelectContent>
                  {courseCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Cấp độ</Label>
              <Select value={level} onValueChange={(value) => onFieldChange('level', value)}>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn cấp độ' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Cơ bản'>Cơ bản</SelectItem>
                  <SelectItem value='Trung bình'>Trung bình</SelectItem>
                  <SelectItem value='Nâng cao'>Nâng cao</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Độ tuổi</Label>
              <Select value={ageGroup} onValueChange={(value) => onFieldChange('ageGroup', value)}>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn độ tuổi' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='6-8 tuổi'>6-8 tuổi</SelectItem>
                  <SelectItem value='9-11 tuổi'>9-11 tuổi</SelectItem>
                  <SelectItem value='12-14 tuổi'>12-14 tuổi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
