//-Escribe un programa que calcule el coste total de un viaje,incluyendo los gastos de alojamientio,y entretenimiento.
 //   -Solicita al usuario que ingrese los gastos estimados para cada categoria.
  //  -calcula el coste total sumando todos los gastos.
  //  -Muestra el coste total al usuario(alert o consola).
  //  -Ejemplo de entrada:Gastos de alojamiento:200€,Gastos de alimentacion:150€,Gastos de entretenimiento:100€.
  //  -Salida esperada: El coste total del viaje es 450€ -->



//  -Solicita al usuario que ingrese los gastos estimados para cada categoria.
const alojamiento = parseFloat(prompt("Gastos de alojamiento: "));
const alimentacion = parseFloat(prompt("Gastos de alimentación: "));
const entretenimiento = parseFloat(prompt("Gastos de entretenimiento: "));

// -calcula el coste total sumando todos los gastos.
const costeTotal = alojamiento + alimentacion + entretenimiento;

// Mostrar coste total al usuario
alert(`El coste total del viaje es ${costeTotal}€`);