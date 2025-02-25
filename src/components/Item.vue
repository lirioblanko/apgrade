<template>
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 2rem;
  height: 2rem;
  color: var(--color-text);
}

</style>
