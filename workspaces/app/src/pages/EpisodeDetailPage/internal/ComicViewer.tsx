import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ComicViewerCore } from '../../../features/viewer/components/ComicViewerCore';
import { addUnitIfNeeded } from '../../../lib/css/addUnitIfNeeded';

const IMAGE_WIDTH = 1075;
const IMAGE_HEIGHT = 1518;

const MIN_VIEWER_HEIGHT = 500;
const MAX_VIEWER_HEIGHT = 650;

const MIN_PAGE_WIDTH = Math.floor((MIN_VIEWER_HEIGHT / IMAGE_HEIGHT) * IMAGE_WIDTH);

const _Container = styled.div`
  position: relative;
`;

const _Wrapper = styled.div<{
  $maxHeight: number;
}>`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  max-height: ${({ $maxHeight }) => addUnitIfNeeded($maxHeight)};
  overflow: hidden;
`;

type Props = {
  episodeId: string;
};

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
export const ComicViewer: React.FC<Props> = ({ episodeId }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [viewerHeight, setViewerHeight] = useState(MIN_VIEWER_HEIGHT);

  const update = () => {
    // コンテナの幅
    const cqw = (ref?.current?.getBoundingClientRect().width ?? 0) / 100;
    // 1画面に表示できるページ数（1 or 2）
    const pageCountParView = 100 * cqw <= 2 * MIN_PAGE_WIDTH ? 1 : 2;
    // 1ページの幅の候補
    const candidatePageWidth = (100 * cqw) / pageCountParView;
    // 1ページの高さの候補
    const candidatePageHeight = (candidatePageWidth / IMAGE_WIDTH) * IMAGE_HEIGHT;
    // ビュアーの高さ
    const viewerHeight = clamp(candidatePageHeight, MIN_VIEWER_HEIGHT, MAX_VIEWER_HEIGHT);
    console.log(viewerHeight);
    setViewerHeight(viewerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', update);
    update(); // 最初の読み込み時にもサイズを更新
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <_Container ref={ref}>
      <_Wrapper $maxHeight={viewerHeight}>
        <ComicViewerCore episodeId={episodeId} />
      </_Wrapper>
    </_Container>
  );
};
