import Link from 'next/link'

import { cn } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

import type { DetailedHTMLProps, HTMLAttributes } from 'react'

const Footer = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const t = useTranslations('footer')
  return (
    <footer
      className={cn(
        'flex sm:flex-row flex-col gap-1.5 sm:gap-0 items-center justify-between relative w-full pt-10 pb-1 border-t border-t-white/15',
        className,
      )}
      {...props}
    >
      <div>
        <p className={'text-sm sm:text-[15px] cursor-default'}>
          ©{new Date().getFullYear()} Streamlite. By GeorgeCht.
        </p>
      </div>
      <ul className={'flex sm:gap-6 gap-4'}>
        <li className={'text-sm sm:text-[15px]'}>
          <Link
            href={'https://github.com/georgecht/streamlite/issues'}
            target={'_blank'}
          >
            {t('feedback')}
          </Link>
        </li>
        <li className={'text-sm sm:text-[15px]'}>
          <Link href={'/'} target={'_blank'}>
            {t('disclaimer')}
          </Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
