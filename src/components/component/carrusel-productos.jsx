"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import bdMercado from "@/services/bdMercado";

export function CarruselProductos() {
  const [categorias, setCategorias] = useState([]);
  const [currentIndexes, setCurrentIndexes] = useState({});

  useEffect(() => {
    const fetchCategoriasConProductos = async () => {
      try {
        const response = await bdMercado.get('/categoria-productos');
        const data = response.data;
        setCategorias(data);
        // Inicializar el índice actual para cada categoría
        const initialIndexes = {};
        data.forEach(categoria => {
          initialIndexes[categoria.id] = 0;
        });
        setCurrentIndexes(initialIndexes);
      } catch (error) {
        console.error('Error al obtener las categorías con productos:', error);
      }
    };

    fetchCategoriasConProductos();
  }, []);

  const handlePrevClick = (categoriaId) => {
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [categoriaId]: (prevIndexes[categoriaId] - 1 + categorias.find(cat => cat.id === categoriaId).productos.length) % categorias.find(cat => cat.id === categoriaId).productos.length
    }));
  };

  const handleNextClick = (categoriaId) => {
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [categoriaId]: (prevIndexes[categoriaId] + 1) % categorias.find(cat => cat.id === categoriaId).productos.length
    }));
  };

  return (
    <div>
      {categorias.map((categoria) => {
        const visibleProducts = categoria.productos.slice(currentIndexes[categoria.id], currentIndexes[categoria.id] + 5);
        return (
          <section key={categoria.id} className="bg-white py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mb-8 md:mb-12">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-black">{categoria.nombre}</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {visibleProducts.map((product) => (
                  <div key={product.id} className="relative overflow-hidden rounded-lg shadow-lg group">
                    <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                      <span className="sr-only">View</span>
                    </Link>
                    <img src={`http://localhost:8000${product.imagen}`} alt={product.nombre} width={400} height={300} className="object-cover w-full h-60" />
                    <div className="p-4 bg-white">
                      <h3 className="text-lg font-semibold text-black">{product.nombre}</h3>
                      <p className="text-sm text-black">{product.descripcion}</p>
                      <h4 className="text-base font-semibold text-black">S/.{product.precio}</h4>
                      <div className="mt-4 flex justify-between items-center">
                        <Button className="bg-primary text-white hover:bg-[#2a65c2]">Comprar</Button>
                        <Button variant="outline" className="border-primary text-primary hover:bg-[#2a65c2] hover:text-white">Agregar al Carrito</Button>
                      </div>
                    </div>
                  </div>
                ))}
                {categoria.productos.length > 5 && (
                  <div className="relative col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-5 flex items-center justify-between">
                    <Button onClick={() => handlePrevClick(categoria.id)} className="absolute left-0 transform -translate-x-1/2">
                      <ArrowLeftIcon className="w-5 h-5" />
                    </Button>
                    <Button onClick={() => handleNextClick(categoria.id)} className="absolute right-0 transform translate-x-1/2">
                      <ArrowRightIcon className="w-5 h-5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function ArrowLeftIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function CarruselProductos2() {
  return <CarruselProductos />;
}
