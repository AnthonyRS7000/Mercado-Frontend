"use client";

import { useState, useEffect } from 'react';
import { MenuIcon, ShoppingCartIcon, UserCircleIcon, LogoutIcon, ArchiveIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import logo from '../../../public/images/Logo.svg';
import ModalLogin from './modal-login';
import styles from '../css/Header.css'; // Asegúrate de que la ruta sea correcta

export function HeaderSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser).related_data.nombre);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header className="bg-blue-800 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <Image src={logo} alt="Logo de Tienda" width={36} height={36} />
            <span className="text-lg font-bold text-white">Mercado Huanuco</span>
          </Link>
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <MenuIcon className="h-6 w-6 text-white" />
            <span className="text-lg font-bold text-white">Categorías</span>
          </Link>
          <div className="relative w-full max-w-md">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-full rounded-lg bg-background pl-8" />
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-gray-300 hover:text-primary transition-colors" prefetch={false}>Inicio</Link>
          <Link href="#" className="text-gray-300 hover:text-primary transition-colors" prefetch={false}>Productos</Link>
          <Link href="#" className="text-gray-300 hover:text-primary transition-colors" prefetch={false}>Carrito</Link>
          {/* <Link href="#" className="text-gray-300 hover:text-primary transition-colors" prefetch={false}>Proveedor</Link> */}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="#" className="relative" prefetch={false}>
            <ShoppingCartIcon className="h-6 w-6 text-gray-300" />
            <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full px-2 py-1 text-xs font-bold">3</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">{user ? user : 'Mi Cuenta'}</span>
                <UserCircleIcon className="h-8 w-8 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!user && (
                <DropdownMenuItem onSelect={openModal}>
                  <UserCircleIcon className="h-4 w-4 mr-2" /> Iniciar sesión / Regístrate
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <ArchiveIcon className="h-4 w-4 mr-2" /> Pedidos
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShoppingCartIcon className="h-4 w-4 mr-2" /> Mi Carrito
              </DropdownMenuItem>
              {user && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleLogout}>
                    <LogoutIcon className="h-4 w-4 mr-2" /> Cerrar Sesión
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ModalLogin isOpen={isModalOpen} onClose={closeModal} setUser={setUser} />
    </header>
  );
}

export default HeaderSection;
