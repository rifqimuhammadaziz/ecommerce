import { usePage } from '@inertiajs/react'
import React from 'react'
import Container from '@/Components/Container';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import DropdownMenu from '@/Components/DropdownMenu';

export default function Navbar() {
    const { auth } = usePage().props;

    return (
        <nav className='bg-white border-b'>
            <Container>
                <div className="flex item-center justify-between">
                    <ApplicationLogo />

                    <div className="flex item-center gap-x-6">
                        <NavLink href='/'>Home</NavLink>
                        <NavLink href='/dashboard'>Dashboard</NavLink>
                        {auth.user ? (
                            <>
                                <DropdownMenu label={auth.user.name}>
                                    <DropdownMenu.Link href='/profile'>Profile</DropdownMenu.Link>
                                    <DropdownMenu.Link href='/cart'>Your Cart</DropdownMenu.Link>
                                    <DropdownMenu.Link href='/history'>History</DropdownMenu.Link>
                                    <DropdownMenu.Link href='/logout' method='post'>Logout</DropdownMenu.Link>
                                </DropdownMenu>
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
