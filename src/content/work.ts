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
    title: 'Installing Linux, with instructions',
    year: '2026',
    service: 'Setup and training',
    summary:
      'A client wanted to move a computer to Linux and be able to look after it themselves afterwards.',
    steps: [
      'Backed up their files before touching anything',
      'Installed Linux (Ubuntu) and set it up alongside the drivers, Wi-Fi and printer',
      'Moved their files and set up the apps they use every day',
      'Wrote step-by-step instructions for updates, installing apps and everyday fixes',
    ],
    languages: ['Linux (Ubuntu)', 'Bash', 'Terminal', 'apt'],
    result: 'A fast, working Linux computer, and written instructions so they can run it on their own.',
  },
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
