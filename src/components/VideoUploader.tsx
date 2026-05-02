'use client'

import { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'

type VideoFile = {
  id: string
  file: File
  preview: string
  duration: number
  name: string
  size: number
}

type UploadProgress = {
  loaded: number
  total: number
  percentage: number
}

interface VideoUploaderProps {
  onVideoLoaded: (video: VideoFile) => void
  onError?: (error: string) => void
  maxSize?: number
  acceptedFormats?: string[]
}

export function VideoUploader({
  onVideoLoaded,
  onError,
  maxSize = 500 * 1024 * 1024,
  acceptedFormats = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']
}: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const generateId = () => Math.random().toString(36).substring(2, 9)

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src)
        resolve(video.duration)
      }
      video.onerror = () => {
        resolve(0)
      }
      video.src = URL.createObjectURL(file)
    })
  }

  const handleFileDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    
    if (!file) {
      onError?.('Nevhodný súbor')
      return
    }

    if (!acceptedFormats.some(format => file.type.includes(format.split('/')[1]))) {
      onError?.('Nepodporovaný formát')
      return
    }

    if (file.size > maxSize) {
      onError?.(`Súbor je príliš veľký. Max ${Math.round(maxSize / 1024 / 1024)}MB`)
      return
    }

    setIsProcessing(true)
    setUploadProgress({ loaded: 0, total: file.size, percentage: 0 })

    const preview = URL.createObjectURL(file)
    const duration = await getVideoDuration(file)

    if (duration === 0) {
      onError?.('Nepodarilo sa načítať video')
      setIsProcessing(false)
      return
    }

    const video: VideoFile = {
      id: generateId(),
      file,
      preview,
      duration,
      name: file.name,
      size: file.size
    }

    setUploadProgress({ loaded: file.size, total: file.size, percentage: 100 })
    setIsProcessing(false)
    
    onVideoLoaded(video)
  }, [maxSize, acceptedFormats, onVideoLoaded, onError])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
    accept: {
      'video/*': acceptedFormats.map(f => f.split('/')[1])
    },
    maxFiles: 1,
    multiple: false,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  })

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full">
      <AnimatePresence>
        {isProcessing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card"
          >
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 mb-4 relative">
                <div className="absolute inset-0 border-4 border-dark-700 rounded-full" />
                <div 
                  className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"
                  style={{ animationDuration: '1s' }}
                />
              </div>
              <p className="text-lg font-medium mb-2">Načítavam video...</p>
              <p className="text-dark-400 text-sm">
                {uploadProgress && `${uploadProgress.percentage}%`}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              {...getRootProps()}
              className={`
                cursor-pointer transition-all duration-300
                ${isDragActive || isDragging
                  ? 'border-primary-500 bg-primary-500/10 scale-[1.02]'
                  : 'border-dark-600 hover:border-primary-500 hover:bg-dark-800/50'
                }
              `}
            >
              <input {...getInputProps()} />
              
              <div className="border-2 border-dashed rounded-xl p-12 text-center">
                <div className="text-6xl mb-4">
                  {isDragActive ? '🎬' : '📹'}
                </div>
                
                <p className="text-lg font-medium mb-2">
                  {isDragActive ? 'Pusti video tu' : 'Potiahni a pusti video'}
                </p>
                
                <p className="text-dark-400 text-sm mb-4">
                  alebo klikni na výber súboru
                </p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {['MP4', 'WebM', 'MOV', 'AVI'].map(format => (
                    <span 
                      key={format}
                      className="px-2 py-1 bg-dark-800 rounded text-xs text-dark-400"
                    >
                      {format}
                    </span>
                  ))}
                </div>
                
                <p className="text-dark-500 text-xs mt-4">
                  Maximálna veľkosť: {Math.round(maxSize / 1024 / 1024)}MB
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}