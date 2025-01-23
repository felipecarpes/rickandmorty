<template>
  <div class="loading">
    <div class="portal-container">
      <div class="portal-ring"></div>
      <div class="portal-ring-2"></div>
      <div class="portal-energy"></div>
      <img src="/rickandmortyportalload.png" class="loader" alt="Loading..." />
      <div class="portal-particles">
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
      </div>
    </div>
    <div class="portal-text">Opening Portal<span>.</span><span>.</span><span>.</span></div>
  </div>
</template>

<script setup lang="ts">
// Enhanced Rick and Morty themed portal loader
</script>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;
  position: relative;
  perspective: 1000px;
}

.portal-container {
  position: relative;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  animation: portalFloat 6s ease-in-out infinite;
}

.portal-ring, .portal-ring-2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
}

.portal-ring {
  width: 220px;
  height: 220px;
  border: 4px solid #61E391;
  box-shadow: 
    0 0 20px #61E391,
    inset 0 0 20px #61E391;
  animation: ringRotate 8s linear infinite;
}

.portal-ring-2 {
  width: 240px;
  height: 240px;
  border: 4px solid #48E4EE;
  box-shadow: 
    0 0 20px #48E4EE,
    inset 0 0 20px #48E4EE;
  animation: ringRotate 12s linear infinite reverse;
}

.portal-energy {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 190px;
  height: 190px;
  background: radial-gradient(circle at center,
    rgba(97, 227, 145, 0.2) 0%,
    rgba(72, 228, 238, 0.2) 50%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(10px);
  animation: energyPulse 4s ease-in-out infinite;
}

.portal-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: particlesRotate 20s linear infinite;
}

.portal-particles span {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #61E391;
  border-radius: 50%;
  box-shadow: 0 0 10px #61E391;
}

.portal-particles span:nth-child(3n) {
  background: #48E4EE;
  box-shadow: 0 0 10px #48E4EE;
}

.portal-particles span:nth-child(1) { top: 20%; left: 20%; animation: particleFloat 3s ease-in-out infinite; }
.portal-particles span:nth-child(2) { top: 60%; left: 80%; animation: particleFloat 4s ease-in-out infinite 0.5s; }
.portal-particles span:nth-child(3) { top: 80%; left: 40%; animation: particleFloat 3.5s ease-in-out infinite 1s; }
.portal-particles span:nth-child(4) { top: 40%; left: 60%; animation: particleFloat 4.5s ease-in-out infinite 1.5s; }
.portal-particles span:nth-child(5) { top: 30%; left: 70%; animation: particleFloat 4s ease-in-out infinite 2s; }
.portal-particles span:nth-child(6) { top: 70%; left: 30%; animation: particleFloat 3s ease-in-out infinite 2.5s; }
.portal-particles span:nth-child(7) { top: 50%; left: 50%; animation: particleFloat 4.5s ease-in-out infinite 3s; }
.portal-particles span:nth-child(8) { top: 25%; left: 75%; animation: particleFloat 3.5s ease-in-out infinite 3.5s; }
.portal-particles span:nth-child(9) { top: 75%; left: 25%; animation: particleFloat 4s ease-in-out infinite 4s; }

.portal-text {
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #61E391;
  text-shadow: 0 0 10px #61E391;
  letter-spacing: 2px;
}

.portal-text span {
  display: inline-block;
  animation: dotPulse 1.4s ease-in-out infinite;
}

.portal-text span:nth-child(2) {
  animation-delay: 0.2s;
}

.portal-text span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes portalFloat {
  0%, 100% { transform: translateY(-10px) rotateX(5deg); }
  50% { transform: translateY(10px) rotateX(-5deg); }
}

@keyframes ringRotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes energyPulse {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.5;
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.8;
  }
}

@keyframes particlesRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes particleFloat {
  0%, 100% { 
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }
  50% { 
    transform: scale(1.5) translate(10px, -10px);
    opacity: 0.5;
  }
}

@keyframes dotPulse {
  0%, 100% { 
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% { 
    opacity: 1;
    transform: scale(1.2);
  }
}

@media (max-width: 768px) {
  .portal-container {
    width: 160px;
    height: 160px;
  }

  .portal-ring {
    width: 180px;
    height: 180px;
  }

  .portal-ring-2 {
    width: 200px;
    height: 200px;
  }

  .portal-energy {
    width: 150px;
    height: 150px;
  }

  .portal-text {
    font-size: 1rem;
  }
}
</style>
