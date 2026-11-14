// Synchronous one-at-a-time lock for enquiry forms. React state only blocks a
// second submit after a re-render, so two fast clicks (or Enter + click) could
// both reach the API; this lock is checked and set in the same tick.
//
// After a successful submission the form keeps the lock (it is navigating to
// /thank-you), so a lead and its conversion event are never sent twice.

export type SubmissionGuard = {
  // True if this call acquired the lock; false if a submission is in flight
  // or has already succeeded.
  tryAcquire(): boolean;
  // Unlock after a failed submission so the user can retry.
  release(): void;
  isLocked(): boolean;
};

export function createSubmissionGuard(): SubmissionGuard {
  let locked = false;
  return {
    tryAcquire() {
      if (locked) return false;
      locked = true;
      return true;
    },
    release() {
      locked = false;
    },
    isLocked() {
      return locked;
    },
  };
}
