'use client'

export function Overlay({ index }: { index: number }) {
    return <button onClick={() => console.log(index)}>{index}</button>
}
