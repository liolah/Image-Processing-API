import sharp, { FormatEnum } from 'sharp';
import path from 'path';
import fs from 'fs';

const IsValidRequestParameters = (name: string, format: string, height: number, width: number): string => {
  const availableImages = fs
    .readdirSync(path.join(__dirname, '../../assets/original'))
    .map((file) => path.parse(file).name);
  const acceptableFormats = [
    'heic',
    'heif',
    'avif',
    'jpeg',
    'jpg',
    'png',
    'raw',
    'tiff',
    'tif',
    'webp',
    'gif',
    'jp2',
    'jpx',
    'j2k',
    'j2c',
  ];
  let err = '';
  if (!availableImages.includes(name)) {
    err = 'Error: The image requested is not available! </br>';
  }
  if (!acceptableFormats.includes(format)) {
    err = `${err}The format requested is not supported! </br>`;
  }
  if (height == null) {
    err = `${err}Image height is required. Enter a value greater than zero. </br>`;
  } else if (height <= 0) {
    err = `${err}Image height must be greater than zero. </br>`;
  }
  if (width == null) {
    err = `${err}Image width is required. Enter a value greater than zero. </br>`;
  } else if (width <= 0) {
    err = `${err}Image width must be greater than zero. </br>`;
  }
  return err;
};

const processImage = async (name: string, format: string, height: number, width: number): Promise<string> => {
  if (IsValidRequestParameters(name, format, height, width) == '') {
    const outputImage = `${name}-${width}x${height}.${format}`;
    const outputImagePath = path.join(__dirname, '../../assets/cache', outputImage);
    if (!fs.existsSync(outputImagePath)) {
      const inputImage = fs.readdirSync(path.join(__dirname, '../../assets/original')).find((image) => { 
        if (image.includes(name))
          return image;
      }) as string;
      await sharp(path.join(__dirname, '../../assets/original', inputImage))
        .resize(width, height)
        .toFormat(format as keyof FormatEnum)
        .toFile(`assets/cache/${outputImage}`);
      return outputImagePath;
    } else {
      return outputImagePath;
    }
  } else {
    throw new Error(IsValidRequestParameters(name, format, height, width));
  }
};

export default { processImage };
