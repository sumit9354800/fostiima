import { getMargdarshakEdition } from "@/data/margdarshak";

import MargdarshakEdition from "./MargdarshakEdition";

export default function Margdarshak3() {
  const edition = getMargdarshakEdition("margdarshak-3");

  if (!edition) {
    return null;
  }

  return <MargdarshakEdition edition={edition} />;
}