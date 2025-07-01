```mermaid
graph TB
    subgraph "Capa de Presentación (<<boundary>>)"
        LP[Landing Page<br/>• Header<br/>• Navbar<br/>• Footer]
        AM[Auth Module<br/>• SignInView<br/>• SignUpView<br/>• Recovery]
        UP[User Profile<br/>• UserButton<br/>• Settings<br/>• Dashboard]
        JO[Job Offers<br/>• OffersList<br/>• OfferDetail<br/>• FilterPanel]
        RM[RRHH Module<br/>• AreaView<br/>• JobForm<br/>• JobTable]
        EV[Evaluation<br/>• CandidateList<br/>• Interview<br/>• Scoring]
        AP[Application<br/>• ApplyForm<br/>• CVUpload<br/>• StatusTracker]
        CA[Candidate<br/>• CandidateView<br/>• EvalResults<br/>• Profile]
        HI[Hiring<br/>• ContractForm<br/>• OnboardView<br/>• DocumentGen]
    end

    subgraph "Capa de Lógica de Negocio (<<control>>)"
        AS[Authentication Service<br/>• Login/Logout<br/>• Registration<br/>• Session Mgmt]
        US[User Service<br/>• Profile Mgmt<br/>• User Roles<br/>• Permissions]
        ARS[Area Service<br/>• Create Area<br/>• Update Area<br/>• List Areas]
        JS[Job Offer Service<br/>• Create Offer<br/>• Update Offer<br/>• Search/Filter]
        APS[Application Service<br/>• Submit App<br/>• Track Status<br/>• Validate CV]
        ES[Evaluation Service<br/>• CV Review<br/>• Interview<br/>• Score Tests]
        CS[Candidate Service<br/>• Candidate Mgmt<br/>• Eval Tracking<br/>• Ranking]
        HS[Hiring Service<br/>• Contract Gen<br/>• Onboarding<br/>• Doc Management]
        NS[Notification Service<br/>• Email Alerts<br/>• Status Updates<br/>• Reminders]
        FS[File Upload Service<br/>• CV Upload<br/>• File Validate<br/>• Doc Storage]
        RS[Reporting Service<br/>• Analytics<br/>• Charts<br/>• Metrics]
        WS[Workflow Service<br/>• Process Flow<br/>• State Machine<br/>• Automation]
    end

    subgraph "Capa de Datos (<<entity>>)"
        PG[PostgreSQL DB<br/>(Neon Database)<br/>• Users<br/>• Areas<br/>• Job Offers<br/>• Applications]
        UT[UploadThing<br/>(File Storage)<br/>• CV Documents<br/>• Profile Images<br/>• Certificates]
        BA[Better Auth<br/>(Authentication)<br/>• User Sessions<br/>• JWT Tokens<br/>• Social Login]
    end

    %% Conexiones Presentación -> Lógica
    AM -.->|<<use>> P1 REST| AS
    JO -.->|<<use>> P1 REST| JS
    RM -.->|<<use>> P1 REST| ARS
    AP -.->|<<use>> P1 REST| APS
    EV -.->|<<use>> P1 REST| ES
    CA -.->|<<use>> P1 REST| CS
    HI -.->|<<use>> P1 REST| HS

    %% Dependencias entre Servicios
    APS -.->|<<import>>| JS
    APS -.->|<<use>>| NS
    APS -.->|<<depends>>| FS

    JS -.->|<<import>>| ARS
    JS -.->|<<depends>>| WS

    ES -.->|<<import>>| APS
    ES -.->|<<use>>| CS
    ES -.->|<<depends>>| RS

    HS -.->|<<import>>| CS
    HS -.->|<<use>>| NS
    HS -.->|<<depends>>| FS
    HS -.->|<<depends>>| WS

    CS -.->|<<import>>| ES
    CS -.->|<<use>>| RS

    NS -.->|<<import>>| US
    NS -.->|<<use>>| AS

    %% Conexiones Lógica -> Datos
    AS -.->|<<depends>> P4 JWT| BA
    JS -.->|<<depends>> P2 ORM| PG
    ARS -.->|<<depends>> P2 ORM| PG
    APS -.->|<<depends>> P2 ORM| PG
    ES -.->|<<depends>> P2 ORM| PG
    CS -.->|<<depends>> P2 ORM| PG
    HS -.->|<<depends>> P2 ORM| PG
    NS -.->|<<depends>> P2 ORM| PG
    US -.->|<<depends>> P2 ORM| PG
    RS -.->|<<depends>> P2 ORM| PG
    WS -.->|<<depends>> P2 ORM| PG

    FS -.->|<<depends>> P3 REST| UT
    APS -.->|<<depends>> P3 REST| UT
    HS -.->|<<depends>> P3 REST| UT

    %% Estilos
    classDef boundary fill:#E3F2FD,stroke:#1976D2,stroke-width:2px
    classDef control fill:#E8F5E8,stroke:#388E3C,stroke-width:2px
    classDef entity fill:#FFF3E0,stroke:#F57C00,stroke-width:2px

    class LP,AM,UP,JO,RM,EV,AP,CA,HI boundary
    class AS,US,ARS,JS,APS,ES,CS,HS,NS,FS,RS,WS control
    class PG,UT,BA entity
```
