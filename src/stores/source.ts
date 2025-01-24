import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getSourcePlayers } from '@/lib/players'

import type { ServerPlayer } from '@/lib/players'

interface SourceState {
  sourceIndex: number
  setSourceIndex: (index: number) => void
  getSource: (
    id: string,
    mediaType: MediaType,
    season?: string,
    episode?: string,
  ) => ServerPlayer
}

export type InitialSourceState = Pick<SourceState, 'sourceIndex'>

export const initialState: InitialSourceState = {
  sourceIndex: 0,
}

export const useSourceStore = create(
  persist<SourceState>(
    (set, get) => ({
      ...initialState,
      setSourceIndex: (index) => set({ sourceIndex: index }),
      getSource: (id, mediaType, season, episode) => {
        const index = get().sourceIndex
        const players = getSourcePlayers(id, mediaType, season, episode)
        return index >= 0 && index <= 10 ? players[index] : players[0]
      },
    }),
    {
      name: 'source',
    },
  ),
)
