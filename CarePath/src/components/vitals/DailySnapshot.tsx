import { Card } from "../ui/Card";

export const DailySnapshot = () => (
  <Card>
    <h3 className="font-medium text-gray-700 mb-3">Daily Health Snapshot</h3>
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div>
        <p className="text-gray-500">BP</p>
        <p className="font-semibold">120/80</p>
      </div>
      <div>
        <p className="text-gray-500">Glucose</p>
        <p className="font-semibold">110 mg/dL</p>
      </div>
      <div>
        <p className="text-gray-500">Heart Rate</p>
        <p className="font-semibold">72 bpm</p>
      </div>
    </div>
  </Card>
);


