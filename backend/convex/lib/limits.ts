/** Revisions kept per snippet; older ones are deleted on save to bound storage. */
export const MAX_REVISIONS = 20;
/** Upper bounds on user input, so one bad save can't bloat the database. */
export const MAX_CODE_LENGTH = 20_000;
export const MAX_NOTE_LENGTH = 1_000;
export const MAX_TITLE_LENGTH = 80;
