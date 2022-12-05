import React from 'react'

import { ArticleStub } from '../../../types'
import Container from '../../container'
import { DebugGrid } from '../../debug/grid'
import { BentoSubtitle } from './bento-1/BentoSubtitle'
import { BentoSummary } from './bento-1/BentoSummary'
import { BentoTitle } from './bento-1/BentoTitle'

export function isBentoNumberCallout(article: ArticleStub) {
  const title = article.title
  if (!title) {
    return false
  }
  const numbers = title?.replace(/[^0-9]/g, '').length
  const other = title?.replace(/[0-9]/g, '').length
  return numbers >= other
}

export function BentoNumberCallout(props: {
  article: ArticleStub
  articleIndex: number
  articles: ArticleStub[]
}) {
  const { article } = props
  return (
    <Container className="relative flex items-center justify-center gap-3 py-6 md:py-12 md:px-5">
      <DebugGrid />
      <div className="flex flex-col items-center justify-center gap-3">
        <BentoSubtitle subtitle={article.subtitle} className={''} />
        <BentoTitle title={article.title} />
        <BentoSummary summary={article.summary} />
      </div>
    </Container>
  )
}
