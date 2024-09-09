import { Input, Label } from '@/shared/components/ui'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { TSortBy } from '@/shared/types'
import { useEffect } from 'react'

export type TSearchBarProps = {
  value: string
  sortOption: TSortBy
  setValue: React.Dispatch<React.SetStateAction<string>>
  setSortOption: React.Dispatch<React.SetStateAction<TSortBy>>
  handleInput: () => void
  handleSort: () => void
  sortOptions: TSortBy[]
}

export const SearchInput = ({
  value,
  sortOption,
  setSortOption,
  setValue,
  handleInput,
  handleSort,
  sortOptions,
}: TSearchBarProps) => {
  useEffect(() => {
    handleInput()
  }, [value])

  useEffect(() => {
    handleSort()
  }, [sortOption])

  return (
    <div className="flex flex-col gap-5 w-[80vw] m-auto max-w-[700px]">
      <div className="flex justify-between">
        <Label className="text-2xl" htmlFor="input">
          Enter Your Question
        </Label>
        <Label className="text-2xl" htmlFor="input">
          Sort By
        </Label>
      </div>
      <div className="flex gap-5">
        <Input
          className="text-2xl sm:w-full shadow-sm"
          id="input"
          value={value}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value)
          }}
        />
        <RadioGroup
          value={sortOption}
          onValueChange={(value: string) => {
            setSortOption(() => value as TSortBy)
          }}
        >
          {sortOptions.map(option => (
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={option} checked={sortOption === option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
