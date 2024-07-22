"use client"

import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { LinkIcon } from '@heroicons/react/20/solid'
import React from "react"
import Image from "next/image"
import { AnimatePresence,  motion, useMotionValue, useSpring } from "framer-motion"
import Link from "next/link"
import { cn } from '@/components/utils/TailwindUtils';

const Preview = ({ url, title, className, width = 200, height = 125, quality = 50, layout = "fixed", preview = true }) => {

  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [isOpen, setOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    fetch(`/api/preview?url=${url}`)
      .then((res) => res.json())
      .then((data) => {
        data = JSON.parse(data)
        title ? data.title = title : data.title;
        setLoading(false)
        setData(data)
    })
  }, [])

  const springConfig = { stiffness: 100, damping: 15 }
  const x = useMotionValue(0)

  const translateX = useSpring(x, springConfig)

  const handleMouseMove = event => {
    const targetRect = event.target.getBoundingClientRect()
    const eventOffsetX = event.clientX - targetRect.left
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2
    x.set(offsetFromCenter)
  }

  if (loading) {
    return <img className="h-4 w-4 inline-flex m-0 mr-2" src="/static/icons/loading.svg" alt="Loading ..."/>;
  } else if (preview) {
    return (
      <>
        {isMounted ? ( <span className="hidden"> <Image src={data.image} width={width} height={height} quality={quality} layout={layout} priority={true} alt="hidden image" /> </span> ) : null}
  
        <HoverCardPrimitive.Root openDelay={50} closeDelay={100} onOpenChange={open => { setOpen(open) }} >
          <HoverCardPrimitive.Trigger onMouseMove={handleMouseMove} className={cn("text-black dark:text-white", className)} href={url}>
          <span className="inline-flex items-center mr-1">
            { data.favicon ? 
              <img className="h-4 w-4 m-0 mr-1" src={data ? data.favicon : ""} alt={data ? data.title : "Loading..."} />
              : <LinkIcon className="h-4 w-4 m-0 mr-1" />
            }
            <a href={url}>{data.title ? data.title.split(':')[0] : url}</a>
          </span>
          </HoverCardPrimitive.Trigger>
          { }
          <HoverCardPrimitive.Content className="[transform-origin:var(--radix-hover-card-content-transform-origin)]" side="top" align="center" sideOffset={10}>
            <AnimatePresence>
              {isOpen &&  (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  className="shadow-xl rounded-xl"
                  style={{ x: translateX }} >
                  <Link href={url} className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800" style={{ fontSize: 0 }} >
                    <Image src={data.image} width={width} height={height} quality={quality} layout={layout} priority={true} className="rounded-lg" alt="preview image" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Root>
      </>
    )
  } else return (
    <span className="inline-flex items-baseline mr-1">
      { data.favicon ? 
        <img className="h-4 w-4 m-0 mr-1" src={data ? data.favicon : ""} alt={data ? data.title : "Loading..."} />
        : <LinkIcon className="h-4 w-4 m-0 mr-1" />
      }
      <a href={url}>{data.title ? data.title.split(':')[0] : url}</a>
    </span>
  )
}
export default Preview;