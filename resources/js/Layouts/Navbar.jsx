import { usePage } from '@inertiajs/react'
import React from 'react'
import Container from '@/Components/Container';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';

export default function Navbar() {
    const { auth } = usePage().props;

    return (
        <nav>
            <Container>
                <div className="flex item-center justify-content-between">
                    <ApplicationLogo />

                    <div className="flex item-center gap-x-6">
                        <NavLink href='/'>Home</NavLink>
                        <NavLink href='/dashboard'>Dashboard</NavLink>
                    </div>
                </div>
            </Container>
        </nav>
    )
}
