import { Launch } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, Rocket, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LaunchCard({ launch }: { launch: Launch }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="space-y-4">
        <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
          <Image
            src={launch.links.mission_patch_small || "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=500&h=300&fit=crop"}
            alt={launch.mission_name}
            fill
            className="object-contain p-4"
          />
        </div>
        <CardTitle className="text-xl line-clamp-2 text-purple-800">{launch.mission_name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(launch.launch_date_utc).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Rocket className="w-4 h-4" />
          <span>{launch.rocket.rocket_name}</span>
        </div>
        <div className="space-x-2">
          <Badge variant={launch.launch_success ? "default" : "destructive"}>
            Launch: {launch.launch_success ? "Success" : "Failed"}
          </Badge>
          {launch.rocket.first_stage.cores[0].land_success !== null && (
            <Badge variant={launch.rocket.first_stage.cores[0].land_success ? "default" : "destructive"}>
              Landing: {launch.rocket.first_stage.cores[0].land_success ? "Success" : "Failed"}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{launch.details || "No details available"}</p>
        <div className="flex gap-2 mt-auto pt-4">
          {launch.links.wikipedia && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer">
                <Link2 className="w-4 h-4 mr-2" />
                Wiki
              </a>
            </Button>
          )}
          {launch.links.video_link && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href={launch.links.video_link} target="_blank" rel="noopener noreferrer">
                <Link2 className="w-4 h-4 mr-2" />
                Video
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}