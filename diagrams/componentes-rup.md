# Diagrama de Componentes - BlockIO (Metodología RUP)

## Arquitectura en 3 Capas

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           CAPA DE PRESENTACIÓN                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │   Landing Page  │  │   Auth Module   │  │  User Profile   │                 │
│  │                 │  │                 │  │                 │                 │
│  │ • Header        │  │ • SignInView    │  │ • UserButton    │                 │
│  │ • Navbar        │  │ • SignUpView    │  │ • Settings      │                 │
│  │ • Footer        │  │ • Recovery      │  │ • Dashboard     │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │  Job Offers     │  │   RRHH Module   │  │  Evaluation     │                 │
│  │                 │  │                 │  │                 │                 │
│  │ • OffersList    │  │ • AreaView      │  │ • CandidateList │                 │
│  │ • OfferDetail   │  │ • AreaForm      │  │ • Interview     │                 │
│  │ • FilterPanel   │  │ • JobForm       │  │ • Scoring       │                 │
│  │ • SearchBox     │  │ • JobTable      │  │ • Reports       │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │  Application    │  │   Candidate     │  │   Hiring        │                 │
│  │                 │  │                 │  │                 │                 │
│  │ • ApplyForm     │  │ • CandidateView │  │ • ContractForm  │                 │
│  │ • CVUpload      │  │ • EvalResults   │  │ • OnboardView   │                 │
│  │ • StatusTracker │  │ • Profile       │  │ • DocumentGen   │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                            CAPA DE LÓGICA DE NEGOCIO                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │ Authentication  │  │   User Service  │  │   Area Service  │                 │
│  │    Service      │  │                 │  │                 │                 │
│  │                 │  │ • Profile Mgmt  │  │ • Create Area   │                 │
│  │ • Login/Logout  │  │ • User Roles    │  │ • Update Area   │                 │
│  │ • Registration  │  │ • Permissions   │  │ • Delete Area   │                 │
│  │ • Session Mgmt  │  │ • Preferences   │  │ • List Areas    │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │   Job Offer     │  │  Application    │  │   Evaluation    │                 │
│  │    Service      │  │    Service      │  │    Service      │                 │
│  │                 │  │                 │  │                 │                 │
│  │ • Create Offer  │  │ • Submit App    │  │ • CV Review     │                 │
│  │ • Update Offer  │  │ • Track Status  │  │ • Interview     │                 │
│  │ • Delete Offer  │  │ • Validate CV   │  │ • Score Tests   │                 │
│  │ • Search/Filter │  │ • Notifications │  │ • Generate Rep  │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │   Candidate     │  │     Hiring      │  │   Notification  │                 │
│  │    Service      │  │    Service      │  │    Service      │                 │
│  │                 │  │                 │  │                 │                 │
│  │ • Candidate Mgmt│  │ • Contract Gen  │  │ • Email Alerts  │                 │
│  │ • Eval Tracking │  │ • Onboarding    │  │ • Status Updates│                 │
│  │ • Ranking       │  │ • Doc Management│  │ • Reminders     │                 │
│  │ • Selection     │  │ • Background    │  │ • Reports       │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │   File Upload   │  │   Reporting     │  │   Workflow      │                 │
│  │    Service      │  │    Service      │  │    Service      │                 │
│  │                 │  │                 │  │                 │                 │
│  │ • CV Upload     │  │ • Analytics     │  │ • Process Flow  │                 │
│  │ • File Validate │  │ • Charts        │  │ • State Machine │                 │
│  │ • Doc Storage   │  │ • Metrics       │  │ • Automation    │                 │
│  │ • Metadata      │  │ • Dashboards    │  │ • Rules Engine  │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CAPA DE DATOS                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────────┐  ┌───────────────────────────┐                  │
│  │      PostgreSQL DB        │  │      UploadThing          │                  │
│  │      (Neon Database)      │  │    (File Storage)         │                  │
│  │                           │  │                           │                  │
│  │ • Users                   │  │ • CV Documents (PDF)      │                  │
│  │ • Areas                   │  │ • Profile Images          │                  │
│  │ • Job Offers              │  │ • Certificates            │                  │
│  │ • Applications            │  │ • Company Documents       │                  │
│  │ • Evaluations             │  │ • Metadata                │                  │
│  │ • Interviews              │  │ • File Validation         │                  │
│  │ • Candidates              │  │ • Access Control          │                  │
│  │ • Contracts               │  │                           │                  │
│  │ • Audit Logs              │  │                           │                  │
│  └───────────────────────────┘  └───────────────────────────┘                  │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    Better Auth (Authentication)                        │   │
│  │                                                                         │   │
│  │ • User Sessions                    • Social Login (Google, GitHub)     │   │
│  │ • JWT Tokens                       • Password Recovery                 │   │
│  │ • Email Verification               • Multi-Factor Authentication       │   │
│  │ • Role-Based Access Control        • Session Management                │   │
│  │ • Password Hashing                 • Security Policies                │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Mapeo de Casos de Uso con Componentes

### 🎯 Caso de Uso 1: Generar Ofertas Laborales

**Componentes Involucrados:**

- **Presentación:** RRHH Module (JobForm, JobTable)
- **Lógica:** Job Offer Service, Area Service, Workflow Service
- **Datos:** PostgreSQL DB (areas, offers, evaluations)

### 🎯 Caso de Uso 2: Postular a Ofertas

**Componentes Involucrados:**

- **Presentación:** Job Offers (OfferDetail, ApplyForm), Application (CVUpload,
  StatusTracker)
- **Lógica:** Application Service, File Upload Service, Notification Service
- **Datos:** PostgreSQL DB (applications), UploadThing (CV files), Better Auth
  (user sessions)

### 🎯 Caso de Uso 3: Evaluar Candidatos

**Componentes Involucrados:**

- **Presentación:** Evaluation (CandidateList, Interview, Scoring), Candidate
  (CandidateView, EvalResults)
- **Lógica:** Evaluation Service, Candidate Service, Reporting Service
- **Datos:** PostgreSQL DB (evaluations, interviews, candidates), UploadThing
  (CV access)

### 🎯 Caso de Uso 4: Contratar Personal

**Componentes Involucrados:**

- **Presentación:** Hiring (ContractForm, OnboardView, DocumentGen)
- **Lógica:** Hiring Service, Workflow Service, Notification Service
- **Datos:** PostgreSQL DB (contracts, audit_logs), UploadThing (contract docs)

## Dependencias Entre Componentes

### Flujo de Dependencias por Capas:

```
PRESENTACIÓN → LÓGICA DE NEGOCIO → DATOS

Landing Page ──┐
Auth Module ───┼─→ Authentication Service ──→ Better Auth
User Profile ──┘

Job Offers ────┐
RRHH Module ───┼─→ Job Offer Service ────────→ PostgreSQL DB
Application ───┤   Area Service
Evaluation ────┤   Application Service ──────→ UploadThing
Candidate ─────┤   Evaluation Service
Hiring ────────┘   Candidate Service
                   Hiring Service
                   File Upload Service ────→ UploadThing
                   Notification Service
                   Reporting Service
                   Workflow Service
```

## Patrones de Diseño Implementados

1. **MVC (Model-View-Controller):** Separación clara entre presentación, lógica
   y datos
2. **Repository Pattern:** Abstracción de acceso a datos en los servicios
3. **Factory Pattern:** Para creación de diferentes tipos de evaluaciones
4. **Observer Pattern:** Sistema de notificaciones y actualizaciones de estado
5. **State Machine:** Para el flujo de estados de las aplicaciones

## Tecnologías por Capa

### Capa de Presentación

- **Framework:** Next.js 15 con React 19
- **Styling:** Tailwind CSS + Radix UI
- **Forms:** React Hook Form + Zod
- **State Management:** TanStack Query

### Capa de Lógica de Negocio

- **Runtime:** Node.js
- **Validation:** Zod schemas
- **File Processing:** UploadThing client
- **Business Rules:** Custom services

### Capa de Datos

- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle ORM
- **File Storage:** UploadThing
- **Authentication:** Better Auth

## Componentes Futuros a Implementar

### Módulos Pendientes:

1. **CV Analysis Service** - Análisis automático de CVs con IA
2. **Interview Scheduler** - Sistema de agendamiento de entrevistas
3. **Background Check Service** - Verificación de antecedentes
4. **Performance Analytics** - Métricas de rendimiento del proceso
5. **Mobile App Components** - Versión móvil de la aplicación
6. **API Gateway** - Para integración con sistemas externos
7. **Real-time Notifications** - WebSocket para notificaciones en tiempo real
