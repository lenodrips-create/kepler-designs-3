/* "Recent work": one entry per job, newest first. Add a new job by copying
   an entry to the top of the list. The details below are a starting point:
   replace them with what was actually done. */

export type Job = {
  title: string
  year: string
  service: string
  summary: string
  steps: string[] // what we did
  languages: string[] // languages and tools used
  result: string
}

export const jobs: Job[] = [
  {
    title: 'Fixing a computer password error',
    year: '2026',
    service: 'Tech support',
    summary:
      'A computer kept rejecting its owner’s password at sign-in, locking them out of their own files and work.',
    steps: [
      'Found why the sign-in was failing instead of guessing at fixes',
      'Restored access without wiping the computer or losing a single file',
      'Set up a safer way back in, so a forgotten password is never a lockout again',
    ],
    languages: ['PowerShell', 'Windows Command Prompt', 'Windows recovery tools'],
    result: 'Back in the same day, with every file intact.',
  },
]
