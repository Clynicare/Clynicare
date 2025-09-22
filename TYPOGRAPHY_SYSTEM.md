# Clynicare Typography System

## Overview
Clynicare uses an Airbnb-inspired typography system built with Tailwind CSS, featuring the Inter font family for clean, modern, and highly legible text across all devices.

## Font Family
- **Primary**: `Inter` - Clean, modern, highly legible
- **Fallback**: `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`

## Typography Scale

### Hero Headings (H1)
```jsx
// Mobile: 56px (3.5rem) | Desktop: 72px (4.5rem)
className="text-hero md:text-hero-lg font-bold tracking-tight text-gray-900"
```
**Usage**: Main page headlines, primary hero content
**Line Height**: 1.1 (tight)
**Letter Spacing**: -0.02em

### Section Headings (H2)
```jsx
// Mobile: 30px (1.875rem) | Desktop: 36px (2.25rem)
className="text-section md:text-section-lg font-bold text-gray-900"
```
**Usage**: Section titles, major content blocks
**Line Height**: 1.3 (snug)
**Letter Spacing**: -0.01em

### Display Text
```jsx
// Mobile: 36px (2.25rem) | Desktop: 48px (3rem)
className="text-display md:text-display-lg font-bold text-gray-900"
```
**Usage**: Statistics, prominent numbers, featured content
**Line Height**: 1.2
**Letter Spacing**: -0.01em

### Subtitles
```jsx
// Mobile: 20px (1.25rem) | Desktop: 24px (1.5rem)
className="text-subtitle md:text-subtitle-lg font-semibold text-gray-900"
```
**Usage**: Card titles, subsection headings
**Line Height**: 1.4

### Body Text
```jsx
// Mobile: 16px (1rem) | Desktop: 18px (1.125rem)
className="text-body md:text-body-lg text-gray-600 leading-relaxed"
```
**Usage**: Main content, descriptions, paragraphs
**Line Height**: 1.6 (relaxed)

### Labels & Small Text
```jsx
// 14px (0.875rem)
className="text-label text-gray-600"
```
**Usage**: Form labels, captions, metadata
**Line Height**: 1.4

### Captions
```jsx
// 12px (0.75rem)
className="text-caption text-gray-500"
```
**Usage**: Fine print, timestamps, auxiliary information
**Line Height**: 1.4

## Font Weights
- **font-light**: 300 (rarely used)
- **font-normal**: 400 (body text)
- **font-medium**: 500 (CTAs, buttons)
- **font-semibold**: 600 (subheadings)
- **font-bold**: 700 (headings)
- **font-extrabold**: 800 (rare emphasis)

## Spacing Guidelines

### Section Spacing
```jsx
// Standard section padding
className="py-20 md:py-28"

// Large sections with more breathing room
className="py-24 md:py-32"
```

### Text Block Spacing
```jsx
// Maximum width for readability
className="max-w-3xl mx-auto"

// Paragraph spacing
className="mb-6"

// Headline + subheadline spacing
className="mb-4"
```

### Component Spacing
```jsx
// Between sections
className="space-y-10"

// Between related elements
className="space-y-6"

// Between closely related items
className="space-y-4"
```

## Color Usage

### Text Colors
- **Primary Text**: `text-gray-900` (headings, important content)
- **Secondary Text**: `text-gray-600` (body text, descriptions)
- **Tertiary Text**: `text-gray-500` (labels, captions)
- **Light Text**: `text-gray-400` (placeholders, disabled)

### Brand Colors in Text
- **Primary Brand**: `text-blue-600`
- **Secondary Brand**: `text-green-600`
- **Accent**: `text-purple-600`

## Component Examples

### Hero Section
```jsx
<div className="space-y-6">
  <h1 className="text-hero md:text-hero-lg font-bold tracking-tight text-gray-900">
    Healthcare at your doorstep.
  </h1>
  <p className="text-subtitle md:text-subtitle-lg text-gray-600 leading-relaxed max-w-3xl">
    Book trusted nurses, connect with doctors, and access teleconsultations anytime, anywhere.
  </p>
</div>
```

### Section Header
```jsx
<div className="text-center mb-20">
  <h2 className="text-section md:text-section-lg font-bold text-gray-900 mb-6">
    Our Services
  </h2>
  <p className="text-subtitle md:text-subtitle-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
    From nursing care to teleconsultations, Clynicare connects you with the right healthcare professionals seamlessly.
  </p>
</div>
```

### CTA Buttons
```jsx
<button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-body-lg font-medium rounded-full shadow-lg transition-all duration-200">
  Get Started
</button>

<button className="px-8 py-4 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 text-body-lg font-medium rounded-full transition-all duration-200">
  Learn More
</button>
```

## Responsive Behavior

### Mobile-First Approach
All typography starts with mobile sizes and scales up using `md:` prefixes for desktop.

### Breakpoints
- **Mobile**: Base classes (default)
- **Desktop**: `md:` prefix (768px+)

### Line Length
Keep text blocks readable with `max-w-3xl` or similar constraints to prevent overly long lines on large screens.

## Accessibility

### Contrast Ratios
- **Gray-900 on White**: 21:1 (excellent)
- **Gray-600 on White**: 7:1 (good)
- **Gray-500 on White**: 4.5:1 (minimum)

### Font Sizes
- Minimum body text: 16px (1rem) on mobile
- Comfortable reading: 18px (1.125rem) on desktop
- Clear hierarchy with sufficient size differences

## Implementation

### Tailwind Config
```javascript
fontSize: {
  'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
  'hero-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
  'display': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
  'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
  'section': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
  'section-lg': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
  'subtitle': ['1.25rem', { lineHeight: '1.4' }],
  'subtitle-lg': ['1.5rem', { lineHeight: '1.4' }],
  'body': ['1rem', { lineHeight: '1.6' }],
  'body-lg': ['1.125rem', { lineHeight: '1.6' }],
  'label': ['0.875rem', { lineHeight: '1.4' }],
  'caption': ['0.75rem', { lineHeight: '1.4' }],
}
```

### CSS Import
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
```

## Best Practices

1. **Hierarchy**: Use clear size differences between heading levels
2. **Consistency**: Stick to the defined scale throughout the application
3. **Spacing**: Provide adequate whitespace around text elements
4. **Readability**: Limit line length and ensure sufficient contrast
5. **Responsiveness**: Scale typography appropriately across devices
6. **Performance**: Use `font-display: swap` for better loading experience

## Maintenance

When adding new components or pages:
1. Use existing typography classes first
2. Only add new classes if absolutely necessary
3. Follow the established naming convention
4. Test across different screen sizes
5. Verify accessibility standards are met

---

This typography system ensures consistent, accessible, and beautiful text presentation across the entire Clynicare platform while maintaining the clean, professional aesthetic inspired by Airbnb's design language.
