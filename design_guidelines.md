# Design Guidelines: Task Planning & Reminder Application

## Design Approach

**Selected Approach:** Design System + Reference-Based Hybrid

Drawing inspiration from **Linear** (clean, fast productivity), **Notion** (intuitive data input), and **Todoist** (task management clarity). This application prioritizes efficiency, scanability, and focused task management over visual flair.

**Key Design Principles:**
- Clarity over decoration: Every element serves task completion
- Instant feedback: Clear visual states for task status
- Spatial efficiency: Maximum information density without clutter
- Focused workflows: Minimize cognitive load during task entry and review

---

## Core Design Elements

### A. Typography

**Font Family:** Inter (Google Fonts) - optimized for UI readability
- Primary: Inter (weights: 400, 500, 600, 700)
- Monospace: JetBrains Mono (for time/date displays)

**Hierarchy:**
- Page Titles: text-3xl font-semibold (30px)
- Section Headers: text-xl font-semibold (20px)
- Card/Component Titles: text-base font-medium (16px)
- Body Text: text-sm font-normal (14px)
- Helper Text/Labels: text-xs font-normal (12px)
- Status Indicators: text-lg font-bold (18px)

---

### B. Layout System

**Spacing Primitives:** Tailwind units of **2, 4, 6, 8, 12, 16**
- Component padding: p-4, p-6
- Section spacing: py-8, py-12
- Card gaps: gap-4, gap-6
- Form field spacing: space-y-4
- Button padding: px-4 py-2, px-6 py-3

**Grid Structure:**
- Container: max-w-7xl mx-auto px-4
- Two-page layout with sidebar navigation (w-64 fixed sidebar + flex-1 main content)
- Task input forms: Single column max-w-2xl for optimal form completion
- Statistics table: Full-width responsive grid

---

### C. Component Library

#### Navigation
**Sidebar Navigation (Fixed Left, w-64):**
- Vertical nav with icon + label pattern
- Active state: Subtle highlight with indicator bar (4px left border)
- Navigation items: py-3 px-4 with icon (20px) + text
- Logo/Brand: Top of sidebar, py-6 px-4
- User profile: Bottom of sidebar with avatar

#### Task Input Page

**Form Container:**
- Centered card layout: max-w-2xl mx-auto with subtle border
- Form padding: p-8
- Form sections separated by space-y-6

**Input Fields:**
- Text inputs: Full-width with border, rounded-lg, px-4 py-2.5
- Labels: Above inputs, text-sm font-medium mb-2
- Textarea (description): min-h-32, resize-y enabled
- Dropdowns (task type): Custom styled select with chevron icon

**Recurring Schedule Component:**
- Radio button group for frequency (Daily/Weekly/Monthly/Yearly)
- Grid layout: grid-cols-2 gap-3 on tablet+
- Each option: Border card with p-4, hover state, selected state with checkmark icon

**Reminder Configuration:**
- Time picker: Split into hours/minutes dropdowns side-by-side
- Advance notification: Number input with unit selector (minutes/hours/days)
- Display: Inline flex layout gap-2

**Action Buttons:**
- Primary (Submit/Save): px-6 py-3, rounded-lg, font-medium
- Secondary (Cancel/Reset): px-6 py-3, rounded-lg, font-medium, bordered
- Button group: flex gap-3 justify-end

#### Task List Display (for checking off)

**Task Cards:**
- List layout with space-y-2
- Each card: Flex layout with checkbox (left) + content + timestamp (right)
- Padding: p-4
- Checkbox: w-5 h-5, custom styled with checkmark icon
- Task title: text-base font-medium
- Task metadata: text-xs (type badge + scheduled time)

**Type Badges:**
- Inline badges: px-2 py-1, rounded-full, text-xs font-medium
- Positioned next to task title

#### Statistics Page

**Filter Controls:**
- Horizontal filter bar: sticky top-0 with backdrop-blur
- Filter container: flex flex-wrap gap-4 p-4
- Date range picker: Two date inputs side-by-side with arrow between
- Task type filter: Multi-select dropdown with checkboxes
- Apply button: ml-auto positioning

**Statistics Table:**
- Responsive table: Full-width with horizontal scroll on mobile
- Table structure: Tailwind table classes with borders
- Header: Sticky (sticky top-12), font-semibold, border-b-2
- Cell padding: px-4 py-3
- Row hover: Subtle highlight for scanability

**Status Indicators:**
- Completed tasks: Large "Y" character, text-lg font-bold
- Missed tasks: Large "X" character, text-lg font-bold
- Cell alignment: text-center for status column

**Date Column:**
- Format: YYYY-MM-DD in monospace font (JetBrains Mono)
- Grouping: Optional date headers for month/year breaks

**Empty States:**
- Centered empty state: max-w-sm mx-auto text-center py-16
- Icon (96px) + heading + description

---

### D. Responsive Behavior

**Breakpoints:**
- Mobile (base): Stack all elements, full-width components
- Tablet (md: 768px): Two-column forms where appropriate
- Desktop (lg: 1024px): Sidebar navigation visible, multi-column layouts

**Mobile Adaptations:**
- Sidebar: Converts to bottom navigation bar or hamburger menu
- Statistics table: Horizontal scroll with sticky first column
- Filter controls: Stack vertically, full-width
- Form: Single column, increased touch targets (min-h-12 for inputs)

---

### E. Micro-interactions

**Use Sparingly:**
- Checkbox animation: Simple scale + checkmark draw (200ms)
- Button press: Subtle scale (0.98) on active state
- Form validation: Shake animation on error (300ms)
- Toast notifications: Slide in from top-right for task reminders

**Transitions:**
- Standard: transition-all duration-200 ease-in-out
- Avoid: Page transitions, scroll-triggered animations, decorative motion

---

## Page-Specific Layouts

### Task Input Page
1. **Page Header:** py-6 with title + breadcrumb
2. **Form Card:** Centered max-w-2xl with shadow
3. **Quick Actions:** Below form, view recent tasks link

### Statistics Page
1. **Page Header with Summary:** Row with total tasks, completion rate (flex gap-8)
2. **Filter Bar:** Sticky controls for date range + task type
3. **Statistics Table:** Full-width with virtualization for performance
4. **Pagination:** Bottom center if needed (flex justify-center py-4)

---

## Accessibility

- Minimum touch target: 44px height for all interactive elements
- Form labels: Explicitly associated with inputs via htmlFor
- Keyboard navigation: Tab order follows visual flow, focus indicators on all interactive elements
- ARIA labels: Comprehensive labeling for screen readers on icons and status indicators
- Contrast ratios: Meet WCAG AA standards (text will be specified in color phase)

---

**No hero images needed** - This is a utility application focused on efficiency. The interface should load instantly and prioritize task completion over visual marketing.