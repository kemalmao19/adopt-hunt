import React from 'react'

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className='p-8 text-center border-t text-white bg-oren font-jua'>
        ⓒ {currentYear} Pixlogic team - Devscale Indonesia
    </footer>
  )
}
