import { getMargdarshakEdition } from "@/data/margdarshak";

import MargdarshakEdition from "./MargdarshakEdition";

export default function Margdarshak2() {
  const edition = getMargdarshakEdition("margdarshak-2");

  if (!edition) {
    return null;
  }

  return <MargdarshakEdition edition={edition} />;
}