<script lang="ts">
	import { BIGO_TITLE, bigOMockupFunction } from "../data/big-o";
	import { WorkerManager } from "../services/worker";
	import { onDestroy } from "svelte";
	import Spinner from "../components/loading/Spinner.svelte";
	import Highlighter from "../components/Highlighter.svelte";
	import BigOChart from "../components/BigOChart.svelte";
	import MainNavbar from "../components/navbars/MainNavbar.svelte";

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

	// loading state
	let loading: boolean = $state(false);

	// these data is populated after
	// the corresponding function run
	let data: { title: string; x: number[]; y: number[] }[] = $state([]);

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

		worker.onmessage = function (
			event: MessageEvent<{ time: number; title: string }>,
		) {
			// update data according to the result
			// of the background thread.
			updateData(inputValue, event.data.time, event.data.title);

			// reset loading
			loading = false;
		};
	}

	function updateData(x: number, y: number, activeTitle: string): void {
		const i = data.findIndex((v) => v.title === activeTitle);
		const newValue = { title: activeTitle, x: [x], y: [y] };

		if (i === -1) {
			data.push(newValue);
		} else {
			data[i].x.push(x);
			data[i].y.push(y);
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
	<section class="flex w-full items-start justify-start py-8 px-6 lg:px-12">
		<!-- Big O Algo Lists -->
		<div class="flex flex-wrap justify-left gap-4">
			<!-- First algorithm -->
			<button
				onclick={() => changeActiveAlgo(BIGO_TITLE.ADD_UP_TO_LOOP)}
				class={`btn flex gap-2 ${
					activeTitle === BIGO_TITLE.ADD_UP_TO_LOOP
						? "btn-primary"
						: undefined
				}`}
			>
				<div class="h-3 w-3 bg-yellow-500"></div>
				AddUpTo - O(n)</button
			>

			<!-- Second algorithm -->
			<button
				onclick={() => changeActiveAlgo(BIGO_TITLE.ADD_UP_TO_MATH)}
				class={`btn flex gap-2 ${
					activeTitle === BIGO_TITLE.ADD_UP_TO_MATH
						? "btn-primary"
						: undefined
				}`}
			>
				<div class="h-3 w-3 bg-red-500"></div>
				AddUpTo - O(1)</button
			>

			<!-- Third algorithm -->
			<button
				onclick={() => changeActiveAlgo(BIGO_TITLE.ARRAY_OF_PAIRS)}
				class={`btn flex gap-2 ${
					activeTitle === BIGO_TITLE.ARRAY_OF_PAIRS
						? "btn-primary"
						: undefined
				}`}
			>
				<div class="h-3 w-3 bg-purple-500"></div>
				<p>
					Array of Pairs - O(n<sup>2</sup>)
				</p>
			</button>

			<!-- Fourth algorithm -->
			<button
				onclick={() => changeActiveAlgo(BIGO_TITLE.FACTORIAL)}
				class="btn flex gap-2 {activeTitle === BIGO_TITLE.FACTORIAL
					? 'btn-primary'
					: undefined}"
			>
				<div class="h-3 w-3 bg-orange-500"></div>
				<p>Factorial - O(n!)</p>
			</button>
		</div>

		<!-- Divider horizontal -->
		<div class="divider divider-horizontal"></div>

		<div class="flex items-center gap-4">
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
					<span class="label-text-alt"
						>{activeTitle === BIGO_TITLE.ADD_UP_TO_LOOP &&
						inputValue >= 1000000000000
							? "Did you know that 1 trillion loop takes approximately 4 hours to complete? 😳"
							: ""}
					</span>
				</label>
			</div>

			<!-- Spinner -->
			{#if loading}
				<Spinner />
			{/if}
		</div>
	</section>

	{#if loading || data.length}
		<div class="min-h-8 flex gap-2 px-12">
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

			<!-- Reset data button -->
			{#if data.length}
				<button
					onclick={reset}
					class="group btn btn-error btn-ghost btn-sm flex gap-2 px-4 normal-case"
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
		</div>
		<!-- content here -->
	{/if}

	<section
		class="my-2 mx-2 md:mx-10 flex flex-col lg:flex-row justify-between gap-8"
	>
		<!-- CODE HIGHLIGHTING -->
		<div class="flex-1">
			<div id="code-preview" class="mockup-code w-full bg-[#011627]">
				<Highlighter code={activeCode.code.trim()} />
			</div>
		</div>

		<!-- CHART -->
		<div class="flex-1">
			<BigOChart {data} {activeTitle} />
		</div>
	</section>
</main>
