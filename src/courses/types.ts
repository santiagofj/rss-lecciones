import type { z } from "zod";

import type {
  courseSchema,
  lessonFrontmatterSchema,
  progressSchema,
  siteConfigSchema,
  syllabusFrontmatterSchema,
} from "./schemas.js";

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type CourseConfig = z.infer<typeof courseSchema>;
export type SyllabusFrontmatter = z.infer<typeof syllabusFrontmatterSchema>;
export type Progress = z.infer<typeof progressSchema>;
export type LessonFrontmatter = z.infer<typeof lessonFrontmatterSchema>;

export type Syllabus = {
  frontmatter: SyllabusFrontmatter;
  markdown: string;
};

export type Lesson = {
  frontmatter: LessonFrontmatter;
  markdown: string;
  filename: string;
};

export type LoadedCourse = {
  directory: string;
  config: CourseConfig;
  syllabus: Syllabus;
  progress: Progress;
  lessons: Lesson[];
};

export type LoadedRepository = {
  site: SiteConfig;
  courses: LoadedCourse[];
};

export type ValidationIssue = {
  file: string;
  path: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; repository: LoadedRepository }
  | { ok: false; issues: ValidationIssue[] };
