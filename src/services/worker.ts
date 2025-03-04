import type { WorkerMessage } from "./background";
const worker = await import("./background?worker");

export class WorkerManager {
	private worker: Worker | null = null;

	async initWorker(messageData: WorkerMessage): Promise<Worker> {
		try {
			this.worker = new worker.default();
			this.worker.postMessage(messageData);
			return this.worker;
		} catch (error) {
			console.error("Failed to initialize worker:", error);
			throw error;
		}
	}

	terminateWorker(): void {
		if (this.worker) {
			this.worker.terminate();
			this.worker = null;
		}
	}
}
