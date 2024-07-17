import { Link } from '@inertiajs/react'
import clsx from 'clsx'
import React from 'react'

export default function Pagination({ marginTop = 'mt-10', meta, links }) {
    return (
        <div className={clsx('flex item-center justify-center gap-2', marginTop)}>
            {meta.links.map((link, i) => (
                <div key={i}>
                    <Link
                        key={i}
                        href={link.url}
                        className={clsx(link.active && 'text-blue-500', 'text-black')}
                    >
                        {link.label}
                    </Link>
                </div>
            ))}
        </div>
    )
}
