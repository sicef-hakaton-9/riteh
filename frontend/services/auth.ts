export async function register(props: object) {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/register", {
    body: JSON.stringify(props),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
}

export async function registerBusiness(props: object) {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/register-business", {
    body: JSON.stringify(props),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
}
