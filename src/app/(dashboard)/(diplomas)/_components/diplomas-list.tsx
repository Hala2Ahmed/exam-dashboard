"use client"

import useDiplomasList from "../_hooks/use-diplomas-list"
import InfiniteScroll from 'react-infinite-scroll-component';
import DiplomaItem from "./diploma-item";
import { useMemo } from "react";
import DiplomasListSkeleton from "@/components/skeleton/diplomas-list-skeleton";
import StateMessage from "@/components/shared/state-message";
import { AlertCircle, FolderOpen } from "lucide-react";

export default function DiplomasList() {
  const { data: diplomaPages, error, isLoading, hasNextPage, fetchNextPage } = useDiplomasList()

  // Flatten all pages into one array
  const diplomas = useMemo(
    () => diplomaPages?.pages.flatMap((page) => page?.data ?? []) ?? [],
    [diplomaPages]
  )

  // Show loading state
  if (isLoading) {
    return <DiplomasListSkeleton />
  }

  // Show error state
  if (error) {
    return (
      <StateMessage
        icon={AlertCircle}
        iconClassName="text-red-500"
        message={error.message}
      />
    )
  }

  // Show empty state
  if (diplomas.length === 0) {
    return (
      <StateMessage
        icon={FolderOpen}
        iconClassName="text-gray-400"
        message="No diplomas found."
      />
    )
  }

  return (
    <InfiniteScroll
      dataLength={diplomas.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      // Show loader while fetching
      loader={<DiplomasListSkeleton count={3} />}
      // Show when all pages are loaded
      endMessage={
        <p className="py-6 text-center text-sm text-gray-400">
          You&apos;ve reached the end of the list.
        </p>
      }
    >

      {/* Display all diplomas */}
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {diplomas.map((diploma) => (
          <DiplomaItem key={diploma.id} diploma={diploma} />
        ))}
      </ul>
    </InfiniteScroll>
  )
}
