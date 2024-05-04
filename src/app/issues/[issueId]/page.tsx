import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import AppBadge from '@/components/AppBadge';
import IssueActions from '@/components/IssueActions';
import delay from 'delay';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import React from 'react'
import { Toaster } from 'react-hot-toast';
import Markdown from 'react-markdown'

interface Props {
    params: {
        issueId: string;
    }
}
export async function generateMetadata({ params: { issueId } }: Props) {
    const issue = await prisma?.issue.findUnique({ where: { id: Number(issueId) } })
    if (!issue) notFound();
    return {
        title: issue.title,
        description: issue.description
    }
}
const IssueDetailsPage = async ({ params: { issueId } }: Props) => {
    const session = await getServerSession(authOptions);
    await delay(1500);
    const issue = await prisma?.issue.findUnique({ where: { id: Number(issueId) } })
    if (!issue) notFound();
    return (
        <div className='grid grid-cols-2'>
            <div >
                <h1 className='text-xl font-bold'>{issue?.title}</h1>
                <div className="flex items-center gap-5 mt-2">
                    <AppBadge status={issue?.status!} />
                    <p>{issue?.createdAt.toLocaleDateString()}</p>
                </div>
                <Markdown className={'prose p-3 rounded-xl mt-4  border'}>
                    {issue?.description}
                </Markdown>
            </div>
            <div className='ps-5'>
                {session?.user && <IssueActions issue={issue!} />}
            </div>
        </div>
    )
}

export default IssueDetailsPage
