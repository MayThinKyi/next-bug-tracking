import Link from 'next/link';
import React from 'react'

interface Props {
    title: string;
    count: number;
    link: string;
}
const IssueCountCard = ({ title, count, link }: Props) => {
    return (
        <Link href={link}>
            <div className='border rounded-lg p-3 cursor-pointer'>
                <h1 className="text-md font-bold">{title}</h1>
                <p className='font-bold mt-2'>{count}</p>
            </div>
        </Link>
    )
}

export default IssueCountCard
