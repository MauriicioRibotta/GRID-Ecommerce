
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  template: `
    <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300 min-h-screen flex flex-col">
      <app-header></app-header>
      
      <main class="flex flex-1 flex-col items-center py-10 px-4 md:px-10 lg:px-20">
        <div class="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div class="lg:col-span-7 flex flex-col gap-8">
            <div class="flex flex-wrap items-center gap-2">
              <a class="text-slate-400 dark:text-[#9da6b9] text-sm font-medium leading-normal hover:text-primary" routerLink="/catalog">Galería</a>
              <span class="text-slate-400 dark:text-[#9da6b9] text-sm font-medium leading-normal">/</span>
              <a class="text-slate-400 dark:text-[#9da6b9] text-sm font-medium leading-normal hover:text-primary" routerLink="/catalog">Colección</a>
              <span class="text-slate-400 dark:text-[#9da6b9] text-sm font-medium leading-normal">/</span>
              <span class="text-slate-900 dark:text-white text-sm font-semibold leading-normal">Finalizar y Experiencia</span>
            </div>
            <div class="flex flex-col gap-3">
              <h1 class="text-4xl font-black leading-tight tracking-[-0.033em]">Finaliza tu Colección</h1>
              <p class="text-slate-500 dark:text-[#9da6b9] text-lg font-normal leading-normal">Confirma tu selección de impresiones Giclée de calidad museo y enmarcado artesanal sostenible.</p>
            </div>
            <div class="flex flex-col">
              <h2 class="text-[22px] font-bold leading-tight tracking-[-0.015em] pb-5 pt-2 border-b border-slate-200 dark:border-slate-800">1. Resumen del Pedido</h2>
              <div class="divide-y divide-slate-200 dark:divide-slate-800">
                <!-- Item 1 -->
                <div class="flex items-center gap-4 py-6 justify-between">
                  <div class="flex items-center gap-4">
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-20 border border-slate-200 dark:border-slate-800" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAeY9xeIWGiqUL0EQN8_FRhl-dw03bBIKT5zjsJ9sALVLeaYUuaYjeU_2mS_CRnJUag_rFFumgrl4gwXEvAa6TB14W8DNf80eCx6gcZFBIM7O26nhtUTLoDWhnMsF-4mSwbNZfLI5Nncihy11PZT6AFANdNX_igkjhYnTe4LaQOPVOGR-XQQ8n4GEYCQJFV1wQfWXzZTVoobogG_8oJ9TQxXaWfzcEAOVL7X99kQuVQ1bGX65MbUvzmBNlwFDQ_Phl4h2TO6qWR_79D");'></div>
                    <div class="flex flex-col justify-center">
                      <p class="text-base font-bold leading-normal">Impresión Giclée: 'Metropolis Shift'</p>
                      <p class="text-slate-500 dark:text-[#9da6b9] text-sm font-normal leading-normal">24x36", Papel de archivo libre de ácido</p>
                      <p class="text-primary text-xs font-semibold mt-1">Edición Limitada 1/50</p>
                    </div>
                  </div>
                  <div class="shrink-0 text-right">
                    <p class="text-lg font-bold leading-normal">$450.00</p>
                  </div>
                </div>
                <!-- Item 2 -->
                <div class="flex items-center gap-4 py-6 justify-between">
                  <div class="flex items-center gap-4">
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-20 border border-slate-200 dark:border-slate-800" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBya3vcv8W4eSIiXMTUPoX-9J_sAEsrQPwsSLscjA0jVpN5rmT45uz8QC1qDBzaRo9BlSzv2FqNGnWiRde4iuqo_Wy9yuGISu84Xj6w68UPcgOk-jPSoqrJfV6GsA-hJeadbriWZF4ef7u3xnkXSmgrsacnlfvFtrJmsS-d_SJfsHlgNnlmb9rs3KMcFoWtaIjHloQZcdp6ztS2s6y2a0hyonM9e4UQTJ70HSc5MvwnrAr37vLy9gyRA1AlHTysSYPCJmF_fQ-ycKEm");'></div>
                    <div class="flex flex-col justify-center">
                      <p class="text-base font-bold leading-normal">Marco Premium Sostenible</p>
                      <p class="text-slate-500 dark:text-[#9da6b9] text-sm font-normal leading-normal">Roble Carbonizado Artesanal, Cristal Antirreflejante</p>
                    </div>
                  </div>
                  <div class="shrink-0 text-right">
                    <p class="text-lg font-bold leading-normal">$185.00</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-6 mt-4">
              <h2 class="text-[22px] font-bold leading-tight tracking-[-0.015em]">2. Método de Pago</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button class="flex items-center gap-4 p-4 rounded-xl border-2 border-primary bg-primary/5 text-left">
                  <span class="material-symbols-outlined text-primary">credit_card</span>
                  <div>
                    <p class="text-sm font-bold">Tarjeta de Crédito</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">Visa, Mastercard, Amex</p>
                  </div>
                </button>
                <button class="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 text-left transition-all">
                  <span class="material-symbols-outlined">account_balance_wallet</span>
                  <div>
                    <p class="text-sm font-bold">Billetera Digital</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">Apple Pay, Google Pay</p>
                  </div>
                </button>
              </div>
              <div class="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-xl flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-500">Número de Tarjeta</label>
                  <input class="bg-white dark:bg-background-dark border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary" placeholder="**** **** **** 4242" type="text"/>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-xs font-bold uppercase tracking-wider text-slate-500">Fecha de Expiración</label>
                    <input class="bg-white dark:bg-background-dark border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary" placeholder="MM/AA" type="text"/>
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-xs font-bold uppercase tracking-wider text-slate-500">CVC</label>
                    <input class="bg-white dark:bg-background-dark border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary" placeholder="***" type="text"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-5 flex flex-col gap-8">
            <div class="glass-effect rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/10 dark:bg-[#1e2430]">
              <div class="bg-primary px-6 py-4 flex items-center justify-between">
                <h3 class="text-white font-bold tracking-tight">EXPERIENCIA DE UNBOXING</h3>
                <span class="material-symbols-outlined text-white text-sm">auto_awesome</span>
              </div>
              <div class="p-6 flex flex-col gap-6">
                <div class="flex flex-col gap-3">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary scale-75">person_celebrate</span>
                    <p class="text-xs font-bold uppercase tracking-widest text-slate-400">El Artesano</p>
                  </div>
                  <div class="relative group">
                    <div class="aspect-video rounded-xl bg-slate-800 bg-cover bg-center overflow-hidden" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0CFOYzDp_U6Hp-igvDuWDhQkkszxephIk9b6aMJKPbfI827OtBG-rU0ozMaa9Hdj9Ry_lAO88BP7Fn6biN-bQ5wXo0-jH2XmDRgwRCpu7n1joKxFggJEk6wpBt-7N0pFhQRbRT_3qsV5bDTy5K6iGRBO1kWUAXE_v-EuUDwNTpNsJMVodNxtvQpohBq_dFmQJnQdmgrODDeyOCGMdLD8dDxfkwlv6DvOzvcDj8g7sIDbKI3uVvf7s1pRh1Immz5pUPpIMUo2tpx_j');">
                      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                        <p class="text-white text-sm font-medium">Actualmente curado por Elena S.</p>
                        <p class="text-white/70 text-xs italic">"Inspección manual de la calidad del papel de archivo"</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-3">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary scale-75">edit_note</span>
                    <p class="text-xs font-bold uppercase tracking-widest text-slate-400">Toque Personal</p>
                  </div>
                  <div class="bg-[#fdfbf7] p-6 rounded-lg shadow-inner relative transform rotate-1">
                    <div class="absolute top-0 left-0 w-full h-1 bg-slate-200/20"></div>
                    <p class="text-slate-800 text-lg leading-relaxed italic" style="font-family: 'Times New Roman', serif;">
                                            Estimado Coleccionista,<br/><br/>
                                            Gracias por llevar 'Metropolis Shift' a su hogar. Esta pieza fue impresa con meticuloso cuidado en papel de algodón de archivo para asegurar que su belleza perdure toda la vida.<br/><br/>
                                            Atentamente, <span class="font-bold">GRID Studio</span>
                    </p>
                  </div>
                  <p class="text-[10px] text-center text-slate-500 uppercase tracking-tighter mt-1">Vista previa virtual de su nota de agradecimiento física</p>
                </div>
                <div class="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span class="material-symbols-outlined text-emerald-500">eco</span>
                  <div>
                    <p class="text-xs font-bold text-emerald-500 uppercase">Entrega Climáticamente Neutra</p>
                    <p class="text-[11px] text-slate-400">Embalaje de lujo 100% libre de plástico y reciclable.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-4 p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/40">
              <div class="flex flex-col gap-2">
                <div class="flex justify-between text-sm">
                  <span class="text-slate-500">Subtotal</span>
                  <span>$635.00</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-slate-500">Envío de Lujo (Asegurado)</span>
                  <span>$0.00</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-slate-500">Impuestos</span>
                  <span>$50.80</span>
                </div>
              </div>
              <div class="h-px bg-slate-200 dark:bg-slate-800 my-2"></div>
              <div class="flex justify-between items-end">
                <span class="text-lg font-bold">Total</span>
                <div class="text-right">
                  <p class="text-2xl font-black text-primary">$685.80</p>
                  <p class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">USD</p>
                </div>
              </div>
              <button class="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98]">
                                Completar Pedido y Asegurar Mi Obra
              </button>
              <div class="flex items-center justify-center gap-2 mt-2">
                <span class="material-symbols-outlined text-xs text-slate-400">verified_user</span>
                <span class="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Calidad de Museo Garantizada</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer class="mt-auto border-t border-slate-200 dark:border-slate-800 py-10 px-10 text-center">
        <p class="text-slate-400 text-sm">© 2024 GRID Curated Design. Todos los derechos reservados. <span class="mx-2">|</span> Diseñado para coleccionistas.</p>
      </footer>
    </div>
  `
})
export class CheckoutComponent { }
