
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  template: `
    <div class="relative flex min-h-screen flex-col overflow-x-hidden bg-background-dark text-white selection:bg-primary/30">
      <app-header [transparent]="true"></app-header>
      
      <main class="flex-1 pt-20">
        <section class="relative px-6 py-12 lg:px-12">
          <div class="mx-auto max-w-[1280px]">
            <div class="group relative overflow-hidden rounded-xl bg-[#1a1f2c]">
              <div class="min-h-[70vh] w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" data-alt="Modern high-resolution abstract giclee art print" style='background-image: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(16,22,34,0.9)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJuf6z5alcxX8Lb8K7-HZc7_Kw0JzNQnt90kERcewEjKlvArFaD_hwjEZij7uqGrJRYKuenKLcZYimyHPNcNxIzU9q4S8VzfP-ZMVh2Tc01OAk5PrtJXPCkMQblK4ahjna0U_Mx9jFTJKiiFqAg29aIKH4p_tUyCuYx-aRXiOGJE2Ar83xCwB2Tn4ebFSRg4N1c0elzZWAOt1KflRiuzn3AeSUzUYUalisUN5bD0JwqhBolsVK-L1lcRRBYgMByQdLh6vNN4LwkPx_");'>
              </div>
              <div class="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <span class="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-primary">Excelencia Curada</span>
                <h1 class="max-w-4xl text-5xl font-light leading-tight tracking-tight lg:text-7xl">
                    Impresiones <span class="italic">Giclée</span> de Calidad de Museo
                </h1>
                <p class="mt-6 max-w-xl text-lg text-white/60">
                    Sumérgete en el arte y el diseño de alta definición. Curaduría experta para el coleccionista moderno.
                </p>
                <div class="mt-10 flex gap-4">
                  <button routerLink="/catalog" class="rounded-lg bg-primary px-10 py-4 text-sm font-bold tracking-widest uppercase transition hover:bg-primary/80">
                        Explorar Galería
                  </button>
                  <button routerLink="/catalog" [queryParams]="{filter: 'trending'}" class="rounded-lg border border-white/20 bg-white/5 px-10 py-4 text-sm font-bold tracking-widest uppercase backdrop-blur-md transition hover:bg-white/10">
                        Ver Tendencias
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="py-20 border-t border-white/5">
          <div class="mx-auto max-w-[1280px] px-6 lg:px-12">
            <div class="flex items-end justify-between mb-12">
              <div>
                <h2 class="text-3xl font-light tracking-tight">Best Sellers</h2>
                <p class="mt-2 text-white/40">Las piezas más codiciadas de la temporada</p>
              </div>
              <a routerLink="/catalog" [queryParams]="{filter: 'trending'}" class="group hidden md:flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-primary transition hover:text-white">
                    Ver Todo
                    <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
            </div>
            <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              <!-- Item 1 -->
              <div class="group cursor-pointer" routerLink="/product/1">
                <div class="relative aspect-[4/5] overflow-hidden rounded-lg bg-white/5 mb-4">
                  <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_C4EvZgak1TKlRbcnN3R7Ju5Xe8lE-g-JXIqti1iHp75GBjkm3WnY5PAkVYI4KV3ZvjOi7k02E_fAAc4MdfaBL_54kGbtLlJozhi4zwtPZCNzPm2SPvaso_QUh-Ah2MJEv-MplG6nnClod6KHTkzireCI0tD5fkorxcxnQXE3SkWdSWjteGqoyFjupI2I5EN6fAZnD-989FTzSE1DQ73T98qlwG9AY5pyE_WBsj09PRX9ptp1phF211IvaE-F5czCus_teQtbpb09");'></div>
                  <div class="absolute top-3 right-3 rounded-full px-2 py-1 text-[10px] font-bold uppercase backdrop-blur-md text-terracotta bg-black/40">Agotado</div>
                </div>
                <h3 class="text-sm font-bold uppercase tracking-widest text-white">Ecos Silenciosos</h3>
                <p class="text-xs text-white/50 mt-1">Serie Limitada</p>
                <p class="mt-2 font-medium text-terracotta">$1,850</p>
              </div>
              <!-- Item 2 -->
              <div class="group cursor-pointer" routerLink="/product/2">
                <div class="relative aspect-[4/5] overflow-hidden rounded-lg bg-white/5 mb-4">
                  <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA-_hFYMJHF9ctv3PYngDDJIXrI2T7cxaBNt5427AtntGa8BJ788rPmkOErKaP_xuW3n3ZtUmVtLEr3vjxfFEOQYBSohe0Ki3PLkceM0Ymt0iYHanX3Xh0BtATHOmDQrO2qdOs86o0QEHNbU7RKWMNsw4oKhHm66naS27xempfzpDok6x7aSjOYZd92CA_S_2rNJRAyzeFerdS17Z2_p30D4C5Eb3NvwZyLFUne6kfRGRXIETWMCwYJ5ehp7tl7UbFt4GEo82KVWrxl");'></div>
                </div>
                <h3 class="text-sm font-bold uppercase tracking-widest text-white">Fluidez Azul</h3>
                <p class="text-xs text-white/50 mt-1">Giclée sobre Algodón</p>
                <p class="mt-2 font-medium text-white">$2,100</p>
              </div>
              <!-- Item 3 -->
              <div class="group cursor-pointer" routerLink="/product/3">
                <div class="relative aspect-[4/5] overflow-hidden rounded-lg bg-white/5 mb-4">
                  <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxkXT3fae2i2P9wOsXIxqpc55cYAe7qscOQE4dJ9AvwrLj9-4dhzfRR5eY1fCiSMfw6AB5NWeiCySKFi498KjQrdSvZFYfrzq87J7xRXaJNdGgZyc6ic4EbJRv_fd7gnjX2AU5xeBuGitdfMedAxBBPbtXnw6XMIZsyEBXpTYfcFcfZaEYfxFpHfRyRhkXViRJHah-5nX7yTmnyXo-pz0wQ9uB-viwFRIT6NX9mJt3rZGkmYXinCBKuiZzKT3sTGje0-iopQ_zMzUY");'></div>
                </div>
                <h3 class="text-sm font-bold uppercase tracking-widest text-white">Estructura Nula</h3>
                <p class="text-xs text-white/50 mt-1">Edición Abierta</p>
                <p class="mt-2 font-medium text-white">$950</p>
              </div>
               <!-- Item 4 -->
              <div class="group cursor-pointer" routerLink="/product/4">
                <div class="relative aspect-[4/5] overflow-hidden rounded-lg bg-white/5 mb-4">
                  <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJuf6z5alcxX8Lb8K7-HZc7_Kw0JzNQnt90kERcewEjKlvArFaD_hwjEZij7uqGrJRYKuenKLcZYimyHPNcNxIzU9q4S8VzfP-ZMVh2Tc01OAk5PrtJXPCkMQblK4ahjna0U_Mx9jFTJKiiFqAg29aIKH4p_tUyCuYx-aRXiOGJE2Ar83xCwB2Tn4ebFSRg4N1c0elzZWAOt1KflRiuzn3AeSUzUYUalisUN5bD0JwqhBolsVK-L1lcRRBYgMByQdLh6vNN4LwkPx_");'></div>
                </div>
                <h3 class="text-sm font-bold uppercase tracking-widest text-white">Vapor Urbano</h3>
                <p class="text-xs text-white/50 mt-1">Lienzo Curado</p>
                <p class="mt-2 font-medium text-white">$1,450</p>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-[#0c101a] py-32">
          <div class="mx-auto max-w-[1280px] px-6 lg:px-12">
            <div class="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
              <div class="max-w-2xl">
                <span class="text-xs font-bold uppercase tracking-[0.3em] text-terracotta">Pronóstico 2026</span>
                <h2 class="mt-4 text-4xl font-light tracking-tight lg:text-5xl">Convergencia Biofílica</h2>
                <p class="mt-4 text-white/50">Una síntesis de patrones de crecimiento orgánico y formas arquitectónicas rígidas. Presentando tonos tierra Terracota profundos y acentos Azul Cobalto impactantes.</p>
              </div>
              <a class="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-primary" href="#">
                    Descubre la tendencia
                    <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
            </div>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
               <!-- Trend 1 -->
              <div class="group relative aspect-[3/4] overflow-hidden rounded-xl bg-white/5">
                <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Abstract biophilic art piece with terracotta tones" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_C4EvZgak1TKlRbcnN3R7Ju5Xe8lE-g-JXIqti1iHp75GBjkm3WnY5PAkVYI4KV3ZvjOi7k02E_fAAc4MdfaBL_54kGbtLlJozhi4zwtPZCNzPm2SPvaso_QUh-Ah2MJEv-MplG6nnClod6KHTkzireCI0tD5fkorxcxnQXE3SkWdSWjteGqoyFjupI2I5EN6fAZnD-989FTzSE1DQ73T98qlwG9AY5pyE_WBsj09PRX9ptp1phF211IvaE-F5czCus_teQtbpb09");'></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div class="absolute bottom-0 left-0 p-8 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 class="text-xl font-medium tracking-tight">Musgo Ocular</h3>
                  <p class="text-sm text-white/60">Giclée sobre Lienzo de Archivo</p>
                  <p class="mt-4 font-bold text-terracotta">$1,250</p>
                </div>
              </div>
              <!-- Trend 2 -->
              <div class="group relative aspect-[3/4] overflow-hidden rounded-xl bg-white/5 border-2 border-cobalt/20">
                <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Abstract blue and gold liquid art" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA-_hFYMJHF9ctv3PYngDDJIXrI2T7cxaBNt5427AtntGa8BJ788rPmkOErKaP_xuW3n3ZtUmVtLEr3vjxfFEOQYBSohe0Ki3PLkceM0Ymt0iYHanX3Xh0BtATHOmDQrO2qdOs86o0QEHNbU7RKWMNsw4oKhHm66naS27xempfzpDok6x7aSjOYZd92CA_S_2rNJRAyzeFerdS17Z2_p30D4C5Eb3NvwZyLFUne6kfRGRXIETWMCwYJ5ehp7tl7UbFt4GEo82KVWrxl");'></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div class="absolute bottom-0 left-0 p-8 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 class="text-xl font-medium tracking-tight">Horizonte Cobalto</h3>
                  <p class="text-sm text-white/60">Serie de Edición Limitada</p>
                  <p class="mt-4 font-bold text-cobalt">$2,800</p>
                </div>
              </div>
              <!-- Trend 3 -->
              <div class="group relative aspect-[3/4] overflow-hidden rounded-xl bg-white/5">
                <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Minimalist architectural nature photography" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxkXT3fae2i2P9wOsXIxqpc55cYAe7qscOQE4dJ9AvwrLj9-4dhzfRR5eY1fCiSMfw6AB5NWeiCySKFi498KjQrdSvZFYfrzq87J7xRXaJNdGgZyc6ic4EbJRv_fd7gnjX2AU5xeBuGitdfMedAxBBPbtXnw6XMIZsyEBXpTYfcFcfZaEYfxFpHfRyRhkXViRJHah-5nX7yTmnyXo-pz0wQ9uB-viwFRIT6NX9mJt3rZGkmYXinCBKuiZzKT3sTGje0-iopQ_zMzUY");'></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div class="absolute bottom-0 left-0 p-8 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 class="text-xl font-medium tracking-tight">Raíz Geométrica</h3>
                  <p class="text-sm text-white/60">Enmarcado a Medida</p>
                  <p class="mt-4 font-bold text-primary">$1,600</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="py-24 bg-[#0e121b] border-t border-white/5">
            <div class="mx-auto max-w-[1280px] px-6 lg:px-12">
                <h2 class="text-3xl font-light tracking-tight text-center mb-16">Colecciones Disponibles</h2>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <a class="group relative aspect-[3/2] lg:aspect-[3/4] overflow-hidden rounded-xl bg-white/5" routerLink="/catalog">
                        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA-_hFYMJHF9ctv3PYngDDJIXrI2T7cxaBNt5427AtntGa8BJ788rPmkOErKaP_xuW3n3ZtUmVtLEr3vjxfFEOQYBSohe0Ki3PLkceM0Ymt0iYHanX3Xh0BtATHOmDQrO2qdOs86o0QEHNbU7RKWMNsw4oKhHm66naS27xempfzpDok6x7aSjOYZd92CA_S_2rNJRAyzeFerdS17Z2_p30D4C5Eb3NvwZyLFUne6kfRGRXIETWMCwYJ5ehp7tl7UbFt4GEo82KVWrxl");'></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        <div class="absolute bottom-8 left-8">
                            <h3 class="text-xl font-bold uppercase tracking-widest text-white mb-2">Abstracción Moderna</h3>
                            <span class="text-xs text-primary font-medium tracking-widest uppercase opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Explorar Colección</span>
                        </div>
                    </a>
                    <a class="group relative aspect-[3/2] lg:aspect-[3/4] overflow-hidden rounded-xl bg-white/5" routerLink="/catalog">
                        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_C4EvZgak1TKlRbcnN3R7Ju5Xe8lE-g-JXIqti1iHp75GBjkm3WnY5PAkVYI4KV3ZvjOi7k02E_fAAc4MdfaBL_54kGbtLlJozhi4zwtPZCNzPm2SPvaso_QUh-Ah2MJEv-MplG6nnClod6KHTkzireCI0tD5fkorxcxnQXE3SkWdSWjteGqoyFjupI2I5EN6fAZnD-989FTzSE1DQ73T98qlwG9AY5pyE_WBsj09PRX9ptp1phF211IvaE-F5czCus_teQtbpb09");'></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        <div class="absolute bottom-8 left-8">
                            <h3 class="text-xl font-bold uppercase tracking-widest text-white mb-2">Naturaleza Orgánica</h3>
                            <span class="text-xs text-primary font-medium tracking-widest uppercase opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Explorar Colección</span>
                        </div>
                    </a>
                    <a class="group relative aspect-[3/2] lg:aspect-[3/4] overflow-hidden rounded-xl bg-white/5" routerLink="/catalog">
                        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxkXT3fae2i2P9wOsXIxqpc55cYAe7qscOQE4dJ9AvwrLj9-4dhzfRR5eY1fCiSMfw6AB5NWeiCySKFi498KjQrdSvZFYfrzq87J7xRXaJNdGgZyc6ic4EbJRv_fd7gnjX2AU5xeBuGitdfMedAxBBPbtXnw6XMIZsyEBXpTYfcFcfZaEYfxFpHfRyRhkXViRJHah-5nX7yTmnyXo-pz0wQ9uB-viwFRIT6NX9mJt3rZGkmYXinCBKuiZzKT3sTGje0-iopQ_zMzUY");'></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        <div class="absolute bottom-8 left-8">
                            <h3 class="text-xl font-bold uppercase tracking-widest text-white mb-2">Minimalismo</h3>
                            <span class="text-xs text-primary font-medium tracking-widest uppercase opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Explorar Colección</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <app-footer></app-footer>
      </main>
    </div>
  `
})
export class HomeComponent {}
