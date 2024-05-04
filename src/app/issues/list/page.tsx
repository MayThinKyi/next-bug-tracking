import AppBadge from '@/components/AppBadge';
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import prisma from "../../../../prisma/db";
import delay from 'delay'

export async function generateMetadata() {
    return {
        title: 'Issue Lists',
        description: 'Here is a List of Issues!'
    }
}
const IssueListPage = async () => {
    await delay(2000);
    const issues = await prisma?.issue.findMany();
    return (
        <div>
            <Link href={'/issues/new'}>
                <Button>Create Issue</Button>
            </Link>
            <Table.Root className='mt-5' variant='surface'>
                <Table.Header >
                    <Table.Row>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues?.map((issue) => {
                        return <Table.Row key={issue.id}>
                            <Table.RowHeaderCell>
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>
                            </Table.RowHeaderCell>
                            <Table.Cell>
                                <AppBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell>{issue.createdAt.toLocaleDateString()}</Table.Cell>
                        </Table.Row>
                    })}

                </Table.Body>
            </Table.Root>
        </div>
    )
}
export const dynamic = "force-dynamic"
export default IssueListPage

