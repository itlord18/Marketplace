import { createInstance, i18n, TFunction } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { useState, useEffect } from "react";
import { getOptions } from "./settings";
import type { Language } from "./settings";

/**
 * Инициализация i18next
 */
const initI18next = async (lng: Language, ns?: string): Promise<i18n> => {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions({ lng, ns }));

  return i18nInstance;
};


export function useTranslation(lng: Language) {
  const [t, setT] = useState<TFunction>(() => ((key: string) => key) as TFunction);
  const [i18nInstance, setI18nInstance] = useState<i18n | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const i18nextInstance = await initI18next(lng);
        if (isMounted) {
          setT(() => i18nextInstance.getFixedT(lng));
          setI18nInstance(i18nextInstance);
        }
      } catch (error) {
        console.error("Error initializing i18next:", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [lng]);

  return { t, i18n: i18nInstance };
}
