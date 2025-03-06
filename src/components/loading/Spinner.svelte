<script>
    import { fade } from "svelte/transition";
</script>

<div class="flex items-center gap-2" transition:fade={{ duration: 100 }}>
    <div class="flex animate-spin items-center justify-center gap-1">
        <div class="h-1 w-1 rounded-full bg-white"></div>
        <div class="h-2 w-2 rounded-full bg-yellow-200"></div>
        <div class="h-1 w-1 rounded-full bg-white"></div>
    </div>
</div>
