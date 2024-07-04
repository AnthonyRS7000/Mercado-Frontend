// src/pages/proveedor.jsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import bdMercado from '@/services/bdMercado';
import styles from '../css/Proveedor.module.css'; // Asegúrate de que la ruta sea correcta

const ProveedorPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser).related_data.nombre);
    } else {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <div className={styles.proveedorContainer}>
      <div className={styles.menuBar}>
        <h1>Bienvenido, {user}</h1>
        <Button onClick={handleLogout}>Cerrar Sesión</Button>
        <ul>
          <li>
            <Link href="/vender">
              <a>Vende</a>
            </Link>
          </li>
          <li>
            <Link href="/ventas">
              <a>Mira tus ventas</a>
            </Link>
          </li>
          <li>
            <Link href="/estadisticas">
              <a>Estadística</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.content}>
        {/* Contenido adicional según la opción seleccionada */}
      </div>
    </div>
  );
};

export default ProveedorPage;
