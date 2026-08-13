"use client";

import { useSyncExternalStore } from "react";

export type Lang = 'en' | 'es';

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("sega_lang_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("sega_lang_change", callback);
  };
}

function getSnapshot(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem("sega_lang") as Lang;
    if (saved === "en" || saved === "es") return saved;
  } catch (e) {}
  return "en";
}

function getServerSnapshot(): Lang {
  return "en";
}

export function useLanguage(): [Lang, (newLang: Lang) => void] {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = (newLang: Lang) => {
    try {
      localStorage.setItem("sega_lang", newLang);
      document.cookie = `sega_lang=${newLang}; path=/; max-age=31536000`;
      window.dispatchEvent(new Event("sega_lang_change"));
    } catch (e) {}
  };

  return [lang, setLang];
}
