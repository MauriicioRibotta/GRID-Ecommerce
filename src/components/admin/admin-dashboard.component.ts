import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  template: `
    <div class="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      <app-header></app-header>
      
      <main class="max-w-4xl mx-auto p-6 md:p-12">
        <h1 class="text-3xl font-black mb-8">Panel de Administración</h1>

        <!-- Stats Section -->
        @if (stats()) {
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-lg">
                    <p class="text-slate-500 text-sm font-bold uppercase mb-2">Ingresos Totales</p>
                    <p class="text-4xl font-black text-primary">\${{ stats()!.totalRevenue | number:'1.2-2' }}</p>
                </div>
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-lg">
                    <p class="text-slate-500 text-sm font-bold uppercase mb-2">Ventas Totales</p>
                    <p class="text-4xl font-black dark:text-white">{{ stats()!.totalOrders }}</p>
                </div>
            </div>
        }

        <h2 class="text-xl font-bold mb-4 dark:text-white">Subir Nueva Obra</h2>

        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl">
           <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
             
             <!-- Left: Form -->
             <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                   <label class="text-xs font-bold uppercase tracking-wider text-slate-500">Título</label>
                   <input [(ngModel)]="title" class="input-field" placeholder="Ej: Abstract Flow" />
                </div>

                <div class="flex flex-col gap-2">
                   <label class="text-xs font-bold uppercase tracking-wider text-slate-500">Precio</label>
                   <input [(ngModel)]="price" type="number" class="input-field" placeholder="250" />
                </div>

                <div class="flex flex-col gap-2">
                   <label class="text-xs font-bold uppercase tracking-wider text-slate-500">Imagen</label>
                   <input type="file" (change)="onFileSelected($event)" class="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                </div>
                
                <div class="flex flex-col gap-2">
                    <label class="text-xs font-bold uppercase tracking-wider text-slate-500">Etiquetas (Separadas por coma)</label>
                    <input [(ngModel)]="tagsInput" class="input-field" placeholder="trending, large, abstract" />
                </div>

                 <div class="flex flex-col gap-2">
                    <label class="text-xs font-bold uppercase tracking-wider text-slate-500">Psicología</label>
                    <select [(ngModel)]="psychology" class="input-field">
                        <option value="balance">Equilibrio</option>
                        <option value="energy">Energía</option>
                        <option value="serenity">Serenidad</option>
                        <option value="introspection">Introspección</option>
                    </select>
                </div>

                <button (click)="upload()" [disabled]="uploading()" class="btn-primary mt-4">
                  {{ uploading() ? 'Subiendo...' : 'Publicar Obra' }}
                </button>
             </div>

             <!-- Right: Preview -->
             <div class="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 min-h-[300px]">
                @if (previewUrl()) {
                  <img [src]="previewUrl()" class="max-h-[300px] rounded-lg shadow-lg object-contain" />
                } @else {
                  <span class="material-symbols-outlined text-4xl text-slate-300">image</span>
                  <p class="text-slate-400 text-sm mt-2">Vista previa</p>
                }
             </div>

           </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .input-field {
       @apply bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary dark:text-white w-full;
    }
    .btn-primary {
       @apply w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed;
    }
  `]
})
export class AdminDashboardComponent {
  adminService = inject(AdminService);

  // Stats
  stats = signal<{ totalRevenue: number, totalOrders: number } | null>(null);

  // Form
  title = '';
  price = 0;
  tagsInput = '';
  psychology = 'balance';
  selectedFile: File | null = null;

  previewUrl = signal<string | null>(null);
  uploading = signal(false);

  constructor() {
    this.loadStats();
  }

  async loadStats() {
    try {
      const data = await this.adminService.getDashboardStats();
      this.stats.set(data);
    } catch (err) {
      console.error('Error loading stats', err);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => this.previewUrl.set(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  async upload() {
    if (!this.selectedFile || !this.title) return;

    this.uploading.set(true);
    try {
      // 1. Upload Image
      const publicUrl = await this.adminService.uploadImage(this.selectedFile);

      // 2. Create Product
      await this.adminService.createProduct({
        title: this.title,
        price: this.price,
        image_url: publicUrl,
        metadata: {
          tags: this.tagsInput.split(',').map(t => t.trim()),
          psychology: this.psychology,
          paper: 'Museum Heritage 310'
        }
      });

      alert('Producto creado exitosamente');
      this.reset();
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      this.uploading.set(false);
    }
  }

  reset() {
    this.title = '';
    this.price = 0;
    this.tagsInput = '';
    this.selectedFile = null;
    this.previewUrl.set(null);
  }
}
