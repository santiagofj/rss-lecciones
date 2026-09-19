import type { CourseConfig } from "../courses/types.js";

const weekdays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

type Weekday = (typeof weekdays)[number];

export function localCalendarDate(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function localWeekday(date: Date, timeZone: string): Weekday {
  const value = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
  }).format(date).toLowerCase();

  if (!weekdays.includes(value as Weekday)) {
    throw new Error(`Día de semana inesperado: ${value}`);
  }
  return value as Weekday;
}

export function isScheduledForDate(course: CourseConfig, date: Date): boolean {
  if (course.status !== "active" || course.schedule.type === "manual") {
    return false;
  }
  if (course.schedule.type === "weekdays") {
    return !["saturday", "sunday"].includes(localWeekday(date, course.timezone));
  }
  return course.schedule.days.includes(localWeekday(date, course.timezone));
}
