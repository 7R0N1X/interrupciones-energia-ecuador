import { Github } from "../types/github"

export const obtenerColaboradores = async (): Promise<any> => {
  const url = "https://api.github.com/repos/7R0N1X/interrupciones-energia-ecuador/contributors"
  const response = await fetch(url)
  const data = await response.json() as Github
  return data
}