
import { Component, input, signal, effect, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="flex items-center justify-between whitespace-nowrap px-6 md:px-10 py-4 sticky top-0 z-50 transition-all duration-300"
      [class.bg-background-dark/90]="transparent()"
      [class.backdrop-blur-md]="transparent()"
      [class.border-b]="!transparent()"
      [class.border-white/10]="transparent()"
      [class.bg-background-light]="!transparent()"
      [class.dark:bg-background-dark/95]="!transparent()"
      [class.backdrop-blur-xl]="!transparent()"
      [class.border-solid]="!transparent()"
      [class.border-slate-200]="!transparent()"
      [class.dark:border-slate-800]="!transparent()"
      [class.fixed]="transparent()"
      [class.w-full]="transparent()">
      
      <div class="flex items-center gap-4 lg:gap-8">
        <!-- Mobile Hamburger (Moved to Left) -->
        <button (click)="toggleMenu()" class="lg:hidden flex items-center justify-center text-2xl focus:outline-none relative z-[60]"
           [class.text-black]="!transparent() && !isOpen()" 
           [class.dark:text-white]="!transparent()"
           [class.text-white]="transparent() || isOpen()">
           <span class="material-symbols-outlined">{{ isOpen() ? 'close' : 'menu' }}</span>
        </button>

        <a routerLink="/home" class="flex items-center gap-4 group relative z-50" (click)="isOpen.set(false)">
          <div class="size-6 text-primary group-hover:scale-110 transition-transform">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill-rule="evenodd"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold leading-tight tracking-[-0.015em]" 
              [class.text-white]="transparent() || isOpen()" 
              [class.text-black]="!transparent() && !isOpen()" 
              [class.dark:text-white]="!transparent()">
              GRID
          </h2>
        </a>
        
        <!-- Desktop Menu -->
        <nav class="hidden lg:flex items-center gap-9">
          <a routerLink="/catalog" routerLinkActive="!text-primary" class="text-sm font-medium leading-normal hover:text-primary transition-colors" [class.text-white/70]="transparent()" [class.text-slate-500]="!transparent()" [class.dark:text-white]="!transparent()">Galería</a>
          <a routerLink="/designer" routerLinkActive="!text-primary" class="text-sm font-medium leading-normal hover:text-primary transition-colors" [class.text-white/70]="transparent()" [class.text-slate-500]="!transparent()" [class.dark:text-white]="!transparent()">Diseñador</a>
          <a routerLink="/about" routerLinkActive="!text-primary" class="text-sm font-medium leading-normal hover:text-primary transition-colors" [class.text-white/70]="transparent()" [class.text-slate-500]="!transparent()" [class.dark:text-white]="!transparent()">Sobre GRID</a>
        </nav>
      </div>

      <div class="flex flex-1 justify-end gap-4 md:gap-6 items-center">
        <!-- Search Bar (Desktop/Tablet) -->
        @if (!transparent()) {
          <label class="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
            <div class="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div class="text-[#9da6b9] flex border-none bg-gray-200 dark:bg-[#282e39] items-center justify-center pl-4 rounded-l-lg">
                <span class="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black dark:text-white focus:outline-0 focus:ring-0 border-none bg-gray-200 dark:bg-[#282e39] focus:border-none h-full placeholder:text-[#9da6b9] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Buscar..." value=""/>
            </div>
          </label>
        } @else {
           <div class="hidden items-center border-b border-white/10 pb-1 lg:flex text-white">
              <span class="material-symbols-outlined text-sm text-white/50">search</span>
              <input class="border-none bg-transparent text-xs focus:ring-0 placeholder:text-white/30 text-white" placeholder="Buscar Artistas" type="text"/>
          </div>
        }
        
        <!-- Cart & Profile -->
        <div class="flex gap-4 items-center relative z-50">
          <button routerLink="/checkout" class="flex min-w-[40px] md:min-w-[48px] cursor-pointer items-center justify-center rounded-lg h-10 px-0 md:px-3 transition-colors relative"
            [class.bg-gray-200]="!transparent() && !isOpen()" [class.dark:bg-slate-800]="!transparent() && !isOpen()" 
            [class.text-black]="!transparent() && !isOpen()" [class.dark:text-white]="!transparent()"
            [class.text-white]="transparent() || isOpen()" 
            [class.hover:text-primary]="transparent()">
            <span class="material-symbols-outlined">shopping_bag</span>
            <span class="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">2</span>
          </button>
           <div class="size-8 rounded-full bg-cover bg-center ring-1 ring-white/20 hidden md:block" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCTQElRzJheskXbGPou0I9kQtXDsDK9Qoqx4O6TJbpmnQZZS4M7oiUJ_yXxUBhEcoQpmyRW1P94G2rNZcwG2mWAuAd9cfWnlpWpMnm3eI-OAvibPnHvYM9pHxZKlyCo9V8VlK0szUzKLG3BYXZy5KVqALN_QEs8ZJ8FDoQdYi5rYTBBsEeFY2_l675oeVoGG4o_o2geX4SfO6S8GcW1-j_BrS0_YyEoMro_kD8WlTITqYyfXueHEjFIT3dE_C1h3GP8RQnptVYCLLdV");'></div>
        </div>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div class="fixed inset-0 bg-background-dark z-40 flex flex-col pt-24 px-6 lg:hidden transition-transform duration-300 ease-in-out overflow-y-auto"
         [class.translate-x-0]="isOpen()"
         [class.translate-x-full]="!isOpen()">
      <nav class="flex flex-col gap-6 text-2xl font-light text-white pb-10">
        <a routerLink="/home" (click)="isOpen.set(false)" class="border-b border-white/10 pb-4 hover:text-primary transition-colors flex justify-between items-center">
          Inicio <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
        <a routerLink="/catalog" (click)="isOpen.set(false)" class="border-b border-white/10 pb-4 hover:text-primary transition-colors flex justify-between items-center">
          Galería <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
        <a routerLink="/designer" (click)="isOpen.set(false)" class="border-b border-white/10 pb-4 hover:text-primary transition-colors flex justify-between items-center">
          Diseñador <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
        <a routerLink="/about" (click)="isOpen.set(false)" class="border-b border-white/10 pb-4 hover:text-primary transition-colors flex justify-between items-center">
          Sobre GRID <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </nav>
      
      <div class="mt-auto mb-10 shrink-0">
        <div class="flex items-center gap-4 text-white/50 text-sm mb-6">
           <a href="#">Instagram</a>
           <a href="#">Twitter</a>
           <a href="#">LinkedIn</a>
        </div>
        <p class="text-white/30 text-xs">© 2024 GRID Curated Art.</p>
      </div>
    </div>
  `
})
export class HeaderComponent implements OnDestroy {
  transparent = input<boolean>(false);
  isOpen = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  toggleMenu() {
    this.isOpen.update(v => !v);
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }
}
