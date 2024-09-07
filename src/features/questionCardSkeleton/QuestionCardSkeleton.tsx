import { Card, CardContent, CardFooter, CardHeader, Skeleton } from '@/shared/components/ui'

export const QuestionCardSkeleton = () => {
  return (
    <Card className="grid grid-flow-row-dense m-auto md:min-w-[200px] md:w-full cursor-pointer hover:scale-105 hover:shadow-lg">
      <CardHeader className="h-[200px]">
        <h3 className="text-lg line-clamp-5 text-ellipsis whitespace-break-spaces md:line-clamp-4">
          <Skeleton />
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-thin">
          <Skeleton />
        </p>
        <Skeleton />
      </CardContent>
      <CardFooter className="flex gap-3">
        <Skeleton className="rounded" />
        <Skeleton />
        <Skeleton />
      </CardFooter>
    </Card>
  )
}
