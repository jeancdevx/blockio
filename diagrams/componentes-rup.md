# Diagrama de Componentes UML - BlockIO (Metodología RUP)

## Arquitectura en 3 Capas con Interfaces, Puertos y Conectores

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           CAPA DE PRESENTACIÓN                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │   Landing Page  │  │   Auth Module   │  │  User Profile   │                 │
│  │   <<component>> │  │   <<component>> │  │   <<component>> │                 │
│  │ • Header        │  │ • SignInView    │  │ • UserButton    │                 │
│  │ • Navbar        │  │ • SignUpView    │  │ • Settings      │                 │
│  │ • Footer        │  │ • Recovery      │  │ • Dashboard     │                 │
│  │                 │  │                 │  │                 │                 │
│  │ ┌─┐ INavigation │  │ ┌─┐ IAuthForm   │  │ ┌─┐ IUserMgmt   │                 │
│  │ └─┘ (provided)  │  │ └─┘ (provided)  │  │ └─┘ (provided)  │                 │
│  │ ○── IRouting    │  │ ○── IValidation │  │ ○── IUserData   │                 │
│  │     (required)  │  │     (required)  │  │     (required)  │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│           │                      │                      │                       │
│           │                      │                      │                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │  Job Offers     │  │   RRHH Module   │  │  Evaluation     │                 │
│  │   <<component>> │  │   <<component>> │  │   <<component>> │                 │
│  │ • OffersList    │  │ • AreaView      │  │ • CandidateList │                 │
│  │ • OfferDetail   │  │ • AreaForm      │  │ • Interview     │                 │
│  │ • FilterPanel   │  │ • JobForm       │  │ • Scoring       │                 │
│  │ • SearchBox     │  │ • JobTable      │  │ • Reports       │                 │
│  │                 │  │                 │  │                 │                 │
│  │ ┌─┐ IJobDisplay │  │ ┌─┐ IRRHHMgmt   │  │ ┌─┐ IEvalView   │                 │
│  │ └─┘ (provided)  │  │ └─┘ (provided)  │  │ └─┘ (provided)  │                 │
│  │ ○── IJobData    │  │ ○── IAreaData   │  │ ○── IEvalData   │                 │
│  │     (required)  │  │     (required)  │  │     (required)  │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│           │                      │                      │                       │
│           │                      │                      │                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │  Application    │  │   Candidate     │  │   Hiring        │                 │
│  │   <<component>> │  │   <<component>> │  │   <<component>> │                 │
│  │ • ApplyForm     │  │ • CandidateView │  │ • ContractForm  │                 │
│  │ • CVUpload      │  │ • EvalResults   │  │ • OnboardView   │                 │
│  │ • StatusTracker │  │ • Profile       │  │ • DocumentGen   │                 │
│  │                 │  │                 │  │                 │                 │
│  │ ┌─┐ IAppForm    │  │ ┌─┐ ICandView   │  │ ┌─┐ IHiringForm │                 │
│  │ └─┘ (provided)  │  │ └─┘ (provided)  │  │ └─┘ (provided)  │                 │
│  │ ○── IAppData    │  │ ○── ICandData   │  │ ○── IContractData│                │
│  │     (required)  │  │     (required)  │  │     (required)  │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│           │                      │                      │                       │
└───────────┼──────────────────────┼──────────────────────┼───────────────────────┘
            │                      │                      │

            │                      │                      │
            ├──────────────────────┼──────────────────────┼─── CONECTORES ───────────┐
            │                      │                      │                          │
┌───────────┼──────────────────────┼──────────────────────┼──────────────────────────┘
│           ▼                      ▼                      ▼
│                            CAPA DE LÓGICA DE NEGOCIO                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │ Authentication  │  │   User Service  │  │   Area Service  │                 │
│  │    Service      │  │   <<component>> │  │   <<component>> │                 │
│  │   <<component>> │  │                 │  │                 │                 │
│  │                 │  │ • Profile Mgmt  │  │ • Create Area   │                 │
│  │ • Login/Logout  │  │ • User Roles    │  │ • Update Area   │                 │
│  │ • Registration  │  │ • Permissions   │  │ • Delete Area   │                 │
│  │ • Session Mgmt  │  │ • Preferences   │  │ • List Areas    │                 │
│  │                 │  │                 │  │                 │                 │
│  │ ┌─┐ IAuthService│  │ ┌─┐ IUserMgmt   │  │ ┌─┐ IAreaMgmt   │                 │
│  │ └─┘ (provided)  │  │ └─┘ (provided)  │  │ └─┘ (provided)  │                 │
│  │ ○── IAuthRepo   │  │ ○── IUserRepo   │  │ ○── IAreaRepo   │                 │
│  │     (required)  │  │     (required)  │  │     (required)  │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│           │                      │                      │                       │
│           │                      │                      │                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │   Job Offer     │  │  Application    │  │   Evaluation    │                 │
│  │    Service      │  │    Service      │  │    Service      │                 │
│  │   <<component>> │  │   <<component>> │  │   <<component>> │                 │
│  │                 │  │                 │  │                 │                 │
│  │ • Create Offer  │  │ • Submit App    │  │ • CV Review     │                 │
│  │ • Update Offer  │  │ • Track Status  │  │ • Interview     │                 │
│  │ • Delete Offer  │  │ • Validate CV   │  │ • Score Tests   │                 │
│  │ • Search/Filter │  │ • Notifications │  │ • Generate Rep  │                 │
│  │                 │  │                 │  │                 │                 │
│  │ ┌─┐ IJobService │  │ ┌─┐ IAppService │  │ ┌─┐ IEvalService│                 │
│  │ └─┘ (provided)  │  │ └─┘ (provided)  │  │ └─┘ (provided)  │                 │
│  │ ○── IJobRepo    │  │ ○── IAppRepo    │  │ ○── IEvalRepo   │                 │
│  │     (required)  │  │     (required)  │  │     (required)  │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│           │                      │                      │                       │
│           │                      │                      │                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │   Candidate     │  │     Hiring      │  │   Notification  │                 │
│  │    Service      │  │    Service      │  │    Service      │                 │
│  │   <<component>> │  │   <<component>> │  │   <<component>> │                 │
│  │                 │  │                 │  │                 │                 │
│  │ • Candidate Mgmt│  │ • Contract Gen  │  │ • Email Alerts  │                 │
│  │ • Eval Tracking │  │ • Onboarding    │  │ • Status Updates│                 │
│  │ • Ranking       │  │ • Doc Management│  │ • Reminders     │                 │
│  │ • Selection     │  │ • Background    │  │ • Reports       │                 │
│  │                 │  │                 │  │                 │                 │
│  │ ┌─┐ ICandService│  │ ┌─┐ IHireService│  │ ┌─┐ INotifService│                │
│  │ └─┘ (provided)  │  │ └─┘ (provided)  │  │ └─┘ (provided)  │                 │
│  │ ○── ICandRepo   │  │ ○── IContractRepo│ │ ○── INotifRepo  │                 │
│  │     (required)  │  │     (required)  │  │     (required)  │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│           │                      │                      │                       │
│           │                      │                      │                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │   File Upload   │  │   Reporting     │  │   Workflow      │                 │
│  │    Service      │  │    Service      │  │    Service      │                 │
│  │   <<component>> │  │   <<component>> │  │   <<component>> │                 │
│  │                 │  │                 │  │                 │                 │
│  │ • CV Upload     │  │ • Analytics     │  │ • Process Flow  │                 │
│  │ • File Validate │  │ • Charts        │  │ • State Machine │                 │
│  │ • Doc Storage   │  │ • Metrics       │  │ • Automation    │                 │
│  │ • Metadata      │  │ • Dashboards    │  │ • Rules Engine  │                 │
│  │                 │  │                 │  │                 │                 │
│  │ ┌─┐ IFileService│  │ ┌─┐ IReportService│ │ ┌─┐ IWorkflowSvc│                │
│  │ └─┘ (provided)  │  │ └─┘ (provided)  │  │ └─┘ (provided)  │                 │
│  │ ○── IFileRepo   │  │ ○── IDataAccess │  │ ○── IProcessRepo│                 │
│  │     (required)  │  │     (required)  │  │     (required)  │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│           │                      │                      │                       │
└───────────┼──────────────────────┼──────────────────────┼───────────────────────┘
            │                      │                      │

            │                      │                      │
            ├──────────────────────┼──────────────────────┼─── CONECTORES ───────────┐
            │                      │                      │                          │
┌───────────┼──────────────────────┼──────────────────────┼──────────────────────────┘
│           ▼                      ▼                      ▼
│                              CAPA DE DATOS                                         │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────────┐  ┌───────────────────────────┐                  │
│  │      PostgreSQL DB        │  │      UploadThing          │                  │
│  │      (Neon Database)      │  │    (File Storage)         │                  │
│  │     <<component>>         │  │     <<component>>         │                  │
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
│  │                           │  │                           │                  │
│  │ ┌─┐ IDataAccess          │  │ ┌─┐ IFileStorage         │                  │
│  │ └─┘ (provided)            │  │ └─┘ (provided)           │                  │
│  │ ○── ISQLConnection       │  │ ○── ICloudProvider       │                  │
│  │     (required)            │  │     (required)           │                  │
│  └───────────────────────────┘  └───────────────────────────┘                  │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    Better Auth (Authentication)                        │   │
│  │                       <<component>>                                    │   │
│  │                                                                         │   │
│  │ • User Sessions                    • Social Login (Google, GitHub)     │   │
│  │ • JWT Tokens                       • Password Recovery                 │   │
│  │ • Email Verification               • Multi-Factor Authentication       │   │
│  │ • Role-Based Access Control        • Session Management                │   │
│  │ • Password Hashing                 • Security Policies                │   │
│  │                                                                         │   │
│  │ ┌─┐ IAuthProvider    ┌─┐ ISessionMgmt    ┌─┐ IUserCredentials          │   │
│  │ └─┘ (provided)       └─┘ (provided)      └─┘ (provided)                │   │
│  │ ○── ISecurityModule                                                    │   │
│  │     (required)                                                          │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

## Interfaces UML y Conectores del Sistema

### Interfaces Proporcionadas (Offered Interfaces) ┌─┐

**Capa de Presentación:**
- `INavigation` - Navegación entre páginas
- `IAuthForm` - Formularios de autenticación
- `IUserMgmt` - Gestión de perfiles de usuario
- `IJobDisplay` - Visualización de ofertas laborales
- `IRRHHMgmt` - Gestión de recursos humanos
- `IEvalView` - Visualización de evaluaciones
- `IAppForm` - Formularios de aplicación
- `ICandView` - Vista de candidatos
- `IHiringForm` - Formularios de contratación

**Capa de Lógica de Negocio:**
- `IAuthService` - Servicios de autenticación
- `IUserMgmt` - Gestión de usuarios
- `IAreaMgmt` - Gestión de áreas
- `IJobService` - Servicios de ofertas laborales
- `IAppService` - Servicios de aplicaciones
- `IEvalService` - Servicios de evaluación
- `ICandService` - Servicios de candidatos
- `IHireService` - Servicios de contratación
- `INotifService` - Servicios de notificación
- `IFileService` - Servicios de archivos
- `IReportService` - Servicios de reportes
- `IWorkflowSvc` - Servicios de flujo de trabajo

**Capa de Datos:**
- `IDataAccess` - Acceso a base de datos
- `IFileStorage` - Almacenamiento de archivos
- `IAuthProvider` - Proveedor de autenticación
- `ISessionMgmt` - Gestión de sesiones
- `IUserCredentials` - Credenciales de usuario

### Interfaces Requeridas (Required Interfaces) ○──

**Capa de Presentación:**
- `IRouting` - Enrutamiento de la aplicación
- `IValidation` - Validación de formularios
- `IUserData` - Datos de usuario
- `IJobData` - Datos de ofertas laborales
- `IAreaData` - Datos de áreas
- `IEvalData` - Datos de evaluación
- `IAppData` - Datos de aplicaciones
- `ICandData` - Datos de candidatos
- `IContractData` - Datos de contratos

**Capa de Lógica de Negocio:**
- `IAuthRepo` - Repositorio de autenticación
- `IUserRepo` - Repositorio de usuarios
- `IAreaRepo` - Repositorio de áreas
- `IJobRepo` - Repositorio de ofertas laborales
- `IAppRepo` - Repositorio de aplicaciones
- `IEvalRepo` - Repositorio de evaluaciones
- `ICandRepo` - Repositorio de candidatos
- `IContractRepo` - Repositorio de contratos
- `INotifRepo` - Repositorio de notificaciones
- `IFileRepo` - Repositorio de archivos
- `IDataAccess` - Acceso a datos
- `IProcessRepo` - Repositorio de procesos

**Capa de Datos:**
- `ISQLConnection` - Conexión SQL
- `ICloudProvider` - Proveedor de nube
- `ISecurityModule` - Módulo de seguridad

### Puertos y Conectores

#### Puertos de Comunicación (●)

**Puerto P1**: Presentación ↔ Lógica de Negocio
- **Tipo**: HTTP REST API / Server Actions
- **Protocolo**: HTTPS
- **Datos**: JSON/FormData

**Puerto P2**: Lógica de Negocio ↔ Base de Datos
- **Tipo**: ORM Connection
- **Protocolo**: SQL over TLS
- **Datos**: SQL Queries/Results

**Puerto P3**: Lógica de Negocio ↔ File Storage
- **Tipo**: REST API
- **Protocolo**: HTTPS
- **Datos**: Multipart/Binary

**Puerto P4**: Lógica de Negocio ↔ Authentication
- **Tipo**: Auth Provider API
- **Protocolo**: HTTPS
- **Datos**: JWT/Session Tokens

#### Conectores de Ensamblaje

```

┌─────────────────────────────────────────────────────────────────────────────────┐
│ CONECTORES DEL SISTEMA │
├─────────────────────────────────────────────────────────────────────────────────┤
│ │ │ Auth Module ════════════►● P1 ●◄════════════ Authentication Service │ │
REST/Actions │ │ │ │ Job Offers ═════════════►● P1 ●◄════════════ Job Offer
Service │ │ REST/Actions │ │ │ │ RRHH Module ════════════►● P1 ●◄════════════
Area Service │ │ REST/Actions │ │ │ │ Application ════════════►● P1
●◄════════════ Application Service │ │ REST/Actions │ │ │ │ Authentication
Service ═►● P4 ●◄════════════ Better Auth │ │ JWT/Sessions │ │ │ │ Job Offer
Service ══════►● P2 ●◄════════════ PostgreSQL DB │ │ ORM/SQL │ │ │ │ Application
Service ════►● P3 ●◄════════════ UploadThing │ │ REST/Binary │ │ │ │ File Upload
Service ════►● P3 ●◄════════════ UploadThing │ │ REST/Binary │ │ │
└─────────────────────────────────────────────────────────────────────────────────┘

```

## Dependencias UML (<<use>>, <<depends>>, <<import>>)

### Diagrama de Dependencias Entre Componentes

```

┌─────────────────────────────────────────────────────────────────────────────────┐
│ DEPENDENCIAS DEL SISTEMA │
├─────────────────────────────────────────────────────────────────────────────────┤
│ │ │ ┌─────────────────┐ <<use>> ┌─────────────────┐ │ │ │ Auth Module │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅► │ Authentication │ │ │ │ │ │ Service │ │ │ │ │ │ │ │ │
└─────────────────┘ └─────────────────┘ │ │ │ │ │ │ <<depends>> │ │ ▼ │ │
┌─────────────────┐ <<use>> ┌─────────────────┐ │ │ │ Job Offers │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅► │ Job Offer │ │ │ │ │ │ Service │ │ │ │ │ │ │ │ │
└─────────────────┘ └─────────────────┘ │ │ │ │ │ │ <<depends>> │ │ ▼ │ │
┌─────────────────┐ <<use>> ┌─────────────────┐ │ │ │ RRHH Module │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅► │ Area Service │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ └─────────────────┘
└─────────────────┘ │ │ │ │ │ │ <<depends>> │ │ ▼ │ │ ┌─────────────────┐
<<use>> ┌─────────────────┐ │ │ │ Application │ ┅┅┅┅┅┅┅┅┅┅┅┅┅┅► │ Application │
│ │ │ │ │ Service │ │ │ │ │ │ │ │ │ └─────────────────┘ └─────────────────┘ │ │
│ │ │ │ <<depends>> │ │ ▼ │ │ ┌─────────────────┐ <<use>> ┌─────────────────┐ │
│ │ Evaluation │ ┅┅┅┅┅┅┅┅┅┅┅┅┅┅► │ Evaluation │ │ │ │ │ │ Service │ │ │ │ │ │ │
│ │ └─────────────────┘ └─────────────────┘ │ │ │ │ │ │ <<depends>> │ │ ▼ │ │
┌─────────────────┐ │ │ │ PostgreSQL DB │ │ │ │ │ │ │ │ │ │ │
└─────────────────┘ │ │ │ │ ┌─────────────────┐ <<use>> ┌─────────────────┐ │ │
│ Candidate │ ┅┅┅┅┅┅┅┅┅┅┅┅┅┅► │ Candidate │ │ │ │ │ │ Service │ │ │ │ │ │ │ │ │
└─────────────────┘ └─────────────────┘ │ │ │ │ │ │ <<depends>> │ │ ▼ │ │
┌─────────────────┐ <<use>> ┌─────────────────┐ │ │ │ Hiring │ ┅┅┅┅┅┅┅┅┅┅┅┅┅┅► │
Hiring │ │ │ │ │ │ Service │ │ │ │ │ │ │ │ │ └─────────────────┘
└─────────────────┘ │ │ │ │ │ │ <<depends>> │ │ ▼ │ │ ┌─────────────────┐ │ │ │
UploadThing │ │ │ │ │ │ │ │ │ │ │ └─────────────────┘ │ │ │
└─────────────────────────────────────────────────────────────────────────────────┘

```

### Dependencias Cruzadas Entre Servicios

```

┌─────────────────────────────────────────────────────────────────────────────────┐
│ DEPENDENCIAS ENTRE SERVICIOS │
├─────────────────────────────────────────────────────────────────────────────────┤
│ │ │ Application Service ┅┅┅► Job Offer Service (<<import>> IJobService) │ │
┅┅┅► Notification Service (<<use>> INotifService) │ │ ┅┅┅► File Upload Service
(<<depends>> IFileService) │ │ │ │ Job Offer Service ┅┅┅► Area Service
(<<import>> IAreaMgmt) │ │ ┅┅┅► Workflow Service (<<depends>> IWorkflowSvc) │ │
│ │ Evaluation Service ┅┅┅► Application Service (<<import>> IAppService) │ │
┅┅┅► Candidate Service (<<use>> ICandService) │ │ ┅┅┅► Reporting Service
(<<depends>> IReportService) │ │ │ │ Hiring Service ┅┅┅► Candidate Service
(<<import>> ICandService) │ │ ┅┅┅► Notification Service (<<use>> INotifService)
│ │ ┅┅┅► File Upload Service (<<depends>> IFileService) │ │ ┅┅┅► Workflow
Service (<<depends>> IWorkflowSvc) │ │ │ │ Candidate Service ┅┅┅► Evaluation
Service (<<import>> IEvalService) │ │ ┅┅┅► Reporting Service (<<use>>
IReportService) │ │ │ │ Notification Service ┅┅┅► User Service (<<import>>
IUserMgmt) │ │ ┅┅┅► Authentication Service (<<use>> IAuthService) │ │ │ │ All
Services ┅┅┅► Authentication Service (<<depends>> IAuthService) │ │ │
└─────────────────────────────────────────────────────────────────────────────────┘

```

### Tipos de Dependencias

1. **<<use>>** - El componente cliente usa los servicios del proveedor
2. **<<depends>>** - El componente cliente depende del proveedor para funcionar
3. **<<import>>** - El componente cliente importa interfaces del proveedor

### Estereotipos UML de Componentes

- **<<boundary>>** - Componentes de interfaz de usuario
- **<<control>>** - Componentes de lógica de negocio/servicios
- **<<entity>>** - Componentes de datos/repositorios

## Mapeo de Casos de Uso con Componentes UML

### 🎯 Caso de Uso 1: Generar Ofertas Laborales

**Componentes Involucrados:**

- **<<boundary>>** RRHH Module (JobForm, JobTable)
  - Interfaces: `IRRHHMgmt` (provided), `IAreaData` (required)
  - Puerto: P1 (REST/Actions)
- **<<control>>** Job Offer Service, Area Service, Workflow Service
  - Interfaces: `IJobService`, `IAreaMgmt`, `IWorkflowSvc` (provided)
  - Puertos: P1, P2 (ORM/SQL)
- **<<entity>>** PostgreSQL DB (areas, offers, evaluations)
  - Interfaces: `IDataAccess` (provided), `ISQLConnection` (required)

**Flujo de Dependencias:**
```

RRHH Module ──<<use>>──► Job Offer Service ──<<depends>>──► PostgreSQL DB │ │
└──<<use>>──► Area Service ──┘

```

### 🎯 Caso de Uso 2: Postular a Ofertas

**Componentes Involucrados:**

- **<<boundary>>** Job Offers (OfferDetail, ApplyForm), Application (CVUpload, StatusTracker)
  - Interfaces: `IJobDisplay`, `IAppForm` (provided), `IJobData`, `IAppData` (required)
  - Puerto: P1 (REST/Actions)
- **<<control>>** Application Service, File Upload Service, Notification Service
  - Interfaces: `IAppService`, `IFileService`, `INotifService` (provided)
  - Puertos: P1, P2, P3 (REST/Binary)
- **<<entity>>** PostgreSQL DB (applications), UploadThing (CV files), Better Auth (user sessions)
  - Interfaces: `IDataAccess`, `IFileStorage`, `IAuthProvider` (provided)

**Flujo de Dependencias:**
```

Job Offers ──<<use>>──► Application Service ──<<depends>>──► PostgreSQL DB
Application ──<<use>>──► File Upload Service ──<<depends>>──► UploadThing │ │
└──<<import>>──► Authentication Service ──<<depends>>──► Better Auth

```

### 🎯 Caso de Uso 3: Evaluar Candidatos

**Componentes Involucrados:**

- **<<boundary>>** Evaluation (CandidateList, Interview, Scoring), Candidate (CandidateView, EvalResults)
  - Interfaces: `IEvalView`, `ICandView` (provided), `IEvalData`, `ICandData` (required)
  - Puerto: P1 (REST/Actions)
- **<<control>>** Evaluation Service, Candidate Service, Reporting Service
  - Interfaces: `IEvalService`, `ICandService`, `IReportService` (provided)
  - Puertos: P1, P2, P3
- **<<entity>>** PostgreSQL DB (evaluations, interviews, candidates), UploadThing (CV access)
  - Interfaces: `IDataAccess`, `IFileStorage` (provided)

**Flujo de Dependencias:**
```

Evaluation ──<<use>>──► Evaluation Service ──<<depends>>──► PostgreSQL DB
Candidate ──<<use>>──► Candidate Service ──<<import>>──► Evaluation Service │ │
└──<<use>>──► Reporting Service ──<<depends>>──► UploadThing

```

### 🎯 Caso de Uso 4: Contratar Personal

**Componentes Involucrados:**

- **<<boundary>>** Hiring (ContractForm, OnboardView, DocumentGen)
  - Interfaces: `IHiringForm` (provided), `IContractData` (required)
  - Puerto: P1 (REST/Actions)
- **<<control>>** Hiring Service, Workflow Service, Notification Service
  - Interfaces: `IHireService`, `IWorkflowSvc`, `INotifService` (provided)
  - Puertos: P1, P2, P3
- **<<entity>>** PostgreSQL DB (contracts, audit_logs), UploadThing (contract docs)
  - Interfaces: `IDataAccess`, `IFileStorage` (provided)

**Flujo de Dependencias:**
```

Hiring ──<<use>>──► Hiring Service ──<<depends>>──► PostgreSQL DB │ │ │ │
├──<<import>>──► Candidate Service │ ├──<<use>>──► Notification Service │
└──<<depends>>──► UploadThing │ └──<<depends>>──► Workflow Service

```

## Dependencias Entre Componentes UML

### Flujo de Dependencias por Capas con Interfaces:

```

CAPA DE PRESENTACIÓN (<<boundary>>) │ ▼ <<use>> (through P1 ports) CAPA DE
LÓGICA DE NEGOCIO (<<control>>) │ ▼ <<depends>> (through P2, P3, P4 ports) CAPA
DE DATOS (<<entity>>)

┌─────────────────────────────────────────────────────────────────────────────────┐
│ FLUJO DE INTERFACES │
├─────────────────────────────────────────────────────────────────────────────────┤
│ │ │ Landing Page ────► INavigation ────► IRouting │ │ Auth Module ─────►
IAuthForm ─────► IValidation ───┐ │ │ User Profile ────► IUserMgmt ─────►
IUserData ─────┼──► IAuthService │ │ │ │ │ │ Job Offers ──────► IJobDisplay ───►
IJobData ──────┼──► IJobService │ │ RRHH Module ─────► IRRHHMgmt ─────►
IAreaData ─────┼──► IAreaMgmt │ │ Application ─────► IAppForm ──────► IAppData
──────┼──► IAppService │ │ Evaluation ──────► IEvalView ─────► IEvalData
─────┼──► IEvalService │ │ Candidate ───────► ICandView ─────► ICandData
─────┼──► ICandService │ │ Hiring ──────────► IHiringForm ───► IContractData ─┘
│ │ │ │ │ │ ▼ │ │ ┌─────────────────┐ │ │ │ Service Layer │ │ │ │ (<<control>>)
│ │ │ └─────────────────┘ │ │ │ │ │ ▼ │ │ IAuthRepo ◄──── Authentication Service
──────► IAuthProvider │ │ IUserRepo ◄──── User Service ─────────────────►
ISessionMgmt │ │ IAreaRepo ◄──── Area Service ─────────────────► IDataAccess │ │
IJobRepo ◄───── Job Offer Service ────────────► IDataAccess │ │ IAppRepo ◄─────
Application Service ──────────► IDataAccess │ │ IEvalRepo ◄──── Evaluation
Service ───────────► IDataAccess │ │ ICandRepo ◄──── Candidate Service
────────────► IDataAccess │ │ IContractRepo ◄ Hiring Service ───────────────►
IDataAccess │ │ INotifRepo ◄─── Notification Service ─────────► IDataAccess │ │
IFileRepo ◄──── File Upload Service ──────────► IFileStorage │ │ IDataAccess ◄──
Reporting Service ────────────► IDataAccess │ │ IProcessRepo ◄─ Workflow Service
─────────────► IDataAccess │ │ │ │ │ ▼ │ │ ┌─────────────────┐ │ │ │ Data Layer
│ │ │ │ (<<entity>>) │ │ │ └─────────────────┘ │ │ │ │ PostgreSQL DB ────►
IDataAccess ─────► ISQLConnection │ │ UploadThing ──────► IFileStorage ────►
ICloudProvider │ │ Better Auth ──────► IAuthProvider ───► ISecurityModule │ │
ISessionMgmt │ │ IUserCredentials │ │ │
└─────────────────────────────────────────────────────────────────────────────────┘

```

### Matriz de Dependencias UML

| Componente Origen | Componente Destino | Tipo Dependencia | Interface |
|-------------------|-------------------|------------------|-----------|
| Auth Module | Authentication Service | <<use>> | IAuthService |
| Job Offers | Job Offer Service | <<use>> | IJobService |
| RRHH Module | Area Service | <<use>> | IAreaMgmt |
| Application | Application Service | <<use>> | IAppService |
| Application Service | Job Offer Service | <<import>> | IJobService |
| Application Service | File Upload Service | <<depends>> | IFileService |
| Job Offer Service | Area Service | <<import>> | IAreaMgmt |
| Evaluation Service | Application Service | <<import>> | IAppService |
| Hiring Service | Candidate Service | <<import>> | ICandService |
| All Services | Authentication Service | <<depends>> | IAuthService |
| Authentication Service | Better Auth | <<depends>> | IAuthProvider |
| Job Offer Service | PostgreSQL DB | <<depends>> | IDataAccess |
| File Upload Service | UploadThing | <<depends>> | IFileStorage |

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

## Componentes Futuros a Implementar (Arquitectura UML)

### Módulos Pendientes con Interfaces:

#### 1. **CV Analysis Service** (<<control>>)
- **Interfaces Proporcionadas:** `ICVAnalysis`, `IAIProcessor`
- **Interfaces Requeridas:** `IFileRepo`, `IAIProvider`
- **Dependencias:** File Upload Service (<<import>>), External AI API (<<depends>>)
- **Puerto:** P5 (AI/ML API)

#### 2. **Interview Scheduler** (<<control>>)
- **Interfaces Proporcionadas:** `IScheduler`, `ICalendarMgmt`
- **Interfaces Requeridas:** `INotifRepo`, `IUserRepo`
- **Dependencias:** Notification Service (<<use>>), Calendar API (<<depends>>)
- **Puerto:** P6 (Calendar Integration)

#### 3. **Background Check Service** (<<control>>)
- **Interfaces Proporcionadas:** `IBackgroundCheck`, `IVerification`
- **Interfaces Requeridas:** `ICandRepo`, `IExternalAPI`
- **Dependencias:** Candidate Service (<<import>>), External APIs (<<depends>>)
- **Puerto:** P7 (External Verification)

#### 4. **Performance Analytics** (<<control>>)
- **Interfaces Proporcionadas:** `IAnalytics`, `IMetrics`
- **Interfaces Requeridas:** `IDataAccess`, `IReportRepo`
- **Dependencias:** Reporting Service (<<use>>), Data Warehouse (<<depends>>)
- **Puerto:** P8 (Analytics Engine)

#### 5. **Mobile App Components** (<<boundary>>)
- **Interfaces Proporcionadas:** `IMobileUI`, `IPushNotif`
- **Interfaces Requeridas:** `IJobService`, `IAppService`
- **Dependencias:** All Business Services (<<use>>), Mobile Platform (<<depends>>)
- **Puerto:** P9 (Mobile API)

#### 6. **API Gateway** (<<boundary>>)
- **Interfaces Proporcionadas:** `IAPIEndpoint`, `IRequestRouter`
- **Interfaces Requeridas:** `IAuthService`, `IAllServices`
- **Dependencias:** All Services (<<use>>), Load Balancer (<<depends>>)
- **Puerto:** P10 (External API)

#### 7. **Real-time Notifications** (<<control>>)
- **Interfaces Proporcionadas:** `IWebSocket`, `IRealTimeNotif`
- **Interfaces Requeridas:** `INotifService`, `IUserMgmt`
- **Dependencias:** Notification Service (<<import>>), WebSocket Server (<<depends>>)
- **Puerto:** P11 (WebSocket)

### Diagrama de Componentes Futuros

```

┌─────────────────────────────────────────────────────────────────────────────────┐
│ COMPONENTES FUTUROS │
├─────────────────────────────────────────────────────────────────────────────────┤
│ │ │ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │ │ │ CV
Analysis │ │ Interview │ │ Background │ │ │ │ Service │ │ Scheduler │ │ Check
Service │ │ │ │ <<control>> │ │ <<control>> │ │ <<control>> │ │ │ │ │ │ │ │ │ │
│ │ ┌─┐ ICVAnalysis │ │ ┌─┐ IScheduler │ │ ┌─┐ IBackCheck │ │ │ │ └─┘ (provided)
│ │ └─┘ (provided) │ │ └─┘ (provided) │ │ │ │ ○── IAIProvider │ │ ○── ICalendar
│ │ ○── IExtAPI │ │ │ │ (required) │ │ (required) │ │ (required) │ │ │
└─────────────────┘ └─────────────────┘ └─────────────────┘ │ │ │ │ │ │ │ │
<<depends>> │ <<use>> │ <<depends>> │ │ ▼ ▼ ▼ │ │ ┌─────────────────┐
┌─────────────────┐ ┌─────────────────┐ │ │ │ AI Provider │ │ Calendar API │ │
External APIs │ │ │ │ <<entity>> │ │ <<entity>> │ │ <<entity>> │ │ │
└─────────────────┘ └─────────────────┘ └─────────────────┘ │ │ │ │
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │ │ │ Performance │
│ Mobile App │ │ API Gateway │ │ │ │ Analytics │ │ Components │ │ <<boundary>> │
│ │ │ <<control>> │ │ <<boundary>> │ │ │ │ │ │ │ │ │ │ │ │ │ │ ┌─┐ IAnalytics │
│ ┌─┐ IMobileUI │ │ ┌─┐ IAPIEndpoint│ │ │ │ └─┘ (provided) │ │ └─┘ (provided) │
│ └─┘ (provided) │ │ │ │ ○── IDataWH │ │ ○── IMobilePlatform │ ○──
ILoadBalancer│ │ │ │ (required) │ │ (required) │ │ (required) │ │ │
└─────────────────┘ └─────────────────┘ └─────────────────┘ │ │ │ │ │ │ │ │
<<depends>> │ <<depends>> │ <<depends>> │ │ ▼ ▼ ▼ │ │ ┌─────────────────┐
┌─────────────────┐ ┌─────────────────┐ │ │ │ Data Warehouse │ │ Mobile
Platform│ │ Load Balancer │ │ │ │ <<entity>> │ │ <<entity>> │ │ <<entity>> │ │ │
└─────────────────┘ └─────────────────┘ └─────────────────┘ │ │ │ │
┌─────────────────────────────────────────────────────────────────────────┐ │ │
│ Real-time Notifications │ │ │ │ <<control>> │ │ │ │ │ │ │ │ ┌─┐ IWebSocket ┌─┐
IRealTimeNotif │ │ │ │ └─┘ (provided) └─┘ (provided) │ │ │ │ ○──
IWebSocketServer │ │ │ │ (required) │ │ │
└─────────────────────────────────────────────────────────────────────────┘ │ │
│ │ │ │ <<depends>> │ │ ▼ │ │ ┌─────────────────┐ │ │ │ WebSocket Server│ │ │ │
<<entity>> │ │ │ └─────────────────┘ │ │ │
└─────────────────────────────────────────────────────────────────────────────────┘

```

### Nuevos Puertos y Conectores

- **P5**: AI/ML API Connection (REST/gRPC)
- **P6**: Calendar Integration (CalDAV/Exchange)
- **P7**: External Verification APIs (REST/SOAP)
- **P8**: Analytics Engine (GraphQL/REST)
- **P9**: Mobile API (REST/GraphQL)
- **P10**: External API Gateway (REST/GraphQL)
- **P11**: WebSocket Connection (WebSocket/Socket.IO)
```
