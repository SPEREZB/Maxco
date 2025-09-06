import alertas from 'src/app/core/utilities/Alert';
 
export const validateLink =(value: string)=> { 
  // Expresión regular para verificar si es una URL válida
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  const isValid = urlRegex.test(value);
  
  if (!isValid) {
      alertas("Ups","Por favor, ingrese un enlace valido", "warning"); 
      return false;
  } 
  return true;
}
