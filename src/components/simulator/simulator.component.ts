
import { Component, signal, computed, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { GoogleGenAI, Chat } from "@google/genai";
import { environment } from '../../environments/environment';

interface DesignerItem {
  id: number;
  title: string;
  price: number;
  image: string;
  x: number;
  y: number;
  width: number;
  aspectRatio: number;
  style: string; // Added for AI context
}

interface ChatMessage {
  text: string;
  isUser: boolean;
  time: Date;
}

// Minimal Catalog Context for the AI to know what's available
const CATALOG_CONTEXT = `
Catálogo Disponible:
1. Abstract No. 1 (240€, Abstracto, Tonos grises)
2. Deep Blue (310€, Moderno, Azul profundo)
3. Reflection (195€, Fotografía, Naturaleza)
4. Urban Flow (280€, Urbano, Caótico)
5. Golden Hour (420€, Paisaje, Cálido)
`;

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FormsModule],
  template: `
    <div class="bg-background-light dark:bg-[#0c101a] text-white h-screen flex flex-col overflow-hidden" (mouseup)="onDragEnd()" (mouseleave)="onDragEnd()" (mousemove)="onDragMove($event)">
      <app-header [transparent]="false"></app-header>
      
      <!-- Main Layout -->
      <main class="flex flex-1 overflow-hidden relative">
        
        <!-- COLUMN 1: AI Assistant -->
        <aside class="hidden xl:flex w-80 flex-col border-r border-white/5 bg-[#111622] shrink-0 z-20">
          <div class="p-5 border-b border-white/5 bg-[#151b29]">
            <h1 class="text-white text-sm font-bold font-display flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
              Asistente Curatorial
            </h1>
            <p class="text-white/40 text-[10px] uppercase tracking-widest mt-1">Powered by Gemini 2.5</p>
          </div>
          
          <div class="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar" #chatContainer>
            @for (msg of chatMessages(); track msg.time) {
                <div class="flex gap-3 animate-fade-in" [class.flex-row-reverse]="msg.isUser">
                    <div class="size-8 rounded-full flex items-center justify-center shrink-0" 
                         [class.bg-primary-20]="!msg.isUser" 
                         [class.bg-white-10]="msg.isUser">
                        @if(!msg.isUser) {
                            <span class="material-symbols-outlined text-primary text-xs">smart_toy</span>
                        } @else {
                            <span class="text-xs font-bold text-white">YO</span>
                        }
                    </div>
                    <div class="p-3 text-sm leading-relaxed max-w-[80%]"
                         [class.rounded-tr-xl]="!msg.isUser"
                         [class.rounded-b-xl]="true"
                         [class.rounded-tl-xl]="msg.isUser"
                         [class.bg-white-5]="!msg.isUser"
                         [class.text-gray-300]="!msg.isUser"
                         [class.border-white-5]="!msg.isUser"
                         [class.bg-primary-10]="msg.isUser"
                         [class.text-white]="msg.isUser"
                         [class.border-primary-20]="msg.isUser"
                         [class.border]="true">
                        {{ msg.text }}
                    </div>
                </div>
            }
            @if (isAiTyping()) {
                <div class="flex gap-3 animate-pulse">
                   <div class="size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span class="material-symbols-outlined text-primary text-xs">more_horiz</span>
                   </div>
                   <div class="text-xs text-gray-500 flex items-center">Analizando composición...</div>
                </div>
            }
          </div>

          <div class="p-4 border-t border-white/5 bg-[#151b29]">
            <div class="relative">
              <input [(ngModel)]="currentInput" 
                     (keydown.enter)="sendMessage()" 
                     [disabled]="isAiTyping()"
                     class="w-full bg-[#0c101a] border border-white/10 rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-600 transition-all text-white outline-none disabled:opacity-50" 
                     placeholder="Pregunta sobre tu diseño..." type="text"/>
              <button (click)="sendMessage()" 
                      [disabled]="isAiTyping()"
                      class="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-white p-1 rounded transition-colors disabled:opacity-50">
                <span class="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </aside>

        <!-- COLUMN 2: Workspace -->
        <section class="flex-1 flex flex-col min-w-0 bg-[#0c101a] relative">
            
          <!-- 2A: The Room Visualizer (The Wall) -->
          <div class="flex-1 relative flex items-center justify-center bg-[#080b12] overflow-hidden group select-none">
            
            <!-- Overlay Info -->
            <div class="absolute top-6 left-6 z-10 flex items-center gap-4 pointer-events-none">
                 <div class="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                    <span class="material-symbols-outlined text-white/60 text-[16px]">photo_camera</span>
                    <span class="text-xs font-bold text-white">Salón Principal 01</span>
                 </div>
                 <div class="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                    <span class="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span class="text-xs font-bold text-white uppercase tracking-wider">Diseño Activo</span>
                 </div>
            </div>

            <!-- The Wall Background & Canvas -->
            <div class="relative w-full h-full max-h-[85vh] p-4 md:p-10 flex items-center justify-center">
                 <div class="relative w-full max-w-5xl aspect-video rounded-lg shadow-2xl border border-white/5 overflow-hidden bg-black" id="wall-canvas">
                    <!-- Background Image -->
                    <div class="absolute inset-0 bg-cover bg-center pointer-events-none opacity-80" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDuS0W3B-4SmuGlm6ZQIu0tb7Dv7aWzdo8gz1kBTMkXBnNNPxzuh42THxxXynYsVgEHhDPcUbMGovvI-UL2BLo_jKX4SUJ4ja7gAjyBRhBKx5XCpIn3wJW4skpBg63Nj-Ws3yJML3Cg2LL62bkN4CPayZfSoPT8W2NP04-F8KRpp-GD3-h6nmMP7Lsweo3Kzs6MUZss-6h5Nx5p4IKuxogBUp2AuTwU33BzkfUpBHheQ7OqE6pamGtmZuvYAiI1jiZ4YfoGhUiLF_Lf");'></div>
                    
                    <!-- Items on Wall -->
                     @for (item of wallItems(); track item.id) {
                        <div class="absolute cursor-move group hover:z-50"
                             [style.left.px]="item.x"
                             [style.top.px]="item.y"
                             [style.width.px]="item.width"
                             [style.height.px]="item.width * (1/item.aspectRatio)"
                             (mousedown)="onDragStart($event, item)">
                             
                            <!-- The Art Image -->
                            <img [src]="item.image" [alt]="item.title" class="w-full h-full object-cover shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-[4px] border-white pointer-events-none">
                            
                            <!-- Hover Controls -->
                            <div class="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button (mousedown)="$event.stopPropagation(); moveToWorkbench(item)" class="bg-red-500 text-white p-1.5 rounded-full hover:scale-110 transition-transform shadow-lg" title="Quitar de la pared">
                                    <span class="material-symbols-outlined text-[14px]">close</span>
                                </button>
                                <button (mousedown)="$event.stopPropagation()" class="bg-black/80 text-white p-1.5 rounded-full hover:scale-110 transition-transform shadow-lg cursor-grab">
                                    <span class="material-symbols-outlined text-[14px]">open_with</span>
                                </button>
                            </div>
                        </div>
                     }
                     
                     <!-- Empty State Hint -->
                     @if (wallItems().length === 0) {
                        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div class="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center">
                                <span class="material-symbols-outlined text-white/50 text-4xl mb-2">drag_indicator</span>
                                <p class="text-white/70 text-sm">Arrastra obras aquí o usa (+) en la mesa de trabajo</p>
                            </div>
                        </div>
                     }
                 </div>
            </div>
            
            <!-- Controls -->
            <div class="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                <button (click)="resetWall()" class="size-10 rounded-lg bg-black/60 backdrop-blur text-white/70 hover:text-white hover:bg-primary hover:border-primary border border-white/10 flex items-center justify-center transition-all" title="Limpiar Pared">
                    <span class="material-symbols-outlined">restart_alt</span>
                </button>
            </div>
          </div>

          <!-- 2B: The Workbench -->
          <div class="h-auto min-h-[180px] bg-[#111622] border-t border-white/10 flex flex-col z-30">
            <div class="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-[#151b29]">
                <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-primary">view_quilt</span>
                    <h3 class="text-xs font-bold uppercase tracking-widest text-white">Mesa de Trabajo</h3>
                    <span class="bg-white/10 text-white/60 px-2 py-0.5 rounded text-[10px]">{{ workbenchItems().length }} Disponibles</span>
                </div>
            </div>
            
            <div class="flex-1 p-4 overflow-x-auto custom-scrollbar flex items-center gap-6">
                 @for (item of workbenchItems(); track item.id) {
                     <div class="group relative flex-shrink-0 cursor-pointer hover:-translate-y-1 transition-transform" (click)="moveToWall(item)">
                        <div class="w-24 h-32 rounded-lg bg-cover bg-center shadow-lg border-2 border-transparent group-hover:border-primary/50 transition-all relative overflow-hidden" 
                             [style.background-image]="'url(' + item.image + ')'">
                            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <span class="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all">add_circle</span>
                            </div>
                        </div>
                        <p class="text-[10px] text-gray-400 mt-2 text-center w-24 truncate font-medium group-hover:text-white">{{ item.title }}</p>
                        <p class="text-[10px] text-white font-bold text-center">{{ item.price }}€</p>
                     </div>
                 }
                 
                 <!-- Hidden Items (Currently on Wall) representation -->
                 @for (item of wallItems(); track item.id) {
                    <div class="group relative flex-shrink-0 opacity-50 grayscale cursor-not-allowed">
                        <div class="w-24 h-32 rounded-lg bg-cover bg-center border-2 border-white/10" 
                             [style.background-image]="'url(' + item.image + ')'">
                             <div class="absolute inset-0 flex items-center justify-center bg-black/40">
                                <span class="text-[10px] font-bold text-white uppercase tracking-widest">En Pared</span>
                             </div>
                        </div>
                    </div>
                 }

                 <button class="w-24 h-24 rounded-lg border-2 border-dashed border-white/20 hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center gap-2 transition-all group shrink-0">
                     <span class="material-symbols-outlined text-white/40 group-hover:text-primary">add_photo_alternate</span>
                     <span class="text-[9px] uppercase font-bold text-white/40 group-hover:text-primary">Explorar</span>
                 </button>
            </div>
          </div>
        </section>

        <!-- COLUMN 3: Analysis & Checkout -->
        <aside class="w-full lg:w-80 flex flex-col border-l border-white/5 bg-[#111622] shrink-0 z-20">
            
            <div class="flex-1 overflow-y-auto custom-scrollbar p-6">
                <!-- Dynamic Palette based on Wall Items -->
                <section class="mb-8">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm">palette</span> Paleta Detectada
                  </h3>
                  <div class="flex h-10 rounded-lg overflow-hidden ring-1 ring-white/10">
                    @for (color of analysis().palette; track color) {
                        <div class="flex-1 group relative transition-all duration-500" [style.background-color]="color"></div>
                    }
                  </div>
                </section>

                <section class="mb-8">
                   <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xs font-bold uppercase tracking-widest text-gray-500">Equilibrio Visual</h3>
                        <span class="text-[9px] px-1.5 py-0.5 rounded border"
                              [class.bg-green-500-10]="analysis().score > 80"
                              [class.text-green-400]="analysis().score > 80"
                              [class.border-green-500-20]="analysis().score > 80"
                              [class.bg-yellow-500-10]="analysis().score <= 80"
                              [class.text-yellow-400]="analysis().score <= 80"
                              [class.border-yellow-500-20]="analysis().score <= 80">
                              {{ analysis().score > 80 ? 'Óptimo' : 'En Progreso' }}
                        </span>
                   </div>
                   <div class="space-y-4">
                        <div>
                            <div class="flex justify-between text-[10px] text-gray-400 mb-1">
                                <span>Espacio Negativo</span>
                                <span class="text-white">{{ analysis().negativeSpace }}%</span>
                            </div>
                            <div class="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <div class="h-full bg-primary transition-all duration-500" [style.width.%]="analysis().negativeSpace"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-[10px] text-gray-400 mb-1">
                                <span>Coherencia Cromática</span>
                                <span class="text-white">{{ analysis().coherence }}%</span>
                            </div>
                            <div class="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <div class="h-full bg-emerald-500 transition-all duration-500" [style.width.%]="analysis().coherence"></div>
                            </div>
                        </div>
                   </div>
                </section>

                <section class="p-4 bg-white/5 rounded-xl border border-white/5 transition-all">
                    <h3 class="text-[11px] font-bold uppercase text-primary mb-2 flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm">psychology</span>
                        Impacto Psicológico
                    </h3>
                    <p class="text-[11px] text-gray-400 leading-relaxed animate-fade-in">
                        {{ analysis().mood }}
                    </p>
                </section>
            </div>

            <div class="p-6 border-t border-white/10 bg-[#151b29]">
                <div class="flex justify-between items-end mb-4">
                    <div class="flex flex-col">
                        <span class="text-xs text-gray-500 font-medium">Total Estimado</span>
                        <div class="flex items-baseline gap-1">
                            <span class="text-2xl font-bold text-white">{{ totalPrice() }}</span>
                            <span class="text-sm font-bold text-white">,00€</span>
                        </div>
                    </div>
                    <span class="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded font-bold">{{ wallItems().length }} Obras</span>
                </div>
                
                <button routerLink="/checkout" 
                        [disabled]="wallItems().length === 0"
                        [class.opacity-50]="wallItems().length === 0"
                        class="w-full group relative overflow-hidden bg-primary hover:bg-primary/90 text-white p-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25">
                    <span class="relative z-10">Proceder al Pago</span>
                    <span class="material-symbols-outlined relative z-10 text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
            </div>

        </aside>
      </main>
    </div>
  `
})
export class SimulatorComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  // Dependencies
  private genAI: GoogleGenAI;
  private chatSession: Chat | null = null;

  // State
  wallItems = signal<DesignerItem[]>([]);
  workbenchItems = signal<DesignerItem[]>([
    { id: 1, title: 'Abstract No. 1', price: 240, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz2lqXz-oVxkxjU2OG1JVpSdXJV5qh-xq6WZRLSahLThFahhxIqvKsCJ7-TaVgEcYEw7QXrLND1aGpy1jW4yVp598sH678U7aVhr7iEKOahRl_XNH91pGGQeRqQ9XklsoLenYr2ne2xg5XXtxwhcEzI9MNZRZLOaKCtv9Q5p-Mt6akCDWTrHP_YI8b3Kbn5u1WQQw1PsMQnoxrTfLHnUAeFBq-gYf7qW4hLNl6ZKVsUebc5h28tMwjG-40TDNgcLJH-IUCqwQOwsWR', x: 0, y: 0, width: 140, aspectRatio: 0.75, style: 'Abstracto minimalista' },
    { id: 2, title: 'Deep Blue', price: 310, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVs8iuMuJSD5ba7y2bOcRDokv-JrXF3rJdl_yFzPWCGqR7xL5wRifoIuXtAQWUMGQ65UCbnWf8IwpkAmvEc6Os0-6DbeYaEISO0IyzF1mLWpcp2m9E-eFYGSm95kKmJEExyvkSyJ6LftZJm45eQixlPfQfJBAZDQQlff0Gv6imRsVajWAxGFG3kyCfbryuLrR0PRkg9bEc5TPvtsORq2YSf2B0b7JaptW9CVDDyA-Wy5yx9fQWTAuxycVRNVejQ9Uj1Iq2C9v5xcEb', x: 0, y: 0, width: 180, aspectRatio: 1.3, style: 'Expresionismo Moderno' },
    { id: 3, title: 'Reflection', price: 195, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC33e4vAJMcUeJ17UlUbW_MxfMF_bR04PaiB1gTh1r5y-9TjiBM7P72-l_QFWngZ2U81ckxHti4U8uxu_lpoxWBltUJQworyKZE3gFLzWJfLhKrEACQEnBHFRHOF1rilC5w2ktvThIeH-VrQOAX1K9RmcYqFjk2Rngu2pF2v0CiALWW654EB3azOAuqv7tx-hqsQmj2_SudU-ekapshrQSJi5VGGayGXJ7eIqE-gOdE0Ur7sC2izIIWSZE6pixm69QR0_QwOIJelFD2', x: 0, y: 0, width: 120, aspectRatio: 0.8, style: 'Fotografía Naturaleza' },
    { id: 4, title: 'Urban Flow', price: 280, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArl8LbVMmqqq_BgrS84THtSWDtTid_urZRzbJlcNp1bOQbnFXrN0grVPURHhGkFDiPRgZxuEAmyyqPsgHE1rAh08R9HWg9WAkcMHama31PBaW_B0pso2fzznetnzhpvG6LeiNk7v9Yb896xhAkS0ZXoeDkDf2tcU5ZKvxE2nEK9pTydcQLoP3yKDDth4HGLXDEXpy1_nyR3dMhjISe3dPM40dU3RErsHzOYgFNraa1R3eZY1NrTeUkx4gIuFDMTpcCoi847CH-RTKv', x: 0, y: 0, width: 150, aspectRatio: 1, style: 'Urbano Abstracto' },
    { id: 5, title: 'Golden Hour', price: 420, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4BKvpFblAcIv15Pua35krt9YVUNcFH-9zW_T88DkPVTftBctN0PKKvr3S60FBivFxy5fblAzI1s2TtjCGodugesdxXwn86hoJg6fx7u638qouE9MC-waGjO1s9GycJlsbxstL9YRVAvktaYYBvp5VJ-bVid-d9GfoitnfyDB4VY-FqY6Rc1EeVYNgh07ydokkN5C8YJGWBJW4FDzm_1AAh8BIevCCkcXzWxV721QT6tFD7c15_U14u_L6dTto9NbOAAkt6fFJhIQ-', x: 0, y: 0, width: 200, aspectRatio: 1.5, style: 'Paisaje Cálido' },
  ]);

  chatMessages = signal<ChatMessage[]>([
    { text: 'Bienvenido al Diseñador GRID. Soy tu asistente curatorial impulsado por Gemini. He analizado la arquitectura de tu espacio y la luz es excelente. ¿Tienes alguna preferencia de estilo hoy?', isUser: false, time: new Date() }
  ]);

  isAiTyping = signal(false);
  currentInput = '';

  // Drag State
  activeDragItem: DesignerItem | null = null;
  dragOffset = { x: 0, y: 0 };

  // Computed Values
  totalPrice = computed(() => {
    return this.wallItems().reduce((sum, item) => sum + item.price, 0);
  });

  analysis = computed(() => {
    const count = this.wallItems().length;
    let mood = '';
    let palette: string[] = [];

    if (count === 0) {
      return {
        palette: ['#222', '#333', '#444'],
        score: 0,
        negativeSpace: 100,
        coherence: 0,
        mood: 'El lienzo está vacío. Esperando input creativo.'
      };
    } else if (count === 1) {
      mood = 'Minimalismo focalizado. Una pieza central fuerte crea autoridad en el espacio.';
      palette = ['#E8E8E8', '#2C2C2C', '#7D8491'];
    } else if (count === 2) {
      mood = 'Dualidad equilibrada. La relación entre dos obras genera un diálogo visual interesante.';
      palette = ['#E8E8E8', '#2C2C2C', '#A1683A', '#4A5859'];
    } else {
      mood = 'Composición compleja. La "Calma Dinámica" actual es ideal para espacios de concentración creativa.';
      palette = ['#E8E8E8', '#2C2C2C', '#7D8491', '#A1683A', '#1152d4'];
    }

    return {
      palette,
      score: Math.min(100, 70 + (count * 10)),
      negativeSpace: Math.max(20, 100 - (count * 15)),
      coherence: Math.min(98, 85 + (count * 2)),
      mood
    };
  });

  constructor() {
    // TODO: Replace 'YOUR_API_KEY_HERE' in src/environments/environment.ts
    // process.env does not exist in the browser.
    this.genAI = new GoogleGenAI({ apiKey: environment.apiKey });
  }

  ngOnInit() {
    this.initChat();
  }

  initChat() {
    this.chatSession = this.genAI.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `Eres un curador de arte experto y sofisticado para la plataforma GRID.
            Tu objetivo es ayudar al usuario a diseñar una pared de galería (Gallery Wall).
            
            Tienes acceso al contexto del diseño actual (obras en la pared, precio, estilo) que se te enviará como mensajes ocultos del sistema.
            Usa el CATALOG_CONTEXT proporcionado para sugerir obras específicas si el usuario pide recomendaciones.
            
            Reglas de personalidad:
            - Sé breve, profesional pero inspirador.
            - Usa términos de arte (composición, equilibrio, espacio negativo, paleta).
            - Si el usuario añade algo que no combina, sugiérelo sutilmente.
            - Mantén las respuestas bajo 50 palabras a menos que se pida explicación detallada.
            
            ${CATALOG_CONTEXT}`,
      }
    });
  }

  // Actions
  moveToWall(item: DesignerItem) {
    if (this.wallItems().find(i => i.id === item.id)) return;
    const newItem = { ...item, x: 300 + (this.wallItems().length * 40), y: 200 };

    this.wallItems.update(items => [...items, newItem]);
    this.workbenchItems.update(items => items.filter(i => i.id !== item.id));

    this.triggerAiReaction(`El usuario ha añadido "${item.title}" (${item.style}) a la pared. Total obras: ${this.wallItems().length}. Comenta brevemente sobre cómo afecta esto a la composición.`);
  }

  moveToWorkbench(item: DesignerItem) {
    this.wallItems.update(items => items.filter(i => i.id !== item.id));
    this.workbenchItems.update(items => [...items, item]);

    // Optional: Trigger reaction on remove, but maybe too chatty. keeping silent for remove unless empty.
    if (this.wallItems().length === 0) {
      this.triggerAiReaction("El usuario ha limpiado la pared. Anímalo a empezar de nuevo con una nueva perspectiva.");
    }
  }

  resetWall() {
    const all = [...this.wallItems(), ...this.workbenchItems()];
    this.workbenchItems.update(current => {
      const currentIds = new Set(current.map(c => c.id));
      const toAdd = this.wallItems().filter(w => !currentIds.has(w.id));
      return [...current, ...toAdd];
    });
    this.wallItems.set([]);
    this.triggerAiReaction("El usuario ha reiniciado el diseño completamente.");
  }

  // Drag & Drop Logic
  onDragStart(event: MouseEvent, item: DesignerItem) {
    event.preventDefault();
    this.activeDragItem = item;
    this.dragOffset = {
      x: event.clientX - item.x,
      y: event.clientY - item.y
    };
  }

  onDragMove(event: MouseEvent) {
    if (!this.activeDragItem) return;
    const newX = event.clientX - this.dragOffset.x;
    const newY = event.clientY - this.dragOffset.y;
    this.wallItems.update(items =>
      items.map(i => i.id === this.activeDragItem?.id ? { ...i, x: newX, y: newY } : i)
    );
  }

  onDragEnd() {
    this.activeDragItem = null;
  }

  // Chat Logic
  async sendMessage() {
    if (!this.currentInput.trim() || !this.chatSession) return;

    const userText = this.currentInput;
    this.chatMessages.update(msgs => [...msgs, { text: userText, isUser: true, time: new Date() }]);
    this.currentInput = '';
    this.scrollToBottom();
    this.isAiTyping.set(true);

    try {
      // Inject context invisibly to the user
      const contextMsg = `
        [CONTEXTO ACTUAL DEL SISTEMA]
        Obras en pared: ${this.wallItems().map(i => i.title).join(', ')}
        Precio Total: ${this.totalPrice()}
        Análisis Mood: ${this.analysis().mood}
        Usuario dice: "${userText}"
        `;

      // FIXED: Wrap in object with 'message' property
      const response = await this.chatSession.sendMessage({ message: contextMsg });

      this.chatMessages.update(msgs => [...msgs, {
        text: response.text,
        isUser: false,
        time: new Date()
      }]);
    } catch (error) {
      console.error("AI Error", error);
      this.chatMessages.update(msgs => [...msgs, {
        text: "Disculpa, perdí la conexión con el servidor de curaduría. ¿Podrías repetirlo?",
        isUser: false,
        time: new Date()
      }]);
    } finally {
      this.isAiTyping.set(false);
      this.scrollToBottom();
    }
  }

  async triggerAiReaction(systemEvent: string) {
    if (!this.chatSession) return;
    this.isAiTyping.set(true);

    try {
      // FIXED: Wrap in object with 'message' property
      const response = await this.chatSession.sendMessage({ message: `[EVENTO DE SISTEMA]: ${systemEvent}` });
      this.chatMessages.update(msgs => [...msgs, {
        text: response.text,
        isUser: false,
        time: new Date()
      }]);
      this.scrollToBottom();
    } catch (e) {
      console.error("AI Reaction Error", e);
    } finally {
      this.isAiTyping.set(false);
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
