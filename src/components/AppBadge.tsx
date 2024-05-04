import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

interface Props {
    status: Status
}
const AppBadge = ({ status }: Props) => {
    const badgeColor = status === 'OPEN' ? 'violet' : status === 'IN_PROGRESS' ? 'green' : status === 'CLOSED' ? 'red' : 'violet'
    return (
        <Badge color={badgeColor}>
            {status}
        </Badge>
    )
}

export default AppBadge
