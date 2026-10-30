import evidenceDesk from "../../content/tools/evidence-desk.html?raw";
import exposureLab from "../../content/tools/exposure-lab.html?raw";
import reviewLab from "../../content/tools/review-lab.html?raw";
import riskDesk from "../../content/tools/risk-desk.html?raw";
import sessionPlanner from "../../content/tools/session-planner.html?raw";
import strategyLab from "../../content/tools/strategy-lab.html?raw";

const files: Record<string, string> = {
  "evidence-desk.html": evidenceDesk,
  "exposure-lab.html": exposureLab,
  "review-lab.html": reviewLab,
  "risk-desk.html": riskDesk,
  "session-planner.html": sessionPlanner,
  "strategy-lab.html": strategyLab,
};

export function readToolHtml(file: string): string | null {
  return files[file] ?? null;
}
