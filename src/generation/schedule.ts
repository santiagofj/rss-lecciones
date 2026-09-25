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

export function nextCalendarDate(value: string): string {
  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

export function isScheduledForCalendarDate(course: CourseConfig, calendarDate: string): boolean {
  if (course.status !== "active" || course.schedule.type === "manual") {
    return false;
  }
  if (calendarDate < course.schedule.startDate) {
    return false;
  }
  const weekday: Weekday | undefined = weekdays[new Date(`${calendarDate}T00:00:00.000Z`).getUTCDay()];
  if (weekday === undefined) {
    throw new Error(`Fecha de calendario inválida: ${calendarDate}`);
  }
  if (course.schedule.type === "weekdays") {
    return weekday !== "saturday" && weekday !== "sunday";
  }
  return course.schedule.days.includes(weekday);
}

export function isScheduledForDate(course: CourseConfig, date: Date): boolean {
  return isScheduledForCalendarDate(course, localCalendarDate(date, course.timezone));
}
