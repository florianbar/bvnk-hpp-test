import { useState } from "react";

async function copyLink(link: string) {
  if (!navigator.clipboard) {
    return;
  }

  await navigator.clipboard.writeText(link);
}

export default function CopyLink({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  function copyLinkHandler() {
    copyLink(link);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <button type="button" onClick={copyLinkHandler} disabled={copied}>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
