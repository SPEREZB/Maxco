import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService { 
  private _isDarkMode = new BehaviorSubject<boolean>(false);

  constructor() { 
    const savedTheme = localStorage.getItem('theme'); 

    if (savedTheme === 'dark') {
      this.setDarkMode(true);
    } else {
      this.setDarkMode(false);
    }
  }

 public getThemeMode():boolean
 {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    return true;
  } else {
    document.body.classList.remove('dark');
    return false;
  }
 }
 
  get isDarkMode() {
    return this._isDarkMode.value;
  }
 
  get isDarkMode$() {
    return this._isDarkMode.asObservable();
  }
 
  setDarkMode(isDarkMode: boolean): void {
    this._isDarkMode.next(isDarkMode);
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }



  //animations
  private animationsEnabled: boolean = true;
  
  setAnimationsEnabled(enabled: boolean): void {
    this.animationsEnabled = enabled;
    this.updateAnimations();
  }

  private updateAnimations(): void {
    if (this.animationsEnabled) {
      document.body.classList.add('animations-enabled');
    } else {
      document.body.classList.remove('animations-enabled');
    }
  }

  areAnimationsEnabled(): boolean {
    return this.animationsEnabled;
  }
}
