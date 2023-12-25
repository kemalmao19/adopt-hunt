import { AuthLayout } from '@/components/template/AuthLayout'
import React from 'react'

export default function Layout({children}) {
  return (
    <AuthLayout>{children}</AuthLayout>
  )
}
