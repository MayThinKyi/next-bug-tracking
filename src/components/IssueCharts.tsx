'use client';

import React from 'react'
import { Card } from '@radix-ui/themes';
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Bar,
} from 'recharts';
interface Props {
    open: number; inProgress: number; closed: number
}
const IssueCharts = ({ open, inProgress, closed }: Props) => {
    const data: { label: string; value: number }[] = [
        { label: 'Open', value: open },
        { label: 'In Progress', value: inProgress },
        { label: 'Closed', value: closed }
    ]
    return (
        <Card className='cursor-pointer'>
            <ResponsiveContainer height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Bar
                        dataKey="value"
                        barSize={60}
                        style={{ fill: 'purple' }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default IssueCharts
