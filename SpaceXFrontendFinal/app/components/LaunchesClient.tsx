"use client";
import { UseFilteredLaunches } from "../hooks/UseFilteredLaunches";
import { Filters } from "./Filters";
import { LaunchCard } from "./LaunchCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const LaunchesClient = ({ launches, filters, currentPage, itemsPerPage, searchParams }: any) => {
  const { paginatedLaunches, totalPages, applyFilters } = UseFilteredLaunches(
    launches,
    currentPage,
    itemsPerPage
  );

  const getPaginationUrl = (page: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  const formatDate = (dateString: string) => {
    // Ensure consistent formatting for the date
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <div className="md:sticky md:top-4 h-fit">
          <Filters currentFilters={filters} onFilterChange={applyFilters} />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedLaunches.map((launch: any) => (
              <LaunchCard
                key={launch.flight_number}
                launch={{
                  ...launch,
                  launch_date: formatDate(launch.launch_date), // Format date here
                }}
              />
            ))}
            {paginatedLaunches.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No launches found with the selected filters.
              </div>
            )}
          </div>

          {/* Pagination */}
          {launches.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {/* Previous Button */}
              <Button asChild variant="outline" size="sm" disabled={currentPage === 1}>
                {currentPage > 1 ? (
                  <a href={getPaginationUrl(currentPage - 1)}>
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </a>
                ) : (
                  <span className="flex items-center">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </span>
                )}
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    asChild
                    className="w-8"
                  >
                    <a href={getPaginationUrl(page)}>{page}</a>
                  </Button>
                ))}
              </div>

              {/* Next Button */}
              <Button asChild variant="outline" size="sm" disabled={currentPage === totalPages}>
                {currentPage < totalPages ? (
                  <a href={getPaginationUrl(currentPage + 1)}>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="flex items-center">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
