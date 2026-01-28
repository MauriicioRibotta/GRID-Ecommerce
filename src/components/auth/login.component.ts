import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  template: `
    <div class="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      <app-header></app-header>
      
      <main class="flex-1 flex items-center justify-center p-6">
        <div class="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl">
          
          <!-- Toggles -->
          <div class="flex gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-2">
            <button (click)="mode.set('login')" 
                    class="pb-2 text-lg font-bold transition-all border-b-2"
                    [class.text-primary]="mode() === 'login'"
                    [class.border-primary]="mode() === 'login'"
                    [class.text-slate-400]="mode() !== 'login'"
                    [class.border-transparent]="mode() !== 'login'">
              Iniciar Sesión
            </button>
            <button (click)="mode.set('register')" 
                    class="pb-2 text-lg font-bold transition-all border-b-2"
                    [class.text-primary]="mode() === 'register'"
                    [class.border-primary]="mode() === 'register'"
                    [class.text-slate-400]="mode() !== 'register'"
                    [class.border-transparent]="mode() !== 'register'">
              Registrarse
            </button>
          </div>

          <div class="text-left mb-6">
            <h1 class="text-2xl font-black mb-1 dark:text-white">{{ mode() === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta' }}</h1>
            <p class="text-slate-500 text-sm">{{ mode() === 'login' ? 'Ingresa para gestionar tu colección.' : 'Únete a GRID para curar tu espacio.' }}</p>
          </div>

          @if (errorMessage()) {
             <div class="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm mb-4">
               {{ errorMessage() }}
             </div>
          }

          <div class="flex flex-col gap-4">
             @if (mode() === 'register') {
               <div class="flex flex-col gap-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-500">Nombre Completo</label>
                  <input [(ngModel)]="fullName" 
                         class="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary dark:text-white" 
                         placeholder="Ej: Ana García" 
                         type="text"
                         [disabled]="loading()"/>
               </div>
             }

             <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-500">Email</label>
                <input [(ngModel)]="email" 
                       class="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary dark:text-white" 
                       placeholder="tu@email.com" 
                       type="email" 
                       [disabled]="loading()"/>
             </div>

             <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-500">Contraseña</label>
                <input [(ngModel)]="password" 
                       class="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary dark:text-white" 
                       placeholder="••••••••" 
                       type="password" 
                       [disabled]="loading()"/>
             </div>

             <button (click)="submit()" 
                     [disabled]="loading() || !email || !password"
                     class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
               @if(loading()) {
                 <span class="material-symbols-outlined animate-spin text-sm">progress_activity</span>
               }
               <span>{{ mode() === 'login' ? 'Entrar' : 'Registrarme' }}</span>
             </button>
             
             <div class="relative py-4">
               <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
               <div class="relative flex justify-center text-xs uppercase"><span class="bg-white dark:bg-slate-900 px-2 text-slate-500">O continúa con</span></div>
             </div>

             <button (click)="signInGoogle()" class="w-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
               <svg class="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
               Google
             </button>
          </div>
        </div>
      </main>
    </div>
  `
})
export class LoginComponent {
  mode = signal<'login' | 'register'>('login');
  email = '';
  password = '';
  fullName = '';

  loading = signal(false);
  errorMessage = signal('');

  constructor(private authService: AuthService) { }

  async submit() {
    this.loading.set(true);
    this.errorMessage.set('');

    try {
      if (this.mode() === 'login') {
        const { error } = await this.authService.signInWithPassword(this.email, this.password);
        if (error) throw error;
      } else {
        const { error } = await this.authService.signUp(this.email, this.password, this.fullName);
        if (error) throw error;
        alert('¡Cuenta creada! Por favor verifica tu email o inicia sesión.');
        this.mode.set('login');
      }
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Ocurrió un error');
    } finally {
      this.loading.set(false);
    }
  }

  async signInGoogle() {
    await this.authService.signInWithGoogle();
  }
}
