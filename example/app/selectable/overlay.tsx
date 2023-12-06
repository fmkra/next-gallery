'use client'

import { createContext, useContext, useState } from 'react'

type OverlayContextType = {
    selected: boolean[]
    setSelected: (index: number, value: boolean) => void
}

const OverlayContext = createContext<OverlayContextType | null>(null)

const useOverlay = () => {
    const context = useContext(OverlayContext)
    if (!context) {
        throw new Error('useOverlay must be used within OverlayProvider')
    }
    return context
}

export const OverlayProvider = ({ children }: { children: React.ReactNode }) => {
    const [selected, setSelected] = useState<boolean[]>([])
    const editSelected = (index: number, value: boolean) => {
        const newSelected = [...selected]
        newSelected[index] = value
        setSelected(newSelected)
    }

    return <OverlayContext.Provider value={{ selected, setSelected: editSelected }}>{children}</OverlayContext.Provider>
}

export const MyOverlay = ({ index }: { index: number }) => {
    const ovl = useOverlay()
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                transition: 'background-color 0.3s',
                backgroundColor: ovl.selected[index] ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={() => ovl.setSelected(index, !ovl.selected[index])}
        >
            <svg
                fill="#fff"
                height="20px"
                width="20px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 191.667 191.667"
                xmlSpace="preserve"
                style={{
                    opacity: ovl.selected[index] ? 1 : 0,
                    transition: 'opacity 0.3s',
                }}
            >
                <path d="M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685 c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971 l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969 C156.146,65.765,156.146,74.362,150.862,79.646z" />
            </svg>
        </div>
    )
}
