import { CreatePet } from '@/components/dashboard/components/CreatePet'
import React from 'react'

export default function Page() {
  return (
    <>
        <h2 className='mb-5'>Add New Pet</h2>
        <section className='mt-10'>
            <CreatePet/>
        </section>
    </>
  )
}
