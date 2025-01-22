import { Launch } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, Rocket, Link2, Type } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LaunchCard({ launch }: { launch: Launch }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="space-y-4">
        {/* Mission Image */}
        <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
          <Image
            src={
              launch.links.mission_patch_small ||
              "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=500&h=300&fit=crop"
            }
            alt={launch.mission_name}
            fill
            className="object-contain p-0"
          />
        </div>
        {/* Mission Name */}
        <CardTitle className="text-xl line-clamp-1 text-purple-800">
          {launch.mission_name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Launch Date */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(launch.launch_date_utc).toLocaleDateString()}</span>
        </div>
        {/* Rocket Name */}
        <div className="flex items-center gap-2">
          <Rocket className="w-4 h-3" />
          <span>{launch.rocket.rocket_name}</span>
        </div>
        {/* Rocket Type */}
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4" />
          <span>{launch.rocket.rocket_type}</span>
        </div>
        {/* Badges (Launch and Landing Status) */}
        {(launch.launch_success !== null ||
          launch.rocket.first_stage.cores[0].land_success !== null) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {/* Launch Success Badge */}
            {launch.launch_success !== null && (
              <Badge variant={launch.launch_success ? "default" : "destructive"}>
                Launch: {launch.launch_success ? "Success" : "Failed"}
              </Badge>
            )}
            {/* Landing Success Badge */}
            {launch.rocket.first_stage.cores[0].land_success !== null && (
              <Badge
                variant={
                  launch.rocket.first_stage.cores[0].land_success
                    ? "default"
                    : "destructive"
                }
              >
                Landing:{" "}
                {launch.rocket.first_stage.cores[0].land_success
                  ? "Success"
                  : "Failed"}
              </Badge>
            )}
          </div>
        )}
        {/* Mission Details */}
        {launch.details && (
          <p className="text-sm text-muted-foreground line-clamp-1">
            {launch.details}
          </p>
        )}
        {/* Wiki and Video Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          {launch.links.wikipedia && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={launch.links.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link2 className="w-4 h-4 mr-2" />
                Wiki
              </a>
            </Button>
          )}
          {launch.links.video_link && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={launch.links.video_link}
                target="_blank"
                rel="noopener noreferrer"
              >
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
