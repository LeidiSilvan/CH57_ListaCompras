const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById(
  "alertValidacionesTexto"
);

function validarCantidad() {
  if (txtNumber.value.length === 0) {
    return false;
  } // Tenga informacion

  if (isNaN(txtNumber.value)) {
    return false;
  } // Tiene que tener un numero

  if (Number(txtNumber.value) <= 0) {
    return false;
  } //Mayor que 0
  return true;
} //validarCantidad

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();

  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  txtName.style.border = "";
  txtNumber.style.border = "";

  //1.Name
  // validar que tenga minimo 3 letras
  if (txtName.value.length < 3) {
    txtName.style.border = "thin red solid";
    alertValidacionesTexto.innerHTML =
      "<strong>El nombre del producto no es correcto</strong><br/>";
    alertValidaciones.style.display = "block";
  } //<3

  if (!validarCantidad()) {
    txtNumber.style.border = "thin red solid";
    alertValidacionesTexto.innerHTML +=
      "<strong>La cantidad no es correcta</strong><br/>";
    alertValidaciones.style.display = "block";
  } //! validar cantidad
}); //btnAgregar
