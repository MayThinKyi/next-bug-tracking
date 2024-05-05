import IssueCountCard from '@/components/IssueCountCard'
import { Metadata } from 'next'
import React from 'react'
import prisma from '../../prisma/db'
import IssueCharts from '@/components/IssueCharts'
import LatestIssues from '@/components/LatestIssues'
export async function generateMetadata() {
  return {
    title: 'Dashboard',
    description: 'This is the Dashboard Page of Next14 Issue Tracker App'
  }
}
const HomePage = async () => {
  const openIssues = await prisma?.issue.count({ where: { status: 'OPEN' } })
  const closedIssues = await prisma?.issue.count({ where: { status: 'CLOSED' } })
  const inProgressIssues = await prisma?.issue.count({ where: { status: 'IN_PROGRESS' } })
  const latestIssues = await prisma?.issue.findMany({
    take: 5,
    include: { assignedToUser: true }
  })
  return (
    <div className='grid grid-cols-2'>
      <div>
        <div className='grid grid-cols-3 gap-5 h-max mb-8'>
          <IssueCountCard link='/issues/list?status=OPEN' title='Open Issues' count={openIssues!} />
          <IssueCountCard link='/issues/list?status=IN_PROGRESS' title='In Progress Issues' count={inProgressIssues!} />
          <IssueCountCard link='/issues/list?status=CLOSED' title='Closed Issues' count={closedIssues!} />
        </div>
        <IssueCharts open={openIssues} inProgress={inProgressIssues} closed={closedIssues} />
      </div>
      <div>
        <LatestIssues issues={latestIssues} />
      </div>
    </div>
  )
}

export default HomePage
