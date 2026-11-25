import { useEffect, useRef } from 'react'

import { jobs, type Job } from '@/content/work'
import { observeReveal } from '@/lib/reveal'
import { ContactButton } from '@/components/contact-button'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { glideToHash, startSmoothScroll } from '@/lib/smooth-scroll'

const pad = (n: number) => String(n).padStart(2, '0')

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 border-t border-foreground/10 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
      <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
      <div className="text-base leading-relaxed">{children}</div>
    </div>
  )
}

function JobEntry({ job, n }: { job: Job; n: number }) {
  return (
    <article data-reveal className="grid gap-8 border-t border-foreground/20 py-10 md:grid-cols-12 md:gap-14 md:py-14">
      <div className="md:col-span-5">
        <p className="flex items-baseline gap-3 text-sm text-muted-foreground tabular-nums">
          <span className="font-medium text-brand-text">{pad(n)}</span>
          <span>{job.year}</span>
        </p>
        <h2 className="mt-3 font-display text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance md:text-5xl">
          {job.title}
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">{job.summary}</p>
      </div>

      <div className="md:col-span-7">
        <Detail label="Service">{job.service}</Detail>
        <Detail label="What we did">
          <ul className="space-y-2">
            {job.steps.map((s) => (
              <li key={s} className="grid grid-cols-[1.25rem_1fr]">
                <span aria-hidden="true" className="text-brand-text">
                  –
                </span>
                {s}
              </li>
            ))}
          </ul>
        </Detail>
        <Detail label="Languages and tools">
          <ul className="flex flex-wrap gap-2">
            {job.languages.map((l) => (
              <li key={l} className="rounded-full border border-foreground/15 px-3 py-1 text-sm">
                {l}
              </li>
            ))}
          </ul>
        </Detail>
        <Detail label="Result">{job.result}</Detail>
      </div>
    </article>
  )
}

/* Recent work: a running list of jobs, newest first (src/content/work.ts). */
export default function WorkPage() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => startSmoothScroll(), [])
  useEffect(() => glideToHash(), [])
  useEffect(() => (ref.current ? observeReveal(ref.current) : undefined), [])

  return (
    <div ref={ref} className="min-h-svh bg-background">
      <SiteNav page="work" />
      <ContactButton />
      <div id="top" className="h-20 md:h-24" aria-hidden="true" />

      <main className="px-6 pt-10 pb-20 md:px-14 md:pt-16 md:pb-28">
        <h1
          data-reveal
          className="font-display text-5xl leading-[0.95] font-semibold tracking-[-0.045em] text-balance md:text-8xl"
        >
          Recent work
        </h1>
        <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          The jobs we’ve done lately, newest first, with what went into each one.
        </p>

        <div className="mt-14 md:mt-20">
          {jobs.map((job, i) => (
            <JobEntry key={job.title} job={job} n={jobs.length - i} />
          ))}
        </div>
      </main>

      <SiteFooter base="../" />
    </div>
  )
}
