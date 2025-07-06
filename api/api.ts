const BASE_URL = "http://localhost:4000"


export async function loginUser(email: string, password: string) {
  const res = await fetch(`http://localhost:4000/users?email=${email}`)
  if (!res.ok) {
    throw new Error("Failed to connect to JSON server")
  }
  const users = await res.json()
  if (users.length === 0) {
    throw new Error("No user found")
  }
  const user = users[0]
  // match the password
  if (user.password !== password) {
    throw new Error("Incorrect password")
  }
  return user
}


export async function createUser(userData: any) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })
  if (!res.ok) {
    throw new Error("Failed to register user")
  }
  return res.json()
}



export async function getTests() {
  const res = await fetch(`${BASE_URL}/tests`)
  if (!res.ok) {
    throw new Error("Failed to fetch tests")
  }
  return res.json()
}

export async function getTest(id: string) {
  const res = await fetch(`${BASE_URL}/tests/${id}`)
  if (!res.ok) {
    throw new Error("Test not found")
  }
  return res.json()
}

export async function createTest(testData: any) {
  const res = await fetch(`${BASE_URL}/tests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testData),
  })
  if (!res.ok) {
    throw new Error("Failed to create test")
  }
  return res.json()
}

export async function updateTest(id: string, updateData: any) {
  const res = await fetch(`${BASE_URL}/tests/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  })
  if (!res.ok) {
    throw new Error("Failed to update test")
  }
  return res.json()
}

export async function deleteTest(id: string) {
  const res = await fetch(`${BASE_URL}/tests/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    throw new Error("Failed to delete test")
  }
  return true
}
