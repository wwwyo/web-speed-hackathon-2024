import { createReadStream } from 'node:fs';
import type { ReadStream } from 'node:fs';
import path from 'node:path';

import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';

import { IMAGES_PATH } from '../../constants/paths';

const createStreamBody = (stream: ReadStream) => {
  const body = new ReadableStream({
    cancel() {
      stream.destroy();
    },
    start(controller) {
      stream.on('data', (chunk) => {
        controller.enqueue(chunk);
      });
      stream.on('end', () => {
        controller.close();
      });
    },
  });

  return body;
};

const SUPPORTED_IMAGE_EXTENSIONS = ['jxl', 'avif', 'webp', 'png', 'jpeg', 'jpg'] as const;

type SupportedImageExtension = (typeof SUPPORTED_IMAGE_EXTENSIONS)[number];

function isSupportedImageFormat(ext: unknown): ext is SupportedImageExtension {
  return (SUPPORTED_IMAGE_EXTENSIONS as readonly unknown[]).includes(ext);
}

const IMAGE_MIME_TYPE: Record<SupportedImageExtension, string> = {
  ['avif']: 'image/avif',
  ['jpeg']: 'image/jpeg',
  ['jpg']: 'image/jpeg',
  ['jxl']: 'image/jxl',
  ['png']: 'image/png',
  ['webp']: 'image/webp',
};

const app = new Hono();

app.get(
  '/images/:imageFile',
  zValidator(
    'param',
    z.object({
      imageFile: z.string().regex(/^[a-f0-9-]+(?:\.\w*)?$/),
    }),
  ),
  zValidator(
    'query',
    z.object({
      format: z.string().optional(),
      height: z.coerce.number().optional(),
      width: z.coerce.number().optional(),
    }),
  ),
  async (c) => {
    const { globby } = await import('globby');

    const origFileGlob = [path.resolve(IMAGES_PATH, `${c.req.valid('param').imageFile}.*`)];
    const [origFilePath] = await globby(origFileGlob, { absolute: true, onlyFiles: true });
    if (origFilePath == null) {
      throw new HTTPException(404, { message: 'Not found.' });
    }

    const origImgFormat = path.extname(origFilePath).slice(1);
    if (!isSupportedImageFormat(origImgFormat)) {
      throw new HTTPException(500, { message: 'Failed to load image.' });
    }

    // 圧縮せずにストリームでそのまま返す
    c.header('Content-Type', IMAGE_MIME_TYPE[origImgFormat as SupportedImageExtension]);
    return c.body(createStreamBody(createReadStream(origFilePath)));
  },
);

export { app as imageApp };
