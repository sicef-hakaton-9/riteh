/* eslint-disable */
"use server";

export async function getBusStops() {
  const stops: Stop[] = [];
  try {
    const res = await fetch("http://busri.alwaysdata.net/maps/ATstanice.json", {
      headers: { "content-type": "application/json" }
    });

    const body = await res.json();

    for (let i = 0; i < body.length / 2; i++) {
      stops.push({
        name: body[i].Naziv,
        location: {
          lang: body[i].GpsX,
          lat: body[i].GpsY
        }
      });
    }

    return stops;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getBusLocation() {
  const busses: Bus[] = [];
  try {
    const res = await fetch(
      "http://e-usluge2.rijeka.hr/OpenData/ATPoz.php?type=json",
      {
        headers: { "content-type": "application/json" }
      }
    );

    const resStops = await fetch(
      "http://e-usluge2.rijeka.hr/OpenData/ATvoznired.json",
      {
        headers: { "content-type": "application/json" }
      }
    );

    const stops = await resStops.json();
    const body = await res.json();

    body.map((bus: any) => {
      for (let i = 0; i < stops.length; i++) {
        if (
          stops[i].PolazakId === bus.PolazakId.toString() &&
          stops[i].StanicaId === bus.StanicaId
        ) {
          busses.push({
            number: stops[i].BrojLinije,
            location: {
              lat: bus.GpsX,
              lang: bus.GpsY
            }
          });
        }
      }
    });

    return busses;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getParkingsWithLocation() {
  const parkings: Parking[] = [];
  try {
    const res = await fetch(
      "https://www.rijeka-plus.hr/wp-json/restapi/v1/parkingapi/",
      {
        headers: { "content-type": "application/json" }
      }
    );
    const body = await res.json();

    body.map((parking: any) => {
      if (parking.parking_data.lokacija) {
        parkings.push({
          capacity: parking.parking_data.kapacitet,
          free_spots: parking.parking_data.slobodno,
          link: parking.link,
          location: {
            lang: parking.parking_data.lokacija.lng,
            lat: parking.parking_data.lokacija.lat
          },
          name: parking.parking_name,
          price: `${parking.parking_data.cijena[0].cijena}€`
        });
      }
    });

    return parkings;
  } catch (err) {
    console.log(err);
    return null;
  }
}
