# Personal Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features a sleek design with dark/light mode toggle, custom cursor interactions, and smooth animations.

## ✨ Features

- **Modern Design**: Clean, minimalist interface with smooth animations
- **Dark/Light Mode**: Toggle between dark and light themes
- **Custom Cursor**: Interactive cursor that changes based on hover states
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Built with Next.js 15 and optimized for speed
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for consistent styling

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Animations**: Custom CSS animations and transitions
- **Development**: ESLint, Turbopack for fast development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
portfolio/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main portfolio page
├── components/         # Reusable components
│   └── ui/            # UI components (badge, button, card)
├── lib/               # Utility functions
├── public/            # Static assets
└── README.md          # This file
```

## 🎨 Customization

- **Content**: Edit `app/page.tsx` to update your portfolio content
- **Styling**: Modify `app/globals.css` and component styles
- **Theme**: Customize colors and themes in Tailwind config
- **Components**: Add new UI components in the `components/` directory

## 📦 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

The easiest way to deploy your portfolio is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to GitHub
2. Import your project to Vercel
3. Deploy with one click

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
