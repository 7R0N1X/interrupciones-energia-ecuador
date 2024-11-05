const validarCampos = (identificacion: String, empresa: string, tipoConsulta: string): Boolean => {
  if (empresa === '' || tipoConsulta === '' || identificacion === '') {
    return false
  }
  return true
}

export default validarCampos