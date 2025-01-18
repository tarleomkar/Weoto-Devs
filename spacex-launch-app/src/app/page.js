import { Button } from "@/components/ui/button";
import Image from "next/image";

// Fetch data directly in the component
export default async function Home() {
  const res = await fetch("https://api.spacexdata.com/v3/launches?limit=100");
  const launches = await res.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">SpaceX Launch Programs</h1>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {launches.map((launch) => (
            <div
              key={launch.flight_number}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <Image
                src={
                  launch.links.mission_patch_small ||
                  "https://via.placeholder.com/150"
                }
                alt={launch.mission_name}
                width={150}
                height={150}
                className="w-full h-auto"
              />
              <h2 className="text-lg font-semibold mt-2">
                {launch.mission_name}
              </h2>
              <p className="text-sm">
                <strong>Launch Year:</strong> {launch.launch_year}
              </p>
              <p className="text-sm">
                <strong>Launch Success:</strong>{" "}
                {launch.launch_success ? "Yes" : "No"}
              </p>
              <Button
                as="a"
                href={launch.links.video_link || "#"}
                target="_blank"
                className="mt-2"
              >
                Watch Launch
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
