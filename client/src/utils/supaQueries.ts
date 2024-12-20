import { supabase } from '@/lib/supabaseClient.'
import type { QueryData } from '@supabase/supabase-js'

export const commentsWithBooksQuery = supabase.from('comments').select(`
  *,
  books (
    id,
    slug,
    title
    )
  `)
export type CommentsWithBooks = QueryData<typeof commentsWithBooksQuery>

export const booksQuery = supabase.from('books').select(`*`)
export type Books = QueryData<typeof booksQuery>

export const bookQuery = (slug: string) =>
	supabase
		.from('books')
		.select(
			`
  *,
  comments (
   *
  )
  `
		)
		.eq('slug', slug)
		.single()
export type Book = QueryData<ReturnType<typeof bookQuery>>

export const commentQuery = (id: string) =>
	supabase
		.from('comments')
		.select(
			`
  *,
  books (
   id,
   slug,
   title
  )
  `
		)
		.eq('id', id)
		.single()
export type Comment = QueryData<ReturnType<typeof commentQuery>>

export const profileQuery = ({ column, value }: { column: string; value: string }) =>
	supabase.from('profiles').select(`*`).eq(column, value).single()
