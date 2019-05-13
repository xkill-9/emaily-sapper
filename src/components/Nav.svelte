<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";

  export let segment;

  const { session } = stores();
  let AddCreditsButton;

  onMount(async () => {
    const module = await import("./AddCreditsButton.v2.svelte");
    AddCreditsButton = module.default;
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
              <svelte:component this={AddCreditsButton} />
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
