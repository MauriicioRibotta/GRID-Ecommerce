
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  template: `
    <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen flex flex-col">
      <app-header></app-header>
      
      <main class="flex flex-col min-h-screen">
        <section class="w-full max-w-[1400px] mx-auto px-6 pt-24 pb-20 lg:pt-32 lg:pb-24 flex flex-col items-center text-center">
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-black dark:text-white">
                El Arte de la <br class="hidden md:block"/> <span class="text-primary">Permanencia</span> Digital
            </h1>
            <p class="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-[#9da6b9] font-light leading-relaxed">
                GRID nace de una obsesión: materializar lo intangible. Somos el puente definitivo entre la vanguardia del arte digital y la tradición centenaria de la impresión de museo.
            </p>
            <div class="mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 text-sm font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                <button (click)="scrollTo('story')" class="px-4 py-2 border border-transparent hover:border-primary/20 hover:bg-primary/5 rounded-lg hover:text-primary transition-all focus:outline-none">Nuestra Historia</button>
                <button (click)="scrollTo('excellence')" class="px-4 py-2 border border-transparent hover:border-primary/20 hover:bg-primary/5 rounded-lg hover:text-primary transition-all focus:outline-none">Excelencia</button>
                <button (click)="scrollTo('team')" class="px-4 py-2 border border-transparent hover:border-primary/20 hover:bg-primary/5 rounded-lg hover:text-primary transition-all focus:outline-none">El Equipo</button>
            </div>
        </section>

        <section id="story" class="relative w-full min-h-[600px] overflow-hidden flex items-center justify-center py-20 scroll-mt-24">
            <div class="absolute inset-0 bg-cover bg-center bg-fixed" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBdxvM1apE-x44SiKq3_f_AnoeQl7uo2vpMqSh4c5b-z8UhL-fYGICrXDLX9KkdTu0YKLrF3cX5KNkzzGtMLqlyvtd7VknEuFoO5JSa_h0-nYczJnpc0uWmTAqDhdMHIruAWofes3OEY1mYeyEs-ynwMwEYtl29lFQLlgfBWCZDRZuoGTL0vqnhJmqFvEYgk0DjDaHXerkIRusH4QYMTednGW7vIttG1X8cPqRWPrF8ySuW4VlB_2SoNI4qcSH9H8e7eCY3SzhhIe8D');"></div>
            <div class="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            <div class="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
                <span class="inline-block px-3 py-1 mb-6 border border-white/30 rounded-full text-xs font-bold tracking-widest uppercase text-white bg-white/10 backdrop-blur-md">Nuestra Historia</span>
                <h2 class="text-3xl md:text-5xl font-bold text-white mb-10 leading-tight">
                    Desde 2021, curando <br/>lo excepcional.
                </h2>
                <div class="bg-background-dark/80 p-8 md:p-12 rounded-2xl backdrop-blur-xl border border-white/10 max-w-3xl shadow-2xl">
                    <p class="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                        Comenzamos como un colectivo experimental de artistas digitales en Barcelona. Nuestra meta era desafiar la naturaleza efímera de la pantalla. A través de años de investigación en colorimetría y soportes, desarrollamos un estándar propietario para impresiones Giclée que respeta la integridad del píxel original mientras eleva la obra a un objeto físico de deseo. Hoy, GRID colabora con más de 500 artistas globales.
                    </p>
                </div>
            </div>
        </section>

        <section id="excellence" class="w-full max-w-[1400px] mx-auto px-6 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center scroll-mt-24">
            <div class="order-2 lg:order-1">
                <div class="mb-10">
                    <h3 class="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-black dark:text-white">Excelencia <span class="text-primary">Giclée</span></h3>
                    <div class="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                <div class="space-y-8 text-lg text-gray-600 dark:text-[#9da6b9] font-light">
                    <p>
                        <strong class="text-black dark:text-white font-medium block mb-2">Más allá de la impresión.</strong>
                        No imprimimos pósters; creamos herencia. Cada pieza en GRID se produce utilizando la técnica Giclée de 12 tintas sobre papel de algodón libre de ácido de 310 gsm. Esto garantiza una profundidad de color inigualable y una durabilidad de más de 100 años sin decoloración.
                    </p>
                    <p>
                        <strong class="text-black dark:text-white font-medium block mb-2">Curaduría Inteligente.</strong>
                        Creemos en la "Curaduría Asistida". Nuestros algoritmos de IA analizan tendencias globales de diseño interior y arte emergente, pero es nuestro ojo humano experto el que selecciona la colección final. Tecnología y sensibilidad artística, en perfecto equilibrio.
                    </p>
                </div>
                <div class="mt-10 flex gap-4">
                    <div class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#1e2430] rounded-lg border border-gray-200 dark:border-[#282e39]">
                        <span class="material-symbols-outlined text-primary">verified</span>
                        <span class="text-sm font-bold text-black dark:text-white">Certificado de Autenticidad</span>
                    </div>
                    <div class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#1e2430] rounded-lg border border-gray-200 dark:border-[#282e39]">
                        <span class="material-symbols-outlined text-primary">eco</span>
                        <span class="text-sm font-bold text-black dark:text-white">Sostenible</span>
                    </div>
                </div>
            </div>
            <div class="order-1 lg:order-2 relative h-[500px] lg:h-[700px] rounded-2xl overflow-hidden bg-gray-200 dark:bg-[#1e2430] group">
                <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuArl8LbVMmqqq_BgrS84THtSWDtTid_urZRzbJlcNp1bOQbnFXrN0grVPURHhGkFDiPRgZxuEAmyyqPsgHE1rAh08R9HWg9WAkcMHama31PBaW_B0pso2fzznetnzhpvG6LeiNk7v9Yb896xhAkS0ZXoeDkDf2tcU5ZKvxE2nEK9pTydcQLoP3yKDDth4HGLXDEXpy1_nyR3dMhjISe3dPM40dU3RErsHzOYgFNraa1R3eZY1NrTeUkx4gIuFDMTpcCoi847CH-RTKv');"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                <div class="absolute bottom-8 left-8 right-8">
                    <div class="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                        <div class="flex items-start justify-between">
                            <div>
                                <p class="text-white text-lg font-bold">Flujo Vibrante</p>
                                <p class="text-white/70 text-sm mt-1">Impresión en Papel Museum Heritage 310</p>
                            </div>
                            <span class="material-symbols-outlined text-white/50">stars</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="team" class="w-full bg-gray-100 dark:bg-[#0d121c] py-24 border-t border-gray-200 dark:border-[#1e2430] scroll-mt-24">
            <div class="max-w-[1400px] mx-auto px-6">
                <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span class="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">El Equipo</span>
                        <h2 class="text-3xl md:text-5xl font-bold text-black dark:text-white">Mentes detrás de GRID</h2>
                    </div>
                    <a class="group flex items-center gap-2 text-black dark:text-white font-bold hover:text-primary transition-colors" href="#">
                        Ver todo el equipo 
                        <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </a>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="group cursor-pointer">
                        <div class="aspect-[3/4] overflow-hidden rounded-xl mb-6 bg-gray-300 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                            <div class="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUD06WQUmgwMpwYC3PpaDxMRp9M1jMXtonflGxivaZRO0FB1em3x5lhDWUTok-H9rGtoSghhm8I4vlePHlz6_vrKd6RZbcBQfMEE78jRPk3UgPGXK1ZaUJzBy9kj421sbO9Nbuy3bHYhlGnGcvUEkehzkMcFREdeOZjzwp779vILaVTwmjcfU4_vXQLZAGCOddC3DN2Y8T_NmBhxNyHhNF8QJb4pcrGoOMUkz-rPWPxjnCPZoV4HTc8ZZXkC-DKdbm1_DHp8oqtvXL');"></div>
                        </div>
                        <h4 class="text-xl font-bold text-black dark:text-white">Alex Morgan</h4>
                        <p class="text-sm text-gray-500 dark:text-[#9da6b9] mt-1">Fundador & CEO</p>
                    </div>
                    <div class="group cursor-pointer">
                        <div class="aspect-[3/4] overflow-hidden rounded-xl mb-6 bg-gray-300 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                            <div class="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDiugk5XHHvgNpDKUNlWnQCGUWJ8iL6N5oSkxvJVjnMyJGID4F-WC24cxPMMmJIubfGofqP76mTYoSBIiMkrb94EaAtv-FVLbOEnAW1n2XwWtO5HpAUpdI5ZjLLsku_gyVh_YTpLh2q3b9HxW88AZ56yksx_z6s3mRpmlAA9srQ3_FWsZaJ07sM2kyonUMi8NMlKv-BDwyIjw7dgnHnOppf5-P0j_RZh254FL1OCY4tyZiOcnXkJK3nWygnkZj0IPvj0mVe09nBWGt0');"></div>
                        </div>
                        <h4 class="text-xl font-bold text-black dark:text-white">Sofia Lemaire</h4>
                        <p class="text-sm text-gray-500 dark:text-[#9da6b9] mt-1">Directora de Arte</p>
                    </div>
                    <div class="group cursor-pointer">
                        <div class="aspect-[3/4] overflow-hidden rounded-xl mb-6 bg-gray-300 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                            <div class="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAz2lqXz-oVxkxjU2OG1JVpSdXJV5qh-xq6WZRLSahLThFahhxIqvKsCJ7-TaVgEcYEw7QXrLND1aGpy1jW4yVp598sH678U7aVhr7iEKOahRl_XNH91pGGQeRqQ9XklsoLenYr2ne2xg5XXtxwhcEzI9MNZRZLOaKCtv9Q5p-Mt6akCDWTrHP_YI8b3Kbn5u1WQQw1PsMQnoxrTfLHnUAeFBq-gYf7qW4hLNl6ZKVsUebc5h28tMwjG-40TDNgcLJH-IUCqwQOwsWR');"></div>
                        </div>
                        <h4 class="text-xl font-bold text-black dark:text-white">David Chen</h4>
                        <p class="text-sm text-gray-500 dark:text-[#9da6b9] mt-1">Jefe de Tecnología</p>
                    </div>
                    <div class="group cursor-pointer">
                        <div class="aspect-[3/4] overflow-hidden rounded-xl mb-6 bg-gray-300 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                            <div class="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC33e4vAJMcUeJ17UlUbW_MxfMF_bR04PaiB1gTh1r5y-9TjiBM7P72-l_QFWngZ2U81ckxHti4U8uxu_lpoxWBltUJQworyKZE3gFLzWJfLhKrEACQEnBHFRHOF1rilC5w2ktvThIeH-VrQOAX1K9RmcYqFjk2Rngu2pF2v0CiALWW654EB3azOAuqv7tx-hqsQmj2_SudU-ekapshrQSJi5VGGayGXJ7eIqE-gOdE0Ur7sC2izIIWSZE6pixm69QR0_QwOIJelFD2');"></div>
                        </div>
                        <h4 class="text-xl font-bold text-black dark:text-white">Elena Ruiz</h4>
                        <p class="text-sm text-gray-500 dark:text-[#9da6b9] mt-1">Curaduría</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-20 bg-background-light dark:bg-background-dark text-center">
            <h2 class="text-2xl md:text-3xl font-bold text-black dark:text-white mb-6">¿Listo para transformar tu espacio?</h2>
            <button routerLink="/catalog" class="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-primary/30 transition-all hover:-translate-y-1">
                Explorar Colección
            </button>
        </section>
        
        <app-footer></app-footer>
      </main>
    </div>
  `
})
export class AboutComponent {
  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
