const form = document.querySelector('.contenedor-registro form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    // Seleccionar los campos de entrada
    const nombreInput = document.querySelector('#nombre');
    const apellidoInput = document.querySelector('#apellido');
    const correoInput = document.querySelector('#correo');
    const passworkInput = document.querySelector('#passwork');
    const sexoInput = document.querySelector('#sexo');

    // Validar los campos de entrada
    if (nombreInput.value === '') {
        alert('Por favor ingrese su nombre');
        return;
    }
    if (apellidoInput.value === '') {
        alert('Por favor ingrese su apellido');
        return;
    }
    if (correoInput.value === '') {
        alert('Por favor ingrese su correo electrónico');
        return;
    }
    if (passworkInput.value === '') {
        alert('Por favor ingrese su contraseña');
        return;
    }
    if (!sexoInput.checked) {
        alert('Por favor seleccione su sexo');
        return;
    }

    // Si todos los campos son válidos, se envía el formulario
    console.log('Formulario validado exitosamente!');
    form.submit();
});