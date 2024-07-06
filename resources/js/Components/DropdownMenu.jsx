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
                            xmlns="http://www.w3.org/2000/svg"
                            className={clsx('h-5 w-5 transition duration-200', open && 'rotate-180')}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
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
