import { relations } from 'drizzle-orm'
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

export const jobApplicationStatusEnum = pgEnum('job_application_status_enum', [
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
  role: userRoleEnum('role').default('postulante').notNull(),
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
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const jobRequirement = pgTable('job_requirement', {
  id: uuid('id').primaryKey().defaultRandom(),
  jobOfferId: uuid('job_offer_id')
    .notNull()
    .references(() => jobOffer.id, { onDelete: 'cascade' }),
  requirement: text('requirement').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const jobBenefit = pgTable('job_benefit', {
  id: uuid('id').primaryKey().defaultRandom(),
  jobOfferId: uuid('job_offer_id')
    .notNull()
    .references(() => jobOffer.id, { onDelete: 'cascade' }),
  benefit: text('benefit').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const jobApplication = pgTable('job_application', {
  id: uuid('id').primaryKey().defaultRandom(),
  jobOfferId: uuid('job_offer_id')
    .notNull()
    .references(() => jobOffer.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  cvId: uuid('cv_id')
    .notNull()
    .references(() => cv.id, { onDelete: 'cascade' }),
  status: jobApplicationStatusEnum('status').notNull(),
  cvReviewedAt: timestamp('cv_reviewed_at'),
  isSelected: boolean('is_selected').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const interview = pgTable('interview', {
  id: uuid('id').primaryKey().defaultRandom(),
  jobApplicationId: uuid('job_application_id')
    .notNull()
    .references(() => jobApplication.id, { onDelete: 'cascade' }),
  scheduledAt: timestamp('scheduled_at').notNull(),
  status: jobApplicationStatusEnum('status').notNull(),
  score: decimal('score', { precision: 5, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const evaluation = pgTable('evaluation', {
  id: uuid('id').primaryKey().defaultRandom(),
  interviewId: uuid('interview_id')
    .notNull()
    .references(() => interview.id, { onDelete: 'cascade' }),
  type: evaluationTypeEnum('type').notNull(),
  weight: decimal('weight', { precision: 5, scale: 2 }),
  score: decimal('score', { precision: 5, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const userRelation = relations(user, ({ one, many }) => ({
  cv: one(cv, {
    fields: [user.id],
    references: [cv.userId]
  }),
  jobApplications: many(jobApplication),
  jobOffers: many(jobOffer)
}))

export const cvRelation = relations(cv, ({ one, many }) => ({
  user: one(user, {
    fields: [cv.userId],
    references: [user.id]
  }),
  applications: many(jobApplication)
}))

export const areaRelation = relations(area, ({ many }) => ({
  jobOffers: many(jobOffer)
}))

export const jobOfferRelation = relations(jobOffer, ({ one, many }) => ({
  user: one(user, {
    fields: [jobOffer.userId],
    references: [user.id]
  }),
  area: one(area, {
    fields: [jobOffer.areaId],
    references: [area.id]
  }),
  requirements: many(jobRequirement),
  benefits: many(jobBenefit),
  applications: many(jobApplication)
}))

export const jobRequirementRelation = relations(jobRequirement, ({ one }) => ({
  jobOffer: one(jobOffer, {
    fields: [jobRequirement.jobOfferId],
    references: [jobOffer.id]
  })
}))

export const jobBenefitRelation = relations(jobBenefit, ({ one }) => ({
  jobOffer: one(jobOffer, {
    fields: [jobBenefit.jobOfferId],
    references: [jobOffer.id]
  })
}))

export const jobApplicationRelation = relations(jobApplication, ({ one }) => ({
  user: one(user, {
    fields: [jobApplication.userId],
    references: [user.id]
  }),
  jobOffer: one(jobOffer, {
    fields: [jobApplication.jobOfferId],
    references: [jobOffer.id]
  }),
  cv: one(cv, {
    fields: [jobApplication.cvId],
    references: [cv.id]
  }),
  interview: one(interview, {
    fields: [jobApplication.id],
    references: [interview.jobApplicationId]
  })
}))

export const interviewRelation = relations(interview, ({ one, many }) => ({
  jobApplication: one(jobApplication, {
    fields: [interview.jobApplicationId],
    references: [jobApplication.id]
  }),
  evaluations: many(evaluation)
}))

export const evaluationRelation = relations(evaluation, ({ one }) => ({
  interview: one(interview, {
    fields: [evaluation.interviewId],
    references: [interview.id]
  })
}))
