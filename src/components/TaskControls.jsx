import { useSignals } from "@preact/signals-react/runtime";
import { SORT_OPTIONS, SORT_ORDERS, FILTERS } from "../config";
import { settings } from "../modules/store";
import Dropdown from "./Dropdown";

export default function TaskControls() {
  useSignals();

  return (
    <div>
      <Dropdown
        options={SORT_OPTIONS}
        defaultSelected={settings.value.sortBy}
        onChange={(value) =>
          (settings.value = { ...settings.value, sortBy: value })
        }
      />
      <Dropdown
        options={SORT_ORDERS}
        defaultSelected={settings.value.sortOrder}
        onChange={(value) =>
          (settings.value = { ...settings.value, sortOrder: value })
        }
      />
    </div>
  );
}
