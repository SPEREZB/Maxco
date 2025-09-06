// src/app/shared/pipes/validate-url.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import alertas from 'src/app/core/utilities/Alert';
 

@Pipe({
  name: 'validateUrl'
})
export class ValidateUrlPipe implements PipeTransform {

  transform(value: string): boolean {
    if (!value) return false;

    // Expresión regular para verificar si es una URL válida
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    const isValid = urlRegex.test(value);
    
    if (!isValid) {
        alertas("Ups","Por favor, ingrese un enlace valido", "warning"); // Imprimir en la consola si no es válido
    }

    return isValid; 
  }
}
