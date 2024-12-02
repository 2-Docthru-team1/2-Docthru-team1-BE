import * as deepl from 'deepl-node';
import { deeplApiKey } from '#configs/deepl.config.js';

const translator = new deepl.Translator(deeplApiKey);

export default async function deeplTranslate(
  textArray: string[],
  sourceLang: deepl.SourceLanguageCode = 'en',
  targetLang: deepl.TargetLanguageCode = 'ko',
) {
  const result = await translator.translateText(textArray, sourceLang, targetLang);
  const translatedTexts = result.map(item => item.text);
  return translatedTexts;
}
