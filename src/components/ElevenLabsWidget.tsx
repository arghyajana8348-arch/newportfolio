import { useEffect } from "react";

export function ElevenLabsWidget() {
  useEffect(() => {
    // Load the ElevenLabs script globally if not already present
    let script = document.querySelector('script[src*="convai-widget-embed"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }

    // Append the custom element directly to document.body (bypassing React virtual DOM)
    let convElement = document.querySelector("elevenlabs-convai");
    if (!convElement) {
      convElement = document.createElement("elevenlabs-convai");
      convElement.setAttribute("agent-id", "agent_0301kxe7a8axfdy83d5y3tznaaqb");
      convElement.setAttribute("branch-id", "agtbrch_8301kxe7aa9ae0f8j32yx4cwcytr");
      convElement.setAttribute("branch", "agtbrch_8301kxe7aa9ae0f8j32yx4cwcytr");
      convElement.setAttribute("dismissible", "true");
      convElement.setAttribute("avatar-orb-color-1", "#6dd3ff");
      convElement.setAttribute("avatar-orb-color-2", "#8b82ff");
      document.body.appendChild(convElement);
    }

    return () => {
      // Clean up the custom element when the component unmounts
      if (convElement && document.body.contains(convElement)) {
        document.body.removeChild(convElement);
      }
    };
  }, []);

  return null; // Bypasses React render and hydration matching completely
}
