/* eslint-disable */
// Dynamic Grid Gallery — Originkit

// Delivered by Originkit · stack: nextjs
"use client";

// Delivered by Originkit · stack: framer
// Paste into a Framer code component. Property controls included.
import * as React from "react"
import { useState } from "react"
/**
 * Dynamic Grid Gallery: a photo grid where the tile you point at takes the
 * stage. Its row and column grow while the others give way, the image eases
 * in a touch, and its title fades up in the corner. Works with hover, focus
 * (Tab and arrow keys) and tap.
 *
 * Based on Dynamic Grid Gallery from useLayouts (uselayouts.com), MIT licensed.
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicWidth 480
 * @framerIntrinsicHeight 320
 */

interface Tile {
    title: string
    /** A ResponsiveImage ({ src, srcSet, alt }) from Framer, or a plain URL string from older projects. */
    image: any
    /** Which band of the cover crop shows: -250 bottom edge flush, 0 centred, 250 top edge flush. */
    offsetY?: number
    alt: string
}

interface DynamicGridGalleryProps {
    items: Tile[]
    columns: number
    gap: number
    expand: number
    radius: number
    background: string
    showTitles: boolean
    /** Family, weight, size, spacing and line height of the titles. */
    titleFont: React.CSSProperties
    style?: React.CSSProperties
}

const IMG = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`

const SAMPLE: Tile[] = [
    { title: "Wheat Field", image: IMG("1690982961324-2c7f03336e63"), offsetY: 0, alt: "A wheat field under a hazy sky" },
    { title: "Red Truck", image: IMG("1690982961861-1fd745121132"), offsetY: 0, alt: "A red pickup parked by a brick building" },
    { title: "Agave Hills", image: IMG("1674592064268-cac96ecc9a39"), offsetY: 0, alt: "Flowering agave on dry summer hills" },
    { title: "Beach Shade", image: IMG("1596999380413-92d171935be8"), offsetY: 0, alt: "An orange umbrella on a beach under a clear sky" },
    { title: "Old Town", image: IMG("1760082008239-5196c63de746"), offsetY: 0, alt: "A man in a hat walking down a sunny street" },
    { title: "Bougainvillea", image: IMG("1764944625879-edd1d96d44c6"), offsetY: 0, alt: "Pink bougainvillea over a seaside path" },
]

/** The URL of an image value: a ResponsiveImage object or a plain URL string. */
function srcOf(v: any): string | null {
    if (!v) return null
    if (typeof v === "string") return v
    if (typeof v.src === "string" && v.src) return v.src
    return null
}

const EASE = "cubic-bezier(0.25, 1, 0.5, 1)"
const SHRINK = 0.9
const INSET = 12
// A real family, so the Font picker opens on a chosen face instead of an empty field.
const TITLE_FONT = { fontFamily: "Inter", variant: "Medium", fontWeight: 500, fontSize: 13, letterSpacing: "-0.01em", lineHeight: "1.2em" }

// Rest and hover shades are two layers cross-faded on opacity: a `background`
// gradient cannot transition, so swapping it on one layer popped on enter/leave.
const SHADE_REST = "linear-gradient(to top, rgba(0,0,0,0.25), transparent 50%, rgba(0,0,0,0.1))"
const SHADE_ON = "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0) 45%)"

const css = `
.dgg-grid { transition: grid-template-columns .5s ${EASE}, grid-template-rows .5s ${EASE}; }
.dgg-tile { outline: none; }
.dgg-tile img { transition: transform .7s ${EASE}; }
.dgg-tile[data-on="true"] img { transform: scale(1.05); }
.dgg-tile:focus-visible::after { content: ""; position: absolute; inset: 0; border-radius: inherit; box-shadow: inset 0 0 0 2px #fff; pointer-events: none; }
.dgg-shade { transition: opacity .4s ${EASE}; }
.dgg-label { transition: opacity .3s ease, transform .4s ${EASE}; }
@media (prefers-reduced-motion: reduce) { .dgg-grid, .dgg-tile img, .dgg-shade, .dgg-label { transition: none; } .dgg-tile[data-on="true"] img { transform: none; } }
`

function tracks(count: number, active: number | null, expand: number) {
    return Array.from({ length: count }, (_, i) => (active === null ? "1fr" : i === active ? `${expand}fr` : `${SHRINK}fr`)).join(" ")
}

function __OriginkitBase_DynamicGridGallery(props: DynamicGridGalleryProps) {
    const { items, columns, gap, expand, radius, background, showTitles, titleFont, style } = props
    // The Font row owns family, weight, size and spacing; merged so a partial value is safe.
    const font = { ...TITLE_FONT, ...titleFont }
    const list = items && items.length ? items : SAMPLE
    const cols = Math.max(1, Math.min(Math.round(columns), list.length))
    const rows = Math.ceil(list.length / cols)
    const [active, setActive] = useState<number | null>(null)

    const activeRow = active === null ? null : Math.floor(active / cols)
    const activeCol = active === null ? null : active % cols

    const move = (e: React.KeyboardEvent, i: number) => {
        const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key]
        if (step === undefined) return
        const next = i + step
        if (next < 0 || next >= list.length) return
        e.preventDefault()
        const grid = e.currentTarget.parentElement
        ;(grid?.children[next] as HTMLElement | undefined)?.focus()
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                ...style,
                background,
                boxSizing: "border-box",
                userSelect: "none",
            }}
            onMouseLeave={() => setActive(null)}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setActive(null)
            }}
        >
            <style>{css}</style>
            <div
                className="dgg-grid"
                role="list"
                style={{
                    display: "grid",
                    width: "100%",
                    height: "100%",
                    gridTemplateColumns: tracks(cols, activeCol, expand),
                    gridTemplateRows: tracks(rows, activeRow, expand),
                    gap,
                }}
            >
                {list.map((item, i) => {
                    const on = active === i
                    const src = srcOf(item.image)
                    return (
                        <div
                            key={i}
                            role="listitem"
                            tabIndex={0}
                            aria-label={item.title || item.alt || `Image ${i + 1}`}
                            className="dgg-tile"
                            data-on={on}
                            onMouseEnter={() => setActive(i)}
                            onFocus={() => setActive(i)}
                            onPointerDown={(e) => e.pointerType !== "mouse" && setActive(on ? null : i)}
                            onKeyDown={(e) => move(e, i)}
                            style={{
                                position: "relative",
                                minWidth: 0,
                                minHeight: 0,
                                overflow: "hidden",
                                borderRadius: radius,
                                background: "#171717",
                                cursor: "pointer",
                                // Keeps each tile's relayout to itself while the tracks animate.
                                contain: "layout paint",
                            }}
                        >
                            {src && (
                                <img
                                    src={src}
                                    alt={item.alt || item.title || ""}
                                    draggable={false}
                                    loading={i < cols ? "eager" : "lazy"}
                                    decoding="async"
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        // A share of the crop overflow, not pixels, so every step moves the
                                        // picture whatever its proportions; 0 is the centred crop.
                                        objectPosition: `50% ${50 - (Math.max(-250, Math.min(250, Number(item.offsetY) || 0)) / 250) * 50}%`,
                                        filter: "brightness(0.98) contrast(1.04)",
                                        pointerEvents: "none",
                                    }}
                                />
                            )}
                            <div
                                className="dgg-shade"
                                style={{ position: "absolute", inset: 0, pointerEvents: "none", background: SHADE_REST, opacity: on ? 0 : 0.4 }}
                            />
                            <div
                                className="dgg-shade"
                                style={{ position: "absolute", inset: 0, pointerEvents: "none", background: SHADE_ON, opacity: on && showTitles ? 1 : 0 }}
                            />
                            {showTitles && item.title && (
                                <div
                                    className="dgg-label"
                                    style={{
                                        position: "absolute",
                                        left: INSET,
                                        right: INSET,
                                        bottom: INSET,
                                        color: "#ffffff",
                                        fontFamily: font.fontFamily,
                                        fontStyle: font.fontStyle,
                                        fontWeight: font.fontWeight,
                                        fontSize: font.fontSize,
                                        lineHeight: font.lineHeight,
                                        letterSpacing: font.letterSpacing,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        opacity: on ? 1 : 0,
                                        transform: on ? "translateY(0)" : "translateY(6px)",
                                        pointerEvents: "none",
                                    }}
                                >
                                    {item.title}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

DynamicGridGallery.defaultProps = {
    items: SAMPLE,
    columns: 3,
    gap: 8,
    expand: 1.95,
    radius: 12,
    background: "transparent",
    showTitles: true,
    titleFont: {"variant":"Medium","fontSize":"20px","textAlign":"left","fontFamily":"Inter","fontWeight":500,"lineHeight":"1.2em","letterSpacing":"-0.01em"},
}

// Control order arranged in the builder.

const __originkitPresetProps = {
  "titleFont": {
    "variant": "Medium",
    "fontSize": "20px",
    "textAlign": "left",
    "fontFamily": "Inter",
    "fontWeight": 500,
    "lineHeight": "1.2em",
    "letterSpacing": "-0.01em"
  }
};

export default function DynamicGridGallery(props: Record<string, unknown>) {
  return <__OriginkitBase_DynamicGridGallery {...(__originkitPresetProps as Record<string, unknown>)} {...props} />;
}
