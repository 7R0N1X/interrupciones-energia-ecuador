const verificarLocalStorage = (): Object => {
  const empresaSeleccionada = localStorage.getItem("empresaSeleccionada");
  const tipoConsulta = localStorage.getItem("tipoConsulta");
  const identificacion = localStorage.getItem("identificacion");

  if (empresaSeleccionada && tipoConsulta && identificacion) {
    return {
      empresaSeleccionada: JSON.parse(empresaSeleccionada),
      tipoConsulta: JSON.parse(tipoConsulta),
      identificacion: JSON.parse(identificacion)
    }
  }
  return {}
};

export default verificarLocalStorage