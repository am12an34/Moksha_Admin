<template>
  <BaseButton 
    :disabled="disabled" 
    :loading="loading" 
    @click="exportData"
    class="flex items-center gap-2"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
    Export {{ format }}
  </BaseButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  filename: {
    type: String,
    default: 'export'
  },
  format: {
    type: String,
    default: 'CSV',
    validator: (value: string) => ['CSV', 'JSON'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const loading = ref(false)

function exportData() {
  if (props.disabled || props.data.length === 0) return
  
  loading.value = true
  
  try {
    let content: string
    let mimeType: string
    let extension: string
    
    if (props.format === 'JSON') {
      content = JSON.stringify(props.data, null, 2)
      mimeType = 'application/json'
      extension = 'json'
    } else {
      // CSV format
      const headers = Object.keys(props.data[0]).join(',')
      const rows = props.data.map(item => 
        Object.values(item).map(value => 
          typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
        ).join(',')
      )
      content = [headers, ...rows].join('\n')
      mimeType = 'text/csv'
      extension = 'csv'
    }
    
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    
    link.href = url
    link.download = `${props.filename}.${extension}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
  } catch (error) {
    console.error('Export failed:', error)
    alert('Export failed. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>
