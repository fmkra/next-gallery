import React from 'react'
import Link from 'next/link'

export default function IndexPage() {
    return (
        <div>
            <h1>Examples</h1>
            <Link href="/basic">Basic</Link>
            <br />
            <Link href="/selectable">Selectable</Link>
        </div>
    )
}
