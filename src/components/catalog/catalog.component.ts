
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, ActivatedRoute } from '@angular/router';

interface Artwork {
  id: number;
  title: string;
  price: string;
  image: string;
  paper: string;
  tags: string[]; // 'trending', 'limited', 'large', 'abstract', 'landscape'
  psychology: string; // 'serenity', 'energy', 'introspection', 'balance'
  priceValue: number;
}

@Component({
  selector: 'app-catalog',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  template: `
    <div class="bg-background-light dark:bg-background-dark text-white font-display overflow-x-hidden min-h-screen flex flex-col">
      <app-header></app-header>
      
      <main class="flex min-h-[calc(100vh-73px)] relative">
        <!-- Sidebar -->
        <aside class="w-72 hidden md:flex flex-col border-r border-background-dark/10 dark:border-[#282e39] p-6 bg-background-light dark:bg-background-dark h-full sticky top-[73px] self-start" style="height: calc(100vh - 73px);">
          <div class="flex flex-col gap-8 h-full">
            <div class="flex flex-col gap-1">
              <h3 class="text-black dark:text-white text-lg font-bold tracking-tight">Psicología del Color</h3>
              <p class="text-[#9da6b9] text-xs font-normal leading-normal uppercase tracking-wider">Filtrar por estado de ánimo</p>
            </div>
            
            <div class="flex flex-col gap-3">
              <!-- Serenity -->
              <div (click)="setPsychology('serenity')" 
                   class="flex items-center gap-3 px-4 py-3 rounded-xl border group cursor-pointer transition-all"
                   [class.bg-primary/10]="activePsychology() === 'serenity'"
                   [class.border-primary/20]="activePsychology() === 'serenity'"
                   [class.hover:bg-primary/20]="activePsychology() === 'serenity'"
                   [class.hover:bg-gray-200]="activePsychology() !== 'serenity'"
                   [class.dark:hover:bg-[#282e39]]="activePsychology() !== 'serenity'"
                   [class.border-transparent]="activePsychology() !== 'serenity'">
                <div class="text-primary">
                  <span class="material-symbols-outlined">filter_drama</span>
                </div>
                <p class="text-black dark:text-white text-sm font-medium" [class.font-bold]="activePsychology() === 'serenity'">Serenidad</p>
              </div>

              <!-- Energy -->
              <div (click)="setPsychology('energy')" 
                   class="flex items-center gap-3 px-4 py-3 rounded-xl border group cursor-pointer transition-all"
                   [class.bg-orange-500/10]="activePsychology() === 'energy'"
                   [class.border-orange-500/20]="activePsychology() === 'energy'"
                   [class.hover:bg-orange-500/20]="activePsychology() === 'energy'"
                   [class.hover:bg-gray-200]="activePsychology() !== 'energy'"
                   [class.dark:hover:bg-[#282e39]]="activePsychology() !== 'energy'"
                   [class.border-transparent]="activePsychology() !== 'energy'">
                <div class="text-orange-500">
                  <span class="material-symbols-outlined">bolt</span>
                </div>
                <p class="text-black dark:text-white text-sm font-medium" [class.font-bold]="activePsychology() === 'energy'">Energía</p>
              </div>

              <!-- Introspection -->
              <div (click)="setPsychology('introspection')" 
                   class="flex items-center gap-3 px-4 py-3 rounded-xl border group cursor-pointer transition-all"
                   [class.bg-indigo-400/10]="activePsychology() === 'introspection'"
                   [class.border-indigo-400/20]="activePsychology() === 'introspection'"
                   [class.hover:bg-indigo-400/20]="activePsychology() === 'introspection'"
                   [class.hover:bg-gray-200]="activePsychology() !== 'introspection'"
                   [class.dark:hover:bg-[#282e39]]="activePsychology() !== 'introspection'"
                   [class.border-transparent]="activePsychology() !== 'introspection'">
                <div class="text-indigo-400">
                  <span class="material-symbols-outlined">visibility</span>
                </div>
                <p class="text-black dark:text-white text-sm font-medium" [class.font-bold]="activePsychology() === 'introspection'">Introspección</p>
              </div>

              <!-- Balance -->
              <div (click)="setPsychology('balance')" 
                   class="flex items-center gap-3 px-4 py-3 rounded-xl border group cursor-pointer transition-all"
                   [class.bg-emerald-400/10]="activePsychology() === 'balance'"
                   [class.border-emerald-400/20]="activePsychology() === 'balance'"
                   [class.hover:bg-emerald-400/20]="activePsychology() === 'balance'"
                   [class.hover:bg-gray-200]="activePsychology() !== 'balance'"
                   [class.dark:hover:bg-[#282e39]]="activePsychology() !== 'balance'"
                   [class.border-transparent]="activePsychology() !== 'balance'">
                <div class="text-emerald-400">
                  <span class="material-symbols-outlined">balance</span>
                </div>
                <p class="text-black dark:text-white text-sm font-medium" [class.font-bold]="activePsychology() === 'balance'">Equilibrio</p>
              </div>
            </div>

            <div class="mt-8">
              <h3 class="text-[#9da6b9] text-xs font-normal leading-normal uppercase tracking-wider mb-4 px-1">Tipo de Papel</h3>
              <div class="flex flex-col gap-2">
                <label class="flex items-center gap-3 px-1 cursor-pointer">
                  <input checked="" class="rounded border-gray-400 bg-transparent text-primary focus:ring-primary h-4 w-4" type="checkbox"/>
                  <span class="text-sm text-black dark:text-gray-300">Museum Heritage 310</span>
                </label>
                <label class="flex items-center gap-3 px-1 cursor-pointer">
                  <input class="rounded border-gray-400 bg-transparent text-primary focus:ring-primary h-4 w-4" type="checkbox"/>
                  <span class="text-sm text-black dark:text-gray-300">Photo Rag Metallic</span>
                </label>
              </div>
            </div>

            <div class="mt-auto">
              <button (click)="resetFilters()" class="w-full py-3 px-4 rounded-lg bg-gray-200 dark:bg-[#282e39] text-black dark:text-white text-sm font-bold hover:bg-gray-300 dark:hover:bg-[#323945] transition-colors">
                    Restablecer Filtros
              </button>
            </div>
          </div>
        </aside>

        <!-- Main Gallery -->
        <section class="flex-1 flex flex-col bg-background-light dark:bg-background-dark p-6 lg:p-10">
          <div class="mb-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h1 class="text-black dark:text-white text-4xl font-bold tracking-tight mb-2">Impresiones Giclée</h1>
                <p class="text-gray-500 dark:text-[#9da6b9]">Obras maestras seleccionadas impresas en papel de archivo.</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500">Ordenar por</span>
                <button class="flex items-center gap-2 text-sm font-bold text-black dark:text-white bg-gray-200 dark:bg-[#282e39] px-4 py-2 rounded-lg">
                        {{ currentSort() }} <span class="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
              </div>
            </div>
            
            <!-- Category Pills -->
            <div class="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
              <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 border border-transparent transition-all"
                [class.bg-primary]="activeFilter() === 'all'" [class.text-white]="activeFilter() === 'all'" [class.shadow-lg]="activeFilter() === 'all'" [class.shadow-primary/20]="activeFilter() === 'all'"
                [class.bg-gray-200]="activeFilter() !== 'all'" [class.dark:bg-[#282e39]]="activeFilter() !== 'all'" [class.text-black]="activeFilter() !== 'all'" [class.dark:text-white]="activeFilter() !== 'all'"
                (click)="setFilter('all')">
                <span class="text-sm font-medium">Todas</span>
              </button>

              <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 border border-transparent transition-all"
                [class.bg-primary]="activeFilter() === 'trending'" [class.text-white]="activeFilter() === 'trending'" [class.shadow-lg]="activeFilter() === 'trending'" [class.shadow-primary/20]="activeFilter() === 'trending'"
                [class.bg-gray-200]="activeFilter() !== 'trending'" [class.dark:bg-[#282e39]]="activeFilter() !== 'trending'" [class.text-black]="activeFilter() !== 'trending'" [class.dark:text-white]="activeFilter() !== 'trending'"
                (click)="setFilter('trending')">
                <span class="text-sm font-medium">Top Ventas</span>
                <span class="material-symbols-outlined text-[18px]">trending_up</span>
              </button>

              <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 border border-transparent transition-all"
                 [class.bg-primary]="activeFilter() === 'large'" [class.text-white]="activeFilter() === 'large'"
                 [class.bg-gray-200]="activeFilter() !== 'large'" [class.dark:bg-[#282e39]]="activeFilter() !== 'large'" [class.text-black]="activeFilter() !== 'large'" [class.dark:text-white]="activeFilter() !== 'large'"
                 (click)="setFilter('large')">
                <span class="text-sm font-medium">Gran Formato</span>
              </button>
            </div>
          </div>

          <!-- Gallery Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20">
            @for (art of filteredArtworks(); track art.id) {
              <div class="flex flex-col gap-4 group cursor-pointer animate-fade-in" [routerLink]="['/product', art.id]">
                <div class="relative overflow-hidden rounded-xl bg-[#1e2430]">
                  <div class="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover transition-transform duration-500 group-hover:scale-105" 
                       [style.background-image]="'url(' + art.image + ')'">
                  </div>
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button class="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm shadow-xl flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-all">
                      <span class="material-symbols-outlined text-[18px]">add</span> Añadir al Muro
                    </button>
                  </div>
                  @if (art.tags.includes('limited')) {
                    <div class="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">Limitado</div>
                  }
                  @if (art.tags.includes('trending')) {
                     <div class="absolute top-3 right-3 bg-terracotta text-white text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">Hot</div>
                  }
                </div>
                <div>
                  <h3 class="text-black dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">{{ art.title }}</h3>
                  <div class="flex items-center gap-2 mt-1">
                    <p class="text-gray-500 dark:text-[#9da6b9] text-sm">{{ art.paper }}</p>
                    <span class="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-white/60 font-medium capitalize">{{ art.psychology }}</span>
                  </div>
                  <div class="flex items-center justify-between mt-3">
                    <p class="text-black dark:text-white font-bold">{{ art.price }}</p>
                    <span class="material-symbols-outlined text-[#9da6b9] text-[20px] hover:text-red-500 transition-colors">favorite</span>
                  </div>
                </div>
              </div>
            } @empty {
              <div class="col-span-full py-20 text-center">
                 <span class="material-symbols-outlined text-4xl text-gray-500 mb-4">filter_list_off</span>
                 <p class="text-gray-500 text-lg">No se encontraron obras con estos filtros.</p>
                 <button (click)="resetFilters()" class="text-primary font-bold mt-2 hover:underline">Limpiar filtros</button>
              </div>
            }
          </div>
        </section>
      </main>
      
      <!-- Floating Action Button (Repositioned) -->
      <div class="fixed bottom-8 right-8 z-[100]">
        <button routerLink="/designer" class="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-full shadow-2xl shadow-primary/40 group transition-all transform hover:scale-105 hover:-translate-y-1">
          <span class="material-symbols-outlined">architecture</span>
          <span class="font-bold tracking-wide hidden sm:block">Diseñar Mi Galería</span>
          <div class="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center sm:ml-2">
            <span class="text-xs">3</span>
          </div>
        </button>
      </div>

    </div>
  `
})
export class CatalogComponent implements OnInit {
  private route = inject(ActivatedRoute);
  currentSort = signal('Novedades');
  activeFilter = signal('all');
  activePsychology = signal<string | null>(null);

  // Data Source
  artworks: Artwork[] = [
    {
      id: 1,
      title: 'Equilibrio Abstracto',
      price: '240,00€',
      priceValue: 240,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUD06WQUmgwMpwYC3PpaDxMRp9M1jMXtonflGxivaZRO0FB1em3x5lhDWUTok-H9rGtoSghhm8I4vlePHlz6_vrKd6RZbcBQfMEE78jRPk3UgPGXK1ZaUJzBy9kj421sbO9Nbuy3bHYhlGnGcvUEkehzkMcFREdeOZjzwp779vILaVTwmjcfU4_vXQLZAGCOddC3DN2Y8T_NmBhxNyHhNF8QJb4pcrGoOMUkz-rPWPxjnCPZoV4HTc8ZZXkC-DKdbm1_DHp8oqtvXL',
      paper: 'Museum Heritage 310',
      tags: ['limited', 'abstract', 'balance'],
      psychology: 'balance'
    },
    {
      id: 2,
      title: 'Flujo Vibrante',
      price: '310,00€',
      priceValue: 310,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArl8LbVMmqqq_BgrS84THtSWDtTid_urZRzbJlcNp1bOQbnFXrN0grVPURHhGkFDiPRgZxuEAmyyqPsgHE1rAh08R9HWg9WAkcMHama31PBaW_B0pso2fzznetnzhpvG6LeiNk7v9Yb896xhAkS0ZXoeDkDf2tcU5ZKvxE2nEK9pTydcQLoP3yKDDth4HGLXDEXpy1_nyR3dMhjISe3dPM40dU3RErsHzOYgFNraa1R3eZY1NrTeUkx4gIuFDMTpcCoi847CH-RTKv',
      paper: 'Museum Heritage 310',
      tags: ['trending', 'energy'],
      psychology: 'energy'
    },
    {
      id: 3,
      title: 'Soledad Profunda',
      price: '195,00€',
      priceValue: 195,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdxvM1apE-x44SiKq3_f_AnoeQl7uo2vpMqSh4c5b-z8UhL-fYGICrXDLX9KkdTu0YKLrF3cX5KNkzzGtMLqlyvtd7VknEuFoO5JSa_h0-nYczJnpc0uWmTAqDhdMHIruAWofes3OEY1mYeyEs-ynwMwEYtl29lFQLlgfBWCZDRZuoGTL0vqnhJmqFvEYgk0DjDaHXerkIRusH4QYMTednGW7vIttG1X8cPqRWPrF8ySuW4VlB_2SoNI4qcSH9H8e7eCY3SzhhIe8D',
      paper: 'Photo Rag Metallic',
      tags: ['introspection', 'landscape'],
      psychology: 'introspection'
    },
    {
      id: 4,
      title: 'Luz Etérea',
      price: '350,00€',
      priceValue: 350,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiugk5XHHvgNpDKUNlWnQCGUWJ8iL6N5oSkxvJVjnMyJGID4F-WC24cxPMMmJIubfGofqP76mTYoSBIiMkrb94EaAtv-FVLbOEnAW1n2XwWtO5HpAUpdI5ZjLLsku_gyVh_YTpLh2q3b9HxW88AZ56yksx_z6s3mRpmlAA9srQ3_FWsZaJ07sM2kyonUMi8NMlKv-BDwyIjw7dgnHnOppf5-P0j_RZh254FL1OCY4tyZiOcnXkJK3nWygnkZj0IPvj0mVe09nBWGt0',
      paper: 'Museum Heritage 310',
      tags: ['trending', 'large', 'serenity'],
      psychology: 'serenity'
    },
    {
      id: 5,
      title: 'Caos Organizado',
      price: '280,00€',
      priceValue: 280,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJRs3iOHdePz9qtRNYvUVSzu_5M_EnOxVD44nt9vq2mz37XKMld6850Yy0kb6Z4cCZiQcD37HCshnFT0DloTgoCHoWh98cVeGQinQiRX4mgpb5w02KQQvrs3T2_a9VE3CvEF5ldcKojHoWaz_A8SFiPiueoPLfrdkz0EdHAsdlU5bdaYNtDMo6KxyD9lD-X8EXZo_YQUvofdGSWP8jfxHUBQBB1qBi94_6Kwy8OaHY6V1L2Kc5ysWeyP3v6_IYDf6Lh_uLbvt-0vcG',
      paper: 'Baryta Rag',
      tags: ['energy', 'abstract'],
      psychology: 'energy'
    },
    {
      id: 6,
      title: 'Horizonte Azul',
      price: '420,00€',
      priceValue: 420,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4BKvpFblAcIv15Pua35krt9YVUNcFH-9zW_T88DkPVTftBctN0PKKvr3S60FBivFxy5fblAzI1s2TtjCGodugesdxXwn86hoJg6fx7u638qouE9MC-waGjO1s9GycJlsbxstL9YRVAvktaYYBvp5VJ-bVid-d9GfoitnfyDB4VY-FqY6Rc1EeVYNgh07ydokkN5C8YJGWBJW4FDzm_1AAh8BIevCCkcXzWxV721QT6tFD7c15_U14u_L6dTto9NbOAAkt6fFJhIQ-',
      paper: 'Museum Heritage 310',
      tags: ['large', 'balance', 'trending'],
      psychology: 'balance'
    },
    {
        id: 7,
        title: 'Nebula Oscura',
        price: '210,00€',
        priceValue: 210,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcSZuZME3ogVbQNqqublULSJ5DAfUJBgROqVC5H1lBUHOCOlqrH33KaENPcSW9uzJg4Wzk6HuZmaFh8raIjjAh46VWM-jVuS5Kndkuq-9Y77X9RgRDHPxnTiyC-VH9VU9_BsIcGwT3Lp0jCm1iNZEmP2oJqhpfFptmF9f5-mLeMIYIAH6tzPlRXP1lDY82n_0P4UAmf-1d2CXtBW8PjgEn_3m--ybmpTMxLd5_dO57QGFN6jbDvP5_GptWL4BJJVRjdDvHXLIctGXx',
        paper: 'Photo Rag Metallic',
        tags: ['introspection', 'abstract'],
        psychology: 'introspection'
    },
    {
        id: 8,
        title: 'Calma Vegetal',
        price: '180,00€',
        priceValue: 180,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOKNzD1sxE68YBqkQVy8tTGXS4EUsaSZ7gtwRTdfZjXR-7MhbujEqufWNr7s8nqj3pXCMhdUZH1Bw18m7HQMZVkp14e8zOAABts-YS8CFBQDqZE5gNswYvvfaTuyLNtwffxHrHAVWT-_3m797vgL0HhcE5Bj1WUUTZbVhikfrArd3W0wS7sw4NW2BhDvRd1tOoYSqLSlFpAQtpyjiKgFjMNjErXNiS4DOwNAI40wEDHEmmVzeB9MeMcAhjkVrHPjVA1_9oxCuaUYB5',
        paper: 'Museum Heritage 310',
        tags: ['serenity', 'landscape'],
        psychology: 'serenity'
    }
  ];

  filteredArtworks = computed(() => {
    return this.artworks.filter(art => {
      // 1. Filter by Top Category
      const filter = this.activeFilter();
      let matchesFilter = true;
      if (filter === 'trending') matchesFilter = art.tags.includes('trending');
      if (filter === 'large') matchesFilter = art.tags.includes('large');

      // 2. Filter by Psychology (Sidebar)
      const psychology = this.activePsychology();
      let matchesPsychology = true;
      if (psychology) matchesPsychology = art.psychology === psychology;

      return matchesFilter && matchesPsychology;
    });
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['filter'] === 'trending') {
        this.currentSort.set('Tendencias Semanales');
        this.activeFilter.set('trending');
      } else {
        this.currentSort.set('Novedades');
        this.activeFilter.set('all');
      }
    });
  }

  setFilter(filter: string) {
    this.activeFilter.set(filter);
    if (filter === 'trending') {
        this.currentSort.set('Tendencias Semanales');
    } else {
        this.currentSort.set('Novedades');
    }
  }

  setPsychology(type: string) {
    // Toggle logic: if clicking already active, turn it off
    if (this.activePsychology() === type) {
      this.activePsychology.set(null);
    } else {
      this.activePsychology.set(type);
    }
  }

  resetFilters() {
    this.activeFilter.set('all');
    this.activePsychology.set(null);
    this.currentSort.set('Novedades');
  }
}
