import { Filters } from "./components/Filters";
import { LaunchCard } from "./components/LaunchCard";
import { FilterState, Launch } from "./types";
import { Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

async function getLaunches(filters: FilterState): Promise<Launch[]> {
  const params = new URLSearchParams();
  params.append("limit", "100");

  if (filters.launch_year) {
    params.append("launch_year", filters.launch_year);
  }
  if (filters.launch_success !== undefined) {
    params.append("launch_success", filters.launch_success.toString());
  }
  if (filters.land_success !== undefined) {
    params.append("land_success", filters.land_success.toString());
  }

  try {
    const res = await fetch(`https://api.spacexdata.com/v3/launches?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch launches: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const filters: FilterState = {
    launch_year: searchParams.launch_year,
    launch_success:
      searchParams.launch_success === "true"
        ? true
        : searchParams.launch_success === "false"
        ? false
        : undefined,
    land_success:
      searchParams.land_success === "true"
        ? true
        : searchParams.land_success === "false"
        ? false
        : undefined,
  };

  const launches = await getLaunches(filters);

  // Pagination Logic
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 10;

  const totalPages = Math.ceil(launches.length / itemsPerPage);

  // Calculate start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLaunches = launches.slice(startIndex, endIndex);

  // Function to generate pagination URL
  const getPaginationUrl = (page: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center justify-start gap-4 mb-8">
          <Rocket className="w-8 h-8" />
          <h1 className="text-3xl font-bold text-left">SpaceX Launches</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          <div className="md:sticky md:top-4 h-fit">
            <Filters currentFilters={filters} />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentLaunches.map((launch) => (
                <LaunchCard key={launch.flight_number} launch={launch} />
              ))}
              {currentLaunches.length === 0 && (
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
      </div>

      <footer className="border-t py-6 bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            Developer: Omkar Tarle <Rocket className="w-4 h-4 inline" />
          </p>
        </div>
      </footer>
    </main>
  );
}
