"use client";

import { useEffect, useRef, useState } from "react";
import MarkdownIt from "markdown-it";
import { LoaderCircle } from "lucide-react";

const CHATBOT_CSS_URL =
  "https://eechat.extraaedge.com/css/fostiima/StyleSheet.css";

const EMOJI_CSS_URL =
  "https://chatbotprod.blob.core.windows.net/web/mitaoecss/cmp/emoji.cmp.css";

const DATETIMEPICKER_CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.css";

const JQUERY_URL =
  "https://code.jquery.com/jquery-1.11.3.min.js";

const REQUIRED_JS = [
  "https://chatbotprod.blob.core.windows.net/web/mitaoecss/cmp/config.cmp.js",
  "https://chatbotprod.blob.core.windows.net/web/mitaoecss/cmp/util.cmp.js",
  "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js",
  "https://chatbotprod.blob.core.windows.net/web/mitaoecss/cmp/jquery.emojiarea.cmp.js",
  "https://chatbotprod.blob.core.windows.net/web/mitaoecss/cmp/emoji-picker.cmp.js",
  "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js",
];

const CHATBOT_ENGINE_URL =
  "https://chatbotprod.blob.core.windows.net/web/minified/cmp/chatbot.min_01022023.js";

const FOSTIIMA_CHAT_SCRIPT_URL =
  "https://extraaedgeresources.blob.core.windows.net/documents/fbscrm/Chatbot/js/chat.js";

const ENGLISH_JSON_URL =
  "https://chatbotprod.blob.core.windows.net/staticfiles/fbscrm/chatbot/content/english.json";

const EMOJI_ASSETS_PATH =
  "https://eequeuestorage.blob.core.windows.net/staticfiles/miscellaneous/emoji/img";

const CHATBOT_CLIENT_ID =
  "94be5403-2928-4b79-8805-35712ce60602";

const CHATBOT_CLIENT_ALIAS = "fbscrm";

declare global {
  interface Window {
    eeChatBot?: {
      init: (
        clientAlias: string,
        clientId: string,
      ) => void;
    };

    eeChatBotEnglish?: Record<string, unknown>;

    EmojiPicker?: new (options: {
      emojiable_selector: string;
      assetsPath: string;
      popupButtonClasses: string;
    }) => unknown;

    emojiPicker?: unknown;

    jQuery?: unknown;
    $?: unknown;

    markdownit?: typeof MarkdownIt;
  }
}

function loadStylesheet(
  url: string,
  id: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }

    const link = document.createElement("link");

    link.id = id;
    link.rel = "stylesheet";
    link.href = url;

    link.onload = () => resolve();

    link.onerror = () =>
      reject(
        new Error(`Failed to load stylesheet: ${url}`),
      );

    document.head.appendChild(link);
  });
}

function loadScript(
  url: string,
  id: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }

    const script = document.createElement("script");

    script.id = id;
    script.src = url;

    script.onload = () => resolve();

    script.onerror = () =>
      reject(
        new Error(`Failed to load script: ${url}`),
      );

    document.head.appendChild(script);
  });
}

function hideOriginalLauncher() {
  if (
    document.getElementById(
      "__fostiimaChatbotLauncherProtection",
    )
  ) {
    return;
  }

  const style = document.createElement("style");

  style.id =
    "__fostiimaChatbotLauncherProtection";

  style.textContent = `
    #__eechatIcon,
    #eeChatIndicator,
    #_eechatIcon {
      display: none !important;
    }
  `;

  document.head.appendChild(style);
}

function findLauncher(): HTMLElement | null {
  return (
    document.getElementById("__eechatIcon") ??
    document.getElementById("eeChatIndicator") ??
    document.getElementById("_eechatIcon") ??
    document.querySelector<HTMLElement>(
      '[onclick*="eeChatBot.toggleChatWindow"]',
    )
  );
}

async function initializeExtraaEdge() {
  /*
   * Original CSS
   */

  await loadStylesheet(
    CHATBOT_CSS_URL,
    "__fostiimaExtraaEdgeCSS",
  );

  await loadStylesheet(
    EMOJI_CSS_URL,
    "__fostiimaEmojiCSS",
  );

  await loadStylesheet(
    DATETIMEPICKER_CSS_URL,
    "__fostiimaDatePickerCSS",
  );

  /*
   * Local markdown-it
   */

  window.markdownit = MarkdownIt;

  /*
   * jQuery
   */

  if (!window.jQuery) {
    await loadScript(
      JQUERY_URL,
      "__fostiimaJQuery",
    );
  }

  window.$ = window.jQuery;

  /*
   * ExtraaEdge dependencies
   */

  for (
    let index = 0;
    index < REQUIRED_JS.length;
    index += 1
  ) {
    await loadScript(
      REQUIRED_JS[index],
      `__fostiimaExtraaEdgeJS-${index}`,
    );
  }

  /*
   * Chatbot language data
   */

  try {
    const response = await fetch(
      ENGLISH_JSON_URL,
    );

    if (response.ok) {
      window.eeChatBotEnglish =
        await response.json();
    }
  } catch (error) {
    console.error(
      "FOSTIIMA chatbot language error:",
      error,
    );
  }

  /*
   * Chatbot engine
   */

  await loadScript(
    CHATBOT_ENGINE_URL,
    "__fostiimaChatbotEngine",
  );

  /*
   * Original FOSTIIMA loader
   */

  await loadScript(
    FOSTIIMA_CHAT_SCRIPT_URL,
    "__fostiimaOriginalChatScript",
  );

  /*
   * Initialize
   */

  if (window.eeChatBot) {
    window.eeChatBot.init(
      CHATBOT_CLIENT_ALIAS,
      CHATBOT_CLIENT_ID,
    );
  }

  hideOriginalLauncher();

  /*
   * Emoji picker
   */

  window.setTimeout(() => {
    if (
      window.EmojiPicker &&
      !window.emojiPicker
    ) {
      window.emojiPicker =
        new window.EmojiPicker({
          emojiable_selector:
            "[data-emojiable=true]",
          assetsPath:
            EMOJI_ASSETS_PATH,
          popupButtonClasses:
            "fa fa-smile-o",
        });
    }
  }, 3000);
}

export default function ExtraaEdgeChatbot({
  isOpen,
}: {
  isOpen: boolean;
}) {
  const initialized =
    useRef(false);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (initialized.current) {
      const launcher = findLauncher();

      launcher?.click();

      return;
    }

    initialized.current = true;
    setLoading(true);

    let cancelled = false;

    const start = async () => {
      try {
        await initializeExtraaEdge();

        if (cancelled) {
          return;
        }

        setLoading(false);

        window.setTimeout(() => {
          hideOriginalLauncher();

          const launcher =
            findLauncher();

          launcher?.click();
        }, 500);
      } catch (error) {
        console.error(
          "FOSTIIMA ExtraaEdge error:",
          error,
        );

        setLoading(false);
      }
    };

    void start();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  return (
    <>
      {loading && (
        <div
          className="
            fixed
            bottom-24
            right-5
            z-[2147483000]
            flex
            h-16
            items-center
            gap-3
            rounded-xl
            bg-white
            px-5
            shadow-2xl
          "
        >
          <LoaderCircle
            className="
              h-5
              w-5
              animate-spin
              text-[#c31e3b]
            "
          />

          <span
            className="
              text-sm
              font-semibold
              text-[#061a3a]
            "
          >
            Loading FOSTIIMA AI...
          </span>
        </div>
      )}
    </>
  );
}