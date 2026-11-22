"use client"

import type * as React from "react"
import { motion, type Transition, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"

/* The glow menu bar from the component prompt, without its light/dark
   toggle. Items are passed in, and clicks go to `onSelect`. Two fixes to
   the original: Tailwind 4 calls the radial gradient `bg-radial` (the
   original `bg-gradient-radial` doesn't exist there), and each item's hover
   colour is a full class name so Tailwind can find it. */

export interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  gradient: string
  /** Full class, e.g. "group-hover:text-blue-500" */
  iconColor: string
}

const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants: Variants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const sharedTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export function MenuBar({
  items,
  onSelect,
  className,
  leading,
}: {
  items: MenuItem[]
  onSelect?: (href: string) => void
  className?: string
  /** Shown at the start of the bar, before the items (e.g. a logo). */
  leading?: React.ReactNode
}) {
  const handle = (href: string) => (e: React.MouseEvent) => {
    if (!onSelect) return
    e.preventDefault()
    onSelect(href)
  }

  return (
    <motion.nav
      aria-label="Main"
      className={cn(
        "p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden",
        className,
      )}
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className="absolute -inset-2 bg-radial from-transparent via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90% to-transparent rounded-3xl z-0 pointer-events-none"
        variants={navGlowVariants}
      />
      <div className="flex items-center relative z-10">
      {leading}
      <ul className="flex items-center gap-1 sm:gap-2">
        {items.map((item) => (
          <motion.li key={item.label} className="relative">
            <motion.div
              className="block rounded-xl overflow-visible group relative"
              style={{ perspective: "600px" }}
              whileHover="hover"
              initial="initial"
            >
              <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                variants={glowVariants}
                style={{
                  background: item.gradient,
                  opacity: 0,
                  borderRadius: "16px",
                }}
              />
              <motion.a
                href={item.href}
                onClick={handle(item.href)}
                aria-label={item.label}
                className="flex items-center gap-2 px-3 py-2 sm:px-4 relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
                variants={itemVariants}
                transition={sharedTransition}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
              >
                <span className={cn("transition-colors duration-300 text-foreground", item.iconColor)}>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </motion.a>
              <motion.a
                href={item.href}
                onClick={handle(item.href)}
                aria-hidden="true"
                tabIndex={-1}
                className="flex items-center gap-2 px-3 py-2 sm:px-4 absolute inset-0 z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
                variants={backVariants}
                transition={sharedTransition}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
              >
                <span className={cn("transition-colors duration-300 text-foreground", item.iconColor)}>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </motion.a>
            </motion.div>
          </motion.li>
        ))}
      </ul>
      </div>
    </motion.nav>
  )
}
