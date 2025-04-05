
import { useEffect, useState } from 'react';

export default function App() {
  const [forecast, setForecast] = useState([]);
  const [pricing, setPricing] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://revup-backend.onrender.com/api/forecast").then(r => r.json()).then(setForecast);
    fetch("https://revup-backend.onrender.com/api/pricing").then(r => r.json()).then(setPricing);
    fetch("https://revup-backend.onrender.com/api/events").then(r => r.json()).then(setEvents);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">RevUp AI Dashboard</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Forecast</h2>
        <ul className="space-y-1">
          {forecast.map((f, i) => <li key={i}>{f.date}: {f.occupancy}% occupancy</li>)}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Pricing Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(pricing).map(([room, data], i) => (
            <div key={i} className="bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-bold text-yellow-300">{room}</h3>
              <p>Base: ${data.base}</p>
              <p>Suggested: ${data.recommended}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
        <ul className="list-disc list-inside">
          {events.map((e, i) => (
            <li key={i}>{e.name} ({e.start_date}–{e.end_date}) +{e.impact * 100}% demand</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
