import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { InertiaLink } from '@inertiajs/inertia-react'
import clsx from 'clsx'

function Link({ href, children, ...props }) {
    return (
        <>
            <MenuItem>
                {({ active }) => (
                    <InertiaLink
                        {...props}
                        className={clsx(active && 'bg-gray-100 text-black', 'w-full block text-left text-gray-600 py-1.5 px-3 text-sm')}
                        href={href}
                    >
                        {children}
                    </InertiaLink>
                )}
            </MenuItem>
        </>
    )
}

function DropdownMenu({ label, children }) {
    return (
        <Menu className='relative' as='div'>
            {({ open }) => (
                <>
                    <MenuButton className='flex items-center gap-x-2'>
                        {label}
                        <svg
                            className={clsx('h-5 w-5 transition duration-200', open && 'rotate-180')}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16" fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>

                    </MenuButton>
                    <MenuItems className='bg-white rounded-lg shadow-sm border absolute w-64 top-full right-0 overflow-hidden'>
                        {children}
                    </MenuItems>
                </>
            )}
        </Menu>
    )
}

DropdownMenu.Link = Link
export default DropdownMenu;
