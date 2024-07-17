import { usePage } from '@inertiajs/react'
import React from 'react'
import Container from '@/Components/Container';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import DropdownMenu from '@/Components/DropdownMenu';

export default function Navbar() {
    const { auth, categories_global, carts_global_count } = usePage().props;

    return (
        <nav className='bg-white border-b'>
            <Container>
                <div className="flex item-center justify-between">
                    <ApplicationLogo />

                    <div className="flex item-center gap-x-6">
                        <NavLink href='/'>Home</NavLink>
                        <NavLink href='/products'>Product</NavLink>
                        <DropdownMenu label={'Categories'}>
                            {categories_global.map(category => (
                                <DropdownMenu.Link key={category.slug} href={`/products?category=${category.slug}`}>{category.name}</DropdownMenu.Link>
                            ))}
                        </DropdownMenu>
                        {auth.user ? (
                            <>
                                <DropdownMenu label={auth.user.name}>
                                    <DropdownMenu.Link href='/dashboard'>Dashboard</DropdownMenu.Link>
                                    <DropdownMenu.Link href='/profile'>Profile</DropdownMenu.Link>
                                    <DropdownMenu.Link href='/cart'>Your Cart</DropdownMenu.Link>
                                    <DropdownMenu.Link href='/products/me'>Your Products</DropdownMenu.Link>
                                    <DropdownMenu.Link href='/history'>History</DropdownMenu.Link>
                                    <DropdownMenu.Link href='/logout' method='post'>Logout</DropdownMenu.Link>
                                </DropdownMenu>
                                <NavLink className='flex items-center gap-x-2' href='/carts'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor" className="h-5 w-5">
                                        <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                                    </svg>
                                    {carts_global_count > 0 ? carts_global_count : null}
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink href='/login'>Log in</NavLink>
                                <NavLink href='/register'>Register</NavLink>
                            </>)
                        }
                    </div>
                </div>
            </Container>
        </nav >
    )
}
