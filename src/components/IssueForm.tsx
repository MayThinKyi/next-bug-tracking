'use client';
import React, { useState } from 'react'
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { createIssueSchema } from '@/app/api/issues/issueSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Issue } from '@prisma/client';
import toast from 'react-hot-toast';

type IssueFormType = z.infer<typeof createIssueSchema>
interface Props {
    issue?: Issue;
}
const IssueForm = ({ issue }: Props) => {
    const router = useRouter();
    const [isErr, setIsErr] = useState(false);
    const { control, formState: { errors, isSubmitting }, handleSubmit, register } = useForm<IssueFormType>({
        resolver: zodResolver(createIssueSchema),
        defaultValues: {
            title: issue?.title || '',
            description: issue?.description || ''
        }
    });
    const submitHandler = async (body: IssueFormType) => {
        try {
            if (issue?.title) {
                const { data } = await axios.put(`/api/issues/${issue.id}`, body);
                toast.success('Issue updated successfully!')
                console.log('data', data);
                router.push(`/issues/${issue.id}`);
                router.refresh();

            }
            else {
                const { data } = await axios.post('/api/issues', body)
                toast.success('Issue created successfully!')
                console.log('data', data);
                router.push('/issues/list');
                router.refresh();

            }
        } catch (error) {
            setIsErr(true);
            console.log('error', error)
        }
    }
    return (
        <form onSubmit={handleSubmit(submitHandler)} className='w-[50%]'>
            <TextField.Root placeholder="Search the docs…" {...register(
                'title'
            )}>
            </TextField.Root>
            <small className="text-red-500 font-bold  ">{errors.title && errors.title.message}</small>
            <Controller
                control={control}
                name='description'
                render={({ field }) => <SimpleMDE className='mt-4 mb-0' {...field} />}
            />
            <small className="text-red-500 font-bold  ">{errors.description && errors.description.message}</small>
            <Button disabled={isSubmitting} className='mt-5 block'>
                {isSubmitting ? 'Loading...' : 'Submit'}
            </Button>
        </form>
    )
}

export default IssueForm
