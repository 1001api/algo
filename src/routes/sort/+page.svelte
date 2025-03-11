<script lang="ts">
	import MainNavbar from "../../components/navbars/MainNavbar.svelte";

	import { onMount } from "svelte";
	import {
		bubbleSort,
		generateRandomInRange,
		insertionSort,
		mergeSort,
		quickSort,
		selectionSort,
	} from "../../data/sort";
	import {
		sortData,
		resetData,
		timeout,
		resetTimeout,
	} from "../../data/state.svelte";
	import KeyboardHandler from "../../components/KeyboardHandler.svelte";

	const ITERATION: number = 300;
	const MAX_HEIGHT: number = 500;
	const MIN_HEIGHT: number = 5;
	const DELAY: number = 50; // millisecond delay

	type Sort = {
		algorithm: "bubble" | "selection" | "merge" | "insertion" | "quick";
	};

	let sortAlgo: Sort["algorithm"] = "bubble";

	onMount(() => {
		initData();
	});

	function initData() {
		// reset the data (if any)
		resetData();

		for (let i = 0; i < ITERATION; i++) {
			const randomize = generateRandomInRange(MIN_HEIGHT, MAX_HEIGHT);

			// update the original array from svelte store
			sortData.data.push(randomize);
		}
	}

	async function play() {
		// reset the timeout id array
		resetTimeout();

		if (sortAlgo === "bubble") return bubbleSort(DELAY);
		if (sortAlgo === "selection") return selectionSort(DELAY);
		if (sortAlgo === "insertion") return insertionSort(DELAY);
		if (sortAlgo === "merge")
			return mergeSort(0, sortData.data.length - 1, DELAY);
		if (sortAlgo === "quick")
			return quickSort(0, sortData.data.length - 1, DELAY);
	}

	function stop() {
		for (let i = 0; i < timeout.data.length; i++) {
			clearTimeout(timeout.data[i]);
		}
	}
</script>

<MainNavbar activeIndex={1} />

<main class="min-h-screen">
	<div class="flex items-start gap-2 px-34 py-12">
		<!-- ALGORITHMS SELECTOR -->
		<div class="px-2">
			<div class="form-control w-full max-w-xs">
				<select bind:value={sortAlgo} class="select-bordered select">
					<option disabled>Select Algorithms</option>
					<option value="bubble" selected>Bubble Sort</option>
					<option value="selection">Selection Sort</option>
					<option value="insertion">Insertion Sort</option>
					<option value="merge">Merge Sort</option>
					<option value="quick">Quick Sort</option>
				</select>
			</div>
		</div>

		<!-- GENERATE RANDOM -->
		<div>
			<button class="btn flex gap-2 px-6" on:click={initData}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
					/>
				</svg>
				Randomize</button
			>
			<p class="px-2 pt-1 text-xs font-bold text-gray-400">Alt + R</p>
		</div>

		<!-- PLAY -->
		<div>
			<button class="btn flex gap-2 px-6" on:click={play}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
					/>
				</svg>
				Play</button
			>
			<p class="px-2 pt-1 text-xs font-bold text-gray-400">
				Ctrl + Space
			</p>
		</div>

		<!-- STOP -->
		<div>
			<button class="btn flex gap-2 px-6" on:click={stop}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
					/>
				</svg>
				Stop</button
			>
			<p class="px-2 pt-1 text-xs font-bold text-gray-400">Delete</p>
		</div>
	</div>

	<!-- BAR REPRESENTATION -->
	<div>
		<div class="flex w-full items-end justify-center px-4 pt-6">
			{#each sortData.data as key}
				<div
					class="bar dark-white w-[2px] bg-amber-500 px-[2px]"
					style={`height:${key}px;`}
					id={`bar-${key}`}
				></div>
			{/each}
		</div>
	</div>

	<!-- KEYBOARD HANDLER  -->
	<KeyboardHandler
		triggerPlay={play}
		triggerClear={stop}
		triggerRandomize={initData}
	/>
</main>
