export const FAMILY_MEMBERS = ['Mom', 'Dad', 'Kid 1', 'Kid 2', 'Unassigned']

export const ROOMS = [
  {
    id: 'bedroom1',
    name: 'Bedroom 1',
    emoji: '🛏️',
    color: '#FF6B9D',
    gradient: 'linear-gradient(135deg, #FF6B9D, #C44569)',
    tasks: [
      { id: 'b1_1', text: 'Make the bed', points: 10 },
      { id: 'b1_2', text: 'Put away clothes', points: 10 },
      { id: 'b1_3', text: 'Dust surfaces', points: 10 },
      { id: 'b1_4', text: 'Vacuum floor', points: 15 },
      { id: 'b1_5', text: 'Empty trash', points: 5 },
      { id: 'b1_6', text: 'Clean mirrors', points: 10 },
      { id: 'b1_7', text: 'Organize nightstand', points: 5 },
    ]
  },
  {
    id: 'bedroom2',
    name: 'Bedroom 2',
    emoji: '🌙',
    color: '#A78BFA',
    gradient: 'linear-gradient(135deg, #A78BFA, #7C3AED)',
    tasks: [
      { id: 'b2_1', text: 'Make the bed', points: 10 },
      { id: 'b2_2', text: 'Put away clothes', points: 10 },
      { id: 'b2_3', text: 'Dust surfaces', points: 10 },
      { id: 'b2_4', text: 'Vacuum floor', points: 15 },
      { id: 'b2_5', text: 'Empty trash', points: 5 },
      { id: 'b2_6', text: 'Clean mirrors', points: 10 },
      { id: 'b2_7', text: 'Organize dresser top', points: 5 },
    ]
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    emoji: '🚿',
    color: '#34D399',
    gradient: 'linear-gradient(135deg, #34D399, #059669)',
    tasks: [
      { id: 'ba_1', text: 'Scrub toilet', points: 15 },
      { id: 'ba_2', text: 'Clean sink & faucet', points: 10 },
      { id: 'ba_3', text: 'Scrub shower/tub', points: 20 },
      { id: 'ba_4', text: 'Wipe mirrors', points: 10 },
      { id: 'ba_5', text: 'Mop floor', points: 15 },
      { id: 'ba_6', text: 'Replace towels', points: 5 },
      { id: 'ba_7', text: 'Restock supplies', points: 5 },
      { id: 'ba_8', text: 'Empty trash', points: 5 },
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    emoji: '🍳',
    color: '#FBBF24',
    gradient: 'linear-gradient(135deg, #FBBF24, #D97706)',
    tasks: [
      { id: 'k_1', text: 'Wash dishes / run dishwasher', points: 15 },
      { id: 'k_2', text: 'Wipe down counters', points: 10 },
      { id: 'k_3', text: 'Clean stovetop', points: 15 },
      { id: 'k_4', text: 'Wipe outside of appliances', points: 10 },
      { id: 'k_5', text: 'Sweep & mop floor', points: 15 },
      { id: 'k_6', text: 'Take out trash', points: 10 },
      { id: 'k_7', text: 'Wipe inside microwave', points: 10 },
      { id: 'k_8', text: 'Organize pantry shelf', points: 10 },
    ]
  },
  {
    id: 'livingroom',
    name: 'Living Room',
    emoji: '🛋️',
    color: '#60A5FA',
    gradient: 'linear-gradient(135deg, #60A5FA, #2563EB)',
    tasks: [
      { id: 'l_1', text: 'Vacuum/sweep floor', points: 15 },
      { id: 'l_2', text: 'Dust surfaces & shelves', points: 10 },
      { id: 'l_3', text: 'Fluff & arrange pillows', points: 5 },
      { id: 'l_4', text: 'Wipe down TV & remotes', points: 5 },
      { id: 'l_5', text: 'Tidy magazines & books', points: 5 },
      { id: 'l_6', text: 'Clean windows/blinds', points: 15 },
      { id: 'l_7', text: 'Straighten decor', points: 5 },
    ]
  },
  {
    id: 'toyarea',
    name: "Kids' Toy Area",
    emoji: '🧸',
    color: '#F472B6',
    gradient: 'linear-gradient(135deg, #F472B6, #DB2777)',
    tasks: [
      { id: 't_1', text: 'Sort & bin all toys', points: 15 },
      { id: 't_2', text: 'Vacuum/sweep floor', points: 10 },
      { id: 't_3', text: 'Wipe down toy bins', points: 10 },
      { id: 't_4', text: 'Organize bookshelf', points: 10 },
      { id: 't_5', text: 'Discard broken toys', points: 5 },
      { id: 't_6', text: 'Wipe play table/surface', points: 10 },
    ]
  }
]

export const KIDS_CHORE_PRESETS = [
  { text: 'Feed the pet', points: 10 },
  { text: 'Set the dinner table', points: 8 },
  { text: 'Clear the dinner table', points: 8 },
  { text: 'Take out the trash', points: 10 },
  { text: 'Sort & fold laundry', points: 12 },
  { text: 'Sweep the porch', points: 10 },
  { text: 'Water the plants', points: 8 },
  { text: 'Pack school bag', points: 5 },
  { text: 'Make own lunch', points: 10 },
  { text: 'Unload dishwasher', points: 10 },
  { text: 'Wipe bathroom sink', points: 8 },
  { text: 'Vacuum one room', points: 12 },
  { text: 'Put away shoes & backpack', points: 5 },
  { text: 'Help with grocery bags', points: 8 },
  { text: 'Clean up after the pet', points: 10 },
]

export const DEFAULT_REWARDS = [
  { id: 'r1', name: '🍦 Ice Cream Trip', pointsRequired: 100, tier: 'small', claimed: false },
  { id: 'r2', name: '🎮 Extra Screen Time', pointsRequired: 75, tier: 'small', claimed: false },
  { id: 'r3', name: '🎬 Movie Night', pointsRequired: 150, tier: 'small', claimed: false },
  { id: 'r4', name: '🍕 Pizza Night', pointsRequired: 200, tier: 'small', claimed: false },
  { id: 'r5', name: '🎳 Bowling Night', pointsRequired: 350, tier: 'small', claimed: false },
  { id: 'r6', name: '🏖️ Beach Day', pointsRequired: 600, tier: 'big', claimed: false },
  { id: 'r7', name: '🎡 Amusement Park', pointsRequired: 1000, tier: 'big', claimed: false },
  { id: 'r8', name: '✈️ Family Vacation', pointsRequired: 3000, tier: 'big', claimed: false },
]