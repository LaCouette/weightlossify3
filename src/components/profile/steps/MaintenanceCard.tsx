import { Activity, Footprints, Scale } from 'lucide-react';

interface MaintenanceCardProps {
  baseMaintenance: number;
  neat: number;
  total: number;
}

export function MaintenanceCard({ baseMaintenance, neat, total }: MaintenanceCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Activity className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="font-bold text-gray-900">Maintenance Calories</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Base</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{baseMaintenance}</div>
          <div className="text-xs text-gray-500 mt-1">BMR + TEF</div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Footprints className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">NEAT</span>
          </div>
          <div className="text-xl font-bold text-green-500">+{neat}</div>
          <div className="text-xs text-gray-500 mt-1">from steps</div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Total</span>
          </div>
          <div className="text-xl font-bold text-blue-500">{total}</div>
          <div className="text-xs text-gray-500 mt-1">maintenance</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <strong>Note:</strong> Your maintenance calories include your base metabolic rate, thermic effect of food (TEF), and activity from steps (NEAT).
      </div>
    </div>
  );
}