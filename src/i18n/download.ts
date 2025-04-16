import fs, { writeFileSync } from 'fs';
import https from 'https';
import path from 'path';

import { LokaliseApi } from '@lokalise/node-api';
import AdmZip from 'adm-zip';
import dotenv from 'dotenv';

dotenv.config();

const LOKALISE_API_TOKEN = process.env.LOKALISE_API_TOKEN || '';
const LOKALISE_PROJECT_ID = process.env.LOKALISE_PROJECT_ID || '';

if (!LOKALISE_API_TOKEN || !LOKALISE_PROJECT_ID) {
  console.error('Error: LOKALISE_API_TOKEN or LOKALISE_PROJECT_ID is missing in environment variables.');
  process.exit(1);
}

const lokaliseApi = new LokaliseApi({ apiKey: LOKALISE_API_TOKEN });

/**
 * JSON 파일에서 `\\n`을 `\n`으로 변환하는 함수
 */
function convertNewlinesInJsonFiles(dir: string) {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      // 🔥 하위 폴더까지 탐색
      convertNewlinesInJsonFiles(itemPath);
    } else if (stats.isFile() && itemPath.endsWith('.json')) {
      try {
        const content = fs.readFileSync(itemPath, 'utf8');

        // ✅ JSON 파싱 후 `\\n` 변환 적용
        const jsonObject = JSON.parse(content, (key, value) => {
          if (typeof value === 'string') {
            return value.replace(/\\n/g, '\n'); // ✅ `\\n`을 진짜 `\n`으로 변환
          }
          return value;
        });

        // ✅ JSON.stringify()를 이용해 개행 유지 (가독성 유지)
        const formattedContent = JSON.stringify(jsonObject, null, 2); // << 여기서 개행 유지

        fs.writeFileSync(itemPath, formattedContent, 'utf8');
      } catch (error) {
        console.error(`❌ Error processing ${itemPath}:`, error);
      }
    } else {
      console.log(`⚠️ Skipping non-JSON file or directory: ${itemPath}`);
    }
  });
}

/**
 * ZIP 파일에서 번역 파일을 추출하고 `\n` 변환 적용
 */
function extractTranslations(zipFilePath: string, outputDir: string) {
  try {
    console.log('Extracting translations...');

    const zip = new AdmZip(zipFilePath);
    zip.getEntries().forEach((entry) => {
      if (!entry.isDirectory) {
        const adjustedEntryName = entry.entryName.startsWith('locale/')
          ? entry.entryName.replace(/^locale\//, '')
          : entry.entryName;

        const langDirMap = {
          en: 'en-US',
          zh_CN: 'zh-CN',
          zh_HK: 'zh-HK',
          zh_TW: 'zh-TW',
          ko: 'ko',
          es: 'es',
          de: 'de',
        };
        const directory = adjustedEntryName.split('/')[0];
        const fileName = adjustedEntryName.split('/')[1];
        const adjustedDirectory = langDirMap[directory as keyof typeof langDirMap];
        const filePath = path.join(outputDir, `${adjustedDirectory}/${fileName}`);

        const parentDir = path.dirname(filePath);
        if (!fs.existsSync(parentDir)) {
          console.log(`Creating directory: ${parentDir}`);
          fs.mkdirSync(parentDir, { recursive: true });
        }

        const fileContent = zip.readFile(entry);
        if (!fileContent) {
          console.error(`Error: Failed to read content for ${entry.entryName}`);
          return;
        }

        // fs.writeFileSync(filePath, fileContent);
        writeFileSync(filePath, fileContent as unknown as Parameters<typeof writeFileSync>[1]);
      }
    });

    console.log('All translation files extracted successfully.');

    // ZIP 파일 삭제
    fs.unlinkSync(zipFilePath);

    // ✅ 추출 후 JSON 변환 실행
    convertNewlinesInJsonFiles(outputDir);
  } catch (error) {
    console.error('Error while extracting translations: ', error);
  }
}

/**
 * Lokalise에서 번역 파일을 다운로드하고 변환 적용
 */
async function downloadTranslations() {
  try {
    console.log('Requesting export...');
    const response = await lokaliseApi.files().download(LOKALISE_PROJECT_ID, {
      format: 'json',
      placeholder_format: 'i18n',
      original_filenames: true,
    });

    const bundleUrl = response.bundle_url;
    console.log('Downloading file from:', bundleUrl);

    const outputDir = path.resolve('./public/locales');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const zipFilePath = path.join(outputDir, 'translations.zip');
    const file = fs.createWriteStream(zipFilePath);

    https.get(bundleUrl, (res) => {
      res.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log('Translation files downloaded to:', zipFilePath);

        extractTranslations(zipFilePath, outputDir);
      });
    });
  } catch (error) {
    console.error('Error while downloading translations:', error);
  }
}

downloadTranslations();
