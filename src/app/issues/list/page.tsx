import AppBadge from '@/components/AppBadge';
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import prisma from "../../../../prisma/db";
import delay from 'delay'
import { Status } from '@prisma/client';
import AppPagination from '@/components/AppPagination';
import AppFilter from '@/components/AppFilter';

export async function generateMetadata() {
    return {
        title: 'Issue Lists',
        description: 'Here is a List of Issues!'
    }
}
interface Props {
    searchParams: {
        status?: Status;
        sort?: string;
        page?: string;
    }
}
const IssueListPage = async ({ searchParams }: Props) => {
    const tableHeaders: { label: string; value: string }[] = [
        { label: 'Title', value: 'title' },
        { label: 'Status', value: 'status' },
        { label: 'Created At', value: 'createdAt' },
    ]
    await delay(2000);
    const status = searchParams.status ? searchParams.status : undefined
    const orderBy = searchParams.sort ? { [searchParams.sort]: 'asc' } : undefined
    const issues = await prisma?.issue.findMany({
        where: {
            status
        },
        orderBy,
        skip: (Number(searchParams.page || 1) - 1) * 5,
        take: 5
    });
    const issuesCount = await prisma.issue.count({ where: { status } })
    return (
        <div>
            <div className="flex items-center gap-5">
                <Link href={'/issues/new'}>
                    <Button>Create Issue</Button>
                </Link>
                <AppFilter />
            </div>
            <Table.Root className='mt-5' variant='surface'>
                <Table.Header >
                    <Table.Row>
                        {tableHeaders.map((header) => {
                            return <Table.ColumnHeaderCell className='cursor-pointer' key={header.label}>
                                <Link href={{ query: { ...searchParams, sort: header.value } }}>
                                    {header.label}
                                </Link>
                            </Table.ColumnHeaderCell>
                        })}

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
            <AppPagination currentPage={Number(searchParams.page) || 1} pageCount={Math.ceil(issuesCount / 5)} pageSize={5} />
        </div>
    )
}
export const dynamic = "force-dynamic"
export default IssueListPage

