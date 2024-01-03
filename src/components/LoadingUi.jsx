import { Spinner } from '@nextui-org/react'
import React from 'react'

export const LoadingUi = () => {
  return (
    <div className="flex justify-center mt-10">
      <Spinner label="Loading..." color="warning" size='lg'/>
    </div>
  )
}
