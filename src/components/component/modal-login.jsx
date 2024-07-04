"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { MailIcon, LockIcon, ChromeIcon, FacebookIcon } from "../icons";
import styles from '../css/ModalLogin.module.css';
import bdMercado from '@/services/bdMercado';

const ModalLogin = ({ isOpen, onClose, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        await bdMercado.get('/sanctum/csrf-cookie');
      } catch (error) {
        console.error('Error al obtener el token CSRF:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await bdMercado.post('/login', { email, password });
      const { access_token, user } = response.data;

      // Guardar el token y los datos del usuario en el localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      // Establecer el usuario en el estado global
      setUser(user.related_data.nombre);

      // Cerrar el modal
      onClose();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      console.log('Detalles del error:', error.response?.data || error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[425px] ${styles.modalContainer} p-6 rounded-lg shadow-lg`}>
        <DialogTitle className={`text-3xl font-bold ${styles.modalTitle}`}>Welcome Back</DialogTitle>
        <DialogDescription className="text-gray-600">Enter your credentials to access your account</DialogDescription>
        <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-6 py-8">
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div className="relative">
              <Input id="email" type="email" placeholder="Email" className={`pl-10 ${styles.modalInput}`} value={email} onChange={(e) => setEmail(e.target.value)} />
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
            <div className="relative">
              <Input id="password" type="password" placeholder="Password" className={`pl-10 ${styles.modalInput}`} value={password} onChange={(e) => setPassword(e.target.value)} />
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" defaultChecked />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link href="#" className={`text-sm font-medium ${styles.modalLink} hover:${styles.modalLinkHover}`} prefetch={false}>
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className={`w-full ${styles.modalButton} hover:${styles.modalButtonHover}`}>Sign In</Button>
          </form>
          <div className="flex items-center space-x-4">
            <div className="h-px flex-1 bg-gray-300" />
            <p className="px-4 text-gray-600">or</p>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-100">
              <ChromeIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-100">
              <FacebookIcon className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="#" className={`font-medium ${styles.modalLink} hover:${styles.modalLinkHover}`} prefetch={false}>
              Sign up
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalLogin;
