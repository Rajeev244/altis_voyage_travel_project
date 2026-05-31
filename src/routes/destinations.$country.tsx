import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/destinations/$country")({
  component: DestinationCountryLayout,
});

function DestinationCountryLayout() {
  return <Outlet />;
}