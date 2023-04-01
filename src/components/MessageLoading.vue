<template>
<div class="loader">
  <div class="loader-dot"></div>
  <div class="loader-dot"></div>
  <div class="loader-dot"></div>
</div>
</template>
<style>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #0078D7;
  margin: 0 10px;
  animation: loader-animation 1.5s ease-in-out infinite;
}

.loader-dot:nth-child(2) {
  animation-delay: 0.25s;
}

.loader-dot:nth-child(3) {
  animation-delay: 0.5s;
}

@keyframes loader-animation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
