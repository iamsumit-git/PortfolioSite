# Overview

This is a personal portfolio website built as a full-stack application showcasing the work and experience of Alex Johnson, a Full Stack Developer and AI Engineer. The application features a modern React frontend with a Node.js/Express backend, designed to present projects, experience, and provide contact functionality. The portfolio emphasizes AI projects and web development work, with a clean, professional design using shadcn/ui components and Tailwind CSS.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite for build tooling and development server
- **Routing**: Wouter for lightweight client-side routing with a simple single-page application structure
- **UI Components**: shadcn/ui component library providing a comprehensive set of accessible, customizable components built on Radix UI primitives
- **Styling**: Tailwind CSS with a custom design system featuring CSS variables for theming, supporting both light and dark modes via next-themes
- **State Management**: TanStack Query (React Query) for server state management and API data fetching with caching and background updates
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **Theme System**: Dark mode by default with theme switching capability, managed through next-themes provider

## Backend Architecture
- **Runtime**: Node.js with Express.js framework for REST API endpoints
- **Database Layer**: Drizzle ORM configured for PostgreSQL with schema-first approach and type-safe database operations
- **Storage Strategy**: Dual implementation with in-memory storage for development/demo and database storage for production
- **API Design**: RESTful endpoints for projects, experiences, and contact submissions with proper error handling and response formatting
- **Development Integration**: Vite middleware integration for seamless full-stack development experience

## Data Storage Solutions
- **Primary Database**: PostgreSQL configured through Drizzle ORM with migrations support
- **Schema Management**: Centralized schema definitions in shared directory for type consistency between frontend and backend
- **Development Storage**: In-memory storage implementation with sample data for rapid development and testing
- **Data Validation**: Zod schemas for runtime validation and type inference across the application stack

## Authentication and Authorization
- **Current State**: No authentication system implemented - portfolio is publicly accessible
- **Session Management**: Basic session setup using connect-pg-simple for future authentication needs
- **Security Considerations**: CORS configuration and basic middleware for request logging and error handling

# External Dependencies

## Database Services
- **Neon Database**: PostgreSQL hosting service configured via `@neondatabase/serverless` driver for production deployment
- **Database URL**: Environment variable configuration for database connection management

## UI and Component Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives for complex components like dialogs, dropdowns, and form controls
- **Lucide React**: Icon library providing consistent iconography throughout the application
- **Embla Carousel**: Carousel component for potential image galleries or content sliding

## Development and Build Tools
- **Vite**: Modern build tool with hot module replacement and optimized production builds
- **ESBuild**: Fast JavaScript bundler for server-side code compilation
- **TypeScript**: Static type checking across the entire application stack
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer plugins

## Utility Libraries
- **Class Variance Authority**: Utility for creating variant-based component APIs with consistent styling patterns
- **clsx & tailwind-merge**: Class name manipulation and Tailwind CSS class merging utilities
- **date-fns**: Date formatting and manipulation library for timeline and contact features
- **nanoid**: Secure random ID generation for various application needs

## Development Environment
- **Replit Integration**: Specialized plugins for Replit development environment including error overlay and cartographer for enhanced debugging
- **Google Fonts**: CDN integration for typography including DM Sans, Fira Code, and Geist Mono font families