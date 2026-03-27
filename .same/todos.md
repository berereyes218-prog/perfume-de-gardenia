# Perfume de Gardenia - Clone Project

## Tasks
- [x] Crear proyecto Next.js con shadcn
- [x] Configurar colores y tipografía del tema
- [x] Crear Header con logo y botón CTA
- [x] Crear Hero section
- [x] Crear sección de contenido principal (descripción + póster)
- [x] Crear selector de boletos (zonas y fechas)
- [x] Crear sección de info del evento
- [x] Crear galería de fotos (carrusel)
- [x] Crear sección de testimonios (carrusel)
- [x] Crear FAQ con acordeón
- [x] Crear Footer
- [x] Agregar botón flotante de WhatsApp
- [x] Hacer responsive
- [x] Agregar formulario de pago con Mercado Pago
- [ ] Agregar URLs de links de pago (pendiente del usuario)

## Design Notes
- Primary color: #a21715 (dark red)
- Background: #040404 (black)
- Text: #ebe5e0 (light beige)
- Font: Playfair Display for titles, Montserrat for body

## Assets Used
- Logo: https://ext.same-assets.com/1325588046/971523517.png
- Poster: https://ext.same-assets.com/1325588046/1597956710.jpeg
- Seating Map: https://ext.same-assets.com/1325588046/794785027.jpeg
- Gallery images from same-assets.com

## Payment Links Configuration
Los links de pago de Mercado Pago se configuran en el archivo:
`src/app/page.tsx` en el objeto `linksDePago`

```typescript
const linksDePago: Record<number, string> = {
  1: "", // Link para 1 boleto
  2: "", // Link para 2 boletos
  3: "", // Link para 3 boletos
  // ... etc
};
```
