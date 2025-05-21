import LabTestList from '@/components/lab/LabTestList';
import { mockLabTests } from '@/lib/mockData';
import type { LabTest } from '@/types';

async function getLabTests(): Promise<LabTest[]> {
  // In a real app, fetch data from an API
  return Promise.resolve(mockLabTests);
}

export default async function LabTestsPage() {
  const labTests = await getLabTests();

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-primary/5 rounded-lg">
        <h1 className="text-3xl font-bold text-primary">Book Lab Tests</h1>
        <p className="text-foreground/80 mt-2">Schedule your lab tests conveniently online.</p>
      </section>
      
      <section>
        <LabTestList tests={labTests} />
      </section>
    </div>
  );
}
