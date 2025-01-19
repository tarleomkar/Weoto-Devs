import { Filters } from "./components/Filters";
import { LaunchCard } from "./components/LaunchCard";
import { FilterState, Launch } from "./types";
import { Rocket } from "lucide-react";

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

  const res = await fetch(`https://api.spacexdata.com/v3/launches?${params.toString()}`);
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const filters: FilterState = {
    launch_year: searchParams.launch_year,
    launch_success: searchParams.launch_success === "true" ? true : searchParams.launch_success === "false" ? false : undefined,
    land_success: searchParams.land_success === "true" ? true : searchParams.land_success === "false" ? false : undefined,
  };

  const launches = await getLaunches(filters);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Rocket className="w-8 h-8" />
          <h1 className="text-3xl font-bold text-center">SpaceX Launches</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          <div className="md:sticky md:top-4 h-fit">
            <Filters currentFilters={filters} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {launches.map((launch) => (
              <LaunchCard key={launch.flight_number} launch={launch} />
            ))}
            {launches.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No launches found with the selected filters.
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