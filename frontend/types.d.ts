interface Parking {
  name: string;
  capacity: string;
  link: string;
  free_spots: string;
  location: {
    lang: number;
    lat: number;
  };
  price: string;
}

interface Bus {
  number: string;
  location: {
    lat: number;
    lang: number;
  };
}

interface Stop {
  name: string;
  location: {
    lat: number;
    lang: number;
  };
}
