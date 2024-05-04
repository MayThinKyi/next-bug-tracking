'use client'
import { Issue, User } from '@prisma/client'
import { Button, Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
interface Props {
    issue: Issue
}
const IssueActions = ({ issue }: Props) => {
    const { data: users, isLoading, error } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axios.get('/api/users');
            return data;
        }
    })
    const router = useRouter();
    const deleteIssue = async () => {
        try {
            const { data } = await axios.delete(`/api/issues/${issue.id}`)
            toast.success('Issue deleted successfully!')
            console.log('data', data)
            router.push('/issues/list')

        } catch (error) {
            console.log('error', error)
        }
    }
    const handleUserAssign = async (userId: string) => {
        console.log('userId', userId)
        try {
            const { data } = await axios.put(`/api/issues/${issue.id}`, {
                assignedToUserId: userId === 'none' ? null : userId
            })
            console.log('data', data);
            router.refresh();
            toast.success('Assigned to user successfully!')
        } catch (error) {
            toast.error('Assigned to user failed!')
            console.log('error', error)
        }
    }
    return (
        <div className='w-[30%]'>
            {isLoading ? <Skeleton style={{ width: '100%', height: '30px' }} /> :
                <Select.Root defaultValue={issue.assignedToUserId || "none"} onValueChange={handleUserAssign}>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.Group  >
                            <Select.Label>Sugested Users</Select.Label>
                            <Select.Item value="none">None</Select.Item>
                            {users?.map((user) => {
                                return <Select.Item key={user.id} value={user.id!}>{user.name}</Select.Item>
                            })}
                        </Select.Group>

                    </Select.Content>
                </Select.Root>}
            <Link href={`/issues/${issue.id}/edit`}>
                <Button className='mt-4 mb-3 block w-full'>
                    Edit Issue
                </Button>
            </Link>
            <Button onClick={deleteIssue} color='red' className='block w-full'>
                Delete Issue
            </Button>
        </div>
    )
}

export default IssueActions
