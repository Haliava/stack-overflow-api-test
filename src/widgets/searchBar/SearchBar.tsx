import QuestionCard from '@/features/questionCard'
import QuestionCardSkeleton from '@/features/questionCardSkeleton'
import SearchInput from '@/features/searchInput'
import { DELAY_MS, SORT_OPTIONS } from '@/shared/consts'
import { fetchQuestionsByQuery } from '@/entities/post/api'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TSortBy } from '@/shared/types'
import PaginationButtons from './paginationButtons'

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams({ question: '', page: '1', sortBy: 'activity' as TSortBy })
  const [inputVal, setInputVal] = useState(searchParams.get('question') || '')
  const [sortBy, setSortBy] = useState<TSortBy>((searchParams.get('sortBy') || 'activity') as TSortBy)
  const [page, setPage] = useState(Number(searchParams.get('page') || '1'))

  useEffect(() => {
    setSearchParams(prev => ({ ...prev, question: inputVal, sortBy, page }))
  }, [page])

  const {
    isFetching,
    data: questions,
    refetch,
  } = useQuery({
    queryKey: ['questions'],
    queryFn: () => fetchQuestionsByQuery(inputVal, sortBy, page),
    refetchOnWindowFocus: false,
    enabled: inputVal.length > 0,
  })

  const handlePageChange = () => {
    setSearchParams(prev => ({ ...prev, question: inputVal, sortBy, page }))
    refetch()
  }

  const handleInput: React.FormEventHandler<HTMLInputElement> = () => {
    setSearchParams(prev => ({ ...prev, question: inputVal, sortBy, page }))
    refetch()
  }

  const debouncedHandleInput = useDebounce(handleInput, DELAY_MS)

  return (
    <div className="flex flex-col gap-10 items-center m-auto">
      <SearchInput
        value={inputVal}
        sortOption={sortBy}
        setSortOption={setSortBy}
        sortOptions={SORT_OPTIONS}
        setValue={setInputVal}
        handleInput={debouncedHandleInput}
        handleSort={debouncedHandleInput}
      />
      <div className="flex flex-col w-[80vw]">
        {!isFetching && questions && questions[0].length > 0 && (
          <PaginationButtons
            isFetching={isFetching}
            hasNext={questions[1]}
            page={page}
            handlePageChange={handlePageChange}
            setPage={setPage}
          />
        )}
        <div className="w-[80vw] grid lg:grid-cols-3 gap-4 grid-flow-cols pb-10">
          {isFetching && Array.from({ length: 3 }, (_, i) => i).map((_, i) => <QuestionCardSkeleton key={i} />)}
          {!isFetching &&
            questions &&
            questions[0].length > 0 &&
            questions[0].map(questionProps => <QuestionCard key={questionProps.creation_date} {...questionProps} />)}
        </div>
        {!isFetching && questions && questions[0].length > 0 && (
          <PaginationButtons
            isFetching={isFetching}
            hasNext={questions[1]}
            page={page}
            handlePageChange={handlePageChange}
            setPage={setPage}
          />
        )}
      </div>

      {!isFetching && (!questions || questions[0].length <= 0) && (
        <h1 className="text-2xl font-extrabold m-auto">No answers</h1>
      )}
    </div>
  )
}
