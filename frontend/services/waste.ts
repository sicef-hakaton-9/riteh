// eslint-disable
"use server";

const getRandomSubset = (arr: Container[], percentage: number) => {
  const numItems = Math.ceil(arr.length * (percentage / 100));
  const indices = Array.from({ length: arr.length }, (_, i) => i);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const selectedIndices = indices.slice(0, numItems);

  return selectedIndices.map((index) => arr[index]);
};

const convertNeighborhood = (neighborhood: string) => {
  switch (neighborhood) {
    case "TURNI":
      return "TURNIĆ";
    case "PODVEICA":
      return "PODVEŽICA";
    case "CENTAR-SUAK":
      return "CENTAR-SUŠAK";
    case "KURINJE":
      return "ŠKURINJE";
    case "SRDOI":
      return "SRDOČI";
    case "KURINJSKA DRAGA":
      return "ŠKURINJSKA DRAGA";
    case "PEINE":
      return "PEĆINE";
    case "KOLJI":
      return "ŠKOLJIĆ";
    case "GORNJA VEICA":
      return "GORNJA VEŽICA";
    case "DONJA VEICA":
      return "DONJA VEŽICA";
    case "SUAK":
      return "SUŠAK";
    default:
      return neighborhood;
  }
};

const convertType = (type: string) => {
  let returnValue = type;
  if (type === "MIJEANI KOMUNALNI OTPAD") returnValue = "MIJEŠANI KOMUNALNI OTPAD";

  return returnValue;
};

export async function getWaste() {
  const containers: Container[] = [];
  try {
    const res = await fetch(
      "https://data.gov.hr/ckan/api/3/action/datastore_search?resource_id=121c7b9e-ea85-4525-bced-e68481217aa9&limit=12500",
      {
        headers: { "content-type": "application/json" }
      }
    );
    const body = await res.json();

    body.result.records.map((container: any) => {
      if (
        container._id &&
        container["M_O ODBOR"] !== "" &&
        container["M_O ODBOR"] &&
        container.X !== "" &&
        container.X &&
        container.Y !== "" &&
        container.Y &&
        container["VRSTA OTPADA"] !== "" &&
        container["VRSTA OTPADA"]
      )
        containers.push({
          location: {
            lang: parseFloat(container.X.replace(/,/g, ".")),
            lat: parseFloat(container.Y.replace(/,/g, "."))
          },
          neighborhood: convertNeighborhood(container["M_O ODBOR"]),
          percentage: Math.random() * 99 + 1,
          type: convertType(container["VRSTA OTPADA"])
        });
    });

    const randomSubset = getRandomSubset(containers, 10);

    return randomSubset;
  } catch (err) {
    console.log(err);
    return null;
  }
}
