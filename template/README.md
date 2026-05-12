⚡️ Vue 3 with <script setup> SFC syntax
🚀 Vite 8 for blazing fast development
🎨 Tailwind CSS 4 with CSS-first configuration
📦 Vue Router 5 for routing
🔍 ESLint 10 with flat config
💅 Prettier 3 with Tailwind CSS plugin
  Pinia Vueuse
  Copilot

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more. The use of Copilot was used to troubleshoot errors and expand themes.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).


Getting Started
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
Available Scripts
Script	Description
npm run dev	Start development server
npm run build	Build for production
npm run preview	Preview production build
npm run lint	Lint and auto-fix with ESLint
npm run lint:check	Check linting without auto-fix
npm run format	Format code with Prettier
npm run format:check	Check formatting without auto-fix
Project Structure
├── public/              # Static assets
├── src/
│   ├── assets/          # Asset files (images, fonts, etc.)
│   │   ├── style.css    # Global styles with Tailwind
│   ├── components/      # Vue components
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   ├── main.js          # App entry point
│   ├── router.js        # Vue Router configuration
├── eslint.config.js     # ESLint flat config
└── vite.config.js       # Vite configuration with Tailwind plugin
Tailwind CSS 4
This template uses Tailwind CSS 4 with the new CSS-first configuration approach. Tailwind is integrated directly as a Vite plugin (@tailwindcss/vite), eliminating the need for separate tailwind.config.js and postcss.config.js files.

To customize Tailwind, use CSS variables and the @theme directive in your CSS file. See the Tailwind CSS documentation for more details.