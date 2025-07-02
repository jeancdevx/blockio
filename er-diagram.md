# Entity Relationship Diagram - BlockIO HR System

## Database Schema Overview

This diagram represents the database structure for the BlockIO HR management
system.

## Mermaid ER Diagram

```mermaid
erDiagram
    %% Entities
    USER {
        text id PK
        text name
        text email UK
        boolean email_verified
        text image
        timestamp created_at
        timestamp updated_at
    }

    SESSION {
        text id PK
        timestamp expires_at
        text token UK
        timestamp created_at
        timestamp updated_at
        text ip_address
        text user_agent
        text user_id FK
    }

    ACCOUNT {
        text id PK
        text account_id
        text provider_id
        text user_id FK
        text access_token
        text refresh_token
        text id_token
        timestamp access_token_expires_at
        timestamp refresh_token_expires_at
        text scope
        text password
        timestamp created_at
        timestamp updated_at
    }

    VERIFICATION {
        text id PK
        text identifier
        text value
        timestamp expires_at
        timestamp created_at
        timestamp updated_at
    }

    CV {
        uuid id PK
        text user_id FK
        text file_name
        text file_url
        timestamp created_at
        timestamp updated_at
    }

    AREA {
        uuid id PK
        text name
        timestamp created_at
        timestamp updated_at
    }

    JOB_OFFER {
        uuid id PK
        text title
        text description
        decimal salary
        text location
        job_offer_enum work_type
        integer max_selected_candidates
        uuid area_id FK
        timestamp expires_at
        job_offer_status_enum status
        text[] requirements
        text[] benefits
        timestamp created_at
        timestamp updated_at
    }

    EVALUATION {
        uuid id PK
        uuid job_offer_id FK
        evaluation_type_enum type
        decimal weight
        decimal score
        timestamp created_at
        timestamp updated_at
    }

    INTERVIEW {
        uuid id PK
        text user_id FK
        uuid job_offer_id FK
        uuid cv_id FK
        timestamp scheduled_at
        job_application_status_enum status
        decimal score
        timestamp created_at
        timestamp updated_at
    }

    %% Relationships
    USER ||--o{ SESSION : "has"
    USER ||--o{ ACCOUNT : "has"
    USER ||--o| CV : "uploads"
    USER ||--o{ INTERVIEW : "participates_in"

    AREA ||--o{ JOB_OFFER : "contains"

    JOB_OFFER ||--o{ EVALUATION : "has"
    JOB_OFFER ||--o{ INTERVIEW : "requires"

    CV ||--o{ INTERVIEW : "used_in"
```

## PlantUML ER Diagram

```plantuml
@startuml BlockIO_ER_Diagram

!define PRIMARY_KEY(x) <b><color:red>x</color></b>
!define FOREIGN_KEY(x) <color:blue>x</color>
!define UNIQUE(x) <color:green>x</color>

entity "user" as user {
  PRIMARY_KEY(id) : text
  --
  name : text
  UNIQUE(email) : text
  email_verified : boolean
  image : text
  created_at : timestamp
  updated_at : timestamp
}

entity "session" as session {
  PRIMARY_KEY(id) : text
  --
  expires_at : timestamp
  UNIQUE(token) : text
  created_at : timestamp
  updated_at : timestamp
  ip_address : text
  user_agent : text
  FOREIGN_KEY(user_id) : text
}

entity "account" as account {
  PRIMARY_KEY(id) : text
  --
  account_id : text
  provider_id : text
  FOREIGN_KEY(user_id) : text
  access_token : text
  refresh_token : text
  id_token : text
  access_token_expires_at : timestamp
  refresh_token_expires_at : timestamp
  scope : text
  password : text
  created_at : timestamp
  updated_at : timestamp
}

entity "verification" as verification {
  PRIMARY_KEY(id) : text
  --
  identifier : text
  value : text
  expires_at : timestamp
  created_at : timestamp
  updated_at : timestamp
}

entity "cv" as cv {
  PRIMARY_KEY(id) : uuid
  --
  FOREIGN_KEY(user_id) : text
  file_name : text
  file_url : text
  created_at : timestamp
  updated_at : timestamp
}

entity "area" as area {
  PRIMARY_KEY(id) : uuid
  --
  name : text
  created_at : timestamp
  updated_at : timestamp
}

entity "job_offer" as job_offer {
  PRIMARY_KEY(id) : uuid
  --
  title : text
  description : text
  salary : decimal(10,2)
  location : text
  work_type : job_offer_enum
  max_selected_candidates : integer
  FOREIGN_KEY(area_id) : uuid
  expires_at : timestamp
  status : job_offer_status_enum
  requirements : text[]
  benefits : text[]
  created_at : timestamp
  updated_at : timestamp
}

entity "evaluation" as evaluation {
  PRIMARY_KEY(id) : uuid
  --
  FOREIGN_KEY(job_offer_id) : uuid
  type : evaluation_type_enum
  weight : decimal(5,2)
  score : decimal(5,2)
  created_at : timestamp
  updated_at : timestamp
}

entity "interview" as interview {
  PRIMARY_KEY(id) : uuid
  --
  FOREIGN_KEY(user_id) : text
  FOREIGN_KEY(job_offer_id) : uuid
  FOREIGN_KEY(cv_id) : uuid
  scheduled_at : timestamp
  status : job_application_status_enum
  score : decimal(5,2)
  created_at : timestamp
  updated_at : timestamp
}

' Relationships
user ||--o{ session
user ||--o{ account
user ||--o| cv
user ||--o{ interview

area ||--o{ job_offer

job_offer ||--o{ evaluation
job_offer ||--o{ interview

cv ||--o{ interview

@enduml
```

## Enumerations

### User Role Enum

- `admin`
- `rrhh` (Human Resources)
- `postulante` (Applicant)

### Job Offer Enum (Work Type)

- `tiempo_completo` (Full Time)
- `medio_tiempo` (Part Time)
- `contrato` (Contract)
- `practicas` (Internship)

### Job Offer Status Enum

- `activa` (Active)
- `vencida` (Expired)
- `cancelada` (Cancelled)
- `finalizada` (Finished)

### Interview/Application Status Enum

- `cv_enviado` (CV Sent)
- `cv_en_revision` (CV Under Review)
- `cv_aprobado` (CV Approved)
- `cv_rechazado` (CV Rejected)
- `entrevista_solicitada` (Interview Requested)
- `entrevista_realizada` (Interview Conducted)
- `entrevista_calificada` (Interview Scored)
- `evaluacion_en_curso` (Evaluation In Progress)
- `evaluacion_completada` (Evaluation Completed)
- `evaluacion_calificada` (Evaluation Scored)
- `seleccionado` (Selected)
- `rechazado` (Rejected)

### Evaluation Type Enum

- `fisica` (Physical)
- `psicologica` (Psychological)
- `aptitud` (Aptitude)

## Key Relationships

1. **User-CV**: One-to-One relationship (each user has one CV)
2. **User-Session**: One-to-Many (user can have multiple sessions)
3. **User-Account**: One-to-Many (user can have multiple accounts)
4. **User-Interview**: One-to-Many (user can have multiple interviews)
5. **Area-JobOffer**: One-to-Many (area contains multiple job offers)
6. **JobOffer-Evaluation**: One-to-Many (job offer can have multiple
   evaluations)
7. **JobOffer-Interview**: One-to-Many (job offer can have multiple interviews)
8. **CV-Interview**: One-to-Many (CV can be used in multiple interviews)

## Business Rules

- Each job offer belongs to exactly one area
- Each interview is associated with one user, one job offer, and one CV
- Evaluations are tied to specific job offers
- Sessions and accounts are linked to users for authentication
- The system tracks application status through the interview status enum
