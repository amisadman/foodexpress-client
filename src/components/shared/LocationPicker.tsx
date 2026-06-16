"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import the Map component, completely disabling SSR for it.
// This prevents 'window is not defined' errors during build and server rendering.
const DynamicMap = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full rounded-md" />,
});

interface LocationPickerProps {
  initialLat?: number;
  initialLng?: number;
  onLocationSelect: (lat: number, lng: number) => void;
}

export default function LocationPicker(props: LocationPickerProps) {
  return <DynamicMap {...props} />;
}
