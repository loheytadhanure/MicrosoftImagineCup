import { Card } from "../ui/Card";

export const WeeklyRoutineView = () => (
  <Card>
    <h3 className="font-medium text-gray-700 mb-2">Weekly Routine</h3>
    <ul className="text-sm text-gray-600 space-y-1">
      <li>Mon – Walk + Medication</li>
      <li>Tue – Diet focus</li>
      <li>Wed – Vitals review</li>
    </ul>
  </Card>
);


