<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Solo Registrations ({{ registeredUsers.length }})</h2>
      <div class="flex space-x-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <ExportButton
          :data="registeredUsers"
          filename="solo-registrations"
          format="CSV"
          :disabled="registeredUsers.length === 0"
        />
      </div>
    </div>

    <div class="overflow-x-auto">
      <div class="inline-block min-w-full py-2 align-middle px-1">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <caption class="sr-only">
              Table for displaying the data of user registrations for the selected category of contest.
            </caption>

            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  <button @click="sortBy('name')" class="flex items-center">
                    Name
                    <span v-if="sortColumn === 'name'" class="ml-1">
                      {{ sortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </button>
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  <button @click="sortBy('tag')" class="flex items-center">
                    User ID
                    <span v-if="sortColumn === 'tag'" class="ml-1">
                      {{ sortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </button>
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  <button @click="sortBy('institution')" class="flex items-center">
                    Institution
                    <span v-if="sortColumn === 'institution'" class="ml-1">
                      {{ sortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </button>
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  <button @click="sortBy('email')" class="flex items-center">
                    Email
                    <span v-if="sortColumn === 'email'" class="ml-1">
                      {{ sortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </button>
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  <button @click="sortBy('phone_no')" class="flex items-center">
                    Phone
                    <span v-if="sortColumn === 'phone_no'" class="ml-1">
                      {{ sortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </button>
                </th>
                <th scope="col" class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="user in filteredUsers" :key="user.email">
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {{ user.first_name }} {{ user.last_name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {{ user.tag }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {{ user.institution }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {{ user.email }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {{ user.phone_no }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">
                  <button
                    @click="copyToClipboard(`${user.first_name} ${user.last_name}, ${user.email}, ${user.phone_no}`)"
                    class="text-gray-500 hover:text-gray-700 mr-2"
                    title="Copy contact info"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    @click="sendEmail(user.email)"
                    class="text-blue-500 hover:text-blue-700 mr-2"
                    title="Send email"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </td>
              </tr>
              <tr v-if="filteredUsers.length === 0">
                <td colspan="6" class="px-3 py-4 text-sm text-gray-500 text-center">
                  No results found for "{{ searchQuery }}"
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
import type { User } from '~/types'
import ExportButton from './ExportButton.vue'

const props = defineProps({
  registeredUsers: {
    type: Array as PropType<User[]>,
    required: true,
  },
})

const searchQuery = ref('')
const sortColumn = ref('name')
const sortDirection = ref('asc')

const filteredUsers = computed(() => {
  let result = [...props.registeredUsers]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.institution.toLowerCase().includes(query) ||
      user.tag.toLowerCase().includes(query) ||
      user.phone_no.includes(query)
    )
  }

  // Apply sorting
  result.sort((a, b) => {
    let valueA, valueB

    if (sortColumn.value === 'name') {
      valueA = `${a.first_name} ${a.last_name}`.toLowerCase()
      valueB = `${b.first_name} ${b.last_name}`.toLowerCase()
    } else {
      valueA = a[sortColumn.value as keyof User]?.toString().toLowerCase() || ''
      valueB = b[sortColumn.value as keyof User]?.toString().toLowerCase() || ''
    }

    if (sortDirection.value === 'asc') {
      return valueA.localeCompare(valueB)
    } else {
      return valueB.localeCompare(valueA)
    }
  })

  return result
})

function sortBy(column: string) {
  if (sortColumn.value === column) {
    // Toggle direction if clicking the same column
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    // Set new column and default to ascending
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('Contact information copied to clipboard!')
    })
    .catch(err => {
      console.error('Failed to copy text: ', err)
    })
}

function sendEmail(email: string) {
  window.location.href = `mailto:${email}`
}
</script>
