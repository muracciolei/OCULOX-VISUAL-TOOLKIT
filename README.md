# 🔍 Visual Toolkit for Eye Health

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/muracciolei/OCULOX-VISUAL-TOOLKIT/releases/latest)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://muracciolei.github.io/OCULOX-VISUAL-TOOLKIT/)

> **⚠️ IMPORTANTE**: Esta es una herramienta de demostración para exploración UX con pacientes bajo control oftalmológico. **NO es un dispositivo médico** y no debe usarse para diagnóstico clínico.

Una plataforma web interactiva que demuestra herramientas digitales para el compromiso de pacientes oftalmológicos, inspirada en prácticas clínicas reales.

## 🎯 Características

- **🔬 Amsler Grid Test**: Detección de metamorfopsia y problemas de visión central
- **🌈 Color & Contrast Check**: Evaluación de percepción de color y sensibilidad al contraste
- **💪 Eye Wellness Trainer**: Ejercicios guiados para reducir fatiga visual
- **📱 Responsive Design**: Funciona en desktop, tablet y móvil
- **♿ Accesible**: Diseñado siguiendo estándares de accesibilidad web
- **🔒 Privacidad**: Todo funciona localmente, sin envío de datos

## 🚀 Demo en Vivo

[![Open Demo](https://img.shields.io/badge/🔗_Abrir_Demo-brightgreen?style=for-the-badge)](https://muracciolei.github.io/OCULOX-VISUAL-TOOLKIT/)

## 📦 Instalación y Uso

### Opción 1: Uso Directo (Recomendado)
```bash
# Clona el repositorio
git clone https://github.com/muracciolei/OCULOX-VISUAL-TOOLKIT.git

# Navega a la carpeta
cd OCULOX-VISUAL-TOOLKIT

# Sirve el proyecto localmente
python -m http.server 8000
# O con Node.js: npx serve .
# O con PHP: php -S localhost:8000

# Abre en el navegador
# http://localhost:8000
```

### Opción 2: Apertura Directa
Simplemente abre `index.html` en tu navegador web favorito.

## 🏗️ Estructura del Proyecto

```
visual-toolkit/
├── index.html              # Página principal con menú de herramientas
├── shared.css              # Estilos globales y paleta clínica
├── amsler/                 # Test de rejilla de Amsler
│   ├── amsler.html
│   ├── amsler.css
│   └── amsler.js
├── color-contrast/         # Pruebas de color y contraste
│   ├── test.html
│   ├── color.css
│   └── color.js
├── wellness/               # Entrenador de bienestar ocular
│   ├── exercises.html
│   ├── wellness.css
│   └── wellness.js
└── assets/                 # Recursos estáticos
    └── icons/
```

## 🛠️ Stack Tecnológico

- **Frontend**: HTML5, CSS3 (Variables CSS), JavaScript ES6+
- **Almacenamiento**: LocalStorage (navegador)
- **Gráficos**: Canvas API para pruebas visuales
- **Responsive**: CSS Grid y Flexbox
- **Accesibilidad**: ARIA labels, keyboard navigation, focus management

## 🎮 Herramientas Incluidas

### 1. 📋 Amsler Grid Test
- Test estándar de rejilla para detectar problemas de visión central
- Reportes de anomalías con almacenamiento local
- Canvas interactivo con punto de fijación central

### 2. 🌈 Color & Contrast Check
- **Test de diferenciación de color**: Detecta variaciones sutiles en tonos
- **Test de sensibilidad al contraste**: Identifica patrones con contraste decreciente
- Sistema de puntuación y evaluación general

### 3. 💪 Eye Wellness Trainer
- **Regla 20-20-20**: Descansos visuales cada 20 minutos
- **Ejercicios de enfoque**: Alternancia cerca-lejos
- **Movimientos oculares**: Horizontales, circulares, sacadas
- **Técnicas de relajación**: Palming, respiración, masajes
- Seguimiento de progreso y estadísticas semanales

## 📊 Características Técnicas

### Accesibilidad (A11y)
- ✅ Navegación por teclado completa
- ✅ Etiquetas ARIA para lectores de pantalla
- ✅ Alto contraste y focus states visibles
- ✅ Responsive design para todos los dispositivos
- ✅ Textos alternativos para elementos gráficos

### Privacidad y Datos
- 🔒 **Sin tracking**: No se envían datos a servidores externos
- 💾 **Almacenamiento local**: Datos guardados solo en tu navegador
- 🗑️ **Control total**: Puedes limpiar datos desde configuración del navegador
- 📋 **Transparencia**: Código fuente abierto y auditable

### Rendimiento
- ⚡ **Carga rápida**: Sin frameworks pesados
- 📱 **Mobile-first**: Optimizado para dispositivos móviles
- 🖼️ **Gráficos eficientes**: Canvas optimizado para tests visuales
- 💨 **Vanilla JS**: Sin dependencias externas

## 🔧 Desarrollo

### Requisitos
- Navegador web moderno (Chrome 80+, Firefox 75+, Safari 13+)
- Servidor web local (opcional pero recomendado)

### Scripts de Desarrollo
```bash
# Servir localmente con Python
python -m http.server 8000

# Servir con Node.js
npx serve . -p 8000

# Servir con PHP
php -S localhost:8000
```

### Configuración de IDE
Para VS Code, se recomienda instalar:
- Live Server extension
- ESLint extension
- Prettier extension

## 📋 Roadmap

### v1.1 (Próxima versión)
- [ ] Export/import de reportes en JSON/CSV
- [ ] Más ejercicios de bienestar ocular
- [ ] Mejoras de accesibilidad avanzadas
- [ ] Tests automatizados

### v1.2 (Futuro)
- [ ] Internacionalización (i18n)
- [ ] Modo offline completo (PWA)
- [ ] Integración con APIs de salud (opcional)
- [ ] Dashboard de progreso avanzado

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución
- Mantén el código accesible (WCAG 2.1 AA)
- Usa vanilla JavaScript (sin frameworks)
- Añade tests para nuevas funcionalidades
- Actualiza la documentación correspondiente

## 📝 Notas Legales

### Descargo de Responsabilidad Médica
```
⚠️ IMPORTANTE - DESCARGO DE RESPONSABILIDAD MÉDICA

Este software es una herramienta de DEMOSTRACIÓN educativa y NO constituye:
- Un dispositivo médico certificado
- Una herramienta de diagnóstico clínico
- Un sustituto del examen oftalmológico profesional
- Una recomendación médica o tratamiento

SIEMPRE consulte con un profesional oftalmológico calificado para:
- Exámenes de vista regulares
- Diagnóstico de problemas visuales
- Tratamiento de condiciones oculares
- Interpretación de resultados de pruebas

El uso de esta herramienta es bajo su propia responsabilidad.
```

### Licencia
Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

### Privacidad
- No recopilamos datos personales
- No usamos cookies de tracking
- Los datos se almacenan localmente en tu navegador
- Puedes eliminar todos los datos desde la configuración de tu navegador

## 👨‍💻 Autor

**Ivan Muracciole**
- GitHub: [@muracciolei](https://github.com/muracciolei)
- Proyecto desarrollado para: [Oculox.com](https://www.oculox.com)

## 🙏 Agradecimientos

- Inspirado en pruebas clínicas oftalmológicas estándar
- Diseño basado en principios de UX médico
- Comunidad de desarrolladores de accesibilidad web
- Profesionales de la salud visual que proporcionaron feedback

## 📈 Releases

### 📋 Últimas Versiones

[![Latest Release](https://img.shields.io/github/v/release/muracciolei/OCULOX-VISUAL-TOOLKIT?style=for-the-badge&logo=github)](https://github.com/muracciolei/OCULOX-VISUAL-TOOLKIT/releases/latest)

#### v1.0.0 - Lanzamiento Inicial
- ✨ Implementación completa de las 3 herramientas principales
- 🎨 Diseño responsive y accesible
- 📱 Soporte completo para móviles
- 🔒 Funcionalidad offline
- 📊 Sistema de reportes locales

[Ver todas las versiones →](https://github.com/muracciolei/OCULOX-VISUAL-TOOLKIT/releases)

---

<div align="center">

**[⬆️ Volver al inicio](#-visual-toolkit-for-eye-health)**

Hecho con ❤️ para la comunidad de salud visual

**[🌐 Visitar Oculox.com](https://www.oculox.com) | [📧 Contacto](mailto:contact@oculox.com)**

</div>