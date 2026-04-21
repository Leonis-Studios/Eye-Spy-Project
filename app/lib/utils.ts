const MONTH_MAP: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

/**
 * Converts "March 2026" or "march 2026" to the ISO 8601 date "2026-03-01".
 * Falls back to the input string if it cannot be parsed.
 * Required for Article schema datePublished — schema.org requires ISO 8601.
 */
export function parseMonthYearToISO(str: string): string {
  if (!str) return str;
  const parts = str.trim().split(/\s+/);
  if (parts.length !== 2) return str;
  const [monthStr, yearStr] = parts;
  const month = MONTH_MAP[monthStr.toLowerCase()];
  if (!month || !/^\d{4}$/.test(yearStr)) return str;
  return `${yearStr}-${month}-01`;
}
