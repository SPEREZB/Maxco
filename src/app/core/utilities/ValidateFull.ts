import alertas from "./Alert";

export const validateForm = (form:any) =>
{
  for (const control in form.form.controls) {
    const currentControl = form.form.controls[control];
    
    // Si el control es inválido o está vacío (''), retornamos false
    if (!currentControl.valid || currentControl.value === '') {
      alertas("Ups", "Por favor, complete todos los campos requeridos", "warning"); 
      return false;
    }
  } 
  return true;
}