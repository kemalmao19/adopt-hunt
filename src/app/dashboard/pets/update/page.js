import { UpdatePet } from '@/components/dashboard/components/UpdatePets'
import React from 'react'

export default function Page() {
  return (
    <>
        <h2 className='mb-5'>Update Pet</h2>
        <section className='mt-10'>
            <UpdatePet/>
        </section>
    </>
  )
}