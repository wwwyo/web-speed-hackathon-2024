import { getImageUrl } from '../../lib/image/getImageUrl';

export const useImageV2 = ({ height, imageId, width }: { height: number; imageId: string; width: number }) => {
  const dpr = window.devicePixelRatio;
  return getImageUrl({
    format: 'webp',
    height: height * dpr,
    imageId,
    width: width * dpr,
  });
};
