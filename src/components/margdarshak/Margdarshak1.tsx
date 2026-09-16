import { getMargdarshakEdition } from "@/data/margdarshak";

import MargdarshakEdition from "./MargdarshakEdition";

export default function Margdarshak1() {
  const edition = getMargdarshakEdition("margdarshak-1");

  if (!edition) {
    return null;
  }

  return <MargdarshakEdition edition={edition} />;
}