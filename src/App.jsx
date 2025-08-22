import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // 👈 importa tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


export default function App() {
  const images = [
    "/portada1b.png",
    "/portada2.jpg",
    "/portada3.jpg"
  ];

  const [index, setIndex] = useState(0);

  // Carrusel principal automático
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [index]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  // Estado modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);

  // Lista de productos
  const products = {
    durito: {
      name: "Durito",
      images: ["/img/producto1.png", "/img/producto1b.jpg", "/img/producto1c.png"],
      description: "Delicioso durito crujiente hecho de trigo.",
      presentations: ["Bolsa 100g - $15", "Bolsa 250g - $30"]
    },
    papa: {
      name: "Papa Deshidratada",
      images: ["public/producto2.jpg", "/img/producto2b.jpg"],
      description: "Crujiente papa deshidratada, ideal como botana.",
      presentations: ["Bolsa 100g - $20", "Bolsa 450g - $40", "Bolsa 3KG - "]
    },
    rotini: {
      name: "Rotini",
      images: ["/img/producto3.jpg", "/img/producto3b.jpg"],
      description: "Fritura de trigo en forma de rotini, sabor tradicional.",
      presentations: ["Bolsa 150g - $25", "Bolsa 300g - $45"]
    },
    minicuadro: {
      name: "Minicuadro",
      images: ["/img/producto4.jpg"],
      description: "Pequeños cuadros de trigo crujientes.",
      presentations: ["Bolsa 100g - $18", "Bolsa 250g - $35"]
    },
    mix: {
      name: "Mix",
      images: ["/img/producto5.jpg"],
      description: "Combinación de frituras variadas.",
      presentations: ["Bolsa 200g - $30", "Bolsa 400g - $55"]
    },
    chetos: {
      name: "Chetos",
      images: ["/img/producto6.jpg", "/img/producto6b.jpg"],
      description: "Crujientes chetos de maíz.",
      presentations: ["Bolsa 150g - $22", "Bolsa 300g - $40"]
    },
    tostada: {
      name: "Tostada Amarilla",
      images: ["/img/producto7.jpg"],
      description: "Tostada de maíz amarillo, lista para acompañar.",
      presentations: ["Paquete 20 pzas - $25", "Paquete 50 pzas - $55"]
    },
    totopo: {
      name: "Totopo",
      images: ["/img/producto8.jpg", "/img/producto9.jpg"],
      description: "Totopo clásico de maíz, perfecto para dips.",
      presentations: ["Bolsa 200g - $28", "Bolsa 500g - $60"]
    }
  };

  // Carrusel automático dentro del modal
  useEffect(() => {
    if (!selectedProduct) return;
    setModalIndex(0); // reinicia al abrir modal
    const interval = setInterval(() => {
      setModalIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedProduct]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="bg-yellow-500 shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Bocuates Logo" className="h-12 w-auto object-contain"/>
          </div>
          <div className="hidden md:flex space-x-8 text-white font-medium">
            <a href="#quienes" className="hover:text-gray-200 transition">Quiénes Somos</a>
            <a href="#productos" className="hover:text-gray-200 transition">Productos</a>
            <a href="#contacto" className="hover:text-gray-200 transition">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Carrusel principal */}
<div className="relative w-full overflow-hidden bg-black">
  <AnimatePresence mode="wait">
    <motion.img
      key={index}
      src={images[index]}
      alt="Imagen carrusel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full h-[600px] md:h-[700px] object-cover" // ← ajusta estas alturas
    />
  </AnimatePresence>

  {/* Flechas */}
  <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md z-10">
    <ChevronLeft className="w-6 h-6 text-gray-800" />
  </button>
  <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md z-10">
    <ChevronRight className="w-6 h-6 text-gray-800" />
  </button>

  {/* Indicadores */}
  <div className="absolute bottom-4 w-full flex justify-center gap-3 z-10">
    {images.map((_, i) => (
      <button
        key={i}
        onClick={() => setIndex(i)}
        className={`w-3 h-3 rounded-full ${i === index ? "bg-yellow-400" : "bg-white/70"}`}
      ></button>
    ))}
  </div>
</div>



      {/* Quiénes Somos */}
      <section id="quienes" className="py-16 px-8 bg-white text-center">
        <h2 className="text-6xl font-bold mb-6">Quiénes Somos</h2>
        <p className="max-w-4xl mx-auto text-lg text-gray-700">
          En <strong>Bocuates</strong> somos una empresa mexicana dedicada a la producción y venta de frituras con el mejor sabor y calidad.
        </p>
        <img src="/sello.png" alt="Bocuates sello" className="max-h-64 mx-auto mt-6 object-contain" />
      </section>

      {/* Productos */}
      <section id="productos" className="py-16 px-8 bg-yellow-400 text-center">
        <h1 className="text-6xl font-bold mb-6">Nuestros Productos</h1>
        <h2 className="text-3xl font-bold mb-6">Trigo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["durito", "papa", "rotini", "minicuadro", "mix", "chetos"].map((key) => (
            <div key={key} className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-xl transition" onClick={() => setSelectedProduct(products[key])}>
              <img src={products[key].images[0]} alt={products[key].name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold">{products[key].name}</h3>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-6">Maíz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {["tostada", "totopo"].map((key) => (
            <div key={key} className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-xl transition" onClick={() => setSelectedProduct(products[key])}>
              <img src={products[key].images[0]} alt={products[key].name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold">{products[key].name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Modal con carrusel */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white rounded-2xl p-6 w-96 shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              ✖
            </button>

            <h3 className="text-2xl font-bold mb-4">{selectedProduct.name}</h3>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={modalIndex}
                  src={selectedProduct.images[modalIndex]}
                  alt={selectedProduct.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              </AnimatePresence>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalIndex(
                    (prev) =>
                      (prev - 1 + selectedProduct.images.length) %
                      selectedProduct.images.length
                  );
                }}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white p-1 rounded-full shadow-md"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalIndex((prev) => (prev + 1) % selectedProduct.images.length);
                }}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white p-1 rounded-full shadow-md"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>

              <div className="absolute bottom-2 w-full flex justify-center gap-2">
                {selectedProduct.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalIndex(i);
                    }}
                    className={`w-2 h-2 rounded-full ${
                      i === modalIndex ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                  ></button>
                ))}
              </div>
            </div>

            <p className="text-gray-700 mb-4">{selectedProduct.description}</p>

            <ul className="space-y-2">
              {selectedProduct.presentations.map((precio, i) => (
                <li key={i} className="text-lg">{precio}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}

      {/* Contacto */}
      <section id="contacto" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-yellow-600">Contáctanos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <form action="https://formspree.io/f/xpwlgdjb" method="POST" className="bg-white shadow-lg rounded-2xl p-8">
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input type="text" name="nombre" required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Correo</label>
                <input type="email" name="email" required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mensaje</label>
                <textarea name="mensaje" rows="4" required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
              </div>
              <button type="submit" className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow hover:bg-yellow-600 transition">Enviar</button>
            </form>

            <div className="flex flex-col items-center justify-center space-y-6 mt-8">
              <p className="text-lg text-gray-700 text-center">También puedes encontrarnos en nuestras redes sociales:</p>
              <div className="flex space-x-6 text-4xl">
                <a href="https://facebook.com/profile.php?id=61561470997998&sk=about" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:scale-110 transition"><FaFacebook /></a>
                <a href="https://instagram.com/bocuates" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:scale-110 transition"><FaInstagram /></a>
                <a href="https://wa.me/5218122123096" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:scale-110 transition"><FaWhatsapp /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6 text-center">
        © {new Date().getFullYear()} Bocuates - Todos los derechos reservados
      </footer>
    </div>
  );
}
