<script lang="ts">
  interface IDrawerData {
    id: number;
    title: string;
    path: string;
  }

  const drawerData: IDrawerData[] = [
    {
      id: 0,
      title: "Big O Notation",
      path: "/",
    },
    {
      id: 1,
      title: "Sorting Algorithm",
      path: "/sort",
    },
    {
      id: 2,
      title: "Path Finding Algorithm",
      path: "/path-finding",
    },
  ];

  interface Props {
    activeIndex: number;
  }

  let { activeIndex }: Props = $props();
</script>

<div class="navbar p-0 px-4 lg:px-10 bg-gray-700 shadow-sm">
  <div class="hidden md:flex md:flex-1">
    <a href="/" class="font-bold text-xl"
      >Algo<span class="text-amber-500">V</span></a
    >
  </div>
  <div class="flex-none">
    <ul class="flex gap-2">
      {#each drawerData as v (v.id)}
        <li>
          <a
            href={v.path}
            class={`menu text-xs hover:bg-base-100 w-full ${activeIndex === v.id ? "bg-base-200" : ""}`}
            >{v.title}</a
          >
        </li>
      {/each}
    </ul>
  </div>
</div>
