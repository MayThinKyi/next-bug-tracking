'use client';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react'
interface Props {
    children: ReactNode;
}

const AppSessionProvider = ({ children }: Props) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default AppSessionProvider
