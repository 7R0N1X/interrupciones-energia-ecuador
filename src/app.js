import { inject } from "@vercel/analytics";
import { consultarCortesCnelEp } from "./api/cnelep";
import {
  $,
  validarCampos,
  limpiarResultados,
  crearSeccionResultados,
  crearSpinner,
  crearAlerta,
} from "./utils/domHelpers";

document.addEventListener("DOMContentLoaded", () => {
  inject();
  const $identificacion = $("#identificacion");
  const $btnConsultar = $("#consultar");
  const $resultados = $("#resultados");
  const $body = $("body");
  const $empresa = $("#empresa");
  const $tipoConsulta = $("#tipo-consulta");

  let identificacion;
  let empresaSeleccionada;
  let tipoConsulta;
  let existeAlerta;

  const mostrarResultados = async () => {
    limpiarResultados($resultados);
    const formulario = $("form");
    $resultados.appendChild(crearSpinner());
    const consulta = await consultarCortesCnelEp(
      identificacion,
      empresaSeleccionada,
      tipoConsulta
    );

    if (consulta) {


      limpiarResultados($resultados);



      if (consulta.status === "ERROR") {

        verificarLocalStorageYConsultar();

        if (!existeAlerta) {
          $body.appendChild(crearAlerta(consulta.mensaje));
          setTimeout(() => {
            $body.querySelector(".alerta").remove();
          }, 3000);
        }
      } else if (consulta.status === "OK") {
        localStorage.setItem("tipoConsulta", JSON.stringify(tipoConsulta));
        localStorage.setItem(
          "empresaSeleccionada",
          JSON.stringify(empresaSeleccionada)
        );
        localStorage.setItem("identificacion", JSON.stringify(identificacion));

        const { notificaciones } = consulta;
        $resultados.appendChild(crearSeccionResultados(notificaciones));
      }
    }
    formulario.reset();
  };

  // Función para verificar localStorage y llamar automáticamente a mostrarResultados si existen datos
  const verificarLocalStorageYConsultar = () => {
    const tipoConsultaStored = localStorage.getItem("tipoConsulta");
    const empresaSeleccionadaStored = localStorage.getItem(
      "empresaSeleccionada"
    );
    const identificacionStored = localStorage.getItem("identificacion");

    // Si los datos existen en localStorage, los asignamos a las variables y mostramos resultados
    if (
      tipoConsultaStored &&
      empresaSeleccionadaStored &&
      identificacionStored
    ) {
      tipoConsulta = JSON.parse(tipoConsultaStored);
      empresaSeleccionada = JSON.parse(empresaSeleccionadaStored);
      identificacion = JSON.parse(identificacionStored);
      mostrarResultados();
    }
  };

  // Verificar localStorage al cargar la página
  verificarLocalStorageYConsultar();

  // Evento para el botón de consulta
  $btnConsultar.addEventListener("click", (e) => {
    e.preventDefault();
    identificacion = $identificacion.value;
    tipoConsulta = $tipoConsulta.value;
    empresaSeleccionada = $empresa.value;
    existeAlerta = $(".alerta");

    if (validarCampos(identificacion, empresaSeleccionada, tipoConsulta)) {
      mostrarResultados();
    } else {
      if (!existeAlerta) {
        $body.appendChild(crearAlerta("Todos los campos son obligatorios."));
        setTimeout(() => {
          $body.querySelector(".alerta").remove();
        }, 3000);
      }
    }
  });
});
