export type Coordinates = [number, number]; // [longitude, latitude] — GeoJSON order

export type PointType = 'departure' | 'destination' | 'last_known' | 'crash_site';

export type FlightPoint = {
  label: string;
  description: string;
  coordinates: Coordinates;
  type: PointType;
  time?: string;
};

export type CrashDetails = {
  aircraft: string;
  registration: string;
  aircraftAge: number;
  fatalities: number;
  passengers: number;
  crew: number;
  cause: string;
  summary: string;
  images?: string[];
};

export type FlightCrash = {
  id: string;
  flight: string;
  airline: string;
  date: string;
  /** Ordered coordinates of the actual flown route */
  actualPath: Coordinates[];
  points: FlightPoint[];
  details: CrashDetails;
};

export const crashes: FlightCrash[] = [
  {
    id: 'af447',
    flight: 'AF447',
    airline: 'Air France',
    date: '2009-06-01',
    actualPath: [
      [-43.25, -22.81], // GIG
      [-30.59, 2.98],   // Last known position
      [-30.5, 3.5],     // Crash site
    ],
    points: [
      {
        label: 'Rio de Janeiro (GIG)',
        description: 'Departure airport',
        coordinates: [-43.25, -22.81],
        type: 'departure',
      },
      {
        label: 'Paris (CDG)',
        description: 'Intended destination',
        coordinates: [2.55, 49.01],
        type: 'destination',
      },
      {
        label: 'Last Known Position',
        description: 'Final ACARS transmission',
        coordinates: [-30.59, 2.98],
        type: 'last_known',
        time: '02:10 UTC',
      },
      {
        label: 'Crash Site',
        description: 'Aircraft hit the ocean',
        coordinates: [-30.5, 3.5],
        type: 'crash_site',
        time: '~02:14 UTC',
      },
    ],
    details: {
      images: ['https://cdn.jetphotos.com/full/1/28761_1238106997.jpg', 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Wreckage_of_F-GZCP.jpg'],
      aircraft: 'Airbus A330-200',
      registration: 'F-GZCP',
      aircraftAge: 4.2,
      fatalities: 228,
      passengers: 216,
      crew: 12,
      cause: 'Unreliable airspeed readings caused by iced-over pitot tubes led the crew to disengage the autopilot. The pilots inadvertently placed the aircraft into an aerodynamic stall and failed to recover, likely due to spatial disorientation and contradictory control inputs.',
      summary: 'Air France Flight 447 departed Rio de Janeiro on the night of May 31, 2009, bound for Paris CDG. At 02:10 UTC, while cruising at 35,000 ft over the equatorial Atlantic, the aircraft entered a series of automated disconnections triggered by airspeed inconsistencies. Within four minutes the aircraft had struck the ocean at high vertical speed. All 228 people on board perished. The wreckage and flight recorders were not recovered until 2011, nearly two years after the accident.',
    },
  },
];
