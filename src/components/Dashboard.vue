<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="bg-white shadow rounded-lg p-4">
      <h3 class="text-lg font-medium text-gray-900">Total Registrations</h3>
      <p class="mt-2 text-3xl font-bold text-gray-900">{{ totalRegistrations }}</p>
      <div class="mt-4 flex items-center text-sm font-medium text-green-600">
        <span>{{ soloRegistrations }} Solo</span>
        <span class="mx-2">•</span>
        <span>{{ teamRegistrations }} Team</span>
      </div>
    </div>
    
    <div class="bg-white shadow rounded-lg p-4">
      <h3 class="text-lg font-medium text-gray-900">Registered Users</h3>
      <p class="mt-2 text-3xl font-bold text-gray-900">{{ totalUsers }}</p>
      <div class="mt-4 text-sm font-medium text-gray-500">
        Unique participants across all contests
      </div>
    </div>
    
    <div class="bg-white shadow rounded-lg p-4">
      <h3 class="text-lg font-medium text-gray-900">Registered Teams</h3>
      <p class="mt-2 text-3xl font-bold text-gray-900">{{ totalTeams }}</p>
      <div class="mt-4 text-sm font-medium text-gray-500">
        Unique teams across all contests
      </div>
    </div>
    
    <div class="bg-white shadow rounded-lg p-4">
      <h3 class="text-lg font-medium text-gray-900">Popular Contests</h3>
      <div class="mt-2 space-y-2">
        <div v-for="contest in popularContests" :key="contest.name" class="flex justify-between">
          <span class="text-sm font-medium text-gray-500">{{ contest.name }}</span>
          <span class="text-sm font-medium text-gray-900">{{ contest.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import rfetch from '~/utils/rfetch'

const totalRegistrations = ref(0)
const soloRegistrations = ref(0)
const teamRegistrations = ref(0)
const totalUsers = ref(0)
const totalTeams = ref(0)
const popularContests = ref([
  { name: 'Loading...', count: 0 }
])

onMounted(async () => {
  try {
    const stats = await rfetch('admin/stats')
    if (stats) {
      totalRegistrations.value = stats.total_registrations
      soloRegistrations.value = stats.solo_registrations
      teamRegistrations.value = stats.team_registrations
      totalUsers.value = stats.total_users
      totalTeams.value = stats.total_teams
      popularContests.value = stats.popular_contests
    }
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
    // Use mock data if API fails
    mockDashboardData()
  }
})

function mockDashboardData() {
  totalRegistrations.value = 156
  soloRegistrations.value = 98
  teamRegistrations.value = 58
  totalUsers.value = 124
  totalTeams.value = 32
  popularContests.value = [
    { name: 'Open Mic', count: 24 },
    { name: 'Treasure Hunt', count: 18 },
    { name: 'Oxford Union Debate', count: 15 },
    { name: 'Parichay', count: 12 }
  ]
}
</script>
