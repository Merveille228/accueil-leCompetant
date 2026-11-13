import * as React from "react"
import { useState } from "react"

interface CarouselImage {
    image: string | { src?: string; alt?: string }
    imageY?: number
    title?: string
    alt?: string
}

interface CrumpleCardCarouselProps {
    images: CarouselImage[]
    direction?: "horizontal" | "vertical"
    speed?: number
    hold?: number
    itemWidth?: number
    itemHeight?: number
    background?: string
    style?: React.CSSProperties
    advanced?: { scrollSens?: number }
}

function sourceOf(image: CarouselImage["image"]) {
    return typeof image === "string" ? image : image?.src
}

function altOf(image: CarouselImage) {
    return typeof image.image === "string"
        ? image.alt || image.title || ""
        : image.image.alt || image.alt || image.title || ""
}

const css = `
.crumple-viewport { overflow: hidden; }
.crumple-track {
    display: flex;
    width: max-content;
    align-items: center;
    animation: crumple-scroll var(--crumple-duration) linear infinite;
    will-change: transform;
}
.crumple-viewport:hover .crumple-track,
.crumple-viewport:focus-within .crumple-track,
.crumple-viewport[data-paused="true"] .crumple-track {
    animation-play-state: paused;
}
.crumple-card {
    flex: 0 0 auto;
    overflow: hidden;
    transform: translateZ(0);
}
.crumple-card img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .45s ease, filter .45s ease;
}
.crumple-card:hover img,
.crumple-card:focus-visible img {
    transform: scale(1.04);
    filter: brightness(1.08);
}
@keyframes crumple-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(calc(-50% - var(--crumple-gap) / 2)); }
}
@media (prefers-reduced-motion: reduce) {
    .crumple-track { animation: none; }
}
`

export default function CrumpleCardCarousel({
    images = [],
    direction = "horizontal",
    speed = 15,
    hold = 600,
    itemWidth = 700,
    itemHeight = 500,
    background = "transparent",
    style,
}: CrumpleCardCarouselProps) {
    const [paused, setPaused] = useState(false)
    const horizontal = direction === "horizontal"
    const cards = images.length ? images : []
    const duplicatedCards = horizontal ? [...cards, ...cards] : cards
    const duration = Math.max(1, Number(speed) || 15)
    const cardWidth = Math.max(160, Number(itemWidth) || 700)
    const cardHeight = Math.max(160, Number(itemHeight) || 500)

    const pauseTemporarily = () => {
        setPaused(true)
        if (hold > 0) window.setTimeout(() => setPaused(false), hold)
    }

    const move = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return
        event.preventDefault()
        const next = event.key === "ArrowRight" ? index + 1 : index - 1
        const target = event.currentTarget.parentElement?.children[next] as HTMLElement | undefined
        target?.focus()
    }

    return (
        <div
            className="crumple-viewport"
            data-paused={paused}
            style={{
                width: "100%",
                height: "100%",
                background,
                ...style,
            }}
            onPointerDown={(event) => {
                if (event.pointerType !== "mouse") pauseTemporarily()
            }}
        >
            <style>{css}</style>
            <div
                className="crumple-track"
                style={{
                    "--crumple-duration": `${duration}s`,
                    "--crumple-gap": "16px",
                    gap: 16,
                    height: "100%",
                    padding: "0 16px",
                } as React.CSSProperties}
            >
                {duplicatedCards.map((item, index) => {
                    const src = sourceOf(item.image)
                    const originalIndex = cards.length ? index % cards.length : index
                    return (
                        <div
                            key={`${originalIndex}-${index}`}
                            className="crumple-card"
                            tabIndex={0}
                            role="img"
                            aria-label={altOf(item)}
                            onFocus={() => setPaused(true)}
                            onBlur={() => setPaused(false)}
                            onKeyDown={(event) => move(event, index)}
                            style={{
                                width: cardWidth,
                                height: cardHeight,
                                borderRadius: 14,
                                background: "#262626",
                            }}
                        >
                            {src && (
                                <img
                                    src={src}
                                    alt={altOf(item)}
                                    loading={index < cards.length ? "eager" : "lazy"}
                                    draggable={false}
                                    style={{
                                        objectPosition: `50% ${50 - (Number(item.imageY) || 0)}%`,
                                    }}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
