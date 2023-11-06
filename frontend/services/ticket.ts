export async function submitTicket(values: object, token: string) {
  return (
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/ticket/create-ticket", {
      body: JSON.stringify(values),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      method: "POST"
    })
  ).json();
}

export async function getAllTickets(params: { city: string; category?: string }) {
  return (
    await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        `/api/ticket/get-all-tickets/${params.city}${
          params.category ? `?category=${params.category}` : ""
        }`,
      {
        method: "GET"
      }
    )
  ).json();
}
