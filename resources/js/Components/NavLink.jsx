import { Link, usePage } from '@inertiajs/react';
import clsx from 'clsx';

export default function NavLink({ href, children, className, ...props }) {
    return (
        <Link
            href={href}
            {...props}
            className={clsx(
                className,
                usePage().url == href && 'font-semibold text-black',
                'text-gray-600 hover:text-black'
            )}
        >
            {children}
        </Link>
    );
}
