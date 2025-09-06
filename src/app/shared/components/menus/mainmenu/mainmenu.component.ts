import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/core/services/theme/theme.service';
import { LocalstorageService } from 'src/app/core/services/localstorage/localstorage.service';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {
  rol = this.localStorageService.getItem("rol");
  isMenuOpen = false;
  isMobile=false;
  isAdmin = false;

  constructor(private router: Router, private localStorageService:LocalstorageService, public themeService: ThemeService, private loginService:LoginService) {}

  isDarkMode: boolean = false; 

  ngOnInit(): void {
 
    this.isDarkMode= this.themeService.getThemeMode(); 
    this.checkScreenSize();
    this.verifyUserType();
  } 

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; 
    if(this.isMobile==true)
    {
    this.router.navigate(['/menu_movil']); 

    }
  }
  
  verifyUserType()
  {
     if(this.localStorageService.getItem("user_type")=="Admin")
        this.isAdmin= true;
      else this.isAdmin=false;
  }

  toggleTheme(): void {
    this.themeService.setDarkMode(!this.themeService.isDarkMode); 
    this.isDarkMode= this.themeService.getThemeMode(); 

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @Output() logout = new EventEmitter<void>();
 
 
  onLogout() {
    this.loginService.logout();
  }
}
