'use client'

import { cn } from '@nextui-org/react'

import type { DetailedHTMLProps, HTMLAttributes } from 'react'

const MainWrapper = ({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <main
      className={cn(
        'relative lg:py-8 py-5 xl:px-24 lg:px-16 px-5 ml-0 lg:ml-24 transition-all !ease-in-out !duration-700',
        className,
      )}
      {...props}
    >
      {children}
    </main>
  )
}

export default MainWrapper
