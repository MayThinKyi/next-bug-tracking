import IssueForm from '@/components/IssueForm'
import delay from 'delay';
import dynamic from 'next/dynamic'
import React from 'react'

export async function generateMetadata() {

    return {
        title: 'Create New Issue',
        description: 'Create New Issue Page'
    }
}
const NewIssuePage = async () => {
    await delay(1000);
    const IssueForm = dynamic(() => import('@/components/IssueForm'), {
        ssr: false
    })
    return (
        <div>
            <IssueForm />
        </div>
    )
}

export default NewIssuePage
