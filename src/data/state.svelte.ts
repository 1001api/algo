export let sortData = $state<{ data: number[] }>({ data: [] });
export let timeout = $state<{ data: ReturnType<typeof setTimeout>[] }>({ data: [] });

export function resetData() {
	sortData.data = [];
}

export function resetTimeout() {
	timeout.data = [];
}
