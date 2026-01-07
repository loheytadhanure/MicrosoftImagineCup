import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

export const DoctorSummaryView = () => (
  <Card>
    <h3 className="font-medium text-gray-700 mb-2">Doctor Summary</h3>
    <ul className="text-sm text-gray-600 space-y-1">
      <li>Medication adherence: 92%</li>
      <li>Stable BP trend</li>
      <li>Recent HbA1c increase</li>
    </ul>
    <div className="mt-3 flex gap-2">
      <Button>Export Summary</Button>
      <Button>Share with Doctor</Button>
    </div>
  </Card>
);


