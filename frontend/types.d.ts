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

interface Camera {
  name: string;
  id: string;
}

interface Roadwork {
  id?: string;
  location: {
    lat?: number;
    lang?: number;
  };
  image?: string;
}

interface Container {
  percentage: number;
  neighborhood: string;
  type: string;
  location: {
    lang: number;
    lat: number;
  };
}

interface CheckoutData {
  currency: string | null;
  total: string | null;
  subtotal: string | null;
  tax: number | null;
  tax_rate: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let Paddle: any;
