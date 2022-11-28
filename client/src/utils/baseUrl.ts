const baseUrl = (): string => {
  let env = import.meta.env

  return env.MODE === "development" ? "http://localhost:3000" : ""
}

export default baseUrl()
