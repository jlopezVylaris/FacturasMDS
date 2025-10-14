<template>
  <component 
    :is="componentType"
    :to="to"
    :href="href"
    :class="itemClasses"
    :style="itemStyle"
    class="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
  >
    <div class="flex items-center space-x-3">
      <!-- Icon -->
      <div :class="iconContainerClasses" :style="iconStyle">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="getIconSvg"></svg>
      </div>
      
      <!-- Label -->
      <span :style="labelStyle" class="whitespace-nowrap">{{ label }}</span>
    </div>

    <!-- Badge -->
    <span 
      v-if="badge" 
      class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-rose-500 rounded-full"
    >
      {{ badge }}
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

// Props
const props = defineProps({
  to: {
    type: [String, Object],
    default: null
  },
  href: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  badge: {
    type: [String, Number],
    default: null
  }
})

// Computed
const componentType = computed(() => {
  if (props.to) return RouterLink
  return 'a'
})

const itemClasses = computed(() => {
  if (props.isActive) {
    return 'shadow-lg'
  }
  return 'transition-colors duration-200'
})

const itemStyle = computed(() => {
  if (props.isActive) {
    return {
      backgroundColor: '#00A64C',
      color: '#FFFFFF'
    }
  }
  return {
    color: '#B0B9C7'
  }
})

const iconContainerClasses = computed(() => {
  return 'flex items-center justify-center w-6 h-6 rounded-md transition-colors duration-200'
})

const iconStyle = computed(() => {
  if (props.isActive) {
    return {
      backgroundColor: 'rgba(255,255,255,0.2)',
      color: '#FFFFFF'
    }
  }
  return {
    color: '#7A7A7A'
  }
})

const labelStyle = computed(() => {
  if (props.isActive) {
    return {
      color: '#FFFFFF',
      fontWeight: '600'
    }
  }
  return {
    color: '#B0B9C7'
  }
})

const getIconSvg = computed(() => {
  const iconMap = {
    dashboard: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v4m8-4v4"></path>`,
    
    invoice: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>`,
    
    'plus-invoice': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>`,
    
    client: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>`,
    
    product: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>`,
    
    payment: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>`,
    
    'plus-payment': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2z"></path>`,
    
    pending: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>`,
    
    analytics: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>`,
    
    report: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>`,
    
    export: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>`,
    
    settings: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>`,
    
    user: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>`,
    
    help: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>`
  }
  return iconMap[props.icon] || iconMap.dashboard
})

// Methods
const handleMouseOver = (event) => {
  if (!props.isActive) {
    event.target.style.backgroundColor = 'rgba(255,255,255,0.05)'
    event.target.style.color = '#FFFFFF'
  }
}

const handleMouseOut = (event) => {
  if (!props.isActive) {
    event.target.style.backgroundColor = 'transparent'
    event.target.style.color = '#B0B9C7'
  }
}
</script>

<style scoped>
/* Estilos específicos del sidebar item si son necesarios */
</style>
