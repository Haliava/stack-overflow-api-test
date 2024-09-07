export type Date = number
export type Entity = Question | Answer | Comment
export interface ApiResponse<T extends Entity> {
  items: T[] 
}

export interface Question {
  owner: User
  is_answered: boolean
  view_count: number
  accepted_answer_id: number
  answer_count: number
  score: number
  last_activity_date: number
  creation_date: number
  last_edit_date: number
  question_id: number
  /** link to the question on stackoverflow */
  link: string
  title: string
  body: string
}

export type EntityWithComments<T> = T & {
  comments: Comment[]
}

export interface Answer {
  owner: User
  is_accepted: boolean
  score: number
  last_activity_date: Date
  creation_date: Date
  answer_id: number
  question_id: number
  body: string
}

export interface User {
  reputation: number
  /** link to the user profile img */
  profile_image: string
  display_name: string
  /** link to the user page on stackoverflow */
  link: string
}

export interface Comment {
  owner: User
  creation_date: Date
  comment_id: number
  score: number
  body: string
}