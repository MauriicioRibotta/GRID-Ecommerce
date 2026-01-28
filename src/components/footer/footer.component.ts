
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="mt-auto border-t border-slate-200 dark:border-slate-800 py-16 bg-background-light dark:bg-background-dark">
      <div class="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 text-black dark:text-white">
              <div class="size-6 text-primary">
                <svg fill="currentColor" viewBox="0 0 48 48">
                  <path clip-rule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill-rule="evenodd"></path>
                </svg>
              </div>
              <h2 class="text-xl font-bold tracking-widest">GRID</h2>
            </div>
            <p class="mt-6 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-white/40">
              El principal destino digital para impresiones Giclée de calidad de museo y curaduría de arte a medida. Redefiniendo los límites de la experiencia de galería digital.
            </p>
          </div>
          <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Navegación</h4>
            <ul class="mt-6 space-y-4 text-sm text-slate-500 dark:text-white/40">
              <li><a class="hover:text-primary transition" routerLink="/catalog">La Galería</a></li>
              <li><a class="hover:text-primary transition" routerLink="/catalog" [queryParams]="{filter: 'trending'}">Tendencias</a></li>
              <li><a class="hover:text-primary transition" routerLink="/designer">Diseñador</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Contacto</h4>
            <ul class="mt-6 space-y-4 text-sm text-slate-500 dark:text-white/40">
              <li class="flex items-center gap-2 group">
                <span class="material-symbols-outlined text-[18px] group-hover:text-primary transition-colors">mail</span>
                <a class="hover:text-primary transition" href="mailto:hello@grid.art">hello@grid.art</a>
              </li>
            </ul>
            <div class="mt-8">
              <h4 class="text-xs font-bold uppercase tracking-widest text-black dark:text-white mb-6">Síguenos</h4>
              <div class="flex gap-4">
                <a href="#" class="size-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-slate-500 dark:text-white/40 group">
                  <span class="font-bold text-[10px] tracking-tighter">IG</span>
                </a>
                <a href="#" class="size-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-slate-500 dark:text-white/40 group">
                  <span class="font-bold text-[10px] tracking-tighter">TW</span>
                </a>
                <a href="#" class="size-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-slate-500 dark:text-white/40 group">
                  <span class="font-bold text-[10px] tracking-tighter">LI</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-200 dark:border-white/5 pt-8 text-xs text-slate-500 dark:text-white/30 lg:flex-row">
          <p>© 2024 GRID Curated Art. Todos los derechos reservados.</p>
          <div class="flex flex-wrap justify-center gap-8">
            <a class="hover:text-primary transition" href="#">Política de Privacidad</a>
            <a class="hover:text-primary transition" href="#">Términos de Servicio</a>
            <a class="hover:text-primary transition" href="#">Configuración de Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
