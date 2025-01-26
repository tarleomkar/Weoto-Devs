import { FilterState, Launch } from "../types";

export const fetchLaunches = async (filters: FilterState): Promise<Launch[]> => {
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
    const response = await fetch(`https://api.spacexdata.com/v3/launches?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error("Launch fetch error:", error);
    return [];
  }
};