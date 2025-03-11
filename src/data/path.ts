import type { Edge } from "./pq";

export type Grid = {
	algorithm: 'dijkstra' | 'dfs' | 'bfs' | "a*";
	size: 'tiny' | 'small' | 'medium' | 'big' | 'huge';
};

export function clearResult(grid: Edge[][], columns: number, rows: number) {
	for (let y = 0; y < columns; y++) {
		for (let x = 0; x < rows; x++) {
			grid[y][x].isVisited = false;
			grid[y][x].isPath = false;
		}
	}

	return grid;
}

export function getNeighbors(grid: Edge[][], target: Edge): Edge[] {
	const up =
		grid[target.y - 1] && grid[target.y - 1][target.x] ? grid[target.y - 1][target.x] : null;
	const right =
		grid[target.y] && grid[target.y][target.x + 1] ? grid[target.y][target.x + 1] : null;
	const left =
		grid[target.y] && grid[target.y][target.x - 1] ? grid[target.y][target.x - 1] : null;
	const down =
		grid[target.y + 1] && grid[target.y + 1][target.x] ? grid[target.y + 1][target.x] : null;

	/**
	 * Look all neighbors of current dequeued cell,
	 * if the neighbors either up, right, left, or down does not exist,
	 * remove from the array.
	 **/
	return [up, right, left, down].filter((v) => v !== null) as Edge[];
}

export function initGrid(grid: Edge[][], columns: number, rows: number): Edge[][] {
	for (let y = 0; y < columns; y++) {
		grid[y] = [];
		for (let x = 0; x < rows; x++) {
			grid[y][x] = {
				x: x,
				y: y,
				isWall: false,
				isStart: false,
				isVisited: false,
				isEnd: false,
				isPath: false,
				prev: null,
				weight: 1,
			};
		}
	}

	return grid;
}

export function randomizeWall(grid: Edge[][], cols: number, rows: number) {
	for (let y = 0; y < cols; y++) {
		for (let x = 0; x < rows; x++) {
			if (grid[y][x].isStart || grid[y][x].isEnd) continue;
			if (Math.random() < 0.3) {
				grid[y][x].isWall = true;
			} else {
				grid[y][x].isWall = false;
			}
		}
	}

	console.log(grid, cols, rows);

	return grid;
}

export function save(start: number[], end: number[], grid: Edge[][], gridSize: Grid['size']) {
	const startEdge = start.length ? grid[start[0]][start[1]] : null;
	const endEdge = end.length ? grid[end[0]][end[1]] : null;

	// Save grid and its size to localStorage.
	const savedGrid = {
		start: startEdge,
		end: endEdge,
		size: gridSize,
		grid: grid,
	};
	localStorage.setItem('save', JSON.stringify(savedGrid));
}

export function load() {
	const saved: any = localStorage.getItem('save');
	if (!saved) return;
	return JSON.parse(saved);
}
