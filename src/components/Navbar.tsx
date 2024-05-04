'use client';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Avatar, Button, DropdownMenu } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa6";
import Skeleton from 'react-loading-skeleton';

const Navbar = () => {
    const { data, status } = useSession();
    const pathName = usePathname();
    const navLinks: { name: string; link: string }[] = [
        { name: 'Dashboard', link: '/' },
        { name: 'Issues', link: '/issues/list' }
    ]
    return (
        <div className='flex items-center justify-between py-4 px-5 border-b'>
            <div className='flex items-center gap-5 '>
                <FaBug color='#EF4444' size={22} />
                <div className='flex items-center gap-5 '>
                    {navLinks.map((item) => {
                        return <Link className={`${pathName === item.link ? 'text-zinc-800 font-bold' : 'text-zinc-600'}`} key={item.name} href={item.link}>
                            {item.name}
                        </Link>
                    })}
                </div>
            </div>
            {status === 'loading' && <div className="flex items-center gap-2">
                <Avatar fallback />
                <Skeleton style={{ height: '20px', width: '100px' }} />
            </div>}
            {status === 'unauthenticated' && <Link href={'/api/auth/signin'}>
                Login
            </Link>}
            {status === 'authenticated' && <div >

                <DropdownMenu.Root >
                    <DropdownMenu.Trigger>
                        <div className="cursor-pointer flex items-center gap-2">
                            <Avatar fallback src={data.user?.image!} />
                            <h1 className="text-md font-bold">{data.user?.name!}</h1>
                        </div>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className='cursor-pointer'>
                        <DropdownMenu.Item  >{data.user?.email!}</DropdownMenu.Item>
                        <DropdownMenu.Item  >
                            <Link href={'/api/auth/signout'}>
                                <Button className='w-full'>Logout</Button>
                            </Link>
                        </DropdownMenu.Item>

                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>}
        </div>
    )
}

export default Navbar
