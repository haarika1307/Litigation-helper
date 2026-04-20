"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Real implementation would send a reset link via email.
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="flex items-center gap-2 mb-8 text-primary">
        <Scale className="h-8 w-8" />
        <span className="text-2xl font-bold font-serif tracking-tight">LexEvidence</span>
      </div>
      
      <Card className="w-full max-w-md shadow-lg border-none bg-white">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">Reset password</CardTitle>
          <CardDescription>Enter your email address and we'll send you a link to reset your password.</CardDescription>
        </CardHeader>
        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <Button className="w-full bg-slate-900 hover:bg-slate-800" type="submit">
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center p-4 bg-blue-50 text-blue-800 rounded-md">
              <p className="text-sm">If an account exists for <b>{email}</b>, you will receive password reset instructions.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t border-slate-100 mt-4 pt-6">
          <Link href="/login" className="flex items-center text-sm text-slate-500 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
