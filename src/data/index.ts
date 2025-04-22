import type { Club, SelectMenuItem } from '~/types'

type ContestTypeSlug = 'solo' | 'team'

export const contestTypes: SelectMenuItem<ContestTypeSlug>[] = [
  { name: 'Solo', slug: 'solo' },
  { name: 'Duo or Team', slug: 'team' },
]

export const clubs: SelectMenuItem<Club>[] = [
  { name: 'NLC', slug: 'nlc' },
  { name: 'Malhar', slug: 'malhar' },
  { name: 'Dzire', slug: 'dzire' },
  { name: 'Aaveg', slug: 'aaveg' },
  { name: 'Fine Arts', slug: 'fine-arts' },
  { name: 'Pixels', slug: 'pixels' },
  { name: 'Wecan', slug: 'wecan' },
  { name: 'Collabs', slug: 'collabs' },
]

export const contests = Object.freeze<Record<Club, Record<ContestTypeSlug, SelectMenuItem[]>>>({
  nlc: {
    solo: [
      { name: 'Group Discussion', slug: 'plot-twist' },
      { name: 'Open Mic', slug: 'open-mic' },
      { name: 'Political Opinion', slug: 'political-opinion-article' },
    ],
    team: [
      { name: 'Open Council Debate', slug: 'oxford-union-debate' },
      { name: 'Treasure Hunt', slug: 'treasure-hunt' },
    ],
  },
  malhar: {
    solo: [
      { name: 'Mystic Mic', slug: 'Mystic Mic' },
      { name: 'Melody War', slug: 'Melody War' },
      { name: 'Verse Clash', slug: 'Verse Clash' },
    ],
    team: [
      { name: 'Harmony Showdown', slug: 'Harmony Showdown' },
      { name: 'BATTLE OF BANDS', slug: 'BATTLE OF BANDS' },
    ],
  },
  dzire: {
    solo: [
      { name: 'ETHERAL ECHOES', slug: 'etheral-echoes' },
      { name: 'GENESIS', slug: 'genesis' },
      { name: 'STREET DYNAMIX', slug: 'street-dynamix' },
    ],
    team: [
      { name: 'TWIN FLAMES', slug: 'twin-flames' },
      { name: 'COSMIC CLASH', slug: 'cosmic-clash' },
    ],
  },
  aaveg: {
    solo: [],
    team: [{ name: 'Rangmanch', slug: 'parichay' },
    { name: 'Ad Mockery', slug: 'ad-mockery-matchup' }],
  },
  'fine-arts': {
    solo: [
      { name: 'WEAR YOUR IMAGINATION', slug: 'wear-your-imagination' },
      { name: 'Face Pallete', slug: 'face-pallete' },
    ],
    team: [],
  },
  pixels: {
    solo: [
      { name: 'Reel Rush – The Moksha Experience', slug: 'reel-rush' },
      { name: 'Pixel Tales – Photo Storytelling', slug: 'pixel-tales' },
      { name: 'Tri-Lens – 3 Day Photography Challenge', slug: 'tri-lens' }
    ],
    team: [
      { name: 'Featured Realms', slug: 'featured-realms' },
      { name: 'Moksha Cinematica – 51 Hour Filmmaking Challenge', slug: 'moksha-cinematica' }
    ],
  },
  wecan: {
    solo: [],
    team: [],
  },
  collabs: {
    solo: [],
    team: [],
  },
  animystics: {
    solo: [],
    team: [],
  },
})
