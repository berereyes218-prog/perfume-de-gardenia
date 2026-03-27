"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, User, ChevronLeft, ChevronRight, Star, MessageCircle, Send, X } from "lucide-react";

// ============================================
// LINKS DE PAGO DE MERCADO PAGO POR CANTIDAD
// Reemplaza estas URLs con los links reales
// ============================================
const linksDePago: Record<number, string> = {
  1: "https://www.mercadopago.com.mx/checkout/v1/payment/1-boleto", // Link para 1 boleto
  2: "https://www.mercadopago.com.mx/checkout/v1/payment/2-boletos", // Link para 2 boletos
  3: "https://www.mercadopago.com.mx/checkout/v1/payment/3-boletos", // Link para 3 boletos
  4: "https://www.mercadopago.com.mx/checkout/v1/payment/4-boletos", // Link para 4 boletos
  5: "https://www.mercadopago.com.mx/checkout/v1/payment/5-boletos", // Link para 5 boletos
  6: "https://www.mercadopago.com.mx/checkout/v1/payment/6-boletos", // Link para 6 boletos
  7: "https://www.mercadopago.com.mx/checkout/v1/payment/7-boletos", // Link para 7 boletos
  8: "https://www.mercadopago.com.mx/checkout/v1/payment/8-boletos", // Link para 8 boletos
  9: "https://www.mercadopago.com.mx/checkout/v1/payment/9-boletos", // Link para 9 boletos
  10: "https://www.mercadopago.com.mx/checkout/v1/payment/10-boletos", // Link para 10 boletos
};

// Data
const funciones = [
  { fecha: "marzo 27, 2026", hora: "18:15", tipo: "Luneta" },
  { fecha: "marzo 27, 2026", hora: "21:45", tipo: "Luneta" },
  { fecha: "marzo 28, 2026", hora: "18:00", tipo: "Luneta" },
  { fecha: "marzo 28, 2026", hora: "21:15", tipo: "Luneta" },
  { fecha: "marzo 29, 2026", hora: "16:30", tipo: "Luneta" },
  { fecha: "marzo 29, 2026", hora: "18:45", tipo: "Luneta" },
  { fecha: "abril 02, 2026", hora: "19:00", tipo: "Luneta" },
  { fecha: "abril 03, 2026", hora: "18:15", tipo: "Luneta" },
  { fecha: "abril 03, 2026", hora: "21:15", tipo: "Luneta" },
  { fecha: "abril 04, 2026", hora: "18:00", tipo: "Luneta" },
  { fecha: "abril 04, 2026", hora: "21:15", tipo: "Luneta" },
  { fecha: "abril 05, 2026", hora: "16:30", tipo: "Luneta" },
  { fecha: "abril 05, 2026", hora: "18:45", tipo: "Luneta" },
  { fecha: "abril 09, 2026", hora: "19:00", tipo: "Luneta" },
];

const testimonios = [
  {
    nombre: "Ale S.",
    texto: "La verdad fui por curiosidad y wow! Me fascinó. Los vestuarios son impresionantes, todo lleno de brillo y color. Me encantó el papel de Aracely, toda una reina en el escenario! Sinceramente, salí queriendo regresar. Súper recomendado para una noche diferente.",
  },
  {
    nombre: "Nayeli I.",
    texto: "Tienen que ir! No esperaba que me gustara tanto. Cristian de la Fuente se roba las miradas, pero todos los actores estuvieron geniales. Y no puedo dejar de mencionar la música, que fue simplemente perfecta. Se nota que le pusieron mucho amor a esta producción. Súper recomendada para una noche especial.",
  },
  {
    nombre: "Jesús O.",
    texto: "La neta, fui porque mi mamá me invitó y pensé que me iba a aburrir, pero estuvo buenísima. El show es muy completo, con luces, baile, y los actores son muy buenos. Me reí, canté y hasta me emocioné. Hasta ganas de bailar me dieron con la Sonora Santanera! Si tienen chance, láncense, está chida.",
  },
  {
    nombre: "Alejandro S.",
    texto: "Wow, qué show! Yo fui porque siempre me ha gustado el estilo de las revistas musicales y la verdad es que Perfume de Gardenia no decepciona. Aracely Arámbula está guapísima y canta hermoso. Me sorprendió muchísimo la calidad de la producción; las coreografías, el vestuario, todo! Muy recomendado, de verdad vale la pena.",
  },
  {
    nombre: "Carlos D.",
    texto: "Fui con mi esposa y mis dos hijos y todos la pasamos increíble. Me encantó ver a Cristian de la Fuente, se nota que se divierte en el escenario y lo transmite. Además, la Sonora Santanera le da un toque muy especial, es como regresar a los buenos tiempos. Excelente espectáculo para ir en familia!",
  },
  {
    nombre: "María M.",
    texto: "Me dejó sin palabras, la puesta en escena es magnífica. David Zepeda qué bárbaro! Y Aracely se veía hermosa, como siempre. Una obra que tienes que ver!",
  },
];

const galeria = [
  "https://ext.same-assets.com/1325588046/2790838115.jpeg",
  "https://ext.same-assets.com/1325588046/1597956710.jpeg",
  "https://ext.same-assets.com/1325588046/3499223712.jpeg",
  "https://ext.same-assets.com/1325588046/3618925929.jpeg",
  "https://ext.same-assets.com/1325588046/1795733242.jpeg",
];

const faqs = [
  {
    pregunta: "¿Cómo escojo mis asientos?",
    respuesta: "La venta de boletos a través de esta página es con entrada general. Una vez realizada tu compra, recibirás un correo con todos los detalles para tu acceso al evento.",
  },
  {
    pregunta: "¿Dónde se presenta la obra?",
    respuesta: "La obra se presenta en el Teatro San Rafael con un gran auditorio para presentaciones y un espacio para exhibiciones.\n\nVirginia Fábregas 40, San Rafael, Cuauhtémoc, 06470 Ciudad de México, CDMX, México.",
  },
  {
    pregunta: "¿Puedo tomar fotos o videos durante la función?",
    respuesta: "Lamentablemente, está prohibido tomar fotos o grabar durante la actuación.\n\nSolicitamos amablemente a nuestros asistentes que apaguen sus dispositivos móviles y los mantengan guardados durante la presentación, para evitar distracciones a los demás espectadores.",
  },
  {
    pregunta: "¿Hay accesibilidad para sillas de ruedas?",
    respuesta: "Sí, nuestro teatro cuenta con accesibilidad para sillas de ruedas.\n\nSi necesitas asistencia adicional, por favor comunícanoslo al momento de comprar tus boletos o al llegar al teatro y estaremos encantados de ayudarte.",
  },
  {
    pregunta: "¿Es seguro comprar en esta página?",
    respuesta: "Queremos asegurarte que comprar tus boletos a través de nuestro sitio es completamente seguro. Nos tomamos muy en serio la seguridad de nuestros usuarios, por eso nuestro sitio está protegido con un certificado SSL, lo cual garantiza que toda la información que compartas esté encriptada y protegida.\n\nAdemás, los pagos se realizan a través de Stripe, una plataforma reconocida mundialmente por sus altos estándares de seguridad, que asegura que tus datos financieros estén siempre a salvo.",
  },
];

export default function Home() {
  const [tipoAsiento, setTipoAsiento] = useState("luneta");
  const [funcionSeleccionada, setFuncionSeleccionada] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'bot' | 'user', text: string}[]>([
    { role: 'bot', text: '¡Hola! Soy tu asistente de compras de Perfume de Gardenia. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatStep, setChatStep] = useState<'initial' | 'asking_phone' | 'got_phone'>('initial');
  const [userPhone, setUserPhone] = useState("");
  const testimoniosRef = useRef<HTMLDivElement>(null);
  const galeriaRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const precio = tipoAsiento === "luneta" ? 1290 : 990;
  const precioOriginal = tipoAsiento === "luneta" ? 1600 : 1200;

  const handleAddToCart = () => {
    setIsDialogOpen(true);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !email.trim()) {
      alert("Por favor, completa todos los campos");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido");
      return;
    }

    setIsSubmitting(true);

    // Obtener el link de pago según la cantidad
    const linkPago = linksDePago[cantidad];

    if (!linkPago) {
      alert("Link de pago no configurado para esta cantidad. Por favor, contacta al administrador.");
      setIsSubmitting(false);
      return;
    }

    // Guardar datos del cliente (aquí podrías enviarlos a un servidor)
    console.log("Datos del cliente:", { nombre, email, cantidad, tipoAsiento, funcion: funciones[funcionSeleccionada] });

    // Redirigir al link de pago
    window.location.href = linkPago;
  };

  const scrollTestimonios = (direction: "left" | "right") => {
    if (testimoniosRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      testimoniosRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollGaleria = (direction: "left" | "right") => {
    if (galeriaRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      galeriaRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput("");

    // Simular respuesta del bot
    setTimeout(() => {
      let botResponse = "";

      if (chatStep === 'asking_phone') {
        // Validar si parece un número de teléfono
        const phoneRegex = /[\d\s\-\+\(\)]{10,}/;
        if (phoneRegex.test(userMessage)) {
          setUserPhone(userMessage);
          setChatStep('got_phone');
          botResponse = `¡Perfecto! He registrado tu número: ${userMessage}. Un asesor se pondrá en contacto contigo pronto. ¿Hay algo más en lo que pueda ayudarte?`;
        } else {
          botResponse = "Por favor, ingresa un número de teléfono válido (10 dígitos).";
        }
      } else if (userMessage.toLowerCase().includes('precio') || userMessage.toLowerCase().includes('costo') || userMessage.toLowerCase().includes('cuanto')) {
        botResponse = "Los precios son:\n• Luneta: $1,290 MXN (antes $1,600)\n• Mezzanine: $990 MXN (antes $1,200)\n\n¿Te gustaría que un asesor te contacte para resolver más dudas?";
        setChatStep('initial');
      } else if (userMessage.toLowerCase().includes('horario') || userMessage.toLowerCase().includes('función') || userMessage.toLowerCase().includes('hora')) {
        botResponse = "Las funciones son:\n• Viernes: 6:15pm y 9:15pm\n• Sábados: 6:00pm y 9:15pm\n• Domingos: 4:30pm y 6:45pm\n\n¿Necesitas ayuda para elegir una fecha?";
        setChatStep('initial');
      } else if (userMessage.toLowerCase().includes('ubicación') || userMessage.toLowerCase().includes('donde') || userMessage.toLowerCase().includes('teatro') || userMessage.toLowerCase().includes('dirección')) {
        botResponse = "El show se presenta en el Teatro San Rafael:\n📍 Virginia Fábregas 40, San Rafael, Cuauhtémoc, 06470, CDMX\n\n¿Te gustaría comprar tus boletos ahora?";
        setChatStep('initial');
      } else if (userMessage.toLowerCase().includes('contacto') || userMessage.toLowerCase().includes('asesor') || userMessage.toLowerCase().includes('ayuda') || userMessage.toLowerCase().includes('duda') || userMessage.toLowerCase().includes('sí') || userMessage.toLowerCase().includes('si')) {
        botResponse = "¡Claro! Para que un asesor te contacte, por favor compárteme tu número de teléfono:";
        setChatStep('asking_phone');
      } else if (userMessage.toLowerCase().includes('comprar') || userMessage.toLowerCase().includes('boleto')) {
        botResponse = "¡Excelente elección! Para comprar tus boletos:\n1. Selecciona el tipo de asiento (Luneta o Mezzanine)\n2. Elige la fecha y hora\n3. Indica la cantidad de boletos\n4. Da click en 'Añadir al carrito'\n\n¿Necesitas que un asesor te ayude con tu compra?";
        setChatStep('initial');
      } else {
        botResponse = "Puedo ayudarte con información sobre:\n• Precios de boletos\n• Horarios de funciones\n• Ubicación del teatro\n• Proceso de compra\n\nO si prefieres, puedo conectarte con un asesor. ¿Qué te gustaría saber?";
        setChatStep('initial');
      }

      setChatMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#040404] text-[#ebe5e0]">
      {/* Header */}
      <header className="bg-[#a21715] py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="https://ext.same-assets.com/1325588046/971523517.png"
              alt="Perfume de Gardenia"
              className="h-16 md:h-20 object-contain"
            />
          </div>
          <Button
            className="bg-white text-black hover:bg-gray-100 font-semibold px-6 py-2 rounded-sm transition-all hover:scale-105"
          >
            Adquiere tus boletos
          </Button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-[#040404] py-8 text-center border-b border-[#a21715]/30">
        <div className="container mx-auto px-4">
          <h2 className="text-[#a21715] text-sm md:text-base font-semibold tracking-wider mb-4">
            PERFUME DE GARDENIA EN CDMX - ELIGE TU NUEVA FECHA
          </h2>
          <h3 className="text-xl md:text-2xl font-medium mb-4">Cada función es única.</h3>
          <p className="text-[#ebe5e0]/80 max-w-3xl mx-auto leading-relaxed">
            En <strong className="text-white">Perfume de Gardenia</strong>, los actores alternan los personajes en distintas presentaciones, ofreciendo a cada espectador una historia diferente según la noche que elija vivir.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Description */}
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                EL SHOW MÁS<br />ESPERADO DEL AÑO
              </h1>
              <div className="space-y-6 text-[#ebe5e0]/90 leading-relaxed">
                <p>
                  <strong className="text-white">Perfume de Gardenia</strong> es el musical mexicano de cabaret más espectacular del momento. Con más de 70 artistas en escena, vestuarios deslumbrantes y coreografías impactantes, esta producción reúne a las estrellas más queridas de la televisión mexicana en vivo y a solo unos metros del público.
                </p>
                <p>
                  Con la música completamente en vivo de la <strong className="text-white">Única Internacional Sonora Santanera</strong>, cuyos éxitos han pasado por generaciones, el espectáculo combina nostalgia, glamour y tradición en una historia de amor, pasión y traición ambientada en el mítico Cabaret Mambo.
                </p>
                <p>
                  Un show imperdible en CDMX que fusiona teatro musical, clásicos románticos y producción de primer nivel.
                </p>
              </div>

              {/* Seating Map */}
              <div className="mt-10">
                <img
                  src="https://ext.same-assets.com/1325588046/794785027.jpeg"
                  alt="Mapa de asientos"
                  className="w-full max-w-md rounded-lg shadow-2xl"
                />
              </div>

              {/* Schedule */}
              <div className="mt-8">
                <h4 className="font-semibold mb-3">Funciones CDMX:</h4>
                <div className="text-[#ebe5e0]/80 space-y-1">
                  <p>Viernes 6:15pm y 9:15pm</p>
                  <p>Sábados 6:00pm y 9:15pm</p>
                  <p>Domingos 4:30pm y 6:45pm</p>
                </div>
              </div>
            </div>

            {/* Right Column - Poster & Tickets */}
            <div className="animate-slide-in">
              {/* Poster */}
              <div className="mb-4">
                <img
                  src="https://ext.same-assets.com/1325588046/1597956710.jpeg"
                  alt="Perfume de Gardenia - Póster"
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
              {/* Rating Badge */}
              <div className="bg-white/95 rounded-lg py-3 px-4 flex items-center justify-center gap-3 backdrop-blur-sm mb-8">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-black font-medium">El 95.8% de los espectadores la recomiendan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Selection */}
      <section className="py-12 bg-[#0a0a0a]" id="boletos">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Seat Type Selection */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">1. Selecciona un tipo de asiento</h3>
            <RadioGroup
              value={tipoAsiento}
              onValueChange={setTipoAsiento}
              className="space-y-3"
            >
              <label
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  tipoAsiento === "luneta"
                    ? "border-[#a21715] bg-[#a21715]/10"
                    : "border-[#333] hover:border-[#555]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="luneta" id="luneta" />
                  <span className="font-medium">Luneta</span>
                </div>
                <div className="text-right">
                  <span className="text-[#888] line-through text-sm mr-2">$1600</span>
                  <span className="font-bold text-lg">$1290</span>
                </div>
              </label>
              <label
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  tipoAsiento === "mezzanine"
                    ? "border-[#a21715] bg-[#a21715]/10"
                    : "border-[#333] hover:border-[#555]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="mezzanine" id="mezzanine" />
                  <span className="font-medium">Mezzanine</span>
                </div>
                <div className="text-right">
                  <span className="text-[#888] line-through text-sm mr-2">$1200</span>
                  <span className="font-bold text-lg">$990</span>
                </div>
              </label>
            </RadioGroup>
          </div>

          {/* Function Selection */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">2. Selecciona una función</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {funciones.map((funcion, index) => (
                <button
                  key={`${funcion.fecha}-${funcion.hora}`}
                  onClick={() => setFuncionSeleccionada(index)}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    funcionSeleccionada === index
                      ? "border-[#a21715] bg-[#a21715]/10"
                      : "border-[#333] hover:border-[#555]"
                  }`}
                >
                  <div className="text-sm font-medium">{funcion.fecha}</div>
                  <div className="text-xs text-[#888]">{funcion.hora}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4">
            <select
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-[#a21715] hover:bg-[#8a1412] text-white font-semibold py-6 text-lg rounded-lg transition-all hover:scale-[1.02]"
            >
              Añadir al carrito - ${(precio * cantidad).toLocaleString()}.00
            </Button>
          </div>
        </div>
      </section>

      {/* Payment Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-[#333] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">Completa tu compra</DialogTitle>
            <DialogDescription className="text-[#888]">
              Ingresa tus datos para continuar con el pago
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitPayment} className="space-y-6 mt-4">
            {/* Resumen de compra */}
            <div className="bg-[#0a0a0a] rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">Tipo de asiento:</span>
                <span className="font-medium capitalize">{tipoAsiento}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">Función:</span>
                <span className="font-medium">{funciones[funcionSeleccionada]?.fecha} - {funciones[funcionSeleccionada]?.hora}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">Cantidad:</span>
                <span className="font-medium">{cantidad} boleto{cantidad > 1 ? 's' : ''}</span>
              </div>
              <div className="border-t border-[#333] my-2 pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-[#a21715]">${(precio * cantidad).toLocaleString()}.00 MXN</span>
                </div>
              </div>
            </div>

            {/* Campos del formulario */}
            <div className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                  Nombre completo
                </label>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="bg-[#0a0a0a] border-[#333] text-white placeholder:text-[#666]"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Correo electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#0a0a0a] border-[#333] text-white placeholder:text-[#666]"
                  required
                />
              </div>
            </div>

            <p className="text-xs text-[#666]">
              Al continuar, serás redirigido a Mercado Pago para completar tu pago de forma segura.
            </p>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#a21715] hover:bg-[#8a1412] text-white font-semibold py-6 text-lg rounded-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Procesando..." : "Continuar al pago"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Event Info */}
      <section className="py-12 border-t border-[#222]">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="space-y-8">
            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#1a1a1a] rounded-full">
                <MapPin className="w-6 h-6 text-[#a21715]" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Teatro San Rafael</h4>
                <p className="text-[#888]">Virginia Fábregas 40, San Rafael, Cuauhtémoc, 06470<br />Ciudad de México, CDMX, México</p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#1a1a1a] rounded-full">
                <Clock className="w-6 h-6 text-[#a21715]" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Duración</h4>
                <p className="text-[#888]">2 hr 30 min — La obra tiene intermedio</p>
              </div>
            </div>

            {/* Age */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#1a1a1a] rounded-full">
                <User className="w-6 h-6 text-[#a21715]" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Edad</h4>
                <p className="text-[#888]">Se recomienda para edades de 13 años en adelante</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="relative">
            <button
              onClick={() => scrollGaleria("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <div ref={galeriaRef} className="gallery-carousel px-12">
              {galeria.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Galería ${index + 1}`}
                  className="h-64 md:h-80 w-auto rounded-lg object-cover flex-shrink-0"
                />
              ))}
            </div>
            <button
              onClick={() => scrollGaleria("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            Sobrepasando Expectativas
          </h2>
          <div className="relative">
            <button
              onClick={() => scrollTestimonios("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <div ref={testimoniosRef} className="testimonial-carousel px-12">
              {testimonios.map((testimonio, index) => (
                <Card key={index} className="bg-white text-black min-w-[300px] max-w-[320px] flex-shrink-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src="https://ext.same-assets.com/1325588046/1876232363.png"
                        alt={testimonio.nombre}
                        className="w-12 h-12 rounded-full bg-gray-200"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonio.nombre}</h4>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {testimonio.texto}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <button
              onClick={() => scrollTestimonios("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Preguntas Frecuentes
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-[#333]"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-[#a21715] py-5">
                  {faq.pregunta}
                </AccordionTrigger>
                <AccordionContent className="text-[#888] pb-5 whitespace-pre-line">
                  {faq.respuesta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#a21715] py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <div className="p-3 bg-white rounded-lg">
              <svg className="w-6 h-6 text-[#a21715]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
          </div>
          <p className="text-white/80">
            2024 Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        {isChatOpen && (
          <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-[#1a1a1a] rounded-2xl shadow-2xl border border-[#333] overflow-hidden animate-fade-in">
            {/* Chat Header */}
            <div className="bg-[#a21715] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#a21715]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Asistente de Compras</h4>
                  <p className="text-white/70 text-xs">Perfume de Gardenia</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-[#a21715] text-white rounded-br-md'
                        : 'bg-[#2a2a2a] text-[#ebe5e0] rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleChatSubmit} className="p-3 border-t border-[#333]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 bg-[#0a0a0a] border border-[#333] rounded-full px-4 py-2 text-white text-sm placeholder:text-[#666] focus:outline-none focus:border-[#a21715]"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#a21715] rounded-full hover:bg-[#8a1412] transition-colors"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Chat Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`p-4 rounded-full shadow-lg transition-all hover:scale-110 ${
            isChatOpen ? 'bg-[#333] hover:bg-[#444]' : 'bg-[#a21715] hover:bg-[#8a1412] animate-pulse-soft'
          }`}
        >
          {isChatOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
