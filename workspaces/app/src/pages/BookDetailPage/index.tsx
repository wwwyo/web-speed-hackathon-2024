import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import { styled } from 'styled-components';

import { useBook } from '../../features/book/hooks/useBook';
import { EpisodeListItem } from '../../features/episode/components/EpisodeListItem';
import { useEpisodeList } from '../../features/episode/hooks/useEpisodeList';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Image } from '../../foundation/components/Image';
import { Link } from '../../foundation/components/Link';
import { Separator } from '../../foundation/components/Separator';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { useImageV2 } from '../../foundation/hooks/useImagev2';
import { Color, Space, Typography } from '../../foundation/styles/variables';

import { BottomNavigator } from './internal/BottomNavigator';

const _HeadingWrapper = styled.section`
  display: grid;
  align-items: start;
  grid-template-columns: auto 1fr;
  padding-bottom: ${Space * 2}px;
  gap: ${Space * 2}px;
`;

const _FallbackHeadingContent = styled.div`
  width: 100%;
  height: 252px;
  background: ${Color.MONO_10};
`;

const _FallbackEpisodeContent = styled.div`
  width: 100%;
  height: 1573px;
  background: ${Color.MONO_10};
`;

const _AuthorWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: ${Space * 1}px;
`;

const _AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  > img {
    border-radius: 50%;
  }
`;

export const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<RouteParams<'/books/:bookId'>>();
  if (!bookId) {
    throw new Error('bookId is required');
  }

  return (
    <Box height="100%" position="relative" px={Space * 2}>
      <_HeadingWrapper aria-label="作品情報">
        <Suspense fallback={<_FallbackHeadingContent />}>
          <HeadingContent bookId={bookId} />
        </Suspense>
      </_HeadingWrapper>

      <Separator />

      <section aria-label="エピソード一覧">
        <Flex align="center" as="ul" direction="column" justify="center">
          <Suspense fallback={<_FallbackEpisodeContent />}>
            <EpisodeContent bookId={bookId} />
          </Suspense>
        </Flex>
      </section>
    </Box>
  );
};

const HeadingContent: React.FC<{ bookId: string }> = ({ bookId }) => {
  const { data: book } = useBook({ params: { bookId } });
  const bookImageUrl = useImageV2({ height: 256, imageId: book.image.id, width: 192 });
  const auhtorImageUrl = useImageV2({ height: 32, imageId: book.author.image.id, width: 32 });

  return (
    <>
      {bookImageUrl != null && <Image alt={book.name} height={256} objectFit="cover" src={bookImageUrl} width={192} />}
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-end">
        <Box>
          <Text color={Color.MONO_100} typography={Typography.NORMAL20} weight="bold">
            {book.name}
          </Text>
          <Spacer height={Space * 1} />
          <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
            {book.description}
          </Text>
        </Box>

        <Spacer height={Space * 1} />

        <_AuthorWrapper href={`/authors/${book.author.id}`}>
          {auhtorImageUrl != null && (
            <_AvatarWrapper>
              <Image alt={book.author.name} height={32} objectFit="cover" src={auhtorImageUrl} width={32} />
            </_AvatarWrapper>
          )}
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            {book.author.name}
          </Text>
        </_AuthorWrapper>
      </Flex>
    </>
  );
};

const EpisodeContent: React.FC<{ bookId: string }> = ({ bookId }) => {
  const { data: episodeList } = useEpisodeList({ query: { bookId } });
  const latestEpisode = episodeList?.find((episode) => episode.chapter === 1);

  return (
    <>
      {episodeList.map((episode) => (
        <EpisodeListItem key={episode.id} bookId={bookId} episode={episode} />
      ))}
      {episodeList.length === 0 && (
        <>
          <Spacer height={Space * 2} />
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            この作品はまだエピソードがありません
          </Text>
        </>
      )}
      <BottomNavigator bookId={bookId} latestEpisodeId={latestEpisode?.id ?? ''} />
    </>
  );
};
