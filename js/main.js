const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById(
  "alertValidacionesTexto"
);
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("PrecioTotal");

let cont = 0;
let totalEnProductos = 0;
let costoTotal = 0;

let datos = new Array();

function validarCantidad() {
  if (txtNumber.value.length == 0) {
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

function getPrecio() {
  return Math.random(Math.random() * 10000) / 100;
} // getPrecio

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();

  let isValid = true;
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
    isValid = false;
  } //<3

  if (!validarCantidad()) {
    txtNumber.style.border = "thin red solid";
    alertValidacionesTexto.innerHTML +=
      "<strong>La cantidad no es correcta</strong><br/>";
    alertValidaciones.style.display = "block";
    isValid = false;
  } //! validar cantidad

  if (isValid) {
    cont++;
    let precio = getPrecio();
    let row = `<tr>
                  <td>${cont}</td>
                  <td>${txtName.value}</td>
                  <td>${txtNumber.value}</td>
                  <td>${precio}</td>
             </tr>
    `;

    let elemento = {
      cont: cont,
      nombre: txtName.value,
      cantidad: txtNumber.value,
      precio: precio,
    };

    datos.push(elemento);
    localStorage.setItem("datos", JSON.stringify(datos));
    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    contadorProductos.innerText = cont;
    totalEnProductos += Number(txtNumber.value);
    productosTotal.innerText = totalEnProductos;
    costoTotal += precio * Number(txtNumber.value);
    precioTotal.innerText = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(costoTotal);

    let resumen = {
      cont: cont,
      totalEnProductos: totalEnProductos,
      costoTotal: costoTotal.toFixed(2),
    };

    localStorage.setItem("resumen", JSON.stringify(resumen));

    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();
    //agregar los elementos a la tabla
  } //isValid
}); //btnAgregar
