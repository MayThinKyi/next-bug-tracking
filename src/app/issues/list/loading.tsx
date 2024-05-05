import AppFilter from '@/components/AppFilter'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

const IssuesListLoading = () => {
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
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {[1, 2, 3, 4, 5]?.map((item) => {
                        return <Table.Row key={item}>
                            <Table.RowHeaderCell>
                                <Skeleton />
                            </Table.RowHeaderCell>
                            <Table.Cell>
                                <Skeleton />
                            </Table.Cell>
                            <Table.Cell>
                                <Skeleton />
                            </Table.Cell>
                        </Table.Row>
                    })}

                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default IssuesListLoading
