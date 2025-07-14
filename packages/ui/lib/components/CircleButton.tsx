import type { ComponentPropsWithoutRef, MouseEventHandler } from 'react'
import { cn } from '@/utils'

// type CircleButtonProps = ComponentPropsWithoutRef<'button'>
interface CircleButtonProps extends ComponentPropsWithoutRef<'button'> {
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const CircleButton = ({ onClick, className, ...props }: CircleButtonProps) => {
  return (
    <div>
      <button
        type="button"
        {...props}
        className={cn(
          'w-2 h-5 transition-all duration-200 bg-blue-300 rounded-2xl hover:w-5 hover:bg-blue-600 hover:rounded-full hover:animate-bounce hover:cursor-pointer',
          className,
        )}
        onClick={onClick}>
        <span className="sr-only">View notifications</span>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-11.909-5.197M9 12l0-2m0 0l-3-3m3 3l3-3m-3 3v8m0-13.905A2.025 2.025 0 016.667 9.59
            pm2.025 2.025 0 0110.667 12a2.025 2.025 0 01-2.025 2.025A2.025 2.025 0 016.667 15.905z"
          />
        </svg> */}
      </button>
    </div>
  )
}
