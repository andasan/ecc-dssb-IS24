import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonElements = () => {
  return (
    <div className="flex items-center space-x-4 px-7 pt-10">
      <div className="space-y-2">
        <Skeleton className="h-8 w-[220px]" />
        <Skeleton className="h-4 w-[550px]" />

        <div className='space-y-2'>
          <Skeleton className="h-6 w-full mt-10" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    </div>
  );
};