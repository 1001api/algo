import { sortData, timeout } from "./state.svelte";
import { swap } from "./swap";

export function generateRandomInRange(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function bubbleSort(DELAY: number) {
	for (let i = sortData.data.length - 1; i >= 0; i--) {
		const id: ReturnType<typeof setTimeout> = setTimeout(() => {
			for (let j = 0; j < i; j++) {
				const current = sortData.data[j];
				const next = sortData.data[j + 1];

				if (current > next) {
					swap(j, j + 1);
				}
			}
		}, (sortData.data.length - i) * DELAY);

		// push setTimeout id into an array,
		// this way we can clear the timeout later if user stop.
		timeout.data.push(id);
	}
}

export function insertionSort(DELAY: number) {
	for (let outerIdx = 1; outerIdx < sortData.data.length; outerIdx++) {
		// Temporary index for swapping
		let tempIdx = outerIdx;

		const id: ReturnType<typeof setTimeout> = setTimeout(() => {
			// Do inner loop as long as the index is not less than 0
			// and the inner value is bigger than temporary value.
			for (
				let innerIdx = tempIdx - 1;
				innerIdx >= 0 && sortData.data[innerIdx] > sortData.data[tempIdx];
				innerIdx--
			) {
				const inner = sortData.data[innerIdx];

				// if inner value is bigger than temporary value,
				// swap between the two and update the temp idx to inner idx.
				if (inner > sortData.data[tempIdx]) {
					swap(innerIdx, tempIdx);
					tempIdx = innerIdx;
				}
			}
		}, outerIdx * DELAY);

		// push setTimeout id into an array,
		// this way we can clear the timeout later if user stop.
		timeout.data.push(id);
	}
}

export async function mergeSort(startIdx: number, endIdx: number, DELAY: number) {
	if (startIdx >= endIdx) return;

	// get the mid point of the current subsequent call
	const midIdx = Math.floor((startIdx + endIdx) / 2);

	// recursively call the left divided array (start -> mid)
	await mergeSort(startIdx, midIdx, DELAY);

	// recursively call the right divided array (mid + 1 -> end)
	await mergeSort(midIdx + 1, endIdx, DELAY);

	// define a temporary array to hold the array
	const temp: number[] = [];

	let leftPointer = startIdx;
	let rightPointer = midIdx + 1;

	/**
	 * loop as long as left side not overlapping mid point,
	 * and as long as right side not overlapping end point.
	 **/
	while (leftPointer <= midIdx && rightPointer <= endIdx) {
		/**
		 * if current left side array is less than right side array,
		 * push the current pointer value of left to temp.
		 **/
		if (sortData.data[leftPointer] < sortData.data[rightPointer]) {
			temp.push(sortData.data[leftPointer]);
			leftPointer++;
		} else {
			/**
			 * else if current left side array is bigger than right side array,
			 * push the current pointer value of right to temp.
			 **/
			temp.push(sortData.data[rightPointer]);
			rightPointer++;
		}
	}

	// If there are leftovers, just push the remaining
	while (leftPointer <= midIdx) {
		temp.push(sortData.data[leftPointer]);
		leftPointer++;
	}

	// If there are leftovers, just push the remaining
	while (rightPointer <= endIdx) {
		temp.push(sortData.data[rightPointer]);
		rightPointer++;
	}

	let tempPointer = 0;

	// loop from start to end of current subsequent call array
	for (let i = startIdx; i <= endIdx; i++) {
		// update the original array with the result from temp
		sortData.data[i] = temp[tempPointer];
		tempPointer++;
	}

	// Give a delay but dont do it async-ly, wait until done
	await new Promise((resolve) => setTimeout(resolve, DELAY));
}

export async function quickSort(
	startIdx: number = 0,
	endIdx: number = sortData.data.length - 1,
	DELAY: number
) {
	if (startIdx < endIdx) {
		const mid = await pivot(startIdx, endIdx, DELAY);
		// sort left side
		quickSort(startIdx, mid, DELAY);
		// sort right side
		quickSort(mid + 1, endIdx, DELAY);
	}

	return sortData.data;
}

async function pivot(startIdx: number, endIdx: number, DELAY: number) {
	let captainIdx = startIdx;
	let scouterIdx = captainIdx + 1;
	let lessIdx = startIdx;

	while (scouterIdx <= endIdx) {
		if (sortData.data[scouterIdx] < sortData.data[captainIdx]) {
			// increment less idx first
			lessIdx++;
			// swap scouter with less
			swap(scouterIdx, lessIdx);
			// wait for DELAY / 2 ms
			await new Promise((resolve) => setTimeout(resolve, DELAY / 2));
		}

		scouterIdx++;
	}

	// swap the captain with less
	swap(captainIdx, lessIdx);

	// wait for FULL DELAY
	await new Promise((resolve) => setTimeout(resolve, DELAY));

	return lessIdx;
}

export function selectionSort(DELAY: number) {
	for (let outerIdx = 0; outerIdx < sortData.data.length; outerIdx++) {
		const current = sortData.data[outerIdx];
		// set minimum value inside iterations
		let minIdx = outerIdx;

		const id: ReturnType<typeof setTimeout> = setTimeout(() => {
			for (let innerIdx = outerIdx + 1; innerIdx < sortData.data.length; innerIdx++) {
				const inner = sortData.data[innerIdx];

				// if the value of inner < current minimum value
				if (Math.min(inner, sortData.data[minIdx]) === inner) {
					// update the minimum index
					minIdx = innerIdx;
				}
			}

			// if minimum changes, meaning that there is a smaller
			// value inside the inner loop, then swap.
			if (sortData.data[minIdx] !== current) {
				swap(outerIdx, minIdx);
			}
		}, outerIdx * DELAY);

		// push setTimeout id into an array,
		// this way we can clear the timeout later if user stop.
		timeout.data.push(id);
	}
}
