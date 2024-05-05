'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const AppFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const statuses: { label: string; value: Status | 'all' }[] = [
        { label: 'All', value: 'all' },
        { label: 'Open', value: 'OPEN' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Closed', value: 'CLOSED' },
    ]
    return (
        <div>
            <Select.Root defaultValue={searchParams.get('status') || 'all'} onValueChange={(value) => {
                const query = new URLSearchParams();
                if (value !== 'all') query.append('status', value);
                if (searchParams.get('sort')) query.append('sort', searchParams.get('sort')!);
                if (searchParams.get('page')) query.append('page', '1');
                const queryStr = query.toString();
                router.push(`/issues/list?${queryStr}`)
            }} >
                <Select.Trigger />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Filter By Status</Select.Label>
                        {statuses.map((status) => {
                            return <Select.Item key={status.value} value={status.value}>{status.label}</Select.Item>
                        })}

                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </div>
    )
}

export default AppFilter
