import React from 'react'


interface StatCardProps {
    type:'appointments' | 'pending' | 'cancelled'
    count: number
    label: string
    icon: string
}

const StatCard = ({ count= 0, label, icon, type }: StatCardProps) => {
  return (
    <div className=''>

    </div>
  )
}

export default StatCard