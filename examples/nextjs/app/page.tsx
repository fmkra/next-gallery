import React from 'react'
import Link from 'next/link'

export default function IndexPage() {
    return (
        <div>
            <h1 className="text-2xl">Examples</h1>
            <ul>
                <li>
                    <Link href="/basic">Basic</Link>
                </li>
                <li>
                    <Link href="/overlay">Overlay</Link>
                </li>
                <li>
                    <Link href="/selectable">Selectable</Link>
                </li>
                <li>
                    <Link href="/last-row-behavior">lastRowBehavior</Link>
                </li>
            </ul>
        </div>
    )
}
