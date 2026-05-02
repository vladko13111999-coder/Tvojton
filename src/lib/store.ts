import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

export interface Clip {
  id: string
  start: number
  end: number
  thumbnail?: string
  name?: string
}

export interface VideoState {
  video: {
    id: string
    file: File
    preview: string
    duration: number
    name: string
    size: number
  } | null
  clips: Clip[]
  selectedClipId: string | null
  processing: boolean
  exportProgress: number
}

export interface UserState {
  plan: 'free' | 'basic' | 'pro'
  clipsUsed: number
  clipsLimit: number
  hasWatermark: boolean
}

export interface SettingsState {
  format: '9:16' | '16:9' | '1:1'
  quality: '720p' | '1080p' | '4k'
  autoGenerate: boolean
}

interface AppStore {
  video: VideoState['video']
  clips: Clip[]
  selectedClipId: string | null
  processing: boolean
  exportProgress: number
  userPlan: UserState['plan']
  clipsUsed: number
  clipsLimit: number
  settings: SettingsState
  
  setVideo: (video: VideoState['video']) => void
  clearVideo: () => void
  
  addClip: (start?: number, end?: number) => void
  removeClip: (id: string) => void
  updateClip: (id: string, start: number, end: number) => void
  selectClip: (id: string | null) => void
  
  generateAutoClips: (duration: number) => void
  generateRandomClips: (duration: number, count?: number) => void
  
  setProcessing: (processing: boolean) => void
  setExportProgress: (progress: number) => void
  
  setFormat: (format: SettingsState['format']) => void
  setQuality: (quality: SettingsState['quality']) => void
  setAutoGenerate: (auto: boolean) => void
  
  checkAndIncrementUsage: () => boolean
  canExport: () => boolean
}

export const useAppStore = create<AppStore>((set, get) => ({
  video: null,
  clips: [],
  selectedClipId: null,
  processing: false,
  exportProgress: 0,
  userPlan: 'free',
  clipsUsed: 0,
  clipsLimit: 3,
  settings: {
    format: '9:16',
    quality: '720p',
    autoGenerate: true,
  },
  
  setVideo: (video) => set({ video }),
  clearVideo: () => set({ video: null, clips: [], selectedClipId: null }),
  
  addClip: (start = 0, end = 30) => set((state) => ({
    clips: [...state.clips, {
      id: uuidv4(),
      start,
      end,
      name: `Klip ${state.clips.length + 1}`
    }]
  })),
  
  removeClip: (id) => set((state) => ({
    clips: state.clips.filter(c => c.id !== id),
    selectedClipId: state.selectedClipId === id ? null : state.selectedClipId
  })),
  
  updateClip: (id, start, end) => set((state) => ({
    clips: state.clips.map(c => 
      c.id === id ? { ...c, start, end } : c
    )
  })),
  
  selectClip: (id) => set({ selectedClipId: id }),
  
  generateAutoClips: (duration) => {
    const { settings } = get()
    const clipLength = settings.quality === '4k' ? 30 : 45
    const maxClips = Math.min(Math.floor(duration / clipLength), get().clipsLimit)
    
    const clips: Clip[] = []
    for (let i = 0; i < maxClips; i++) {
      clips.push({
        id: uuidv4(),
        start: i * clipLength,
        end: Math.min((i + 1) * clipLength, duration),
        name: `Klip ${i + 1}`
      })
    }
    
    set({ clips })
  },
  
  generateRandomClips: (duration, count = 5) => {
    const clips: Clip[] = []
    const minLen = 15, maxLen = 45
    
    for (let i = 0; i < count; i++) {
      const len = minLen + Math.random() * (maxLen - minLen)
      const maxStart = duration - len
      const start = maxStart > 0 ? Math.random() * maxStart : 0
      
      clips.push({
        id: uuidv4(),
        start: Math.floor(start),
        end: Math.floor(start + len),
        name: ` Náhodný klip ${i + 1}`
      })
    }
    
    set({ clips: clips.sort((a, b) => a.start - b.start) })
  },
  
  setProcessing: (processing) => set({ processing }),
  setExportProgress: (exportProgress) => set({ exportProgress }),
  
  setFormat: (format) => set((state) => ({
    settings: { ...state.settings, format }
  })),
  
  setQuality: (quality) => set((state) => ({
    settings: { ...state.settings, quality }
  })),
  
  setAutoGenerate: (autoGenerate) => set((state) => ({
    settings: { ...state.settings, autoGenerate }
  })),
  
  checkAndIncrementUsage: () => {
    const { clipsUsed, clipsLimit } = get()
    if (clipsUsed >= clipsLimit) return false
    set({ clipsUsed: clipsUsed + 1 })
    return true
  },
  
  canExport: () => {
    const { clipsUsed, clipsLimit } = get()
    return clipsUsed < clipsLimit
  }
}))