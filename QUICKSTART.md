# Quick Start Guide - React Version

## Installation

```bash
cd office-tools
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The app will open at http://localhost:3000

## Building

Build for production:

```bash
npm run build
```

Output will be in the `dist/` folder.

## Preview Production Build

```bash
npm run preview
```

## Adding a New React Tool

### 1. Create Tool Component

Create `src/tools/my-tool/MyTool.tsx`:

```tsx
import React, { useState, useCallback } from 'react';

export const MyTool: React.FC = () => {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(() => {
    alert(`You entered: ${value}`);
  }, [value]);

  return (
    <div className="card">
      <h1 className="text-3xl font-bold text-gray-800 mb-5">
        ⚡ My Tool
      </h1>
      <p className="text-gray-600 mb-5">Tool description</p>

      <input
        type="text"
        className="input-text mb-4"
        placeholder="Enter something..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button className="btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
```

### 2. Export Component

Create `src/tools/my-tool/index.ts`:

```typescript
export { MyTool } from './MyTool';
```

### 3. Register in App

Edit `src/App.tsx`:

**Import:**
```typescript
import { MyTool } from './tools/my-tool';
```

**Add to tools array:**
```typescript
const tools: Tool[] = [
  // ... existing tools
  {
    id: 'my-tool',
    name: 'My Tool',
    description: 'My awesome tool',
    icon: '⚡',
  },
];
```

**Add case in renderTool:**
```typescript
const renderTool = () => {
  switch (currentToolId) {
    case 'log-extractor':
      return <LogExtractor />;
    case 'encryption-tool':
      return <EncryptionTool />;
    case 'my-tool':
      return <MyTool />;
    default:
      return <div className="card"><h2>Tool not found</h2></div>;
  }
};
```

### 4. Test It

```bash
npm run dev
```

Navigate to your tool in the browser.

## React Hooks Cheat Sheet

### useState
```tsx
const [count, setCount] = useState(0);
const [text, setText] = useState('');
const [isOpen, setIsOpen] = useState(false);
```

### useCallback
```tsx
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);

const handleChange = useCallback((value: string) => {
  setValue(value);
}, []);
```

### useRef
```tsx
const inputRef = useRef<HTMLInputElement>(null);

// Focus input
inputRef.current?.focus();

// In JSX
<input ref={inputRef} />
```

### useEffect
```tsx
useEffect(() => {
  // Runs on mount and when dependencies change
  console.log('Effect running');

  return () => {
    // Cleanup function
    console.log('Cleanup');
  };
}, [dependency1, dependency2]);
```

## Tailwind CSS Quick Reference

### Layout
```tsx
<div className="flex items-center justify-between">
<div className="grid grid-cols-2 gap-4">
<div className="max-w-3xl mx-auto">
```

### Spacing
```tsx
<div className="p-4">       {/* padding: 1rem */}
<div className="px-8 py-4"> {/* padding-x: 2rem, padding-y: 1rem */}
<div className="mb-5">      {/* margin-bottom: 1.25rem */}
<div className="gap-4">     {/* gap: 1rem */}
```

### Typography
```tsx
<h1 className="text-3xl font-bold text-gray-800">
<p className="text-sm text-gray-600">
<span className="font-semibold">
```

### Colors
```tsx
className="bg-white text-gray-800"
className="bg-blue-500 text-white"
className="border-gray-300"
```

### Borders & Rounded
```tsx
className="border-2 border-gray-300"
className="rounded-lg"      {/* border-radius: 0.5rem */}
className="rounded-xl"      {/* border-radius: 0.75rem */}
```

### Custom Classes (defined in main.css)
```tsx
className="card"            {/* White card with shadow */}
className="btn-primary"     {/* Purple gradient button */}
className="btn-secondary"   {/* Gray button */}
className="input-text"      {/* Styled input */}
className="textarea-base"   {/* Styled textarea */}
```

## Event Handlers

### onClick
```tsx
<button onClick={() => console.log('clicked')}>
<button onClick={handleClick}>
```

### onChange
```tsx
<input onChange={(e) => setValue(e.target.value)} />
<textarea onChange={(e) => setText(e.target.value)} />
```

### onKeyDown
```tsx
<input onKeyDown={(e) => {
  if (e.key === 'Enter') {
    handleSubmit();
  }
}} />
```

### onSubmit
```tsx
<form onSubmit={(e) => {
  e.preventDefault();
  handleSubmit();
}}>
```

## TypeScript Tips

### Component Props
```tsx
interface MyToolProps {
  title: string;
  count?: number;
  onUpdate: (value: string) => void;
}

export const MyTool: React.FC<MyToolProps> = ({ title, count = 0, onUpdate }) => {
  // Component code
};
```

### Event Types
```tsx
onChange={(e: React.ChangeEvent<HTMLInputElement>) => ...}
onClick={(e: React.MouseEvent<HTMLButtonElement>) => ...}
onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => ...}
```

### Ref Types
```tsx
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);
```

## Common Tasks

### Type Checking
```bash
npm run lint
```

### Clean Build
```bash
npm run clean
npm install
npm run build
```

### Change Port
Edit `vite.config.ts`:
```typescript
server: {
  port: 4000,
  open: true,
}
```

## Project Files

- `src/App.tsx` - Main React component
- `src/main.tsx` - React entry point
- `src/components/Navigation.tsx` - Navigation component
- `src/tools/` - Tool implementations (React components)
- `src/utils/` - Utility functions
- `src/types/` - TypeScript types
- `src/styles/main.css` - Tailwind + custom styles

## Troubleshooting

### Build fails
```bash
npm run clean
npm install
npm run build
```

### Types not working
```bash
npm run lint
```

Check console for TypeScript errors.

### Port already in use
Change port in `vite.config.ts` or kill process using port 3000.

### React hooks error
Make sure you're not calling hooks conditionally:
```tsx
// ❌ Wrong
if (condition) {
  const [state, setState] = useState('');
}

// ✅ Correct
const [state, setState] = useState('');
if (condition) {
  // use state
}
```

## Next Steps

1. Read `README.md` for detailed documentation
2. Check `CONTRIBUTING.md` for contribution guidelines
3. Review existing components in `src/tools/`
4. Start building your own tools!

Happy coding with React! ⚛️
