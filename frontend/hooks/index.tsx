import { useEffect } from "react";

export default function usePWA() {
  useEffect(() => {
    if ("navigator" in window && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/pwa-sw.js", { scope: "/" });
    }
  }, []);
}
