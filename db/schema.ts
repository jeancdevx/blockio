import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  decimal,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core'

export const userRoleEnum = pgEnum('user_role_enum', [
  'admin',
  'rrhh',
  'postulante'
])

export const jobOfferEnum = pgEnum('job_offer_enum', [
  'tiempo_completo',
  'medio_tiempo',
  'contrato',
  'practicas'
])

export const jobOfferStatusEnum = pgEnum('job_offer_status_enum', [
  'activa',
  'vencida',
  'cancelada',
  'finalizada'
])

export const interviewStatus = pgEnum('job_application_status_enum', [
  'cv_enviado',
  'cv_en_revision',
  'cv_aprobado',
  'cv_rechazado',
  'entrevista_solicitada',
  'entrevista_realizada',
  'entrevista_calificada',
  'evaluacion_en_curso',
  'evaluacion_completada',
  'evaluacion_calificada',
  'seleccionado',
  'rechazado'
])

export const evaluationTypeEnum = pgEnum('evaluation_type_enum', [
  'fisica',
  'psicologica',
  'aptitud'
])

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull()
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' })
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp('updated_at').$defaultFn(
    () => /* @__PURE__ */ new Date()
  )
})

export const cv = pgTable('cv', {
  id: uuid('id').primaryKey().defaultRandom().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  fileName: text('file_name').notNull(),
  fileUrl: text('file_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const area = pgTable('area', {
  id: uuid('id').primaryKey().defaultRandom().defaultRandom(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const jobOffer = pgTable('job_offer', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  salary: decimal('salary', { precision: 10, scale: 2 }),
  location: text('location').notNull(),
  workType: jobOfferEnum('work_type').notNull(),
  maxSelectedCandidates: integer('max_selected_candidates')
    .default(1)
    .notNull(),
  areaId: uuid('area_id')
    .notNull()
    .references(() => area.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at').notNull(),
  status: jobOfferStatusEnum('status').notNull(),
  requirements: text('requirements')
    .array()
    .default(sql`'{}'::text[]`),
  benefits: text('benefits')
    .array()
    .default(sql`'{}'::text[]`),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const evaluation = pgTable('evaluation', {
  id: uuid('id').primaryKey().defaultRandom(),
  jobOfferId: uuid('job_offer_id')
    .notNull()
    .references(() => jobOffer.id, { onDelete: 'cascade' }),
  type: evaluationTypeEnum('type').notNull(),
  weight: decimal('weight', { precision: 5, scale: 2 }),
  score: decimal('score', { precision: 5, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const interview = pgTable('interview', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  jobOfferId: uuid('job_offer_id')
    .notNull()
    .references(() => jobOffer.id, { onDelete: 'cascade' }),
  cvId: uuid('cv_id')
    .notNull()
    .references(() => cv.id, { onDelete: 'cascade' }),
  scheduledAt: timestamp('scheduled_at').notNull(),
  status: interviewStatus('status').notNull(),
  score: decimal('score', { precision: 5, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const areaRelation = relations(area, ({ many }) => ({
  jobOffers: many(jobOffer)
}))

export const jobOfferRelation = relations(jobOffer, ({ one, many }) => ({
  area: one(area, {
    fields: [jobOffer.areaId],
    references: [area.id]
  }),
  evaluations: many(evaluation),
  interviews: many(interview)
}))

export const userRelation = relations(user, ({ one }) => ({
  cv: one(cv, {
    fields: [user.id],
    references: [cv.userId]
  })
}))

export const cvRelation = relations(cv, ({ one, many }) => ({
  user: one(user, {
    fields: [cv.userId],
    references: [user.id]
  }),
  interviews: many(interview)
}))

export const interviewRelation = relations(interview, ({ one }) => ({
  user: one(user, {
    fields: [interview.userId],
    references: [user.id]
  }),
  jobOffer: one(jobOffer, {
    fields: [interview.jobOfferId],
    references: [jobOffer.id]
  }),
  cv: one(cv, {
    fields: [interview.cvId],
    references: [cv.id]
  })
}))

export const evaluationRelation = relations(evaluation, ({ one }) => ({
  jobOffer: one(jobOffer, {
    fields: [evaluation.jobOfferId],
    references: [jobOffer.id]
  })
}))
