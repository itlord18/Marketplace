export const fallbackLng = "en" as const;
export const languages = [fallbackLng, "pl", "ru"] as const;

export type Language = (typeof languages)[number]; // "en" | "pl" | "ru"

export const defaultNS = "translation" as const;
export const cookieName = "i18next" as const;

export interface NativeName {
  nativeName: string;
}

export const nativeNames: Record<Language, NativeName> = {
  en: { nativeName: "English" },
  pl: { nativeName: "Polski" },
  ru: { nativeName: "Русский" },
};

interface GetOptionsArgs {
  lng?: Language;
  ns?: string;
}


export function getOptions({
  lng = fallbackLng,
  ns = defaultNS,
}: GetOptionsArgs = {}) {
  return {
    supportedLngs: languages as unknown as string[],
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
