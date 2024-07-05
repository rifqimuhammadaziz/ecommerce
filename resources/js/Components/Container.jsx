import React from 'react'
import { Children } from 'react/cjs/react.production.min'

export default function Container({ children }) {
    return (
        <div className='max-w-xl p-4'>{Children}</div>
    )
}
