import { useEffect, useRef } from "react";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const COLOMBO_CENTER: L.LatLngExpression = [6.9271, 79.8612];
const COLOMBO_FORT: L.LatLngExpression = [6.9344, 79.8428];

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

function ColomboMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = L.map(mapRef.current).setView(COLOMBO_CENTER, 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(COLOMBO_FORT).addTo(map).bindPopup("Colombo Fort");

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapRef} className="h-full w-full" aria-label="Map of Colombo" />;
}

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="flex h-16 items-center border-b border-slate-200 bg-white px-6">
        <h1 className="text-lg font-semibold">ColomboFlow + ParkSmart</h1>
      </header>

      <div className="grid min-h-[calc(100vh-4rem)] grid-cols-[240px_1fr]">
        <aside className="border-r border-slate-200 bg-white p-5">
          <nav className="space-y-2 text-sm">
            <a className="block rounded-md bg-slate-900 px-3 py-2 font-medium text-white" href="/">
              Dashboard
            </a>
            <a className="block rounded-md px-3 py-2 text-slate-600" href="/">
              Traffic
            </a>
            <a className="block rounded-md px-3 py-2 text-slate-600" href="/">
              Parking
            </a>
          </nav>
        </aside>

        <main className="p-6">
          <section className="h-[calc(100vh-7rem)] overflow-hidden rounded-lg border border-slate-200 bg-white">
            <ColomboMap />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
