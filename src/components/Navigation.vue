`<template>
  <nav class="navigation">
    <router-link to="/" class="nav-link">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span>Characters</span>
    </router-link>

    <router-link to="/locations" class="nav-link">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <span>Locations</span>
    </router-link>

    <router-link to="/episodes" class="nav-link">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
      <span>Episodes</span>
    </router-link>
  </nav>
</template>

<style scoped>
.navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  z-index: 100;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link svg {
  width: 24px;
  height: 24px;
}

.nav-link span {
  font-size: 0.9rem;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #90e0ef;
}

@media (min-width: 768px) {
  .navigation {
    top: 0;
    bottom: auto;
    padding: 1.5rem;
  }

  .nav-link {
    flex-direction: row;
    gap: 0.75rem;
  }

  .nav-link span {
    font-size: 1rem;
  }
}
</style>`
