# Diagrama de Componentes - BlockIO (Metodología RUP)

## Estructura del Sistema

### Capa de Presentación (UI Layer)

```
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│         📦              │  │         📦              │  │         📦              │
│    RRHHComponents       │  │    JobComponents        │  │    AreaComponents       │
├─────────────────────────┤  ├─────────────────────────┤  ├─────────────────────────┤
│ Interfaces:             │  │ Interfaces:             │  │ Interfaces:             │
│ ○─ INavigationProps     │  │ ○─ IJobOfferProps       │  │ ○─ IAreaProps           │
│ ○─ IDashboardProps      │  │ ○─ IJobFormProps        │  │ ○─ IAreaFormProps       │
├─────────────────────────┤  ├─────────────────────────┤  ├─────────────────────────┤
│ Sub-components:         │  │ Sub-components:         │  │ Sub-components:         │
│ • Navigation            │  │ • JobOfferView          │  │ • AreaView              │
│ • Header                │  │ • JobForm               │  │ • CreateForm            │
│ • Dashboard             │  │ • JobTable              │  │ • UpdateForm            │
│ • Sidebar               │  │ • JobCard               │  │ • DataTable             │
│                         │  │ • JobChart              │  │ • AreaChart             │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘
            │                            │                            │
            ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
            ▼                            ▼                            ▼
```

### Capa de Lógica de Negocio (Business Layer)

```
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│         📦              │  │         📦              │  │         📦              │
│    AreaService          │  │   JobOfferService       │  │    AuthService          │
├─────────────────────────┤  ├─────────────────────────┤  ├─────────────────────────┤
│ Interfaces:             │  │ Interfaces:             │  │ Interfaces:             │
│ ○─ IAreaRepository      │  │ ○─ IJobRepository       │  │ ○─ IAuthProvider        │
│ ○─ IAreaValidator       │  │ ○─ IJobValidator        │  │ ○─ ISessionManager      │
├─────────────────────────┤  ├─────────────────────────┤  ├─────────────────────────┤
│ Methods:                │  │ Methods:                │  │ Methods:                │
│ • createArea()          │  │ • createJobOffer()      │  │ • authenticate()        │
│ • updateArea()          │  │ • updateJobOffer()      │  │ • authorize()           │
│ • deleteArea()          │  │ • deleteJobOffer()      │  │ • validateSession()     │
│ • getAreaById()         │  │ • getJobOfferById()     │  │ • refreshToken()        │
│ • getAllAreas()         │  │ • getAllJobOffers()     │  │ • logout()              │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘
            │                            │                            │
            ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
            ▼                            ▼                            ▼

┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│         📦              │  │         📦              │  │         📦              │
│   ReportingService      │  │   NotificationService   │  │   ValidationService     │
├─────────────────────────┤  ├─────────────────────────┤  ├─────────────────────────┤
│ Interfaces:             │  │ Interfaces:             │  │ Interfaces:             │
│ ○─ IReportGenerator     │  │ ○─ IEmailProvider       │  │ ○─ IValidator           │
│ ○─ IChartDataProvider   │  │ ○─ INotificationQueue   │  │ ○─ ISchemaValidator     │
├─────────────────────────┤  ├─────────────────────────┤  ├─────────────────────────┤
│ Methods:                │  │ Methods:                │  │ Methods:                │
│ • generateAreaReport()  │  │ • sendEmail()           │  │ • validateArea()        │
│ • generateJobReport()   │  │ • queueNotification()   │  │ • validateJobOffer()    │
│ • getChartData()        │  │ • processQueue()        │  │ • validateUser()        │
│ • exportToPDF()         │  │ • sendSMS()             │  │ • sanitizeInput()       │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘
            │                            │                            │
            ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
            ▼                            ▼                            ▼
```

### Capa de Acceso a Datos (Data Access Layer)

```
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│         📦              │  │         📦              │  │         📦              │
│   DatabaseSchema        │  │    ServerActions        │  │      DataHooks          │
├─────────────────────────┤  ├─────────────────────────┤  ├─────────────────────────┤
│ Interfaces:             │  │ Interfaces:             │  │ Interfaces:             │
│ ○─ ISchema              │  │ ○─ IServerAction        │  │ ○─ IHookReturn          │
│ ○─ IRelationship        │  │ ○─ IActionResult        │  │ ○─ IQueryResult         │
├─────────────────────────┤  ├─────────────────────────┤  ├─────────────────────────┤
│ Tables:                 │  │ Actions:                │  │ Hooks:                  │
│ • area                  │  │ • createArea            │  │ • useAreas              │
│ • jobOffer              │  │ • updateArea            │  │ • useJobOffers          │
│ • user                  │  │ • deleteArea            │  │ • useChartData          │
│ • application           │  │ • createJobOffer        │  │ • useAuth               │
│ • evaluation            │  │ • updateJobOffer        │  │ • useReports            │
│ • session               │  │ • deleteJobOffer        │  │ • useNotifications      │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘
            │                            │                            │
            ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
            ▼                            ▼                            ▼
```

### Capa de Infraestructura (Infrastructure Layer)

```
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│         📦              │  │         📦              │  │         📦              │
│    DatabaseConnector    │  │   ExternalServices      │  │    SecurityModule       │
├─────────────────────────┤  ├─────────────────────────┤  ├─────────────────────────┤
│ Interfaces:             │  │ Interfaces:             │  │ Interfaces:             │
│ ○─ IConnection          │  │ ○─ IEmailService        │  │ ○─ IEncryption          │
│ ○─ ITransaction         │  │ ○─ IFileStorage         │  │ ○─ ITokenManager        │
├─────────────────────────┤  ├─────────────────────────┤  ├─────────────────────────┤
│ Providers:              │  │ Services:               │  │ Security:               │
│ • PostgreSQL            │  │ • Email Service         │  │ • JWT Manager           │
│ • Connection Pool       │  │ • File Upload           │  │ • Encryption            │
│ • Migration Runner      │  │ • Cloud Storage         │  │ • Access Control        │
│ • Backup Manager        │  │ • PDF Generator         │  │ • Rate Limiting         │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘
```

## Mapeo con Estructura de Archivos

### Componentes UI → Estructura de Carpetas

```
📦 RRHHComponents
├── /components/rrhh/
│   ├── /area/
│   │   ├── area-view.tsx
│   │   ├── /form/
│   │   │   ├── create-form.tsx
│   │   │   └── update-form.tsx
│   │   └── /table/
│   │       └── data-table.tsx
│   ├── /header/
│   │   └── header.tsx
│   └── /navigation/
│       └── navigation.tsx

📦 JobComponents
├── /components/rrhh/jobs/
│   ├── job-offer-view.tsx
│   ├── job-form.tsx
│   ├── job-table.tsx
│   └── job-card.tsx

📦 AreaComponents
├── /components/rrhh/area/
│   ├── area-view.tsx
│   ├── /form/
│   │   ├── create-form.tsx
│   │   └── update-form.tsx
│   ├── /table/
│   │   └── data-table.tsx
│   └── /chart/
│       └── area-chart.tsx

📦 ServerActions
├── /actions/
│   ├── area.ts
│   └── job-offer.ts

📦 DatabaseSchema
├── /db/
│   ├── schema.ts
│   ├── queries.ts
│   └── index.ts

📦 DataHooks
├── /hooks/
│   └── use-chart-data.ts
```

## Dependencias Entre Componentes

### Diagrama de Dependencias

```
RRHHComponents ┅┅┅► AreaService ┅┅┅► DatabaseSchema
      │                  │               │
      │                  └─────┅┅┅► ServerActions
      │                              │
      └─────┅┅┅► AuthService ┅┅┅► SecurityModule

JobComponents ┅┅┅► JobOfferService ┅┅┅► DatabaseSchema
     │                   │                │
     │                   └─────┅┅┅► ServerActions
     │                             │
     └─────┅┅┅► ValidationService ┅┅┅► DataHooks

AreaComponents ┅┅┅► AreaService ┅┅┅► ReportingService
      │                 │               │
      │                 │               └─────┅┅┅► ExternalServices
      │                 │
      └─────┅┅┅► DataHooks ┅┅┅► DatabaseConnector
```

## Interfaces Principales

### IAreaRepository

```typescript
interface IAreaRepository {
  create(area: Area): Promise<Area>
  update(id: string, area: Partial<Area>): Promise<Area>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Area | null>
  findAll(): Promise<Area[]>
}
```

### IJobOfferService

```typescript
interface IJobOfferService {
  createJobOffer(jobOffer: JobOffer): Promise<JobOffer>
  updateJobOffer(id: string, jobOffer: Partial<JobOffer>): Promise<JobOffer>
  deleteJobOffer(id: string): Promise<void>
  getJobOfferById(id: string): Promise<JobOffer | null>
  getAllJobOffers(): Promise<JobOffer[]>
  getJobOffersByArea(areaId: string): Promise<JobOffer[]>
}
```

### IAuthProvider

```typescript
interface IAuthProvider {
  authenticate(credentials: Credentials): Promise<AuthResult>
  authorize(token: string): Promise<User | null>
  validateSession(sessionId: string): Promise<boolean>
  refreshToken(refreshToken: string): Promise<string>
  logout(sessionId: string): Promise<void>
}
```

## Componentes por Estereotipo RUP

### <<boundary>> - Componentes de Interfaz

- **RRHHComponents**: Interfaz principal del módulo RRHH
- **JobComponents**: Interfaz de gestión de ofertas laborales
- **AreaComponents**: Interfaz de gestión de áreas

### <<control>> - Componentes de Control

- **AreaService**: Lógica de negocio para áreas
- **JobOfferService**: Lógica de negocio para ofertas laborales
- **AuthService**: Lógica de autenticación y autorización
- **ReportingService**: Lógica de generación de reportes
- **NotificationService**: Lógica de notificaciones
- **ValidationService**: Lógica de validación

### <<entity>> - Componentes de Entidad

- **DatabaseSchema**: Definición de esquemas de datos
- **ServerActions**: Acciones del servidor para manipulación de datos
- **DataHooks**: Hooks para acceso a datos
- **DatabaseConnector**: Conector a la base de datos
- **SecurityModule**: Módulo de seguridad

## Patrones de Diseño Implementados

### Repository Pattern

- **AreaRepository**: Acceso a datos de áreas
- **JobOfferRepository**: Acceso a datos de ofertas laborales
- **UserRepository**: Acceso a datos de usuarios

### Service Layer Pattern

- **AreaService**: Servicios de negocio para áreas
- **JobOfferService**: Servicios de negocio para ofertas laborales
- **AuthService**: Servicios de autenticación

### Observer Pattern

- **NotificationService**: Para notificaciones en tiempo real
- **DataHooks**: Para actualización reactiva de datos

## Leyenda de Notación UML

| Símbolo     | Significado                 |
| ----------- | --------------------------- |
| `📦`        | Componente UML              |
| `○─`        | Interfaz proporcionada      |
| `─○`        | Interfaz requerida          |
| `────────►` | Dependencia "uses"          |
| `┅┅┅┅┅┅┅►`  | Dependencia "depends"       |
| `────────▷` | Implementación "implements" |

## Configuración para Herramientas de Diagramado

### Para Miro

- **Paleta de Colores**:
  - 🔵 Azul (#2563EB): Capa de Presentación
  - 🟢 Verde (#059669): Capa de Lógica de Negocio
  - 🟠 Naranja (#EA580C): Capa de Datos
  - 🟣 Morado (#9333EA): Capa de Infraestructura

### Dimensiones Sugeridas

- **Componente principal**: 300px × 200px
- **Espaciado entre capas**: 100px
- **Ancho total del diagrama**: 1400px
- **Alto total del diagrama**: 1000px

### Para PlantUML

```plantuml
@startuml BlockIO_Components
!define RECTANGLE class

package "Presentation Layer" {
  RECTANGLE RRHHComponents
  RECTANGLE JobComponents
  RECTANGLE AreaComponents
}

package "Business Layer" {
  RECTANGLE AreaService
  RECTANGLE JobOfferService
  RECTANGLE AuthService
}

package "Data Layer" {
  RECTANGLE DatabaseSchema
  RECTANGLE ServerActions
  RECTANGLE DataHooks
}

RRHHComponents ..> AreaService
JobComponents ..> JobOfferService
AreaComponents ..> AreaService

AreaService ..> DatabaseSchema
JobOfferService ..> DatabaseSchema
AuthService ..> SecurityModule

@enduml
```
