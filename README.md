# Office Tools

A modern, modular collection of productivity utilities built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS v4**.

## Features

### 📋 Log Text Extractor
- Parse JSON log data from AWS or other sources
- Extract log text from nested JSON objects
- Support for concatenated JSON objects
- Copy extracted logs to clipboard
- Statistics display (entry count, character count)

### 🔐 Text Encryption Tool
- AES-256 encryption using crypto-js
- Simple key-based encryption
- Clean, intuitive interface
- Real-time encryption feedback

## Tech Stack

- ⚛️ **React 18** - Modern UI library with hooks
- 📘 **TypeScript** - Type safety and better DX
- ⚡ **Vite** - Lightning-fast build tool
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework
- 🔐 **crypto-js** - Cryptographic functions

## Project Structure

```
office-tools/
├── src/
│   ├── App.tsx                    # Main React component
│   ├── main.tsx                   # Entry point
│   ├── types/                     # TypeScript type definitions
│   │   └── index.ts
│   ├── components/                # Reusable React components
│   │   └── Navigation.tsx         # Navigation component
│   ├── tools/                     # Tool implementations
│   │   ├── log-extractor/
│   │   │   ├── LogExtractor.tsx   # React component
│   │   │   └── index.ts
│   │   └── encryption-tool/
│   │       ├── EncryptionTool.tsx # React component
│   │       └── index.ts
│   ├── utils/                     # Utility functions
│   │   └── logParser.ts
│   └── styles/                    # Global styles
│       └── main.css
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

The application will open at http://localhost:3000

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (TypeScript + Vite)
- `npm run preview` - Preview production build
- `npm run lint` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts and node_modules

## Architecture

### React Functional Components

All components use modern React patterns:
- **Functional components** with TypeScript
- **React Hooks** (useState, useCallback, useEffect, useRef)
- **Props interface** for type safety
- **Event handlers** with proper typing

### Component Structure

**App.tsx** - Main application component
- Manages routing via URL hash
- Handles tool switching
- Renders Navigation and active tool

**Navigation.tsx** - Navigation bar component
- Displays available tools
- Handles tool selection
- Shows active state

**LogExtractor.tsx** - Log extraction tool
- State management with useState
- Memoized callbacks with useCallback
- Keyboard shortcuts (Ctrl+Enter)

**EncryptionTool.tsx** - Encryption tool
- Form state management
- Input focus handling with useRef
- Alert notifications

### Styling with Tailwind CSS v4

- Utility classes in JSX (className)
- Custom components in `src/styles/main.css`
- Modern `@import "tailwindcss"` syntax
- No separate CSS files per component

## Adding New Tools

### 1. Create Tool Component

Create `src/tools/your-tool/YourTool.tsx`:

```typescript
import React, { useState } from 'react';

export const YourTool: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="card">
      <h1 className="text-3xl font-bold text-gray-800 mb-5">
        🔧 Your Tool
      </h1>
      <p className="text-gray-600 mb-5">Tool description</p>

      <input
        type="text"
        className="input-text mb-4"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter something..."
      />

      <button className="btn-primary">
        Action
      </button>
    </div>
  );
};
```

### 2. Export Component

Create `src/tools/your-tool/index.ts`:

```typescript
export { YourTool } from './YourTool';
```

### 3. Register in App

Edit `src/App.tsx`:

**Add import:**
```typescript
import { YourTool } from './tools/your-tool';
```

**Add to tools array:**
```typescript
const tools: Tool[] = [
  // ... existing tools
  {
    id: 'your-tool',
    name: 'Your Tool',
    description: 'Your tool description',
    icon: '🔧',
  },
];
```

**Add to renderTool:**
```typescript
const renderTool = () => {
  switch (currentToolId) {
    // ... existing cases
    case 'your-tool':
      return <YourTool />;
    default:
      return <div className="card"><h2>Tool not found</h2></div>;
  }
};
```

### 4. Test

```bash
npm run dev
```

## React Patterns Used

### State Management
```typescript
const [state, setState] = useState<Type>(initialValue);
```

### Memoized Callbacks
```typescript
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

### Refs for DOM Access
```typescript
const inputRef = useRef<HTMLInputElement>(null);
// Later: inputRef.current?.focus();
```

### Effect Hook for Side Effects
```typescript
useEffect(() => {
  // Side effect
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

### Event Handlers
```typescript
<button onClick={handleClick}>Click</button>
<input onChange={(e) => setValue(e.target.value)} />
<input onKeyDown={(e) => { if (e.key === 'Enter') { ... } }} />
```

## Tailwind CSS Usage

### In JSX
```jsx
<div className="bg-white p-8 rounded-xl shadow-2xl">
  <button className="btn-primary hover:shadow-lg">
    Click Me
  </button>
</div>
```

### Custom Component Classes
Defined in `src/styles/main.css`:
- `.card` - White card with shadow
- `.btn-primary` - Purple gradient button
- `.btn-secondary` - Gray button
- `.input-text` - Styled text input
- `.textarea-base` - Styled textarea

### Conditional Classes
```jsx
<button className={`base-class ${isActive ? 'active-class' : 'inactive-class'}`}>
  Button
</button>
```

## Build Output

Production build generates:
- Optimized HTML
- Minified CSS (~18KB)
- Code-split JavaScript
  - React vendor chunk (~11KB)
  - Crypto library chunk (~70KB)
  - Main application (~191KB)
- Source maps for debugging

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

Deploy to any static hosting:
1. Build: `npm run build`
2. Upload `dist/` folder to:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront
   - Firebase Hosting

## License

MIT

## Contributing

Contributions welcome! When adding new tools:
1. Use functional components with TypeScript
2. Follow React hooks best practices
3. Use Tailwind CSS for styling
4. Ensure proper type safety
5. Test with `npm run lint` and `npm run build`
