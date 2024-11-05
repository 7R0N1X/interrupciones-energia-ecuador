import { consultarSectoresAfectadosCnelEp } from "../api/cnelep"
import $ from "./seleccionarElemento"
import modal from "../components/modal"

const mostrarModal = async (alimentador: string): Promise<any> => {
  const sectoresAfectados = await consultarSectoresAfectadosCnelEp(alimentador)
  const body = $('body')
  if (sectoresAfectados) body?.append(modal(sectoresAfectados))
}

export default mostrarModal