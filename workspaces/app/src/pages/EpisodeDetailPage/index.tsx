import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import styled from 'styled-components';

import { EpisodeListItem } from '../../features/episode/components/EpisodeListItem';
import { useEpisodeList } from '../../features/episode/hooks/useEpisodeList';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Separator } from '../../foundation/components/Separator';
import { Color, Space } from '../../foundation/styles/variables';

import { ComicViewer } from './internal/ComicViewer';

const _FallbackEpisodeContent = styled.div`
  width: 100%;
  height: 1573px;
  background: ${Color.MONO_10};
`;

export const EpisodeDetailPage: React.FC = () => {
  const { bookId, episodeId } = useParams<RouteParams<'/books/:bookId/episodes/:episodeId'>>();
  if (!bookId || !episodeId) {
    throw new Error('bookId and episodeId are required');
  }

  return (
    <Box>
      <section aria-label="漫画ビューアー">
        <ComicViewer episodeId={episodeId} />
      </section>

      <Separator />

      <Box aria-label="エピソード一覧" as="section" px={Space * 2}>
        <Flex align="center" as="ul" direction="column" justify="center">
          <Suspense fallback={<_FallbackEpisodeContent />}>
            <EpisodeContent bookId={bookId} />
          </Suspense>
        </Flex>
      </Box>
    </Box>
  );
};

const EpisodeContent: React.FC<{ bookId: string }> = ({ bookId }) => {
  const { data: episodeList } = useEpisodeList({ query: { bookId } });

  return (
    <>
      {episodeList.map((episode) => (
        <EpisodeListItem key={episode.id} bookId={bookId} episode={episode} />
      ))}
    </>
  );
};
