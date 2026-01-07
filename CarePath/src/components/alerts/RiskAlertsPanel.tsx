import { Card } from "../ui/Card";

export const RiskAlertsPanel = () => (
  <Card>
    <h3 className="font-medium text-gray-700 mb-2">Health Alerts</h3>
    <p className="text-sm text-gray-600">
      Risk Level: <span className="font-semibold">Moderate</span>
    </p>
    <p className="text-sm text-gray-500 mt-1">
      Consider consulting your doctor if elevated glucose persists for 3 days.
    </p>
  </Card>
);


