import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private fb: FormBuilder) {
    this.supabase = createClient(
      'https://pejwmlwuijrfwfjesxzj.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlandtbHd1aWpyZndmamVzeHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NDk0NTMsImV4cCI6MjA1ODAyNTQ1M30.mMeZ7ujW6iZ_1hIQLGgPWhDmmkqHeJx-K6nixc9lVCA'
    );
  }
  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async getUser() {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();
    return user;
  }
}
