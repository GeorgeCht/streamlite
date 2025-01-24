'use client'

import React from 'react'

import {
  Button,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from '@nextui-org/react'

import { Check, GripVertical, Layers } from 'lucide-react'
import { useSourceStore } from '@/stores/source'
import { availablePlayers } from '@/lib/players'

export const SourceServerDropdown = () => {
  const { setSourceIndex, sourceIndex } = useSourceStore()

  return (
    <li className={'mb-6'}>
      <Tooltip
        showArrow
        placement={'right'}
        content={'Server'}
        classNames={{
          base: ['before:bg-neutral-100 dark:before:bg-white'],
          content: [
            'py-2 px-4 shadow-xl text-black text-[13px] font-semibold',
            'bg-gradient-to-br from-white to-neutral-100 rounded-lg',
          ],
        }}
      >
        <span className={'inline-block'}>
          <Dropdown>
            <DropdownTrigger>
              <span
                className={cn(
                  'group relative hover:bg-white/10 inline-block rounded-md p-2 transition-all cursor-pointer',
                )}
              >
                <Layers
                  width={22}
                  height={22}
                  className={cn(
                    'group-hover:opacity-100 transition-all opacity-60',
                  )}
                />
              </span>
            </DropdownTrigger>
            <DropdownMenu aria-label={'source-server-dropdown'}>
              {availablePlayers.map((player, index) => (
                <DropdownItem
                  key={player.title}
                  onClick={() => {
                    setSourceIndex(index)
                  }}
                  startContent={
                    sourceIndex === index ? (
                      <Check className={'size-4'} />
                    ) : (
                      <GripVertical className={'size-4'} />
                    )
                  }
                >
                  Server {index + 1}: {player.title}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </span>
      </Tooltip>
    </li>
  )
}
