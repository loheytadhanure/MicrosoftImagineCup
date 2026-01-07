import { Card } from "../ui/Card";

export const SettingsPanel = () => (
  <Card>
    <h3 className="font-medium text-gray-700 mb-2">Settings</h3>
    <p className="text-sm text-gray-600">
      Selected Condition: Diabetes
    </p>
    <p className="text-xs text-gray-500 mt-1">
      AI suggestions are generated using anonymized patterns and are fully explainable.
    </p>
  </Card>
);


