<template>
  <svg
    class="svg-icon"
    aria-hidden="true"
  >
    <use
      :xlink:href="`#icon-${name}`"
      :fill="color"
    />
  </svg>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  }
})
</script>

<style lang="less" scoped>
.svg-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  overflow: hidden;
  vertical-align: middle;
}
</style>
