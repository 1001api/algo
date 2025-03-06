import type { ChartData, ChartOptions } from "chart.js";

// =================================================================================== //
// =================================================================================== //
//                       BIG O NOTATION CHART CONFIGURATIONS                           //
// =================================================================================== //
// =================================================================================== //

export const bigOInitialData: ChartData = {
	datasets: [
		{
			label: "O(N)",
			data: [],
			borderColor: "#FF0000",
			pointBackgroundColor: "#FF0000",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
		{
			label: "O(1)",
			data: [],
			borderColor: "#FF8000",
			pointBackgroundColor: "#FF8000",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
		{
			label: "O(n^2)",
			data: [],
			borderColor: "#FFFF00",
			pointBackgroundColor: "#FFFF00",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
		{
			label: "O(n^3)",
			data: [],
			borderColor: "#90EE90",
			pointBackgroundColor: "#90EE90",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
		{
			label: "O(Log N)",
			data: [],
			borderColor: "#00FFFF",
			pointBackgroundColor: "#00FFFF",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
		{
			label: "O(N Log N)",
			data: [],
			borderColor: "#0000FF",
			pointBackgroundColor: "#0000FF",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
		{
			label: "O(2^N)",
			data: [],
			borderColor: "#A9A9A9",
			pointBackgroundColor: "#A9A9A9",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
		{
			label: "O(N!)",
			data: [],
			borderColor: "#000",
			pointBackgroundColor: "#000",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
	],
};

export const bigOOutputInitialData: ChartData = {
	datasets: [
		{
			label: "O(N)",
			data: [],
			borderColor: "#FF0000",
			pointBackgroundColor: "#FF0000",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
		{
			label: "O(1)",
			data: [],
			borderColor: "#FF8000",
			pointBackgroundColor: "#FF8000",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
		{
			label: "O(n^2)",
			data: [],
			borderColor: "#FFFF00",
			pointBackgroundColor: "#FFFF00",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
		{
			label: "O(n^3)",
			data: [],
			borderColor: "#90EE90",
			pointBackgroundColor: "#90EE90",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
		{
			label: "O(Log N)",
			data: [],
			borderColor: "#00FFFF",
			pointBackgroundColor: "#00FFFF",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
		{
			label: "O(N Log N)",
			data: [],
			borderColor: "#0000FF",
			pointBackgroundColor: "#0000FF",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
		{
			label: "O(2^N)",
			data: [],
			borderColor: "#A9A9A9",
			pointBackgroundColor: "#A9A9A9",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
		{
			label: "O(N!)",
			data: [],
			borderColor: "#000",
			pointBackgroundColor: "#000",
			pointBorderColor: "#fff",
			borderWidth: 2,
		},
	],
};

export const bigOOptions: ChartOptions = {
	elements: {
		line: {
			tension: 0.4
		}
	},
	plugins: {
		legend: {
			labels: {
				usePointStyle: true,
				boxWidth: 0,
				color: "yellow",
			},
		},
	},
	scales: {
		y: {
			type: 'logarithmic',
			grid: {
				color: "rgb(255, 255, 255, 0.3)",
				lineWidth: 0.5,
			},
			title: {
				display: true,
				text: "Time taken in millisecond",
				color: "yellow"
			},
			ticks: {
				color: "rgb(255, 255, 255, 0.8)",
			}
		},
		x: {
			grid: {
				color: "rgb(255, 255, 255, 0.3)",
				lineWidth: 0.5,
			},
			title: {
				display: true,
				text: "Number of input (n)",
				color: "yellow"
			},
			ticks: {
				color: "rgb(255, 255, 255, 0.8)",
			}
		},
	},
};

export const bigOOutputOptions: ChartOptions = {
	elements: {
		line: {
			tension: 0.4
		}
	},
	plugins: {
		legend: {
			labels: {
				usePointStyle: true,
				boxWidth: 0,
				color: "white",
			},
		},
	},
	scales: {
		y: {
			type: 'logarithmic',
			grid: {
				color: "rgb(255, 255, 255, 0.3)",
				lineWidth: 0.5,
			},
			title: {
				display: true,
				text: "Number of Operations",
				color: "white"
			},
			ticks: {
				color: "rgb(255, 255, 255, 0.8)",
			}
		},
		x: {
			grid: {
				color: "rgb(255, 255, 255, 0.3)",
				lineWidth: 0.5,
			},
			title: {
				display: true,
				text: "Number of input (n)",
				color: "white"
			},
			ticks: {
				color: "rgb(255, 255, 255, 0.8)",
			}
		},
	},
};

// =================================================================================== //
// =================================================================================== //
//                           BIG O NOTATION MOCKUP FUNCTION                            //
// =================================================================================== //
// =================================================================================== //

interface IMockupFunctionData<T> {
	code: string;
	title: T;
}

export enum BIGO_TITLE {
	ADD_UP_TO_LOOP = "add-up-to-loop",
	ADD_UP_TO_MATH = "add-up-to-math",
	ARRAY_OF_PAIRS = "array-of-pairs",
	FACTORIAL = "factorial",
	COUNT_DIGITS = "count-digits",
	RECURSIVE_LOG_SUM = "recursive-log-sum",
	RECURSIVE_FIB = "recursive-fib",
	CUBIC_LOOP = "cubic-loop",
}

export const bigOMockupFunction: IMockupFunctionData<BIGO_TITLE>[] = [
	{
		code: `
function addUpTo(n: number){
	let total = 0;

	for (let i = 0; i < n; i++) {
		total =+ i;
	}

	return total;
}
  `,
		title: BIGO_TITLE.ADD_UP_TO_LOOP,
	},
	{
		code: `
function addUpTo(n: number){
	return n * (n + 1) / 2;
}
  `,
		title: BIGO_TITLE.ADD_UP_TO_MATH,
	},
	{
		code: `
function arrayOfPairs(n: number) {
	const result = [];

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			result.push([i, j])
		}
	}

	return result;
}
  `,
		title: BIGO_TITLE.ARRAY_OF_PAIRS,
	},
	{
		code: `
function countDigits(n: number): number {
    let count = 0;
    while (n > 0) {
        n = Math.floor(n / 10);
        count++;
    }
    return count;
}
  `,
		title: BIGO_TITLE.COUNT_DIGITS,
	},
	{
		code: `
function sumLog(n: number): number {
    if (n === 1) return 1;
    return sumLog(Math.floor(n / 2)) + sumLog(n - Math.floor(n / 2));
}
  `,
		title: BIGO_TITLE.RECURSIVE_LOG_SUM,
	},
	{
		code: `
function fib(n: number): number {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
  `,
		title: BIGO_TITLE.RECURSIVE_FIB,
	},
	{
		code: `
function cubicLoop(n: number): number {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                sum += i + j + k;
            }
        }
    }
    return sum;
}
  `,
		title: BIGO_TITLE.CUBIC_LOOP,
	},
	{
		code: `
function factorial(n: number): number {
	let factorial = 1;

	for (let i = 2; i <= n; i++) {
		factorial *= i;
	}

	let count = 0;

	for (let i = 0; i < factorial; i++) {
		count++;
	}

	return count;
}
    `,
		title: BIGO_TITLE.FACTORIAL
	}
];

// =================================================================================== //
// =================================================================================== //
//                        BIG O NOTATION REPRESENTATIVE FUNCTION                       //
// =================================================================================== //
// =================================================================================== //

export function addUpToLoop(n: number) {
	let total = 0;
	for (let i = 0; i < n; i++) {
		total = +i;
	}
	return total;
}

export function addUpToMath(n: number) {
	return (n * (n + 1)) / 2;
}

export function arrayOfPairs(n: number) {
	const result = [];
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			result.push([i, j])
		}
	}
	return result;
}

export function factorial_old(n: number) {
	if (n === 0) return 1;

	let result = n;

	for (let i = 0; i < n; i++) {
		result = n * factorial_old(i);
	}

	return result;
}

export function countDigits(n: number): number {
	let count = 0;
	while (n > 0) {
		n = Math.floor(n / 10);
		count++;
	}
	return count;
}

export function sumLog(n: number): number {
	if (n === 1) return 1;
	return sumLog(Math.floor(n / 2)) + sumLog(n - Math.floor(n / 2));
}

export function fib(n: number): number {
	if (n <= 1) return n;
	return fib(n - 1) + fib(n - 2);
}

export function cubicLoop(n: number): number {
	let sum = 0;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			for (let k = 0; k < n; k++) {
				sum += i + j + k;
			}
		}
	}
	return sum;
}

export function factorial(n: number): number {
	let factorial = 1;

	for (let i = 2; i <= n; i++) {
		factorial *= i;
	}

	let count = 0;

	for (let i = 0; i < factorial; i++) {
		count++;
	}

	return count;
}
