import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import type { Lesson, LoadedCourse, LoadedRepository } from "../courses/types.js";
import { renderMarkdown } from "./markdown.js";

function escapeXml(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function lessonFilename(lesson: Lesson): string {
  return lesson.filename.replace(/\.md$/, ".html");
}

function document(title: string, body: string, feedUrl?: string): string {
  const feedLink = feedUrl === undefined
    ? ""
    : `<link rel="alternate" type="application/rss+xml" title="RSS" href="${escapeXml(feedUrl)}">`;
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeXml(title)}</title>
  ${feedLink}
  <style>
    :root { color-scheme: light dark; font-family: ui-serif, Georgia, serif; }
    body { max-width: 760px; margin: 0 auto; padding: 32px 20px 72px; line-height: 1.65; }
    nav, .meta { font-family: ui-sans-serif, system-ui, sans-serif; }
    nav { margin-bottom: 36px; } a { color: #2870bd; }
    h1, h2, h3 { line-height: 1.2; } li { margin: 0.45rem 0; }
    pre { overflow-x: auto; padding: 16px; background: rgba(127,127,127,.12); border-radius: 8px; }
    code { font-family: ui-monospace, monospace; }
    .course { padding: 16px 0; border-top: 1px solid rgba(127,127,127,.3); }
    .meta { color: #777; font-size: .9rem; }
  </style>
</head>
<body>${body}</body>
</html>
`;
}

function renderLessonPage(course: LoadedCourse, lesson: Lesson): string {
  const metadata = lesson.frontmatter;
  return document(
    `${metadata.title} · ${course.config.title}`,
    `<nav><a href="./">← ${escapeXml(course.config.title)}</a></nav>
<article>
  <p class="meta">Lección ${metadata.sequence} · ${escapeXml(metadata.generationDate)}</p>
  <h1>${escapeXml(metadata.title)}</h1>
  <p><em>${escapeXml(metadata.summary)}</em></p>
  ${renderMarkdown(lesson.markdown)}
</article>`,
  );
}

function renderCoursePage(baseUrl: string, course: LoadedCourse): string {
  const feedUrl = `${baseUrl}${course.config.slug}/feed.xml`;
  const lessons = [...course.lessons]
    .sort((left, right) => right.frontmatter.sequence - left.frontmatter.sequence)
    .map((lesson) => `<li><a href="${lessonFilename(lesson)}">Lección ${lesson.frontmatter.sequence}: ${escapeXml(lesson.frontmatter.title)}</a><br><span class="meta">${escapeXml(lesson.frontmatter.generationDate)}</span></li>`)
    .join("\n");
  const content = lessons.length === 0 ? "<p>La primera lección todavía no fue publicada.</p>" : `<ol>${lessons}</ol>`;
  return document(
    course.config.title,
    `<nav><a href="../">← Todos los cursos</a></nav>
<h1>${escapeXml(course.config.title)}</h1>
<p>${escapeXml(course.config.description)}</p>
<p><a href="feed.xml">Suscribirse al RSS</a></p>
<h2>Lecciones</h2>
${content}`,
    feedUrl,
  );
}

export function renderFeed(baseUrl: string, course: LoadedCourse): string {
  const courseUrl = `${baseUrl}${course.config.slug}/`;
  const feedUrl = `${courseUrl}feed.xml`;
  const items = [...course.lessons]
    .sort((left, right) => right.frontmatter.sequence - left.frontmatter.sequence)
    .slice(0, 30)
    .map((lesson) => {
      const itemUrl = `${courseUrl}${lessonFilename(lesson)}`;
      const html = renderMarkdown(lesson.markdown).replaceAll("]]>", "]]&gt;");
      return `<item>
  <title>${escapeXml(lesson.frontmatter.title)}</title>
  <link>${escapeXml(itemUrl)}</link>
  <guid isPermaLink="true">${escapeXml(itemUrl)}</guid>
  <pubDate>${new Date(lesson.frontmatter.publishedAt).toUTCString()}</pubDate>
  <description>${escapeXml(lesson.frontmatter.summary)}</description>
  <content:encoded><![CDATA[${html}]]></content:encoded>
</item>`;
    }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>${escapeXml(course.config.title)}</title>
  <link>${escapeXml(courseUrl)}</link>
  <description>${escapeXml(course.config.description)}</description>
  <language>${escapeXml(course.config.language)}</language>
  <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>
`;
}

export async function buildPublicSite(root: string, repository: LoadedRepository): Promise<void> {
  const publicDirectory = path.join(root, "public");
  await rm(publicDirectory, { recursive: true, force: true });
  await mkdir(publicDirectory, { recursive: true });

  const courseCards = repository.courses
    .filter((course) => course.config.feed)
    .map((course) => `<section class="course"><h2><a href="${course.config.slug}/">${escapeXml(course.config.title)}</a></h2><p>${escapeXml(course.config.description)}</p><p><a href="${course.config.slug}/feed.xml">RSS</a></p></section>`)
    .join("\n");
  await writeFile(
    path.join(publicDirectory, "index.html"),
    document(repository.site.site.title, `<h1>${escapeXml(repository.site.site.title)}</h1><p>${escapeXml(repository.site.site.description)}</p>${courseCards}`),
    "utf8",
  );

  for (const course of repository.courses.filter((item) => item.config.feed)) {
    const courseDirectory = path.join(publicDirectory, course.config.slug);
    await mkdir(courseDirectory, { recursive: true });
    await writeFile(
      path.join(courseDirectory, "index.html"),
      renderCoursePage(repository.site.site.baseUrl, course),
      "utf8",
    );
    await writeFile(
      path.join(courseDirectory, "feed.xml"),
      renderFeed(repository.site.site.baseUrl, course),
      "utf8",
    );
    for (const lesson of course.lessons) {
      await writeFile(
        path.join(courseDirectory, lessonFilename(lesson)),
        renderLessonPage(course, lesson),
        "utf8",
      );
    }
  }
}
