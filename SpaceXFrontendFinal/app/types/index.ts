export interface Launch {
  flight_number: number;
  mission_name: string;
  mission_id: string[];
  launch_year: string;
  launch_success: boolean;
  launch_date_utc: string;
  rocket: {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
    first_stage: {
      cores: {
        land_success: boolean;
        landing_type: string;
        landing_vehicle: string;
      }[];
    };
  };
  links: {
    mission_patch_small: string;
    wikipedia: string;
    video_link: string;
  };
  details: string;
}

export interface FilterState {
  launch_year?: string;
  launch_success?: boolean;
  land_success?: boolean;
}