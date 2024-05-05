import { Issue } from '@prisma/client'
import React from 'react'
import AppBadge from './AppBadge'
import { Avatar } from '@radix-ui/themes'
import Link from 'next/link'
interface Props {
    issues: Issue[]
}
const LatestIssues = ({ issues }: Props) => {
    console.log('issue', issues)
    return (
        <div className='w-[90%] ms-10 p-4 border rounded-xl'>
            <h1 className='font-bold mb-4'>Latest Issues</h1>
            {issues.map((issue) => {
                return <Link key={issue.id} href={`/issues/${issue.id}`}>
                    <div className='border-b pb-3 cursor-pointer flex items-center justify-between'>
                        <h1>{issue.title}</h1>
                        <AppBadge status={issue.status} />

                        {issue?.assignedToUser && <div className="flex items-center">
                            <Avatar fallback={issue?.assignedToUser?.name?.substring(0, 1)!} src={issue.assignedToUser.image!} />
                            <p className='text-sm ms-2'>{issue.assignedToUser.name}</p>
                        </div>}
                        <p className='text-sm  '>{issue.createdAt.toLocaleDateString()}</p>
                    </div>
                </Link>
            })}
        </div>
    )
}

export default LatestIssues
