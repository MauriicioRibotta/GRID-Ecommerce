import { Injectable, computed, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User, Session } from '@supabase/supabase-js';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _currentUser = signal<User | null>(null);
    private _session = signal<Session | null>(null);

    currentUser = computed(() => this._currentUser());
    session = computed(() => this._session());

    constructor(private supabaseService: SupabaseService, private router: Router) {
        // Initialize session
        this.supabaseService.supabase.auth.getSession().then(({ data: { session } }) => {
            this._session.set(session);
            this._currentUser.set(session?.user ?? null);
        });

        // Listen for changes
        this.supabaseService.supabase.auth.onAuthStateChange(async (_event, session) => {
            this._session.set(session);
            const user = session?.user ?? null;
            this._currentUser.set(user);

            if (user) {
                await this.fetchProfile(user.id);
            } else {
                this._userProfile.set(null);
            }
        });
    }

    private _userProfile = signal<any>(null);
    userProfile = computed(() => this._userProfile());

    async fetchProfile(userId: string) {
        const { data } = await this.supabaseService.supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        if (data) {
            this._userProfile.set(data);
        }
    }

    async signInWithEmail(email: string) {
        const { error } = await this.supabaseService.supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: true, // Auto-register
            }
        });
        return { error };
    }

    async signUp(email: string, password: string, fullName: string) {
        const { data, error } = await this.supabaseService.supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTQElRzJheskXbGPou0I9kQtXDsDK9Qoqx4O6TJbpmnQZZS4M7oiUJ_yXxUBhEcoQpmyRW1P94G2rNZcwG2mWAuAd9cfWnlpWpMnm3eI-OAvibPnHvYM9pHxZKlyCo9V8VlK0szUzKLG3BYXZy5KVqALN_QEs8ZJ8FDoQdYi5rYTBBsEeFY2_l675oeVoGG4o_o2geX4SfO6S8GcW1-j_BrS0_YyEoMro_kD8WlTITqYyfXueHEjFIT3dE_C1h3GP8RQnptVYCLLdV'
                }
            }
        });
        return { data, error };
    }

    async signInWithPassword(email: string, password: string) {
        const { data, error } = await this.supabaseService.supabase.auth.signInWithPassword({
            email,
            password
        });
        if (!error) {
            this.router.navigate(['/home']);
        }
        return { data, error };
    }

    async signInWithGoogle() {
        const { data, error } = await this.supabaseService.supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        return { data, error };
    }

    async signOut() {
        await this.supabaseService.supabase.auth.signOut();
        this.router.navigate(['/home']);
    }

    get profile() {
        return this.currentUser()?.user_metadata || {};
    }
}
