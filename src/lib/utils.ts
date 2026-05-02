import { v4 as uuidv4 } from 'uuid'

export interface Clip {
  id: string
  start: number
  end: number
  thumbnail?: string
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
}

export function generateAutoClips(duration: number, clipLength: number = 30): Clip[] {
  const clips: Clip[] = []
  const maxClips = Math.min(Math.floor(duration / clipLength), 10)
  
  for (let i = 0; i < maxClips; i++) {
    clips.push({
      id: uuidv4(),
      start: i * clipLength,
      end: Math.min((i + 1) * clipLength, duration),
    })
  }
  
  return clips
}

export function generateRandomClips(duration: number, numClips: number = 5, minLength: number = 15, maxLength: number = 45): Clip[] {
  const clips: Clip[] = []
  
  for (let i = 0; i < numClips; i++) {
    const clipDuration = minLength + Math.random() * (maxLength - minLength)
    const maxStart = duration - clipDuration
    const start = maxStart > 0 ? Math.random() * maxStart : 0
    
    clips.push({
      id: uuidv4(),
      start: Math.floor(start),
      end: Math.floor(start + clipDuration),
    })
  }
  
  return clips.sort((a, b) => a.start - b.start)
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${Math.floor(seconds)}s`
  }
  if (seconds < 3600) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`
  }
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`
}