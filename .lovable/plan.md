

# Rebrand: YiClaw → BAIT

## Color Palette (from image)

| Token | Current | New (approx) |
|-------|---------|--------------|
| primary | `14 90% 55%` (red-orange) | `30 55% 65%` (warm tan/gold) |
| gold | `42 95% 55%` | `30 55% 65%` (primary tan) |
| gold-light | `45 100% 70%` | `35 50% 80%` (highlight/cream) |
| cyan / yi-green | `145 80% 46%` | `260 40% 75%` (lavender/secondary) |
| primaryAccent-01 | n/a | `30 40% 48%` (darker brown accent) |
| primaryHover | n/a | white |
| primaryActive | n/a | white |

The palette shifts from gold+cyan to warm tan/brown + lavender purple on a dark background.

## Files to Update

### 1. `index.html`
- Title: "BAIT — AI Tweet Writer for Web3 Builders"
- Meta tags: replace all "YiClaw" with "BAIT", "OpenCLAW" references updated

### 2. `src/index.css`
- Update CSS custom properties to match the new palette:
  - `--primary` → warm tan
  - `--gold` / `--gold-light` → tan / cream tones
  - `--cyan` / `--cyan-dark` / `--yi-green` → lavender purple
  - `--yi-purple` → keep or adjust
  - `--yi-red` → use primaryAccent brown
  - `--ring`, `--border`, `--input` → use new primary
  - Grid lines and accents → lavender instead of cyan

### 3. `src/components/Navbar.tsx`
- "YiClaw" → "BAIT", remove "by OpenCLAW" subtitle

### 4. `src/components/HeroSection.tsx`
- "Powered by OpenCLAW · AI Tweet Writer" → "Powered by BAIT · AI Tweet Writer"
- All "YiClaw" references → "BAIT"

### 5. `src/components/DashboardSection.tsx`
- "YiClaw Writer — powered by OpenCLAW" → "BAIT Writer"
- Sidebar logo "YiClaw" → "BAIT"
- All text references

### 6. `src/components/BuilderSection.tsx`
- "Rewritten by YiClaw" → "Rewritten by BAIT"
- "YiClaw rewrites it..." → "BAIT rewrites it..."

### 7. `src/components/MarketplaceSection.tsx`
- "YiClaw AI writes hooks..." → "BAIT AI writes hooks..."

### 8. `src/components/FeaturesSection.tsx`
- "YiClaw generates scroll-stopping tweets" → "BAIT generates..."
- "Powered by OpenCLAW" → "Powered by BAIT AI"

### 9. `src/components/CTASection.tsx`
- "Try YiClaw Free" → "Try BAIT Free"

### 10. `src/components/Footer.tsx`
- "YiClaw" → "BAIT"
- "Powered by OpenCLAW" → remove or update

### 11. `src/components/TickerBar.tsx`
- "Powered by OpenCLAW AI" → "Powered by BAIT AI"

### 12. `tailwind.config.ts`
- No structural changes needed (colors reference CSS vars)

## Summary
- Replace all ~15 instances of "YiClaw" with "BAIT"
- Replace all ~8 instances of "OpenCLAW" with "BAIT" or remove
- Remap the entire color system from gold/cyan to warm tan/lavender purple per the uploaded palette

