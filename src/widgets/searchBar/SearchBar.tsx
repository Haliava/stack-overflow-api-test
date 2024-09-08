import QuestionCard from '@/features/questionCard'
import QuestionCardSkeleton from '@/features/questionCardSkeleton'
import SearchInput from '@/features/searchInput'
import { DELAY_MS } from '@/shared/consts'
import { fetchQuestionsByQuery } from '@/entities/post/api'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useQuery } from 'react-query'
import { useState } from 'react'

export const SearchBar = () => {
  const [inputVal, setInputVal] = useState('')

  const {
    isFetching,
    data: questions,
    refetch,
  } = useQuery({
    queryKey: ['questions'],
    queryFn: () => fetchQuestionsByQuery(inputVal),
    refetchOnWindowFocus: false,
    enabled: false,
  })
  const handleInput: React.FormEventHandler<HTMLInputElement> = () => {
    refetch()
  }
  const debouncedHandleInput = useDebounce(e => handleInput(e), DELAY_MS)

  return (
    <div className="flex flex-col gap-10 items-center m-auto">
      <SearchInput value={inputVal} setValue={setInputVal} handleInput={debouncedHandleInput} />
      <div className="w-[80vw] grid lg:grid-cols-3 gap-4 grid-flow-cols">
        {isFetching && Array.from({ length: 3 }, (_, i) => i).map((_, i) => <QuestionCardSkeleton key={i} />)}
        {!isFetching &&
          questions &&
          questions.length > 0 &&
          questions.map(questionProps => <QuestionCard key={questionProps.creation_date} {...questionProps} />)}
      </div>
      {!isFetching && (!questions || questions.length <= 0) && (
        <h1 className="text-2xl font-extrabold m-auto">No answers</h1>
      )}
    </div>
  )
}
