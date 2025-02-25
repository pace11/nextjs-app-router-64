'use client'

import { dataStore } from '@/store/dataStore'

export default function About() {
  const { inc } = dataStore()

  return (
    <div>
      <h1>About Page</h1>
      <button onClick={() => inc()}>Count ++</button>
    </div>
  )
}
