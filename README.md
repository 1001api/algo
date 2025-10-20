![banner](https://i.imgur.com/7aiUSfa.png)

# Algorithm Visualizer

An interactive web application for visualizing algorithms and data structures, built with SvelteKit 5 and TypeScript. This project provides real-time visual demonstrations of Big O complexity, sorting algorithms, and pathfinding algorithms.

## ✨ Features

### 🔢 Big O Complexity Analysis
- **Interactive Algorithm Comparison**: Visualize and compare time complexity of different algorithms
- **Real-time Performance Tracking**: Measure actual execution time using Web Workers
- **Supported Complexities**:
  - O(1) - Constant time
  - O(log n) - Logarithmic time
  - O(n) - Linear time
  - O(n log n) - Linearithmic time
  - O(n²) - Quadratic time
  - O(n³) - Cubic time
  - O(2ⁿ) - Exponential time
  - O(n!) - Factorial time
- **Dynamic Charts**: Visualize algorithm performance with Chart.js
- **Predefined Examples**: Auto-play feature to demonstrate all algorithms

### 🔄 Sorting Algorithm Visualizations
- **Bubble Sort**: O(n²) comparison-based sorting
- **Selection Sort**: O(n²) in-place sorting
- **Insertion Sort**: O(n²) adaptive sorting
- **Merge Sort**: O(n log n) divide-and-conquer
- **Quick Sort**: O(n log n) efficient partitioning
- **Visual Bars**: Real-time animated bar chart representation
- **Keyboard Controls**: Quick access with keyboard shortcuts

### 🗺️ Pathfinding Algorithm Visualizations
- **Dijkstra's Algorithm**: Shortest path with weighted edges
- **A* Algorithm**: Heuristic-based pathfinding
- **Breadth-First Search (BFS)**: Unweighted shortest path
- **Depth-First Search (DFS)**: Graph traversal exploration
- **Interactive Grid**: Click to create walls/obstacles
- **Drag & Drop**: Paint walls by dragging
- **Grid Sizes**: Tiny (10×10) to Huge (70×150)
- **Save/Load**: Persist grid configurations locally

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, pnpm, or bun package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd algo

# Install dependencies
npm install
# or
bun install
```

### Development

Start the development server:

```bash
npm run dev
# or
bun run dev

# Open in browser
npm run dev -- --open
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: [SvelteKit 5](https://kit.svelte.dev/) with Svelte 5 runes
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [DaisyUI 5](https://daisyui.com/)
- **Charts**: [Chart.js 4.3](https://www.chartjs.org/)
- **Math**: [Math.js 14](https://mathjs.org/)
- **Code Highlighting**: [svelte-highlight](https://github.com/metonym/svelte-highlight)
- **Markdown**: [MDsveX](https://mdsvex.pngwn.io/)
- **Deployment**: [Vercel Adapter](https://kit.svelte.dev/docs/adapter-vercel)
- **Build Tool**: [Vite 6](https://vitejs.dev/)

## 📁 Project Structure

```
algo/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── BigOChart.svelte
│   │   ├── BigOOutputChart.svelte
│   │   ├── Highlighter.svelte
│   │   ├── KeyboardHandler.svelte
│   │   ├── loading/
│   │   └── navbars/
│   ├── data/                # Data structures and algorithm logic
│   │   ├── big-o.ts         # Big O algorithm implementations
│   │   ├── sort.ts          # Sorting algorithms
│   │   ├── path.ts          # Pathfinding utilities
│   │   ├── pq.ts            # Priority Queue implementation
│   │   ├── q.ts             # Queue implementation
│   │   ├── state.svelte.ts  # Svelte 5 state management
│   │   └── swap.ts          # Array swap utility
│   ├── services/            # Background services
│   │   ├── worker.ts        # Web Worker manager
│   │   └── background.ts    # Background task handler
│   ├── routes/              # SvelteKit routes
│   │   ├── +page.svelte     # Big O visualization page
│   │   ├── sort/            # Sorting algorithms page
│   │   └── path/            # Pathfinding page
│   └── app.css              # Global styles
├── static/                  # Static assets
├── package.json
├── svelte.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## ⌨️ Keyboard Shortcuts

### Sorting Page
- **Alt + R**: Randomize array
- **Ctrl + Space**: Play animation
- **Delete**: Stop animation

### Pathfinding Page
- **Alt + S**: Set start point
- **Alt + E**: Set end point
- **Alt + R**: Random obstacles
- **Ctrl + Space**: Play algorithm
- **Ctrl + S**: Save grid
- **Ctrl + L**: Load grid
- **Delete**: Clear results
- **Shift + Delete**: Reset grid

## 🎯 Key Features Implementation

### Web Workers for Performance
Heavy computational tasks run in background threads to prevent UI blocking, allowing smooth visualization even with large input sizes (1B+ operations).

### Svelte 5 Runes
Modern reactive state management using Svelte 5's new runes API (`$state`, `$derived`, `$effect`).

### Priority Queue & Queue
Custom implementations for efficient pathfinding algorithms (Dijkstra, A*).

### Real-time Visualization
Asynchronous rendering with `setTimeout` for smooth, step-by-step algorithm visualization.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
