# Contributing Guide

## Adding a New Tool

Follow these steps to add a new tool to the Office Tools application:

### 1. Create Tool Directory

```bash
mkdir -p src/tools/your-tool-name
```

### 2. Create Tool Class

Create `src/tools/your-tool-name/YourToolName.ts`:

```typescript
import './your-tool-name.css';

export class YourToolName {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.attachEventListeners();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="card">
        <h1>🔧 Your Tool Name</h1>
        <p style="color: #666; margin-bottom: 20px;">Tool description</p>

        <!-- Add your tool's HTML here -->
      </div>
    `;
  }

  private attachEventListeners(): void {
    // Add your event listeners here
  }

  // Add your tool's methods here

  public destroy(): void {
    // Cleanup when tool is unloaded
    this.container.innerHTML = '';
  }
}
```

### 3. Create Tool Styles

Create `src/tools/your-tool-name/your-tool-name.css`:

```css
/* Tool-specific styles */
.your-tool-container {
  /* Add your styles */
}
```

### 4. Create Index Export

Create `src/tools/your-tool-name/index.ts`:

```typescript
export { YourToolName } from './YourToolName';
```

### 5. Register Tool in App

Edit `src/App.ts`:

1. Import your tool:
```typescript
import { YourToolName } from './tools/your-tool-name';
```

2. Add to tools array:
```typescript
private tools: Tool[] = [
  // ... existing tools
  {
    id: 'your-tool-name',
    name: 'Your Tool Display Name',
    description: 'Brief description',
    icon: '🔧', // Choose an emoji icon
  },
];
```

3. Add to loadTool switch:
```typescript
case 'your-tool-name':
  this.currentTool = new YourToolName(this.contentContainer);
  break;
```

### 6. Test Your Tool

```bash
npm run dev
```

Navigate to your tool using the navigation buttons.

## Best Practices

### Structure
- Keep each tool self-contained
- Use the class-based pattern for consistency
- Always implement a `destroy()` method for cleanup

### Styling
- Use the shared styles from `src/styles/shared.css`
- Add tool-specific styles in separate CSS files
- Follow the existing color scheme and design patterns

### TypeScript
- Define types in `src/types/index.ts` if needed
- Use type-only imports for types
- Ensure `npm run lint` passes

### Utilities
- Create reusable utilities in `src/utils/`
- Keep business logic separate from UI code
- Write pure functions when possible

## Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add comments for complex logic
- Follow existing naming conventions

## Testing

Before submitting:

1. Run type check:
```bash
npm run lint
```

2. Test build:
```bash
npm run build
```

3. Preview production build:
```bash
npm run preview
```

4. Test in multiple browsers

## Example Tools

Look at existing tools for reference:
- **Log Extractor** (`src/tools/log-extractor/`) - Complex parsing and display
- **Encryption Tool** (`src/tools/encryption-tool/`) - Form handling and external library integration
