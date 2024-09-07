import { Input, Label } from '@/shared/components/ui'

export type TSearchBarProps = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  handleInput: React.FormEventHandler<HTMLInputElement>
}

export const SearchInput = ({ value, setValue, handleInput }: TSearchBarProps) => {
  return (
    <div className="w-[80vw] m-auto max-w-[700px]">
      <Label className="text-2xl" htmlFor="input">
        Enter Your Question
      </Label>
      <Input
        className="text-2xl sm:w-full shadow-sm"
        id="input"
        value={value}
        onInput={e => {
          // @ts-ignore
          setValue(e.target.value)
          handleInput(e)
        }}
      />
    </div>
  )
}
