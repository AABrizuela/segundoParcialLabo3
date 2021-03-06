"use strict";
var App;
(function (App) {
    window.onload = loadEvents;
    var miVariableFantasma;
    var arrayVehiculos = new Array();
    function loadEvents() {
        get("buttonDiv").addEventListener("click", abrir);
        get("buttonClose").addEventListener("click", cerrar);
        get('buttonSave').addEventListener("click", agregar);
        get('inputAuto').addEventListener("change", abrir);
        get('inputCamioneta').addEventListener("change", abrir);
        get('inputBusqueda').addEventListener("keyup", filter);
        get('inputBusqueda').value = "";
    }
    function abrir() {
        var $fieldSet = get("fieldset");
        var $tipoVehiculoCamioneta = get("inputCamioneta").checked;
        if ($tipoVehiculoCamioneta == true) {
            mostrarCampo(false, "div4x4");
            mostrarCampo(true, "divPuertas");
        }
        else {
            mostrarCampo(false, "divPuertas");
            mostrarCampo(true, "div4x4");
        }
        $fieldSet.hidden = false;
    }
    App.abrir = abrir;
    function cerrar() {
        var $fieldSet = get("fieldset");
        var $button = get("addButton");
        $fieldSet.hidden = true;
    }
    function get(id) {
        var retorno = document.getElementById(id);
        return retorno;
    }
    function reset() {
        get('inputMarca').value = "";
        get('inputModelo').value = "";
        get('inputPrecio').value = "";
        get('inputAuto').checked = true;
        get('inputPuertas').value = "";
        // get('buttonSave').classMarca = "buttonSave";
        // get('buttonSave').disabled = false;
        // get('buttonEdit').classMarca = "buttonDisabled";
        // get('buttonEdit').disabled = true;
        // get('buttonDelete').classMarca = "buttonDisabled";
        // get('buttonDelete').disabled = true;
    }
    /**
     * Funcion para agregar datos a la celda (td) de una fila (tr)
     * devuelve la celda con datos
     *
     * @param {data que se va a usar para agregar a la celda} data
     */
    function generateTd(data) {
        //creo un elemento del tipo table data (celdas)
        var elementoTd = document.createElement('td');
        //creo un elemento del tipo texto
        //con la data que me llega por param
        var elementoText = document.createTextNode(data);
        //agrego el elemento de texto a la celda (td)
        elementoTd.appendChild(elementoText);
        //devuelvo el elemento td con el texto que corresponde
        return elementoTd;
    }
    function agregar() {
        var id;
        var marcaVehiculo = get('inputMarca').value;
        var modelo = get('inputModelo').value;
        var precio = get('inputPrecio').value;
        var auto = get('inputAuto').checked;
        var camioneta = get('inputCamioneta').checked;
        var cuatroXCuatro = get('input4x4').checked;
        var cantPuertas = get('inputPuertas').value;
        var objAuto;
        var objCamioneta;
        var hasError = false;
        if (arrayVehiculos.length == 0) {
            id = 1;
        }
        else {
            var arrayVehiculosAux = arrayVehiculos;
            id = arrayVehiculosAux.reduce(function (max, entidad) {
                if (entidad.id >= max) {
                    return entidad.id + 1;
                }
                return max;
            }, 0);
            if (id == 0) {
                id + 1;
            }
        }
        if (marcaVehiculo == "") {
            document.getElementById("inputMarca").className = "error";
            hasError = true;
            alert("chan");
        }
        if ((marcaVehiculo.length < 3)) {
            document.getElementById("inputMarca").className = "error";
            hasError = true;
            alert("chan");
        }
        if (modelo == "") {
            document.getElementById("inputModelo").className = "error";
            hasError = true;
            alert("chan");
        }
        if (modelo.length <= 3) {
            document.getElementById("inputModelo").className = "error";
            hasError = true;
            alert("chan");
        }
        if (hasError == true) {
            reset();
            cerrar();
            return;
        }
        else {
            if (camioneta === false) {
                objAuto = new App.Auto(id, marcaVehiculo, modelo, parseInt(precio), parseInt(cantPuertas));
                arrayVehiculos.push(objAuto);
            }
            else if (auto === false) {
                objCamioneta = new App.Camioneta(id, marcaVehiculo, modelo, parseInt(precio), cuatroXCuatro);
                arrayVehiculos.push(objCamioneta);
            }
            crearTabla(arrayVehiculos);
            cerrar();
            reset();
        }
        // if(Auto == false && Camioneta == false &&){
        //     (<HTMLElement>document.getElementById("inputMarca")).classMarca = "error";
        //     const hasError = true;
        // }        
        // (<HTMLElement>document.getElementById("inputMarca")).classList.remove('error');
        // (<HTMLElement>document.getElementById("inputDob")).classList.remove("error");
        cerrar();
        reset();
    }
    App.agregar = agregar;
    function eliminar(index) {
        arrayVehiculos.splice(index, 1);
        crearTabla(arrayVehiculos);
    }
    App.eliminar = eliminar;
    function mostrarCampo(status, id) {
        var campoAux = document.getElementById(id);
        campoAux.hidden = status;
    }
    function filter() {
        var listaFiltrada = arrayVehiculos.filter(function (Vehiculo) {
            var vehiculo = arrayVehiculos;
            var marcaFormateado = marca.charAt(0).toLowerCase() + marca.slice(1);
            return marcaFormateado.includes(get("inputBusqueda").value);
        });
        console.log(listaFiltrada);
        crearTabla(listaFiltrada);
    }
    App.filter = filter;
    function crearTabla(dataSet) {
        var tbodyObject = document.getElementById("tableBody");
        var tipoVehiculo;
        var detalle;
        while (tbodyObject.rows.length > 0) {
            tbodyObject.removeChild(tbodyObject.childNodes[0]);
        }
        dataSet.forEach(function (data) {
            //creo un elemento del tipo table row (tr)
            var elementoTr = document.createElement('tr');
            var buttonDelete = document.createElement('input');
            buttonDelete.type = 'button';
            buttonDelete.className = 'buttonDelete';
            buttonDelete.value = "Eliminar";
            buttonDelete.onclick = function () { eliminar(dataSet.indexOf(data)); };
            console.log(arrayVehiculos);
            if (data instanceof App.Auto) {
                tipoVehiculo = "Auto";
                detalle = "Cant. puertas: " + data.cantPuertas;
            }
            else if (data instanceof App.Camioneta) {
                tipoVehiculo = "Camioneta";
                if (data.cuatroXCuatro == true) {
                    detalle = "4x4: Si.";
                }
                else {
                    detalle = "4x4: No.";
                }
            }
            /*
            hago que espere un evento de doble click para que levante
            el div con el formulario
            */
            // elementoTr.addEventListener('dblclick',abrirEditDel);
            //le agrego una row al table body
            tbodyObject.appendChild(elementoTr);
            //agrego datos en la fila nueva con la funcion generateTd
            elementoTr.appendChild(generateTd(data.id));
            elementoTr.appendChild(generateTd(data.marca));
            elementoTr.appendChild(generateTd(data.modelo));
            elementoTr.appendChild(generateTd(tipoVehiculo));
            elementoTr.appendChild(generateTd(data.precio));
            elementoTr.appendChild(generateTd(detalle));
            elementoTr.appendChild(buttonDelete);
        });
    }
    function abrirEditDel() {
        get('buttonSave').className = "buttonDisabled";
        get('buttonSave').disabled = true;
        get('buttonDelete').className = "buttonDelete";
        get('buttonDelete').disabled = false;
        abrir();
        reset();
    }
    App.abrirEditDel = abrirEditDel;
})(App || (App = {}));
