"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FilterState } from "../types";
import { useRouter, useSearchParams } from "next/navigation";

const years = Array.from({ length: 15 }, (_, i) => (2006 + i).toString());

export function Filters({ currentFilters }: { currentFilters: FilterState }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (key: keyof FilterState, value: string | boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get(key) === value.toString()) {
      params.delete(key);
    } else {
      params.set(key, value.toString());
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="space-y-4">
        {/* Launch Year */}
        <div>
          <h3 className="font-sans text-xl mb-2 border-b border-gray-300 pb-1 text-center">
            Launch Year
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {years.map((year) => (
              <Button
                key={year}
                variant={currentFilters.launch_year === year ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters("launch_year", year)}
                className={`${
                  currentFilters.launch_year === year
                    ? "bg-[#4d9900] text-[#a8dc78] text-black"
                    : "bg-[#a8dc78] text-lime-600 text-black"
                } hover:bg-[#4d9900] hover:text-black font-semibold`}
              >
                {year}
              </Button>
            ))}
          </div>
        </div>

        {/* Successful Launch */}
        <div>
          <h3 className="font-sans text-xl mb-2 border-b border-gray-300 pb-1 text-center">
            Successful Launch
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[true, false].map((value) => (
              <Button
                key={value.toString()}
                variant={currentFilters.launch_success === value ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters("launch_success", value)}
                className={`${
                  currentFilters.launch_success === value
                  ? "bg-[#4d9900] text-[#a8dc78] text-black"
                  : "bg-[#a8dc78] text-lime-600 text-black"
              } hover:bg-[#4d9900] hover:text-black font-semibold`}
              >
                {value ? "Yes" : "No"}
              </Button>
            ))}
          </div>
        </div>

        {/* Successful Landing */}
        <div>
          <h3 className="font-sans text-xl mb-2 border-b border-gray-300 pb-1 text-center">
            Successful Landing
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[true, false].map((value) => (
              <Button
                key={value.toString()}
                variant={currentFilters.land_success === value ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters("land_success", value)}
                className={`${
                  currentFilters.land_success === value
                  ? "bg-[#4d9900] text-[#a8dc78] text-black"
                  : "bg-[#a8dc78] text-lime-600 text-black"
              } hover:bg-[#4d9900] hover:text-black font-semibold`}
              >
                {value ? "Yes" : "No"}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
