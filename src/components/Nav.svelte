<script>
  import { stores } from "@sapper/app";
  const { session } = stores();
  export let segment;
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
            <li class={segment === 'surveys' ? 'active' : ''}>
              <a href="/surveys">Surveys</a>
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
