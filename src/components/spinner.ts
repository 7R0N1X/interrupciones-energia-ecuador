import crearElemento from "../utils/crearElemento";

const spinner = (): HTMLElement => {
  const spinner = crearElemento("div", "sk-circle");

  for (let i = 1; i <= 12; i++) {
    const circle = crearElemento("div", `sk-circle${i} sk-child`);
    spinner.appendChild(circle);
  }

  return spinner;
}

export default spinner