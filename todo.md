# Thai QR Code Generator - Project TODO

## Core Features (MVP)

### QR Code Generation
- [x] Basic URL QR code generator
- [x] Text/Message QR code generator
- [x] WiFi QR code generator
- [x] Email QR code generator
- [x] Phone number QR code generator
- [x] SMS QR code generator
- [ ] vCard (contact) QR code generator
- [x] PromptPay payment QR code generator (Thai-specific - KEY DIFFERENTIATOR)

### Customization Features
- [x] Logo/image insertion in QR code center
- [x] Color customization (foreground and background)
- [x] Corner design options (rounded, square, etc.)
- [x] Error correction level selection
- [x] QR code size adjustment
- [x] Implement customization panel in UI
- [x] Dot pattern styles (Rounded, Dots, Classy, etc.)
- [x] Transparent background toggle
- [x] Logo display toggle
- [x] Multiple export formats (PNG, SVG, JPEG)
- [x] Export size presets (300, 500, 800, 1000, 1500, 2000px)

### User Interface
- [x] Thai language interface (full localization)
- [x] English language option
- [x] Responsive design for mobile and desktop
- [ ] Dark/Light theme support
- [x] Tab-based navigation for different QR types

### Download & Export
- [x] Download as PNG
- [x] Download as SVG
- [ ] Download as PDF
- [x] Copy to clipboard
- [ ] Print QR code

### Additional Features
- [x] QR code preview in real-time
- [ ] Batch QR code generation (multiple at once)
- [ ] QR code history/recent codes
- [ ] Share QR code functionality
- [x] Responsive design for all devices

## Differentiation Features (Phase 2)

- [x] PromptPay QR code with validation

## Theme & Styling

- [x] Windows 95 theme styling (COMPLETED)
- [ ] TrueMoney wallet QR code support
- [ ] Business invoice QR code template
- [ ] Bill payment QR code generator
- [ ] Thai business-specific templates

## Technical Implementation

- [ ] Set up React 19 + Tailwind 4 + shadcn/ui
- [ ] Integrate QR code library (qrcode.react or similar)
- [ ] Implement Thai language localization (i18n)
- [ ] Create reusable QR generation components
- [ ] Implement customization controls
- [ ] Add download/export functionality
- [ ] Optimize for performance

## Design & UX

- [ ] Design modern, clean interface
- [ ] Create Thai-friendly color scheme
- [ ] Ensure accessibility (WCAG 2.1)
- [ ] Optimize for mobile-first experience
- [ ] Create intuitive workflow for QR generation

## Testing & Optimization

- [ ] Test QR code generation accuracy
- [ ] Test customization features
- [ ] Test download/export functionality
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance optimization

## Deployment

- [ ] Final review and quality assurance
- [ ] Create checkpoint for deployment
- [ ] Publish website


## UI Improvements

- [x] Increase text size by 1.25x for better readability
- [x] Windows 95 startup animation on page load
- [x] Remove English language option
- [x] Simplify UI for non-tech-savvy users
- [x] Add helpful Thai instructions and hints
- [x] Fix Thai language display - ensure all text shows in Thai not English
- [x] Style dropdown/select elements with Windows 95 retro appearance and Thai translations
- [x] Add footer with "Made by..." text
- [x] Add 3 sponsor banner placeholders
- [x] Constrain content width with container

## Fun Features

- [ ] QR Code Easter Eggs - Hidden messages or animations
- [x] Sound Effects - Windows 95 startup, button clicks, success chimes
- [x] Retro Animations - Window minimize/maximize, taskbar notifications
- [ ] Desktop Icons - Retro desktop with draggable windows
- [x] Add square border only around "Choose File" button text (not whole box)
- [x] Make app responsive for mobile devices
