import { Button } from '@/shared/components/ui'

export type TPaginationButtonsProps = {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  handlePageChange: () => void
  isFetching: boolean
  hasNext: boolean
}

export const PaginationButtons = ({
  isFetching,
  hasNext,
  page,
  setPage,
  handlePageChange,
}: TPaginationButtonsProps) => {
  return (
    <div className="flex justify-around pb-10">
      <Button
        onClick={() => {
          setPage(prev => prev - 1)
          handlePageChange()
        }}
        disabled={isFetching || page <= 1}
        className="w-min font-mono font-bold"
      >
        {'<'} PREVIOUS PAGE
      </Button>
      <h1 className="text-2xl font-extrabold uppercase">page: {page}</h1>
      <Button
        onClick={() => {
          setPage(prev => prev + 1)
          handlePageChange()
        }}
        disabled={isFetching || !hasNext}
        className="w-min font-mono font-bold"
      >
        NEXT PAGE {'>'}
      </Button>
    </div>
  )
}
