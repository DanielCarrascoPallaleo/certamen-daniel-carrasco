//agregar entradas a localStorage
export const agregarEntrada = (entrada) => {
  const entradasExistentes = JSON.parse(localStorage.getItem('entradas_cine')) || [];
  entradasExistentes.push(entrada);
  localStorage.setItem('entradas_cine', JSON.stringify(entradasExistentes));
};

//obtener entradas de localStorage
export const obtenerEntradas = () => {
  return JSON.parse(localStorage.getItem('entradas_cine')) || [];
};
