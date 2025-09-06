// import { Pipe, PipeTransform } from '@angular/core';
// import nspell from 'nspell';
// import dictionaryEs from 'dictionary-es'; // Asegúrate de importar el diccionario correctamente

// @Pipe({
//   name: 'applyTildes'
// })
// export class ApplyTildesPipe implements PipeTransform {

//   private spellChecker: any;

//   constructor() {
//     const affBuffer = Buffer.from(dictionaryEs.aff);
//     const dicBuffer = Buffer.from(dictionaryEs.dic);

//     // Cargamos el diccionario usando nspell con los buffers
//     this.spellChecker = nspell(affBuffer, dicBuffer);
//   }

//   transform(value: string): string {
//     if (!this.spellChecker || !value) return value;

//     // Corregir las palabras con tildes usando el diccionario
//     return value.split(' ').map(word => {
//       if (!this.spellChecker.correct(word)) {
//         // Si la palabra no está correcta, la corregimos
//         return this.spellChecker.suggest(word)[0] || word;
//       }
//       return word;
//     }).join(' ');
//   }
// }
