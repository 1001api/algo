<script lang="ts">
	import { onMount } from "svelte";
	import {
		BIGO_TITLE,
		bigOOutputInitialData,
		bigOOutputOptions,
	} from "../data/big-o";
	import Chart from "chart.js/auto";

	interface Props {
		// Input of the data from the parent
		data: { title: string; x: number[]; y: number[]; output: number[] }[];
		activeTitle: string;
	}

	let { data, activeTitle }: Props = $props();

	// Canvas reference to initialize chart.js
	let canvasRef: HTMLCanvasElement | undefined;

	// Chart object. useful to update the data in side effect.
	let chart: Chart | undefined;

	onMount(() => {
		if (!canvasRef) return;

		// Get reference to the canvas
		const canvas = canvasRef.getContext("2d")!;

		// initialize chart.js using empty data
		chart = new Chart(canvas, {
			type: "line",
			data: bigOOutputInitialData,
			options: bigOOutputOptions,
		});
	});

	$effect(() => {
		if (chart) {
			// If there is no data involved,
			// that means two things, first,
			// component still mounting. Second,
			// User reset the datasets.
			if (!data.length) {
				// Set back to the initial data
				chart.data.datasets[0].data = [];
				chart.data.datasets[1].data = [];
				chart.data.datasets[2].data = [];
				chart.data.datasets[3].data = [];
				chart.data.datasets[4].data = [];
				chart.data.datasets[5].data = [];
				chart.data.datasets[6].data = [];
				chart.data.datasets[7].data = [];
				chart.data.labels = [...Array(10).keys()];
				chart.update();

				// break the reactive-block
				return;
			}

			// Find current active algorithm
			const current = $state
				.snapshot(data)
				.find((v) => v.title === activeTitle);

			if (!current) return;

			// Whenever input changes, the chart should react (updating data)
			switch (activeTitle) {
				case BIGO_TITLE.ADD_UP_TO_LOOP:
					chart.data.datasets[0].data = current.output;
					break;

				case BIGO_TITLE.ADD_UP_TO_MATH:
					chart.data.datasets[1].data = current.output;
					break;

				case BIGO_TITLE.ARRAY_OF_PAIRS:
					chart.data.datasets[2].data = current.output;
					break;

				case BIGO_TITLE.CUBIC_LOOP:
					chart.data.datasets[3].data = current.output;
					break;

				case BIGO_TITLE.COUNT_DIGITS:
					chart.data.datasets[4].data = current.output;
					break;

				case BIGO_TITLE.RECURSIVE_LOG_SUM:
					chart.data.datasets[5].data = current.output;
					break;

				case BIGO_TITLE.RECURSIVE_FIB:
					chart.data.datasets[6].data = current.output;
					break;

				case BIGO_TITLE.FACTORIAL:
					chart.data.datasets[7].data = current.output;
					break;

				default:
					break;
			}

			// Get all X inside the array
			const xs = $state.snapshot(data).map((v) => v.x);

			// Merge the array into one
			const merged = Array.prototype.concat.apply([], [...xs]);
			// Remove duplication and sorted
			const uniqX = [...new Set(merged)].sort((a, b) => a - b);
			chart.data.labels = uniqX; // update x data

			chart.update();
		}
	});
</script>

<div class="w-full rounded-xl bg-base-100 px-4 py-2">
	<canvas bind:this={canvasRef} width="300" height="200"></canvas>
</div>
