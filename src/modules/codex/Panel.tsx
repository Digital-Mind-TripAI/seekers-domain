import { HandbookPanel as HandbookPanelContent } from "../handbook/HandbookPanel";

// Re-export the primary Handbook panel to keep module imports consistent.
export default function HandbookPanel() {
  return <HandbookPanelContent />;
}
