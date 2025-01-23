'use client'

import MoviesPage from '@/components/pages/movies'
import React from 'react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Streamlite | Movies',
  description: 'Stream your favorite movies online',
}

export default function Page() {
  return (
    <React.Fragment>
      <MoviesPage />
    </React.Fragment>
  )
}
