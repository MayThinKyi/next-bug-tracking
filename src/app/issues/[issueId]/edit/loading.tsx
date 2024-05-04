import React from 'react'
import Skeleton from 'react-loading-skeleton'

const IssueFormLoading = () => {
    return (
        <div className='w-[50%]'>
            <Skeleton style={{ width: '100%', height: '30px' }} />
            <Skeleton style={{ width: '100%', height: '250px', marginTop: '10px' }} />
            <Skeleton style={{ width: '20%', height: '30px', marginTop: '10px' }} />
        </div >
    )
}

export default IssueFormLoading
