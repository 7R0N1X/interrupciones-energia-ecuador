const limpiarResultados = (elem: HTMLElement): any => {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild)
  }
}

export default limpiarResultados