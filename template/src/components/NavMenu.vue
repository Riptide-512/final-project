<template>
  <nav class="flex justify-center gap-4">
    <RouterLink
      to="/"
      class="hover:underline hover:underline-offset-4 [&.router-link-active]:underline [&.router-link-active]:underline-offset-4"
    >
      Home
    </RouterLink>
    <RouterLink
      to="/other"
      class="hover:underline hover:underline-offset-4 [&.router-link-active]:underline [&.router-link-active]:underline-offset-4"
    >
      About page
    </RouterLink>
    <RouterLink
      to="/services"
      class="hover:underline hover:underline-offset-4 [&.router-link-active]:underline [&.router-link-active]:underline-offset-4"
    >
      Services
    </RouterLink>
    <RouterLink
      to="/reviews"
      class="hover:underline hover:underline-offset-4 [&.router-link-active]:underline [&.router-link-active]:underline-offset-4"
    >
      Reviews
    </RouterLink>
  </nav>
</template>