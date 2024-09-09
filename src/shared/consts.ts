import { TSortBy } from './types'

export const BASE_URL = 'https://api.stackexchange.com/2.3'
export const DELAY_MS = 1000
export const PAGE_SIZE = 15
export const SORT_OPTIONS: TSortBy[] = ['activity', 'votes'] as const
