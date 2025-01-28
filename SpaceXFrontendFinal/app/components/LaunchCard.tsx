import React from "react";
import { Launch } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, Rocket, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LaunchCard = React.memo(({ launch }: { launch: Launch }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="space-y-4">
        <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
          <Image
            src={
              launch.links.mission_patch_small ||
              "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=500&h=300&fit=crop"
            }
            alt={launch.mission_name || "Mission Patch"}
            fill
            className="object-contain p-4"
          />
        </div>
        <CardTitle className="text-xl line-clamp-2">
          {launch.mission_name || "Unnamed Mission"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            {launch.launch_date_utc
              ? new Date(launch.launch_date_utc).toLocaleDateString()
              : "Date not available"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Rocket className="w-4 h-4" />
          <span>
            {launch.rocket?.rocket_name || "Rocket information unavailable"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <Badge variant={launch.launch_success ? "default" : "destructive"}>
            Launch: {launch.launch_success ? "Success" : "Failed"}
          </Badge>
          {launch.rocket?.first_stage?.cores?.[0]?.land_success !== null && (
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
        <p className="text-sm text-muted-foreground line-clamp-3 min-h-[4.5rem]">
          {launch.details || "No mission details available for this launch."}
        </p>
        <div className="flex gap-2 mt-auto pt-4">
          {launch.links?.wikipedia ? (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a
                href={launch.links.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link2 className="w-4 h-4 mr-2" />
                Wiki
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled className="flex-1">
              <Link2 className="w-4 h-4 mr-2" />
              No Wiki
            </Button>
          )}
          {launch.links?.video_link ? (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a
                href={launch.links.video_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link2 className="w-4 h-4 mr-2" />
                Video
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled className="flex-1">
              <Link2 className="w-4 h-4 mr-2" />
              No Video
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

LaunchCard.displayName = "LaunchCard";
