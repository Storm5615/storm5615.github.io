# Abel Parlor Portfolio

## Overview

This is a modern, interactive portfolio website for Abel Parlor, a creative freelancer specializing in web design, development, graphic design, video editing, and branding services. The site features a dark theme with gradient accents, 3D animations, and responsive design to showcase professional services and skills.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static Website**: Pure HTML, CSS, and JavaScript implementation without frameworks
- **Styling Framework**: Tailwind CSS via CDN for rapid styling and responsive design
- **Font System**: Google Fonts integration (Inter for body text, Poppins for display elements)
- **Icon System**: Feather Icons library for consistent iconography

### Design System
- **Color Palette**: Custom gradient-based theme with primary (#667eea), secondary (#764ba2), accent (#f093fb), and dark backgrounds (#1a1a2e, #16213e)
- **Typography**: Hierarchical font system with Inter for readability and Poppins for headings
- **Visual Effects**: CSS animations including 3D transforms, floating elements, and gradient backgrounds

### JavaScript Architecture
- **Modular Structure**: Component-based organization with separate initialization functions
- **Core Features**:
  - Navigation with smooth scrolling and active state management
  - Scroll-triggered animations and parallax effects
  - Interactive 3D effects and transitions
  - Mobile-responsive menu system
  - Contact form handling
  - Performance optimizations

### Development Environment
- **Local Server**: http-server package for development serving
- **Build System**: No build process - direct file serving for simplicity
- **Asset Management**: CDN-based dependencies for external libraries

## External Dependencies

### CDN Libraries
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Feather Icons**: Icon library for UI elements
- **Google Fonts**: Web font service for Inter and Poppins typefaces

### Development Dependencies
- **http-server**: Local development server for testing and preview

### Browser APIs
- **Intersection Observer**: For scroll-triggered animations
- **CSS Transform API**: For 3D effects and animations
- **Scroll API**: For smooth scrolling navigation behavior