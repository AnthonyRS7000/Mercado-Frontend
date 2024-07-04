
import React from 'react';
import { CarruselProductos } from "@/components/component/carrusel-productos";
import { HeaderSection } from "@/components/component/header-section";

function Home() {
  return (
    <div className="body-bg">
      <div className="header-bg">
        <HeaderSection />
      </div>
      <CarruselProductos />
    </div>
  );
}

export default Home;
