
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  template: `
    <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased min-h-screen">
      <app-header></app-header>
      <main class="max-w-[1440px] mx-auto px-6 py-8">
        <div class="flex flex-wrap gap-2 py-4 mb-4">
          <a class="text-slate-500 text-sm font-medium hover:text-primary" href="#">Colecciones</a>
          <span class="text-slate-400 text-sm font-medium">/</span>
          <a class="text-slate-500 text-sm font-medium hover:text-primary" href="#">Giclée Contemporáneo</a>
          <span class="text-slate-400 text-sm font-medium">/</span>
          <span class="text-slate-900 dark:text-white text-sm font-bold">The Ethereal Plane</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div class="lg:col-span-8 space-y-6">
            <div class="relative group texture-magnifier rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div class="aspect-[4/5] w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end min-h-[600px] shadow-2xl" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDGWkQwty629fKxQWE3Z575YayTVHJq9JhTlTQcfNmIXGJ20Qfoq08hhOwZ5VyXRmHwUkwsXSTsbgeowU_Od9ReKCN9vUDrpPHff59MhWCrubom4E3mCgMV3MVudo0Yrz-ueEAznMhmtbexYcNKxVM1h9w7EL-V2F_xYmHQSO2-pRYPpU30PR9hsS-lRWwi_Y3W64hqiCsDBfVYpPR2Um0CSoQO9qEj3vQjTtJNqkTCXtrEFzREosH0CaX_nmylP9DJDB2mZz622Sy");'>
              </div>
              <div class="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-white">zoom_in</span>
                  <p class="text-white text-xs font-medium uppercase tracking-widest">Pase el cursor para explorar el grano Baryta 300 DPI</p>
                </div>
                <div class="flex gap-2">
                  <button class="p-2 text-white hover:bg-white/20 rounded-lg">
                    <span class="material-symbols-outlined">fullscreen</span>
                  </button>
                  <button class="p-2 text-white hover:bg-white/20 rounded-lg">
                    <span class="material-symbols-outlined">share</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div class="flex gap-6">
                <div class="flex flex-col">
                  <span class="text-[10px] uppercase text-slate-500 font-bold tracking-tighter">Tipo de Papel</span>
                  <span class="text-sm font-bold">Baryta Rag 310gsm</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] uppercase text-slate-500 font-bold tracking-tighter">Espacio de Color</span>
                  <span class="text-sm font-bold">ProPhoto RGB</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] uppercase text-slate-500 font-bold tracking-tighter">Tecnología de Impresión</span>
                  <span class="text-sm font-bold">Pigmentos Minerales</span>
                </div>
              </div>
              <button class="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                <span class="material-symbols-outlined text-[18px]">texture</span>
                    Zoom de Textura 300 DPI
              </button>
            </div>
          </div>
          <div class="lg:col-span-4 space-y-8">
            <div class="space-y-4">
              <div class="flex flex-col gap-1">
                <p class="text-primary font-bold text-sm tracking-widest uppercase">Elena Rossi</p>
                <h1 class="text-4xl md:text-5xl font-black leading-tight tracking-tight font-display">The Ethereal Plane</h1>
                <p class="text-slate-500 dark:text-slate-400 font-medium italic text-lg">Serie de Edición Limitada</p>
              </div>
              <div class="flex items-center gap-3 py-2 border-y border-slate-200 dark:border-slate-800">
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">Queda 1 de 50</span>
                <span class="text-slate-400 text-xs">|</span>
                <span class="text-slate-500 text-xs font-medium uppercase">Certificado de Autenticidad Incluido</span>
              </div>
              <div class="text-3xl font-bold font-display">1.250,00 €</div>
            </div>
            <div class="grid grid-cols-1 gap-3">
              <button routerLink="/checkout" class="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 h-14 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform">
                    Añadir a la Colección
              </button>
              <button routerLink="/designer" class="w-full flex items-center justify-center gap-3 border-2 border-primary text-primary h-14 rounded-xl font-bold text-lg hover:bg-primary hover:text-white transition-all">
                <span class="material-symbols-outlined">view_in_ar</span>
                    Ver en mi Espacio
              </button>
            </div>
            <div class="space-y-4 pt-4">
              <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Especificaciones Técnicas</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                  <span class="material-symbols-outlined text-primary">verified_user</span>
                  <p class="font-bold text-sm">Grado de Museo</p>
                  <p class="text-[11px] text-slate-500 leading-relaxed">Libre de ácido, base 100% algodón para una longevidad extrema.</p>
                </div>
                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                  <span class="material-symbols-outlined text-primary">history</span>
                  <p class="font-bold text-sm">85+ Años de Resistencia</p>
                  <p class="text-[11px] text-slate-500 leading-relaxed">Resistencia a la luz certificada contra el desvanecimiento ambiental.</p>
                </div>
                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                  <span class="material-symbols-outlined text-primary">ink_highlighter</span>
                  <p class="font-bold text-sm">Pigmentos Minerales</p>
                  <p class="text-[11px] text-slate-500 leading-relaxed">Gama de colores ultra amplia con tecnología Lucia PRO de 12 tintas.</p>
                </div>
                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                  <span class="material-symbols-outlined text-primary">frame_inspect</span>
                  <p class="font-bold text-sm">Corte de Precisión</p>
                  <p class="text-[11px] text-slate-500 leading-relaxed">Opciones de bordes rasgados disponibles para montaje flotante.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section class="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
            <div class="max-w-2xl space-y-2">
              <div class="flex items-center gap-2 text-primary">
                <span class="material-symbols-outlined text-[20px]">psychology</span>
                <span class="text-xs font-bold uppercase tracking-widest">Inteligencia GRID</span>
              </div>
              <h2 class="text-3xl font-bold font-display">Curado para tu Espacio</h2>
              <p class="text-slate-500 dark:text-slate-400">Nuestra IA analiza la iluminación y la paleta cromática de tu habitación para sugerir piezas que armonicen con tu entorno.</p>
            </div>
            <div class="flex gap-4">
              <div class="group relative cursor-pointer flex flex-col items-center justify-center w-40 h-24 border-2 border-dashed border-primary/40 rounded-xl hover:border-primary transition-colors bg-primary/5">
                <span class="material-symbols-outlined text-primary text-[24px]">add_photo_alternate</span>
                <span class="text-[10px] font-bold mt-2 uppercase">Subir Habitación</span>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <!-- Item 1 -->
            <div class="group cursor-pointer">
              <div class="aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 relative mb-4">
                <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <button class="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm shadow-xl">Vista Rápida</button>
                </div>
                <div class="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4BKvpFblAcIv15Pua35krt9YVUNcFH-9zW_T88DkPVTftBctN0PKKvr3S60FBivFxy5fblAzI1s2TtjCGodugesdxXwn86hoJg6fx7u638qouE9MC-waGjO1s9GycJlsbxstL9YRVAvktaYYBvp5VJ-bVid-d9GfoitnfyDB4VY-FqY6Rc1EeVYNgh07ydokkN5C8YJGWBJW4FDzm_1AAh8BIevCCkcXzWxV721QT6tFD7c15_U14u_L6dTto9NbOAAkt6fFJhIQ-");'></div>
              </div>
              <div class="space-y-1">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-sm">Deep Horizon</h4>
                  <span class="text-[11px] font-bold text-primary">98% de Coincidencia</span>
                </div>
                <p class="text-xs text-slate-500">Klaus Weber</p>
                <p class="text-sm font-bold mt-2">850,00 €</p>
              </div>
            </div>
            <!-- Item 2 -->
            <div class="group cursor-pointer">
              <div class="aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 relative mb-4">
                 <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <button class="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm shadow-xl">Vista Rápida</button>
                </div>
                <div class="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJRs3iOHdePz9qtRNYvUVSzu_5M_EnOxVD44nt9vq2mz37XKMld6850Yy0kb6Z4cCZiQcD37HCshnFT0DloTgoCHoWh98cVeGQinQiRX4mgpb5w02KQQvrs3T2_a9VE3CvEF5ldcKojHoWaz_A8SFiPiueoPLfrdkz0EdHAsdlU5bdaYNtDMo6KxyD9lD-X8EXZo_YQUvofdGSWP8jfxHUBQBB1qBi94_6Kwy8OaHY6V1L2Kc5ysWeyP3v6_IYDf6Lh_uLbvt-0vcG");'></div>
              </div>
              <div class="space-y-1">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-sm">Structure 04</h4>
                  <span class="text-[11px] font-bold text-primary">92% de Coincidencia</span>
                </div>
                <p class="text-xs text-slate-500">Marcus Thorne</p>
                <p class="text-sm font-bold mt-2">920,00 €</p>
              </div>
            </div>
             <!-- Item 3 -->
            <div class="group cursor-pointer">
              <div class="aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 relative mb-4">
                 <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <button class="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm shadow-xl">Vista Rápida</button>
                </div>
                <div class="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCcSZuZME3ogVbQNqqublULSJ5DAfUJBgROqVC5H1lBUHOCOlqrH33KaENPcSW9uzJg4Wzk6HuZmaFh8raIjjAh46VWM-jVuS5Kndkuq-9Y77X9RgRDHPxnTiyC-VH9VU9_BsIcGwT3Lp0jCm1iNZEmP2oJqhpfFptmF9f5-mLeMIYIAH6tzPlRXP1lDY82n_0P4UAmf-1d2CXtBW8PjgEn_3m--ybmpTMxLd5_dO57QGFN6jbDvP5_GptWL4BJJVRjdDvHXLIctGXx");'></div>
              </div>
              <div class="space-y-1">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-sm">Misty Peak</h4>
                  <span class="text-[11px] font-bold text-primary">87% de Coincidencia</span>
                </div>
                <p class="text-xs text-slate-500">Elena Rossi</p>
                <p class="text-sm font-bold mt-2">1.100,00 €</p>
              </div>
            </div>
             <!-- Item 4 -->
            <div class="group cursor-pointer">
              <div class="aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 relative mb-4">
                 <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <button class="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm shadow-xl">Vista Rápida</button>
                </div>
                <div class="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBOKNzD1sxE68YBqkQVy8tTGXS4EUsaSZ7gtwRTdfZjXR-7MhbujEqufWNr7s8nqj3pXCMhdUZH1Bw18m7HQMZVkp14e8zOAABts-YS8CFBQDqZE5gNswYvvfaTuyLNtwffxHrHAVWT-_3m797vgL0HhcE5Bj1WUUTZbVhikfrArd3W0wS7sw4NW2BhDvRd1tOoYSqLSlFpAQtpyjiKgFjMNjErXNiS4DOwNAI40wEDHEmmVzeB9MeMcAhjkVrHPjVA1_9oxCuaUYB5");'></div>
              </div>
              <div class="space-y-1">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-sm">Quiet Waters</h4>
                  <span class="text-[11px] font-bold text-primary">85% de Coincidencia</span>
                </div>
                <p class="text-xs text-slate-500">Sarah Jenkins</p>
                <p class="text-sm font-bold mt-2">750,00 €</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <app-footer></app-footer>
    </div>
  `
})
export class ProductComponent {}
