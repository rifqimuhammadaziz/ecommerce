import { Link } from "@inertiajs/inertia-react";
import clsx from "clsx";

export default function ButtonLink({ className = '', children, href, ...props }) {
    return (
        <Link
            {...props}
            href={href}
            className={clsx(className, 'inline-flex justify-center items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-sm text-white hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150')}
        >
            {children}
        </Link >
    );
}
