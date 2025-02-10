'use client';

import { useState } from 'react';

import { UserPlus, Mail, Phone, Lock, Loader2, ArrowRight } from "lucide-react";


export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Welcome aboard! 🎉",
      description: "Your account has been successfully created.",
    });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen backdrop-blur-xl bg-background/60 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="relative">
            {/* Glass Card */}
            <div className="backdrop-blur-3xl bg-background/40 border border-white/10 rounded-3xl shadow-2xl p-8 space-y-8">
              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-primary/10 rounded-full animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary/20 rounded-full animate-pulse delay-300" />
              
              {/* Content */}
              <div className="relative space-y-2 text-center">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Join Us
                </h1>
                <p className="text-muted-foreground">
                  Start your journey with our community
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative">
                <div className="grid gap-6">
                  {/* Name input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <div className="relative group">
                      <UserPlus className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                      <input
                        id="name"
                        placeholder="John Doe"
                        className="pl-10 bg-background/50 border-muted/30 focus:border-primary transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone input */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="pl-10 bg-background/50 border-muted/30 focus:border-primary transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Email input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10 bg-background/50 border-muted/30 focus:border-primary transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Password input */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Create Password
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                      <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-background/50 border-muted/30 focus:border-primary transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full group hover:shadow-lg transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating your account...
                    </>
                  ) : (
                    <>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background/50 px-2 text-muted-foreground">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="text-center">
                <a 
                  href="/login" 
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Sign in to your account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}