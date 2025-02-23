'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FAQFilters } from '../_components/faq/faq-filters'
import { FAQItem } from '../_components/faq/faq-item'
import { FAQStats } from '../_components/faq/faq-stats'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { mockData } from '../_data/mock'

const mockFAQStats = {
  totalArticles: 45,
  totalViews: 12500,
  avgHelpful: 92,
  ticketReduction: 35
}

export default function FAQPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filteredFAQs = mockData.faq.items.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || faq.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý FAQ</h1>
          <p className='text-muted-foreground mt-1'>Quản lý các câu hỏi thường gặp</p>
        </div>
        <Button>
          <Plus className='w-4 h-4 mr-2' />
          Thêm câu hỏi
        </Button>
      </div>

      <FAQStats stats={mockFAQStats} />

      <Card>
        <CardHeader>
          <CardTitle>Danh sách câu hỏi</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <FAQFilters onSearch={setSearch} onCategoryChange={setCategory} />
          <div className='grid gap-4 md:grid-cols-2'>
            {filteredFAQs.map((faq) => (
              <FAQItem
                key={faq.id}
                {...faq}
                onEdit={() => console.log('Edit FAQ:', faq.id)}
                onDelete={() => console.log('Delete FAQ:', faq.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
