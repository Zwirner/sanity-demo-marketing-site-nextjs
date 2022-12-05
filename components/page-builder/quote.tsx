import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { m, MotionStyle, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import React, { useRef } from 'react'
import { KeyedObject, TypedObject } from 'sanity'

import { urlForImage } from '../../sanity/sanity'
import Container from '../container'
import { DebugGrid } from '../debug/grid'

type QuoteProps = KeyedObject &
  TypedObject & {
    index: number
    quote?: string
    person?: {
      name?: string
      title?: string
      picture?: SanityImageSource
      company?: {
        name?: string
        logo?: SanityImageSource
      }
    }
  }

export default function PageBuilderQuote(props: QuoteProps) {
  const { quote, person, index } = props
  const even = index % 2 === 0
  const { logoRef, logoStyle } = useLogoStyle(index)
  const { quoteRef, quoteStyle } = useQuoteStyle(index)

  if (!person) {
    return null
  }

  return (
    <div ref={quoteRef}>
      <Container
        className={
          'relative flex lg:items-center ' +
          (even
            ? 'flex-col-reverse lg:flex-row'
            : 'flex-col lg:flex-row-reverse')
        }
      >
        <DebugGrid columns={4} />

        <m.div
          className="-mt-5 flex flex-col gap-5 md:mt-0 md:px-5 lg:w-1/2 lg:flex-row"
          ref={quoteRef}
          style={quoteStyle}
        >
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-gray-800">
            <span
              className="font-serif text-6xl"
              style={{ transform: 'translate3d(3%, 20%, 0)' }}
            >
              &rdquo;
            </span>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight lg:text-3xl">
              {quote}
            </h2>

            <div className="h-25">
              <div className="flex items-center gap-5">
                {person?.picture ? (
                  <Image
                    className="h-16 w-16 flex-shrink-0 rounded bg-gray-200"
                    src={urlForImage(person.picture)
                      .width(64)
                      .height(64)
                      .dpr(2)
                      .auto('format')
                      .url()}
                    alt={person?.name}
                    width={64}
                    height={64}
                  />
                ) : null}
                <div>
                  {person?.name ? (
                    <p className="text-xl font-extrabold">{person.name}</p>
                  ) : null}
                  <p className="text-gray-600 dark:text-gray-400">
                    {person.title}
                    {person?.company?.name ? (
                      <>
                        <br />
                        <em>{person.company.name}</em>
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </m.div>

        <m.div
          className="my-12 flex-1 flex-shrink-0 px-5 lg:w-1/2"
          ref={logoRef}
          style={logoStyle}
        >
          <div className="mx-auto flex aspect-video w-full max-w-lg items-center justify-center rounded bg-orange-100 dark:bg-magenta-900">
            {person?.company?.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="w-4/5 flex-shrink-0 rounded bg-gray-200"
                src={urlForImage(person.company.logo).url()}
                alt={person?.name}
                width={512}
                height={512}
              />
            ) : null}
          </div>
        </m.div>
      </Container>
    </div>
  )
}

function useQuoteStyle(index: number) {
  const quoteRef = useRef(null)
  const even = index % 2 === 0

  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ['start end', 'start start'],
  })

  const outputRange = [300, 300, 0].map((v) => v * (even ? -1 : 1))
  const quoteStyle: MotionStyle = {
    opacity: useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0, 1]),
    translateX: useTransform(scrollYProgress, [0, 0.15, 0.45], outputRange),
  }

  return {
    quoteRef,
    quoteStyle,
  }
}

function useLogoStyle(index: number) {
  const logoRef = useRef(null)
  const even = index % 2 === 0

  const { scrollYProgress } = useScroll({
    target: logoRef,
    offset: ['start end', 'start start'],
  })

  const logoStyle: MotionStyle = {
    opacity: useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0, 1]),
    translateX: useTransform(
      scrollYProgress,
      [0, 0.1, 0.4],
      [300, 300, 0].map((v) => v * (even ? 1 : -1))
    ),
  }

  return {
    logoRef,
    logoStyle,
  }
}
