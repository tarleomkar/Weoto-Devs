import { Button } from "@/components/ui/button";
import { FilterLogic } from "./components/FilterLogic";
import { LaunchCard } from "./components/LaunchCard";
import { Rocket } from "lucide-react";

// Fetch data with optional filters
async function fetchLaunches(filters) {
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

// Main component
// Main component
export default async function Home({ searchParams }) {
  // Await searchParams first
  const filters = {
    launch_year: searchParams?.launch_year,
    launch_success:
      searchParams?.launch_success === "true"
        ? true
        : searchParams?.launch_success === "false"
        ? false
        : undefined,
    land_success:
      searchParams?.land_success === "true"
        ? true
        : searchParams?.land_success === "false"
        ? false
        : undefined,
  };

  // Fetch launches after setting up the filters
  const launches = await fetchLaunches(filters);

  return (
    <div className="container p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 sm:gap-12 items-center sm:items-start">
        <h1 className="text-2xl font-bold">SpaceX Launch Programs</h1>

        {/* Filters Component */}
        <FilterLogic currentFilters={filters} />

        <div className="launch-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {launches.map((launch) => (
            <LaunchCard key={launch.flight_number} launch={launch} />
          ))}
          {launches.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No launches found with the selected filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
