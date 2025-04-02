import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

interface CourseDetailsFormProps {
  courseData: {
    title: string
    description: string
    level: string
    category: string
    duration: string
    price: string
    isPublished: boolean
  }
  // eslint-disable-next-line no-unused-vars
  handleCourseDataChange: (field: string, value: string | boolean) => void
}

export function CourseDetailsForm({ courseData, handleCourseDataChange }: CourseDetailsFormProps) {
  return (
    <Card className='mb-6'>
      <CardHeader>
        <CardTitle>Course Details</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='title'>Course Title</Label>
            <Input
              id='title'
              value={courseData.title}
              onChange={(e) => handleCourseDataChange('title', e.target.value)}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='category'>Category</Label>
            <Select onValueChange={(value) => handleCourseDataChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder='Select category' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='programming'>Programming</SelectItem>
                <SelectItem value='design'>Design</SelectItem>
                <SelectItem value='business'>Business</SelectItem>
                <SelectItem value='marketing'>Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='description'>Description</Label>
          <Textarea
            id='description'
            value={courseData.description}
            onChange={(e) => handleCourseDataChange('description', e.target.value)}
            required
          />
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='level'>Level</Label>
            <Select onValueChange={(value) => handleCourseDataChange('level', value)}>
              <SelectTrigger>
                <SelectValue placeholder='Select level' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='beginner'>Beginner</SelectItem>
                <SelectItem value='intermediate'>Intermediate</SelectItem>
                <SelectItem value='advanced'>Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='duration'>Duration</Label>
            <Input
              id='duration'
              value={courseData.duration}
              onChange={(e) => handleCourseDataChange('duration', e.target.value)}
              placeholder='e.g., 6 weeks'
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='price'>Price</Label>
            <Input
              id='price'
              type='number'
              value={courseData.price}
              onChange={(e) => handleCourseDataChange('price', e.target.value)}
              placeholder='0.00'
              required
            />
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Switch
            id='published'
            checked={courseData.isPublished}
            onCheckedChange={(checked) => handleCourseDataChange('isPublished', checked)}
          />
          <Label htmlFor='published'>Publish immediately</Label>
        </div>
      </CardContent>
    </Card>
  )
}
