import { inject } from "@vercel/analytics";
import { consultarCortesCnelEp } from "./api/cnelep";
import $ from "./utils/seleccionarElemento";
import verificarLocalStorage from "./utils/verificarLocalStorage";
import validarCampos from "./utils/validarCampos"
import limpiarResultados from "./utils/limpiarResultados"
import spinner from "./components/spinner"
import alerta from "./components/alerta"
import resultado from "./components/resultados"
import mostrarModal from "./utils/mostrarModal";

document.addEventListener("DOMContentLoaded", () => {
  inject();

  const $empresa = $("#empresa");
  const $tipoConsulta = $("#tipo-consulta");
  const $identificacion = $("#identificacion");
  const $btnConsultar = $("#consultar");
  const $resultados = $("#resultados");
  const $body = $("body");

  let empresaSeleccionada;
  let tipoConsulta;
  let identificacion;
  let existeAlerta;

  const { empresaSeleccionada: _empresaSeleccionada, tipoConsulta: _tipoConsulta, identificacion: _identificacion } = verificarLocalStorage()
  empresaSeleccionada = _empresaSeleccionada
  tipoConsulta = _tipoConsulta
  identificacion = _identificacion

  const mostrarResultados = async () => {
    limpiarResultados($resultados);
    $resultados.appendChild(spinner());
    const consulta = await consultarCortesCnelEp(identificacion, empresaSeleccionada, tipoConsulta);

    if (consulta) {
      limpiarResultados($resultados);
      if (consulta.status === "ERROR") {
        if (!existeAlerta) {
          $body.appendChild(alerta(consulta.mensaje));
          setTimeout(() => {
            $body.querySelector(".alerta").remove();
          }, 3000);
        }
      } else if (consulta.status === "OK") {
        localStorage.setItem("empresaSeleccionada", JSON.stringify(empresaSeleccionada));
        localStorage.setItem("tipoConsulta", JSON.stringify(tipoConsulta));
        localStorage.setItem("identificacion", JSON.stringify(identificacion));

        const { notificaciones } = consulta;
        $resultados.appendChild(resultado(notificaciones, mostrarModal));
      }
    }
    const formulario = $("form");
    formulario.reset();
  };

  mostrarResultados();

  $btnConsultar.addEventListener("click", (e) => {
    e.preventDefault();
    empresaSeleccionada = $empresa.value;
    tipoConsulta = $tipoConsulta.value;
    identificacion = $identificacion.value;
    existeAlerta = $(".alerta");

    if (validarCampos(identificacion, empresaSeleccionada, tipoConsulta)) {
      mostrarResultados();
    } else {
      if (!existeAlerta) {
        $body.appendChild(alerta("Todos los campos son obligatorios."));
        setTimeout(() => {
          $body.querySelector(".alerta").remove();
        }, 3000);
      }
    }
  });
});
