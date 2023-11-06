import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseMarker(text: string) {
  const idMatch = text.match(/id="([^"]+)"/);
  const xMatch = text.match(/x="([^"]+)"/);
  const yMatch = text.match(/y="([^"]+)"/);
  const cMatch = text.match(/c="([^"]+)"/);

  return {
    id: idMatch ? idMatch[1] : undefined,
    image: cMatch ? cMatch[1] : undefined,
    location: {
      lang: yMatch ? parseFloat(yMatch[1]) : undefined,
      lat: xMatch ? parseFloat(xMatch[1]) : undefined
    }
  };
}
