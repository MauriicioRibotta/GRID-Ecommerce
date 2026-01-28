import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private supabase = inject(SupabaseService).supabase;
    private auth = inject(AuthService);

    get isAdmin() {
        // Strict check: verified via RLS in backend, but good for UI hiding
        const profile = this.auth.userProfile();
        return profile?.role === 'admin';
    }

    async uploadImage(file: File) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await this.supabase.storage
            .from('product-images')
            .upload(filePath, file);

        if (error) throw error;

        // Get Public URL
        const { data: { publicUrl } } = this.supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        return publicUrl;
    }

    async createProduct(product: any) {
        const { data, error } = await this.supabase
            .from('products')
            .insert(product)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
    async getDashboardStats() {
        const { data: orders, error } = await this.supabase
            .from('orders')
            .select('total, created_at')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const totalRevenue = orders?.reduce((sum, order) => sum + (Number(order.total) || 0), 0) || 0;
        const totalOrders = orders?.length || 0;
        const recentOrders = orders?.slice(0, 5) || [];

        return { totalRevenue, totalOrders, recentOrders };
    }
}
