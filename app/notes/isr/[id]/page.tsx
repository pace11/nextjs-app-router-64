type ListNotes = {
  id: string
  title: string
  description: string
  deleted_at: string
  created_at: string
  updated_at: string
}

type Notes = {
  success: boolean
  message: string
  data: ListNotes[]
}

type DetailNotes = {
  success: boolean
  message: string
  data: ListNotes
}

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 3

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

// force-cached -> cached => website static
// no-store => website realtime data => streaming
// isr => { revalidate } => website static => sering ada perubahan => storage

// /about -> api/me
// /profile -> api/me
// isr => { }

export async function generateStaticParams() {
  const notes: Notes = await fetch(
    'https://service.pace-unv.cloud/api/notes',
  ).then((res) => res.json())

  return notes.data.map((note: ListNotes) => ({
    id: String(note.id),
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const notes: DetailNotes = await fetch(
    `https://service.pace-unv.cloud/api/notes/${id}`,
  ).then((res) => res.json())
  return (
    <main>
      <h1>{notes.data.title}</h1>
      <p>{notes.data.description}</p>
    </main>
  )
}
