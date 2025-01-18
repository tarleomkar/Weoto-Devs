import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RocketIcon, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

function App() {
  const [launches, setLaunches] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 15 }, (_, i) => (2006 + i).toString());

  const fetchLaunches = async (filters) => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append('limit', '100');
    
    if (filters.launch_success !== undefined) {
      params.append('launch_success', filters.launch_success.toString());
    }
    if (filters.land_success !== undefined) {
      params.append('land_success', filters.land_success.toString());
    }
    if (filters.launch_year) {
      params.append('launch_year', filters.launch_year);
    }

    try {
      const response = await fetch(`https://api.spacexdata.com/v3/launches?${params}`);
      const data = await response.json();
      setLaunches(data);
    } catch (error) {
      console.error('Error fetching launches:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunches(filters);
    
    // Update URL with filters
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString());
      }
    });
    window.history.pushState({}, '', `?${params.toString()}`);
  }, [filters]);

  useEffect(() => {
    // Read filters from URL on initial load
    const params = new URLSearchParams(window.location.search);
    const urlFilters = {};
    
    const launch_success = params.get('launch_success');
    const land_success = params.get('land_success');
    const launch_year = params.get('launch_year');

    if (launch_success) urlFilters.launch_success = launch_success === 'true';
    if (land_success) urlFilters.land_success = land_success === 'true';
    if (launch_year) urlFilters.launch_year = launch_year;

    setFilters(urlFilters);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8 flex flex-col">
      <h1 className="text-3xl font-bold mb-8 text-center">SpaceX Launches</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 flex-grow">
        {/* Filters */}
        <Card className="p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Launch Year</h3>
              <div className="grid grid-cols-2 gap-2">
                {years.map((year) => (
                  <Button
                    key={year}
                    variant={filters.launch_year === year ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      launch_year: prev.launch_year === year ? undefined : year
                    }))}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-3">Launch Success</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={filters.launch_success === true ? "default" : "outline"}
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    launch_success: prev.launch_success === true ? undefined : true
                  }))}
                >
                  True
                </Button>
                <Button
                  variant={filters.launch_success === false ? "default" : "outline"}
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    launch_success: prev.launch_success === false ? undefined : false
                  }))}
                >
                  False
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-3">Land Success</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={filters.land_success === true ? "default" : "outline"}
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    land_success: prev.land_success === true ? undefined : true
                  }))}
                >
                  True
                </Button>
                <Button
                  variant={filters.land_success === false ? "default" : "outline"}
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    land_success: prev.land_success === false ? undefined : false
                  }))}
                >
                  False
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Launches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="p-6 space-y-4 animate-pulse">
                <div className="w-full h-40 bg-muted rounded-lg" />
                <div className="h-6 bg-muted rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </Card>
            ))
          ) : launches.map((launch) => (
            <Card key={launch.flight_number} className="p-6 flex flex-col">
              <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                {launch.links.mission_patch_small ? (
                  <img
                    src={launch.links.mission_patch_small}
                    alt={`${launch.mission_name} patch`}
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <RocketIcon className="w-16 h-16 text-muted-foreground" />
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{launch.mission_name}</h3>
              
              <div className="space-y-2 mb-4 flex-grow">
                <p className="text-sm text-muted-foreground">
                  Flight Number: {launch.flight_number}
                </p>
                <p className="text-sm text-muted-foreground">
                  Launch Year: {launch.launch_year}
                </p>
                {launch.details && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {launch.details}
                  </p>
                )}
              </div>

              <div className="flex gap-4 mt-auto">
                <div className="flex items-center gap-2">
                  {launch.launch_success ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className={cn(
                    "text-sm",
                    launch.launch_success ? "text-green-500" : "text-red-500"
                  )}>
                    Launch
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {launch.rocket.first_stage.cores[0].land_success ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className={cn(
                    "text-sm",
                    launch.rocket.first_stage.cores[0].land_success ? "text-green-500" : "text-red-500"
                  )}>
                    Landing
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-sm text-muted-foreground border-t">
        <p className="flex items-center justify-center gap-2">
          Developed By: Omkar Tarle <RocketIcon className="w-4 h-4" />
        </p>
      </footer>
    </div>
  );
}

export default App;