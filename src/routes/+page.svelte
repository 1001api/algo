<script lang="ts">
	import { BIGO_TITLE, bigOMockupFunction } from "../data/big-o";
	import { WorkerManager } from "../services/worker";
	import { onDestroy } from "svelte";
	import Spinner from "../components/loading/Spinner.svelte";
	import Highlighter from "../components/Highlighter.svelte";
	import BigOChart from "../components/BigOChart.svelte";
	import BigOOutputChart from "../components/BigOOutputChart.svelte";
	import MainNavbar from "../components/navbars/MainNavbar.svelte";
	import { gamma, log } from "mathjs";
	import { fade } from "svelte/transition";

	// The title of the choosen algorithm
	// this variable has a responsibility
	// to keep track of the algorithm that
	// user had already choose.
	let activeTitle: BIGO_TITLE = $state(BIGO_TITLE.ADD_UP_TO_LOOP);

	// Change active algorithm throught this fn
	function changeActiveAlgo(n: BIGO_TITLE) {
		return (activeTitle = n);
	}

	// Side effect for updated code
	// this active code will be passed to
	// Highlighter atom-component.
	let activeCode = $derived(
		bigOMockupFunction.filter((v) => v.title === activeTitle)[0],
	);

	// state to manage user "N" input
	let inputValue: number = $state(0);

	// factorial derived inputValue
	let factorialValue: number = $derived(gamma(inputValue + 1));
	let logValue: number = $derived(Math.floor(log(inputValue + 1, 2)));
	let nlognValue: number = $derived(
		Math.floor(inputValue * log(inputValue, 2)),
	);

	// loading state
	let loading: boolean = $state(false);

	// these data is populated after
	// the corresponding function run
	let data: { title: string; x: number[]; y: number[]; output: number[] }[] =
		$state([]);

	// worker manager
	const workerManager = new WorkerManager();

	async function calculate() {
		// if state currently loading
		// or the input is none/undefined,
		// return. dont proceed further.
		if (loading || !inputValue) return;

		// set loading state
		loading = true;

		// Initialize background worker to do
		// heavy lifting jobs such as looping,
		// performance time tracking, calculating, etc.
		// Using separate threads will prevent browser to crash
		// Whenever the input is huge > 1Billion.
		const worker = await workerManager.initWorker({
			activeTitle: activeTitle,
			inputValue: inputValue,
		});

		return new Promise<void>((resolve) => {
			worker.onmessage = function (
				event: MessageEvent<{ time: number; title: string }>,
			) {
				// update data according to the result
				// of the background thread.
				updateData(inputValue, event.data.time, event.data.title);

				// reset loading
				loading = false;

				resolve();
			};
		});
	}

	async function playExample() {
		const dataset = [
			1, 5, 10, 11, 12, 13, 15, 20, 25, 35, 50, 100, 500, 1000, 5000,
			10000, 100000, 1000000, 10000000,
		];

		changeActiveAlgo(BIGO_TITLE.ADD_UP_TO_MATH);
		for (const v of dataset) {
			inputValue = v;
			await calculate();
			await sleep(100);
		}

		changeActiveAlgo(BIGO_TITLE.COUNT_DIGITS);
		for (const v of dataset) {
			inputValue = v;
			await calculate();
			await sleep(200);
		}

		changeActiveAlgo(BIGO_TITLE.ADD_UP_TO_LOOP);
		for (const v of dataset) {
			inputValue = v;
			await calculate();
			await sleep(400);
		}

		changeActiveAlgo(BIGO_TITLE.ARRAY_OF_PAIRS);
		for (const v of dataset.slice(0, 15)) {
			inputValue = v;
			await calculate();
			await sleep(500);
		}

		changeActiveAlgo(BIGO_TITLE.CUBIC_LOOP);
		for (const v of dataset.slice(0, 13)) {
			inputValue = v;
			await calculate();
			await sleep(500);
		}

		for (const v of dataset) {
			changeActiveAlgo(BIGO_TITLE.RECURSIVE_LOG_SUM);
			inputValue = v;
			await calculate();
			await sleep(300);
		}

		for (const v of dataset.slice(0, 10)) {
			changeActiveAlgo(BIGO_TITLE.RECURSIVE_FIB);
			inputValue = v;
			await calculate();
			await sleep(500);
		}

		for (const v of dataset.slice(0, 6)) {
			changeActiveAlgo(BIGO_TITLE.FACTORIAL);
			inputValue = v;
			await calculate();
			await sleep(500);
		}
	}

	function sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	function updateData(x: number, y: number, activeTitle: string): void {
		const i = data.findIndex((v) => v.title === activeTitle);

		let output = 0;

		switch (activeTitle) {
			case BIGO_TITLE.ADD_UP_TO_LOOP:
				output = inputValue;
				break;

			case BIGO_TITLE.ADD_UP_TO_MATH:
				output = 1;
				break;

			case BIGO_TITLE.ARRAY_OF_PAIRS:
				output = inputValue ** 2;
				break;

			case BIGO_TITLE.CUBIC_LOOP:
				output = inputValue ** 3;
				break;

			case BIGO_TITLE.COUNT_DIGITS:
				output = logValue;
				break;

			case BIGO_TITLE.RECURSIVE_LOG_SUM:
				output = nlognValue;
				break;

			case BIGO_TITLE.RECURSIVE_FIB:
				output = 2 ** inputValue;
				break;

			case BIGO_TITLE.FACTORIAL:
				output = factorialValue;
				break;

			default:
				break;
		}

		const newValue = {
			title: activeTitle,
			x: [x],
			y: [y],
			output: [output],
		};

		if (i === -1) {
			data.push(newValue);
		} else {
			data[i].x.push(x);
			data[i].y.push(y);
			data[i].output.push(output);
		}
	}

	function abort() {
		// reset loading
		loading = false;

		// stop background process
		workerManager.terminateWorker();
	}

	function reset() {
		data = [];
		abort();
	}

	// Destroy background worker when component unmounted.
	onDestroy(() => workerManager.terminateWorker());
</script>

<MainNavbar activeIndex={0} />

<main>
	<section class="flex w-full items-start py-8 px-6 lg:px-12">
		<!-- Big O Algo Lists -->
		<div class="flex flex-wrap w-8/12 justify-left gap-4">
			<!-- First algorithm -->
			<button
				onclick={() => changeActiveAlgo(BIGO_TITLE.ADD_UP_TO_LOOP)}
				class={`btn btn-sm flex gap-2 ${
					activeTitle === BIGO_TITLE.ADD_UP_TO_LOOP
						? "btn-primary"
						: undefined
				}`}
			>
				<div class="h-3 w-3 bg-[#FF0000]"></div>
				AddUpTo - O(n)</button
			>

			<!-- Second algorithm -->
			<button
				onclick={() => changeActiveAlgo(BIGO_TITLE.ADD_UP_TO_MATH)}
				class={`btn btn-sm flex gap-2 ${
					activeTitle === BIGO_TITLE.ADD_UP_TO_MATH
						? "btn-primary"
						: undefined
				}`}
			>
				<div class="h-3 w-3 bg-[#FF8000]"></div>
				AddUpTo - O(1)</button
			>

			<!-- Third algorithm -->
			<button
				onclick={() => changeActiveAlgo(BIGO_TITLE.ARRAY_OF_PAIRS)}
				class={`btn btn-sm flex gap-2 ${
					activeTitle === BIGO_TITLE.ARRAY_OF_PAIRS
						? "btn-primary"
						: undefined
				}`}
			>
				<div class="h-3 w-3 bg-[#FFFF00]"></div>
				<p>
					Array of Pairs - O(n<sup>2</sup>)
				</p>
			</button>

			<button
				onclick={() => changeActiveAlgo(BIGO_TITLE.CUBIC_LOOP)}
				class="btn btn-sm flex gap-2 {activeTitle ===
				BIGO_TITLE.CUBIC_LOOP
					? 'btn-primary'
					: undefined}"
			>
				<div class="h-3 w-3 bg-[#90EE90]"></div>
				<p>Cubic Loop - O(n<sup>3</sup>)</p>
			</button>

			<button
				onclick={() => changeActiveAlgo(BIGO_TITLE.COUNT_DIGITS)}
				class="btn btn-sm flex gap-2 {activeTitle ===
				BIGO_TITLE.COUNT_DIGITS
					? 'btn-primary'
					: undefined}"
			>
				<div class="h-3 w-3 bg-[#00FFFF]"></div>
				<p>Count Digits - O(Log N)</p>
			</button>

			<button
				onclick={() => changeActiveAlgo(BIGO_TITLE.RECURSIVE_LOG_SUM)}
				class="btn btn-sm flex gap-2 {activeTitle ===
				BIGO_TITLE.RECURSIVE_LOG_SUM
					? 'btn-primary'
					: undefined}"
			>
				<div class="h-3 w-3 bg-[#0000FF]"></div>
				<p>Recursive Logarithmic Sum - O(N Log N)</p>
			</button>

			<button
				onclick={() => changeActiveAlgo(BIGO_TITLE.RECURSIVE_FIB)}
				class="btn btn-sm flex gap-2 {activeTitle ===
				BIGO_TITLE.RECURSIVE_FIB
					? 'btn-primary'
					: undefined}"
			>
				<div class="h-3 w-3 bg-[#A9A9A9]"></div>
				<p>Recursive Fibonacci - O(2<sup>n</sup>)</p>
			</button>

			<button
				onclick={() => changeActiveAlgo(BIGO_TITLE.FACTORIAL)}
				class="btn btn-sm flex gap-2 {activeTitle ===
				BIGO_TITLE.FACTORIAL
					? 'btn-primary'
					: undefined}"
			>
				<div class="h-3 w-3 bg-[#000]"></div>
				<p>Factorial - O(n!)</p>
			</button>

			<button
				onclick={() => playExample()}
				class="btn btn-error btn-sm flex gap-2"
			>
				<div class="text-yellow-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-5"
					>
						<path
							fill-rule="evenodd"
							d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<p>Play Predefined Example</p>
			</button>
		</div>

		<div class="flex w-4/12 items-center gap-4">
			<!-- Divider horizontal -->
			<div class="divider divider-horizontal"></div>

			<!-- Plot N Input -->
			<div class="form-control w-full max-w-xs">
				<input
					type="number"
					id="plot-input"
					placeholder="input desired 'n' and press Enter"
					class="input-bordered input w-full max-w-xs"
					bind:value={inputValue}
					onkeyup={(e) => {
						if (e.key === "Enter") calculate();
					}}
				/>

				<!-- Label Input -->
				<label class="label" for="plot-input">
					<span class="label-text-alt text-xs">
						{#if activeTitle == BIGO_TITLE.ADD_UP_TO_LOOP}
							Approximately {inputValue} Ops
						{:else if activeTitle == BIGO_TITLE.ADD_UP_TO_MATH}
							Approximately 1 Ops
						{:else if activeTitle == BIGO_TITLE.ARRAY_OF_PAIRS}
							Approximately {inputValue ** 2} Ops
						{:else if activeTitle == BIGO_TITLE.CUBIC_LOOP}
							Approximately {inputValue ** 3} Ops
						{:else if activeTitle == BIGO_TITLE.COUNT_DIGITS}
							Approximately {logValue} Ops
						{:else if activeTitle == BIGO_TITLE.RECURSIVE_LOG_SUM}
							Approximately {nlognValue} Ops
						{:else if activeTitle == BIGO_TITLE.RECURSIVE_FIB}
							Approximately {2 ** inputValue} Ops
						{:else if activeTitle == BIGO_TITLE.FACTORIAL}
							Approximately {factorialValue} Ops
						{/if}
					</span>
				</label>
			</div>

			<div class="flex items-center ml-4 gap-4">
				<!-- Spinner -->
				{#if loading}
					<Spinner />
				{/if}
			</div>
		</div>
	</section>

	{#if loading || data.length}
		<div class="min-h-8 flex gap-2 px-12">
			<!-- Reset data button -->
			{#if data.length}
				<button
					onclick={reset}
					class="group btn btn-error btn-ghost btn-sm flex gap-2 px-4 normal-case"
					transition:fade
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 group-hover:animate-spin"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>

					<p>Reset Data</p>
				</button>
			{/if}

			{#if loading}
				<button
					onclick={abort}
					class="group btn btn-error btn-ghost btn-sm flex gap-2 px-4 normal-case"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 group-hover:animate-ping"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
							clip-rule="evenodd"
						/>
					</svg>

					<p>Abort Process</p>
				</button>
			{/if}
		</div>
		<!-- content here -->
	{/if}

	<section
		class="my-2 mx-2 md:mx-4 flex flex-col-reverse justify-between gap-6 mb-24"
	>
		<!-- CODE HIGHLIGHTING -->
		<div class="flex-1 px-12">
			<div id="code-preview" class="mockup-code w-full bg-[#011627]">
				<Highlighter code={activeCode.code.trim()} />
			</div>
		</div>

		<div class="flex flex-col lg:flex-row">
			<!-- CHART -->
			<div class="w-full">
				<BigOChart {data} {activeTitle} />
			</div>

			<div class="w-full">
				<BigOOutputChart {data} {activeTitle} />
			</div>
		</div>
	</section>
</main>
