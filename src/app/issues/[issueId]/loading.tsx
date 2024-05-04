import React from 'react'
import Skeleton from 'react-loading-skeleton'

const IssueDetailsLoading = () => {
    return (
        <div className='grid grid-cols-2'>
            <div >
                <Skeleton style={{ height: '30px', width: '300px' }} />
                <div className="flex items-center gap-5 mt-2">
                    <Skeleton style={{ height: '20px', width: '100px' }} />
                    <Skeleton style={{ height: '20px', width: '100px' }} />
                </div>
                <Skeleton style={{ height: '250px', width: '100%', borderRadius: '15px', marginTop: '20px' }} />
            </div>
            <div className='ps-5'>
                <Skeleton style={{ height: '30px', width: '230px' }} />
                <Skeleton style={{ height: '30px', width: '230px', marginTop: '16px' }} />
                <Skeleton style={{ height: '30px', width: '230px' }} />
            </div>
        </div>
    )
}

export default IssueDetailsLoading
