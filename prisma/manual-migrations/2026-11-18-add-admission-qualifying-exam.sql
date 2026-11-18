-- Adds the "Have you qualified CAT, MAT, XAT?" answer to admission enquiries.
--
-- Additive and nullable: existing rows keep NULL and are not modified. The
-- city column is NOT changed: new enquiries store an empty string there,
-- and historical city values stay as they are.
--
-- Run once on the live MySQL database, ideally BEFORE deploying the code that
-- writes this column. The code also works without it (the lead is saved
-- without the answer, which is still in the notification email), so the
-- order is a preference, not a hard requirement.
--
-- Check first (returns 0 rows if the column is missing):
--   SHOW COLUMNS FROM admission_enquiry LIKE 'qualifyingExam';

ALTER TABLE admission_enquiry
  ADD COLUMN qualifyingExam VARCHAR(50) NULL AFTER graduationStatus;

-- Rollback (only if needed; drops the stored answers):
--   ALTER TABLE admission_enquiry DROP COLUMN qualifyingExam;
