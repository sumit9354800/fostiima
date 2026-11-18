// True when a query failed because a column in prisma/schema.prisma does not
// exist in the connected database yet (Prisma P2022, or MySQL "Unknown column").
//
// Used only around admission_enquiry.qualifyingExam: the code may be deployed
// before prisma/manual-migrations/2026-11-18-add-admission-qualifying-exam.sql
// is run, and a missing column must never lose a lead or break Admin.
export function isMissingColumnError(error: unknown, column: string): boolean {
  if (typeof error !== "object" || error === null) return false;
  const { code, message } = error as { code?: unknown; message?: unknown };
  // P2022 is "column does not exist". Its message may not name the column;
  // a retry without the optional column then fails again if another column
  // is the missing one, so accepting any P2022 cannot hide a different error.
  if (code === "P2022") return true;
  const text = typeof message === "string" ? message : "";
  return text.includes(column) && /unknown column|does not exist/i.test(text);
}
