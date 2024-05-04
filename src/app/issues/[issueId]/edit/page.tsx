import IssueForm from '@/components/IssueForm'
import React from 'react'
import prisma from '../../../../../prisma/db'
import { notFound } from 'next/navigation';
interface Props {
    params: {
        issueId: string;
    }
}
export async function generateMetadata({ params: { issueId } }: Props) {
    const issue = await prisma.issue.findUnique({ where: { id: Number(issueId) } })
    if (!issue) notFound();
    return {
        title: issue.title,
        description: issue.description
    }
}
const IssueEditPage = async ({ params: { issueId } }: Props) => {
    const issue = await prisma.issue.findUnique({ where: { id: Number(issueId) } })
    if (!issue) notFound();
    return (
        <div>
            <IssueForm issue={issue!} />
        </div>
    )
}

export default IssueEditPage
