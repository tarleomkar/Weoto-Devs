import { fetchLaunches } from "./services/SpaceXService";
import { LaunchesClient } from "./components/LaunchesClient";
import { FilterState } from "./types";
import { Rocket } from "lucide-react";

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

  const launches = await fetchLaunches(filters);

  // Pagination Config
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 10;

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center justify-start gap-4 mb-8">
          <Rocket className="w-8 h-8" />
          <h1 className="text-3xl font-bold text-left">SpaceX Launches</h1>
        </div>

        <LaunchesClient
          launches={launches}
          filters={filters}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          searchParams={searchParams}
        />
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
