async function basicFetch(url, payload) {
  const res = await fetch(url, payload)
  const body = await res.json()
  return body
}

  
  export async function signup(context) {
    const base_url = import.meta.env.VITE_BASE_URL
    console.log(context)
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`http://${base_url}/users/signup/`,payload)
    return body
  }
  
  export async function login(context) {
    const base_url = import.meta.env.VITE_BASE_URL
    console.log(context)
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`http://${base_url}/users/get-token/`, payload)
    return body.token
  }

  