import type { PromptTemplate } from '../types';

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  { label: 'Pricing Card', prompt: 'a modern pricing card with three tiers: Starter, Pro, and Enterprise, with feature lists and a highlighted recommended plan', icon: '💳' },
  { label: 'Login Form', prompt: 'a sleek login form with email and password fields, remember me checkbox, forgot password link, and a gradient sign in button', icon: '🔐' },
  { label: 'Stats Dashboard', prompt: 'a analytics stats dashboard with four KPI cards showing revenue, users, growth rate, and conversion rate with trend indicators', icon: '📊' },
  { label: 'Profile Card', prompt: 'a user profile card with avatar, name, role, bio, social links, and follow and message buttons', icon: '👤' },
  { label: 'Navbar', prompt: 'a modern responsive navbar with logo, navigation links, search bar, notification bell, and user avatar dropdown', icon: '🧭' },
  { label: 'Hero Section', prompt: 'a stunning hero section with a bold headline, subtitle, two CTA buttons, and a gradient background with floating elements', icon: '🚀' },
  { label: 'Feature Grid', prompt: 'a feature showcase grid with six cards, each with an icon, title, and description for a SaaS product', icon: '✨' },
  { label: 'Toast Alert', prompt: 'a set of toast notification components in four variants: success, error, warning, and info with icons and dismiss buttons', icon: '🔔' },
];