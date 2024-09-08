import { Card, CardContent, CardFooter, CardHeader, Skeleton } from '@/shared/components/ui'

export const QuestionCardSkeleton = () => {
  return (
    <Card className="grid animate-pulse w-[100%]">
      <CardHeader>
        <Skeleton className="h-[50px] rounded-xl mb-20" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[50px] w-[50%] rounded-xl" />
      </CardContent>
      <CardFooter className="flex gap-5">
        <Skeleton className="h-[50px] w-[50px] rounded-full" />
        <Skeleton className="h-[50px] w-[50%] rounded-xl" />
      </CardFooter>
    </Card>
  )
}
