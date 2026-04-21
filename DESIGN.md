---
version: alpha
name: Togoo
description: Warm, editorial group-planning UI that feels lighter than organizing in a group chat.
colors:
  primary: "#2F6844"
  primary-hover: "#235133"
  on-primary: "#FFFFFF"
  neutral: "#F5F3EF"
  surface: "#FFFFFF"
  surface-alt: "#F9F8F5"
  text: "#1A1714"
  accent-subtle: "#EBF5EF"
  warning: "#B45309"
  warning-surface: "#FEF3C7"
  danger: "#B91C1C"
  danger-surface: "#FEE2E2"
typography:
  display-hero:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: 4rem
    fontWeight: "700"
    lineHeight: "1.05"
    letterSpacing: -0.01em
  display-title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: 2rem
    fontWeight: "600"
    lineHeight: "1.15"
    letterSpacing: -0.01em
  body-md:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: 1rem
    fontWeight: "400"
    lineHeight: "1.6"
  body-sm:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: 0.875rem
    fontWeight: "400"
    lineHeight: "1.5"
  label-sm:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: 0.875rem
    fontWeight: "500"
    lineHeight: "1.4"
  overline:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: 0.75rem
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: 0.08em
rounded:
  sm: 8px
  md: 14px
  pill: 999px
spacing:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 80px
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.text}"
    typography: "{typography.body-md}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: 24px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 40px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 40px
  button-ghost:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.text}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 40px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 40px
  badge-default:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.text}"
    typography: "{typography.overline}"
    rounded: "{rounded.pill}"
    padding: 8px
  badge-success:
    backgroundColor: "{colors.accent-subtle}"
    textColor: "{colors.primary}"
    typography: "{typography.overline}"
    rounded: "{rounded.pill}"
    padding: 8px
  badge-warning:
    backgroundColor: "{colors.warning-surface}"
    textColor: "{colors.warning}"
    typography: "{typography.overline}"
    rounded: "{rounded.pill}"
    padding: 8px
  badge-danger:
    backgroundColor: "{colors.danger-surface}"
    textColor: "{colors.danger}"
    typography: "{typography.overline}"
    rounded: "{rounded.pill}"
    padding: 8px
  pill-toggle:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.pill}"
    padding: 12px
  pill-toggle-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.pill}"
    padding: 12px
---

## Overview

Togoo is a group-planning product. The job is to help one organizer go from "what time works?" to a confirmed plan without chasing people across chat threads.

The UI should feel calm, capable, and human. Not like a loud productivity dashboard. Not like generic SaaS. More like a polished invitation system with strong software underneath it.

The memorable thing is simple: planning here should feel lighter than planning in the group chat.

## Colors

The palette is warm and restrained.

- **Primary (`#2F6844`)** is the only true action color. It should signal confidence, progress, and completion.
- **Neutral (`#F5F3EF`)** gives the product a paper-like base instead of a cold app-shell gray.
- **Surface (`#FFFFFF`)** and **Surface Alt (`#F9F8F5`)** create layered panels without heavy visual noise.
- **Text (`#1A1714`)** stays deep and readable.
- Secondary copy should stay quieter through scale and hierarchy, not by fading into low-contrast gray.
- **Accent Subtle (`#EBF5EF`)**, **Warning Surface (`#FEF3C7`)**, and **Danger Surface (`#FEE2E2`)** provide soft state backgrounds.

Green should remain the only primary CTA color. If another bright brand color shows up, it needs a very strong reason.

## Typography

Togoo uses a split system:

- **Fraunces** for page titles, section titles, and important confirmation moments
- **Plus Jakarta Sans** for body copy, controls, labels, navigation, and dense product UI

This pairing is important. Fraunces gives the product a little ceremony and character. Plus Jakarta Sans keeps the app easy to scan and easy to use.

Headlines should feel composed and editorial. Body copy should feel neutral, direct, and modern. Do not use the display face inside buttons, form fields, or dense dashboard widgets.

## Layout

The layout system should feel spacious, centered, and controlled.

- Marketing surfaces can stretch wider, usually around `max-w-5xl`
- Task flows should stay narrow, usually around `max-w-xl` to `max-w-2xl`
- Organizer dashboards can widen again, but should still prioritize hierarchy over density

Use spacing to slow the interface down just enough to feel thoughtful. Favor fewer, roomier blocks over crowded cards and micro-panels.

Pages should usually read in this order:

1. establish the plan or context
2. explain the next action clearly
3. present one main task at a time
4. keep secondary actions visible but quiet

## Elevation & Depth

Depth in Togoo should be subtle.

Cards use a soft shadow plus a faint inset outline. Hover states lift slightly, usually no more than 1px. Buttons feel pressable through compact shadows and immediate active states.

The goal is not dramatic layering. The goal is quiet polish.

Hard borders alone make the product feel flat and generic. Heavy shadows make it feel noisy. Stay in the middle.

## Shapes

The shape language is soft but not bubbly.

- standard inputs and buttons use `8px` rounding
- cards use `14px` rounding
- pills and badges use full rounding

Everything should feel touch-friendly and contemporary. Avoid sharp-cornered elements. Avoid exaggerated softness that makes the UI feel toy-like.

## Components

The product is built from a small number of recurring patterns.

**Cards** are the main containment pattern. They should feel raised, generous, and clean enough for both marketing sections and organizer workflows.

**Primary buttons** should be green, high-confidence, and reserved for the next action that matters most.

**Secondary buttons** should feel available but quiet. They should support, not compete with, the primary CTA.

**Ghost buttons** should be used for utility actions inside denser interfaces.

**Inputs and selects** should feel forgiving. They should read more like filling out a thoughtful invitation than operating a back-office system.

**Pill toggles** are a signature interaction. They should support quick mobile tapping, short labels, and very obvious selected states.

**Badges** should communicate state, not decoration. Use them for reply status, confirmation, warnings, and priority labeling.

**Ranked options and heatmaps** should surface the answer, not the scoring engine. Data display in Togoo should stay simple, legible, and low-drama.

In code, this system currently lives in:

- `tailwind.config.ts`
- `app/globals.css`
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/input.tsx`
- `components/ui/select.tsx`
- `components/ui/badge.tsx`

## Do's and Don'ts

**Do:**

- keep the warm canvas and white-card contrast
- use the serif display face sparingly and intentionally
- make invitee flows feel obvious and low-friction
- keep organizer flows information-rich but calm
- use motion to clarify state, not to entertain
- write UI copy that sounds direct, helpful, and human

**Don't:**

- turn the product into a generic SaaS dashboard
- introduce neon accents or decorative gradients everywhere
- overfill screens with borders, panels, or enterprise-table density
- make invitee flows feel like setup work
- use jokey microcopy where clarity matters
- let any animation call attention to itself

If a new screen feels heavier than the chat thread it replaces, it is going in the wrong direction.
