<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";

  export let segment;

  const { session } = stores();
  let AddCreditsButtonV3;
  let AddCreditsButtonV2;

  onMount(async () => {
    const [moduleV2, moduleV3] = await Promise.all([
      import("./AddCreditsButton.v2.svelte"),
      import("./AddCreditsButton.v3.svelte")
    ]);
    AddCreditsButtonV2 = moduleV2.default;
    AddCreditsButtonV3 = moduleV3.default;
  });
</script>

<nav>
  <div class="nav-wrapper">
    <div class="row">
      <div class="col s12">
        <a class="brand-logo" href={$session ? '/surveys' : '/'}>
          <i class="material-icons">email</i>
          Emaily
        </a>
        <ul class="right">
          {#if $session}
            <li>
              <svelte:component this={AddCreditsButtonV2} />
            </li>
            <li>
              <svelte:component this={AddCreditsButtonV3} />
            </li>
            <li>
              <a href="javascript:void(0)">
                <i class="material-icons left">attach_money</i>
                Credits: {$session.user.credits}
              </a>
            </li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          {:else}
            <li>
              <a href="/auth/google">Login With Google</a>
            </li>
          {/if}
        </ul>
      </div>
    </div>
  </div>
</nav>
