import type { FC } from 'react';
import { Suspense, useId } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import { styled } from 'styled-components';

import { useAuthor } from '../../features/author/hooks/useAuthor';
import { BookListItem } from '../../features/book/components/BookListItem';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Image } from '../../foundation/components/Image';
import { Separator } from '../../foundation/components/Separator';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { useImageV2 } from '../../foundation/hooks/useImagev2';
import { Color, Space, Typography } from '../../foundation/styles/variables';

const _HeadingWrapper = styled.section`
  display: grid;
  align-items: start;
  grid-template-columns: auto 1fr;
  padding-bottom: ${Space * 2}px;
  gap: ${Space * 2}px;
`;

const _FallbackHeadingContent = styled.div`
  width: 100%;
  height: 128px;
  background: ${Color.MONO_10};
`;

const _FallbackEpisodeContent = styled.div`
  width: 100%;
  height: 2492px;
  background: ${Color.MONO_10};
`;

const _AuthorImageWrapper = styled.div`
  width: 128px;
  height: 128px;
  > img {
    border-radius: 50%;
  }
`;

export const AuthorDetailPage: React.FC = () => {
  const { authorId } = useParams<RouteParams<'/authors/:authorId'>>();
  if (!authorId) {
    throw new Error('authorId is required');
  }

  const bookListA11yId = useId();

  return (
    <Box height="100%" px={Space * 2}>
      <_HeadingWrapper aria-label="作者情報">
        <Suspense fallback={<_FallbackHeadingContent />}>
          <Header authorId={authorId} />
        </Suspense>
      </_HeadingWrapper>

      <Separator />

      <Box aria-labelledby={bookListA11yId} as="section" maxWidth="100%" py={Space * 2} width="100%">
        <Text as="h2" color={Color.MONO_100} id={bookListA11yId} typography={Typography.NORMAL20} weight="bold">
          作品一覧
        </Text>

        <Spacer height={Space * 2} />

        <Flex align="center" as="ul" direction="column" justify="center">
          <Suspense fallback={<_FallbackEpisodeContent />}>
            <AuthorBooks authorId={authorId} />
          </Suspense>
        </Flex>
      </Box>
    </Box>
  );
};

const Header: FC<{ authorId: string }> = ({ authorId }) => {
  const { data: author } = useAuthor({ params: { authorId } });
  const imageUrl = useImageV2({ height: 128, imageId: author.image.id, width: 128 });

  return (
    <>
      {imageUrl != null && (
        <_AuthorImageWrapper>
          <Image key={author.id} alt={author.name} height={128} objectFit="cover" src={imageUrl} width={128} />
        </_AuthorImageWrapper>
      )}

      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <Text color={Color.MONO_100} typography={Typography.NORMAL20} weight="bold">
          {author.name}
        </Text>
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
          {author.description}
        </Text>
      </Flex>
    </>
  );
};

const AuthorBooks: FC<{
  authorId: string;
}> = ({ authorId }) => {
  const { data: author } = useAuthor({ params: { authorId } });

  return (
    <>
      {author.books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
      {author.books.length === 0 && (
        <>
          <Spacer height={Space * 2} />
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            この作者の作品はありません
          </Text>
        </>
      )}
    </>
  );
};
