import { UpdatePet } from '@/components/dashboard/components/UpdatePets'
import React from 'react'
import { checkEnvironment } from '@/config/apiUrl'

export default async function Page(params) {
  const id = params.params.id
  const res = await fetch(`${checkEnvironment()}/api/pets/${id}`, {
    cache: 'no-cache',
  })
  const {pet} = await res.json()

  return (
    <>
        <h2 className='mb-5'>Update Pet</h2>
        <section className='mt-10'>
            <UpdatePet pet={pet}/>
        </section>
    </>
  )
}