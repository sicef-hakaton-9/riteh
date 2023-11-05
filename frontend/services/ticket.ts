export async function submitTicket(values: object, token: string) {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/ticket/create-ticket", {
    body: JSON.stringify(values),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    method: "POST"
  });
}
