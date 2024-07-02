import CardBlog from '@/components/card-blog'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineTime
} from '@/components/timeline'

function KnowledgePage() {
  return (
    <div className='w-full flex items-center py-10'>
      <Timeline className='pl-28'>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineTime>07/02/2024</TimelineTime>
            <TimelineIcon />
          </TimelineHeader>
          <TimelineContent>
            <CardBlog />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineTime>07/02/2024</TimelineTime>
            <TimelineIcon />
          </TimelineHeader>
          <TimelineContent>
            <CardBlog />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineTime>07/02/2024</TimelineTime>
            <TimelineIcon />
          </TimelineHeader>
          <TimelineContent>
            <CardBlog />
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  )
}

export default KnowledgePage
