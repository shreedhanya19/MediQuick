import type { LabTest } from '@/types';
import LabTestCard from './LabTestCard';

interface LabTestListProps {
  tests: LabTest[];
}

const LabTestList: React.FC<LabTestListProps> = ({ tests }) => {
  if (!tests || tests.length === 0) {
    return <p className="text-center text-muted-foreground">No lab tests available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {tests.map(test => (
        <LabTestCard key={test.id} test={test} />
      ))}
    </div>
  );
};

export default LabTestList;
