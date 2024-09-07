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
    // @ts-expect-error
    isPending,
    data: questions,
    refetch,
  } = useQuery({
    queryKey: ['questions'],
    queryFn: () => fetchQuestionsByQuery(inputVal),
    refetchOnWindowFocus: false,
  })
  const handleInput: React.FormEventHandler<HTMLInputElement> = () => {
    refetch()
  }
  const debouncedHandleInput = useDebounce(e => handleInput(e), DELAY_MS)

  return (
    <div className="flex flex-col gap-10 items-center m-auto">
      <SearchInput value={inputVal} setValue={setInputVal} handleInput={debouncedHandleInput} />
      <div className="grid md:grid-cols-4 gap-4 grid-flow-cols md:max-w-[80%]">
        {isPending && new Array(3).map(() => <QuestionCardSkeleton />)}
        {!isPending &&
          questions &&
          questions.length > 0 &&
          questions.map(questionProps => <QuestionCard key={questionProps.creation_date} {...questionProps} />)}
      </div>
    </div>
  )
}
