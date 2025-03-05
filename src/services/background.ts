import {
	addUpToLoop,
	addUpToMath,
	arrayOfPairs,
	BIGO_TITLE,
	factorial
} from "../data/big-o";

export interface WorkerMessage {
	activeTitle: BIGO_TITLE;
	inputValue: number;
}

export interface WorkerResult {
	time: number;
	title: BIGO_TITLE;
}

function measurePerformance(fn: (input: number) => void, input: number): number {
	const start = performance.now();
	fn(input);
	const end = performance.now();
	const res = end - start;
	return res === 0 ? 0.001 : res;
}

const algorithmMap = {
	[BIGO_TITLE.ADD_UP_TO_LOOP]: addUpToLoop,
	[BIGO_TITLE.ADD_UP_TO_MATH]: addUpToMath,
	[BIGO_TITLE.ARRAY_OF_PAIRS]: arrayOfPairs,
	[BIGO_TITLE.FACTORIAL]: factorial
};

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
	const { activeTitle, inputValue } = event.data;

	const algorithm = algorithmMap[activeTitle];

	if (!algorithm) {
		console.error(`No algorithm found for: ${activeTitle}`);
		return;
	}

	const timeTaken = measurePerformance(algorithm, inputValue);

	const result: WorkerResult = {
		time: timeTaken,
		title: activeTitle
	};

	self.postMessage(result);
};

export { };
