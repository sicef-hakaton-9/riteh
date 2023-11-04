/* eslint-disable */
"use server";

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
