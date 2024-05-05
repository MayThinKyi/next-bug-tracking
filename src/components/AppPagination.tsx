'use client';
import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    pageCount: number;
    pageSize: number;
    currentPage: number;
}
const AppPagination = ({ pageCount, pageSize, currentPage }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const handlePageChange = (page: number) => {
        const query = new URLSearchParams();
        if (searchParams.get('status')) query.append('status', searchParams.get('status')!)
        if (searchParams.get('sort')) query.append('sort', searchParams.get('sort')!)
        query.append('page', page.toString())
        const queryStr = query.toString();
        router.push(`/issues/list?${queryStr}`)
    }
    if (pageCount === 1 || pageCount === 0) return null;
    return (
        <div className='mt-4 flex items-center gap-5'>
            <h1 className='text-md font-semibold'>Page {currentPage} of {pageCount}</h1>
            <Button disabled={currentPage === 1} onClick={() => handlePageChange(1)}><DoubleArrowLeftIcon /></Button>
            <Button onClick={() => {
                if (currentPage > 1) handlePageChange(currentPage - 1)
            }} ><ChevronLeftIcon /></Button>
            <Button onClick={() => {
                if (currentPage < pageCount) handlePageChange(currentPage + 1)
            }}><ChevronRightIcon /></Button>
            <Button disabled={currentPage === pageCount} onClick={() => {
                handlePageChange(pageCount)
            }}><DoubleArrowRightIcon /></Button>

        </div>
    )
}

export default AppPagination
