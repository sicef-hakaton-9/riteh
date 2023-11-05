interface Parking {
  name: string;
  capacity: string;
  link: string;
  free_spots: string;
  location: {
    lang: number;
    lat: number;
  };
}

interface Container {
  percentage: number;
  neighborhood?: string;
  type: string;
  location: {
    lang: number;
    lat: number;
  };
}

interface ParkingData {
  parking_name: string;
  category: string;
  link: string;
  parking_data: {
    parking_id: number;
    kapacitet: string;
    slobodno: string;
    status_sustava: string;
    live_status: boolean;
    last_update_date: string;
    last_update_time: string;
    lokacija: { lat: number; lng: number };
    vrijeme_naplate: [[Object], [Object]];
    cijena: [[Object]];
    placanje: [[Object], [Object]];
    ogranicenje_vremena: string;
    napomene: string;
    info_contact: [[Object]];
  };
}
