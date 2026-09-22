import type { SolutionVisualKind } from '@/src/data/solutions-pages';
import { AllocationChart } from './AllocationChart';
import { CapitalFlowDiagram } from './CapitalFlowDiagram';
import { IntelligencePipeline } from './IntelligencePipeline';
import { RiskArchitectureMap } from './RiskArchitectureMap';

type SolutionVisualizationProps = {
  kind: SolutionVisualKind;
  steps?: string[];
  className?: string;
};

export function SolutionVisualization({ kind, steps = [], className }: SolutionVisualizationProps) {
  switch (kind) {
    case 'capital-flow':
      return <CapitalFlowDiagram steps={steps} className={className} />;
    case 'allocation-chart':
      return <AllocationChart className={className} />;
    case 'risk-map':
      return <RiskArchitectureMap className={className} />;
    case 'intelligence-pipeline':
      return <IntelligencePipeline steps={steps} className={className} />;
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}
