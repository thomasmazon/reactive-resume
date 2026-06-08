import { z } from "zod";

import type { FilterKeys } from "../shared";
import { idSchema } from "../shared";
import { awardSchema } from "./award";
import { certificationSchema } from "./certification";
import { customSectionSchema } from "./custom-section";
import { educationSchema } from "./education";
import { experienceSchema } from "./experience";
import { interestSchema } from "./interest";
import { languageSchema } from "./language";
import { profileSchema } from "./profile";
import { projectSchema } from "./project";
import { publicationSchema } from "./publication";
import { referenceSchema } from "./reference";
import { skillSchema } from "./skill";
import { volunteerSchema } from "./volunteer";

// Schema
export const sectionSchema = z.object({
  name: z.string(),
  columns: z.number().min(1).max(5).default(1),
  separateLinks: z.boolean().default(true),
  visible: z.boolean().default(true),
});

// Schema
export const customSchema = sectionSchema.extend({
  id: idSchema,
  items: z.array(customSectionSchema),
});

export const sectionsSchema = z.object({
  summary: sectionSchema.extend({
    id: z.literal("summary"),
    content: z.string().default(""),
  }),
  awards: sectionSchema.extend({
    id: z.literal("awards"),
    items: z.array(awardSchema),
  }),
  certifications: sectionSchema.extend({
    id: z.literal("certifications"),
    items: z.array(certificationSchema),
  }),
  education: sectionSchema.extend({
    id: z.literal("education"),
    items: z.array(educationSchema),
  }),
  experience: sectionSchema.extend({
    id: z.literal("experience"),
    items: z.array(experienceSchema),
  }),
  volunteer: sectionSchema.extend({
    id: z.literal("volunteer"),
    items: z.array(volunteerSchema),
  }),
  interests: sectionSchema.extend({
    id: z.literal("interests"),
    items: z.array(interestSchema),
  }),
  languages: sectionSchema.extend({
    id: z.literal("languages"),
    items: z.array(languageSchema),
  }),
  profiles: sectionSchema.extend({
    id: z.literal("profiles"),
    items: z.array(profileSchema),
  }),
  projects: sectionSchema.extend({
    id: z.literal("projects"),
    items: z.array(projectSchema),
  }),
  publications: sectionSchema.extend({
    id: z.literal("publications"),
    items: z.array(publicationSchema),
  }),
  references: sectionSchema.extend({
    id: z.literal("references"),
    items: z.array(referenceSchema),
  }),
  skills: sectionSchema.extend({
    id: z.literal("skills"),
    items: z.array(skillSchema),
  }),
  custom: z.record(z.string(), customSchema),
});

// Detailed Types
export type Section = z.infer<typeof sectionSchema>;
export type Sections = z.infer<typeof sectionsSchema>;

export type SectionKey = "basics" | keyof Sections | `custom.${string}`;
export type SectionWithItem<T = unknown> = Sections[FilterKeys<Sections, { items: T[] }>];
export type SectionItem = SectionWithItem["items"][number];
export type CustomSectionGroup = z.infer<typeof customSchema>;

// Defaults
export const defaultSection: Section = {
  name: "",
  columns: 1,
  separateLinks: true,
  visible: true,
};

export const defaultSections: Sections = {
  summary: { ...defaultSection, id: "summary", name: "Objetivo Profissional", content: "Busco oportunidade de aplicar meus conhecimentos e experiência profissional para oferece um atendimento diferenciado. \n\nTrago comigo um grande entusiasmo pelo atendimento humano e carinhoso, de forma diferenciada ao cliente e desejo contribuir com o sucesso da imagem da empresa.<br><br>Meu objetivo é aplicar minha sólida trajetória profissional para elevar o padrão de atendimento da organização. Com um perfil focado na excelência e na humanização do contato com o cliente, busco contribuir diretamente para o fortalecimento da imagem institucional e o crescimento da empresa.<br><br>Acredito que um atendimento de qualidade nasce da empatia e do carinho genuíno pelo próximo. Busco uma oportunidade onde eu possa utilizar minha experiência para acolher clientes de forma única, garantindo que cada interação reflita os valores positivos e o cuidado da marca.<br><br>Entusiasta do atendimento focado no cliente, busco integrar sua equipe para oferecer um suporte diferenciado e ágil. Trago comigo a motivação necessária para transformar o atendimento em uma vantagem competitiva, zelando sempre pelo prestígio e sucesso da empresa no mercado.<br><br>Procuro oportunidade que possa trazer novas perspectivas de futuro e crescimento. Estou à procura de minha primeira experiência de trabalho. Quero desenvolver minhas habilidades e também contribuir para o sucesso da empresa" },
  awards: { ...defaultSection, id: "awards", name: "Cursos e Qualificações", items: [] },
  certifications: { ...defaultSection, id: "certifications", name: "Certificações", items: [] },
  education: { ...defaultSection, id: "education", name: "Formação Escolar / Acadêmica", items: [] },
  experience: { ...defaultSection, id: "experience", name: "Experiência Profissional", items: [] },
  volunteer: { ...defaultSection, id: "volunteer", name: "Volunteering", items: [] },
  interests: { ...defaultSection, id: "interests", name: "Interesses", items: [] },
  languages: { ...defaultSection, id: "languages", name: "Idiomas", items: [] },
  profiles: { ...defaultSection, id: "profiles", name: "Profiles", items: [] },
  projects: { ...defaultSection, id: "projects", name: "Projetos", items: [] },
  publications: { ...defaultSection, id: "publications", name: "Publications", items: [] },
  references: { ...defaultSection, id: "references", name: "Referências Profissionais", items: [] },
  skills: { ...defaultSection, id: "skills", name: "Habilidades e Competências", items: [ ] },
  custom: {},
};

export * from "./award";
export * from "./certification";
export * from "./custom-section";
export * from "./education";
export * from "./experience";
export * from "./interest";
export * from "./language";
export * from "./profile";
export * from "./project";
export * from "./publication";
export * from "./reference";
export * from "./skill";
export * from "./volunteer";
