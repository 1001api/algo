import { sortData } from "./state.svelte";

export function swap(firstIdx: number, secondIdx: number) {
	const temp = sortData.data[firstIdx];

	sortData.data[firstIdx] = sortData.data[secondIdx];
	sortData.data[secondIdx] = temp;
}
