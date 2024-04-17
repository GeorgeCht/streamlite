'use client'

import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  cn,
} from '@nextui-org/react'
import { useRouter } from '@/components/i18n/navigation'
import { AnimatePresence } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useIdle } from '@uidotdev/usehooks'

import Seperator from '@/components/modal/seperator'
import Header from '@/components/modal/header'
import Information from '@/components/ui/information'
import Reviews from '@/components/ui/reviews'
import Title from '@/components/modal/title'
import TvCarousel from '@/components/ui/tv-carousel'

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const idle = useIdle(4500)
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <AnimatePresence mode={'wait'}>
        <Modal
          key={'modal'}
          isOpen={isOpen}
          onOpenChange={() => {
            setIsOpen(false)
            setTimeout(() => {
              router.back()
            }, 200)
          }}
          placement={'bottom'}
          backdrop={'blur'}
          size={'5xl'}
          classNames={{
            base: 'bg-[#0D0D0E] sm:!h-[95vh] !h-[90vh] !my-0 !sm:my-0',
            backdrop: 'bg-black/80',
            closeButton:
              'hover:bg-white/15 active:bg-white/20 transition-all top-2 right-2 z-[99] p-3 child:w-5 child:h-5 child:hover:text-white child:md:text-white/75 child:text-white',
          }}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: 'easeInOut',
                },
              },
              exit: {
                y: -10,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: 'easeInOut',
                },
              },
            },
          }}
        >
          <ModalContent className={'!relative h-[95vh] flex overflow-hidden'}>
            <React.Fragment>
              <ScrollArea
                className={
                  'relative h-[95vh] lg:w-[1024px] w-full rounded-large p-[1px] z-10 child:absolute child:top-0 child:right-0 child:bottom-0 child:left-0'
                }
              >
                <Header id={params.id} mediaType={'tv'} idle={idle} />
                <ModalBody
                  className={cn(
                    'lg:w-[1024px] w-full z-20 px-4 sm:px-6 transition-opacity !duration-1000',
                    idle ? 'opacity-45' : 'opacity-100',
                  )}
                >
                  <Seperator className={'pb-3'} />

                  <Title>Information</Title>
                  <Information mediaType={'tv'} id={params.id} />

                  <Seperator className={'pb-3 mt-4'} />

                  <Title>Reviews</Title>
                  <Reviews mediaType={'tv'} id={params.id} onModal />

                  <Seperator className={'pb-3 mt-4'} />

                  <Title className={'sm:pb-3 pb-2'}>More Like This</Title>
                  <TvCarousel
                    onModal
                    id={params.id}
                    query={'/recommendations'}
                  />
                  <TvCarousel
                    onModal
                    id={params.id}
                    query={'/recommendations?page=2'}
                    className={'mt-4'}
                  />
                </ModalBody>
                <ModalFooter></ModalFooter>
              </ScrollArea>
            </React.Fragment>
          </ModalContent>
        </Modal>
      </AnimatePresence>
    </>
  )
}

export default Page
