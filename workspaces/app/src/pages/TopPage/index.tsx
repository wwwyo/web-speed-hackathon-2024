import type { FC } from 'react';
import { Suspense, useId } from 'react';
import styled from 'styled-components';

import { BookCard } from '../../features/book/components/BookCard';
import { FeatureCard } from '../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../features/feature/hooks/useFeatureList';
import { RankingCard } from '../../features/ranking/components/RankingCard';
import { useRankingList } from '../../features/ranking/hooks/useRankingList';
import { useRelease } from '../../features/release/hooks/useRelease';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';
import { getDayOfWeekStr } from '../../lib/date/getDayOfWeekStr';

import { CoverSection } from './internal/CoverSection';

const _FallbackFeatures = styled.div`
  width: 100%;
  height: 206px;
  background: ${Color.MONO_10};
`;

const _FallbackRanking = styled.div`
  width: 100%;
  height: 7200px;
  background: ${Color.MONO_10};
`;

const _FallbackRelease = styled.div`
  width: 100%;
  height: 244px;
  background: ${Color.MONO_10};
`;

export const TopPage: React.FC = () => {
  const pickupA11yId = useId();
  const rankingA11yId = useId();
  const todayA11yId = useId();

  return (
    <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
      <Box as="header" maxWidth="100%" width="100%">
        <CoverSection />
      </Box>
      <Box as="main" maxWidth="100%" width="100%">
        <Box aria-labelledby={pickupA11yId} as="section" maxWidth="100%" mt={16} width="100%">
          <Text as="h2" color={Color.MONO_100} id={pickupA11yId} typography={Typography.NORMAL20} weight="bold">
            ピックアップ
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
            <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
              <Suspense fallback={<_FallbackFeatures />}>
                <FeatureCards />
              </Suspense>
            </Flex>
          </Box>
        </Box>

        <Spacer height={Space * 2} />

        <Box aria-labelledby={rankingA11yId} as="section" maxWidth="100%" width="100%">
          <Text as="h2" color={Color.MONO_100} id={rankingA11yId} typography={Typography.NORMAL20} weight="bold">
            ランキング
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
            <Flex align="center" as="ul" direction="column" justify="center">
              <Suspense fallback={<_FallbackRanking />}>
                <RankingCards />
              </Suspense>
            </Flex>
          </Box>
        </Box>

        <Spacer height={Space * 2} />

        <Box aria-labelledby={todayA11yId} as="section" maxWidth="100%" width="100%">
          <Text as="h2" color={Color.MONO_100} id={todayA11yId} typography={Typography.NORMAL20} weight="bold">
            本日更新
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
            <Flex align="stretch" gap={Space * 2} justify="flex-start">
              <Suspense fallback={<_FallbackRelease />}>
                <ReleaseCards />
              </Suspense>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

const FeatureCards: FC = () => {
  const { data: featureList } = useFeatureList({ query: {} });
  return (
    <>
      {featureList.map((feature) => (
        <FeatureCard key={feature.id} book={feature.book} />
      ))}
    </>
  );
};

const RankingCards: FC = () => {
  const { data: rankingList } = useRankingList({ query: {} });
  return (
    <>
      {rankingList.map((ranking) => (
        <RankingCard key={ranking.id} book={ranking.book} />
      ))}
    </>
  );
};

const ReleaseCards: FC = () => {
  const todayStr = getDayOfWeekStr(new Date());
  const { data: release } = useRelease({ params: { dayOfWeek: todayStr } });
  return (
    <>
      {release.books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </>
  );
};
