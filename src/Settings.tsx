import { SettingsMap } from "./models";

interface Props {
  settings: SettingsMap;
  onSettingsChange: (settings: SettingsMap) => void;
}

function Settings({ settings, onSettingsChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Settings</h2>
      <label className="flex gap-2 items-center">
        <span>Min score</span>
        <input
          type="number"
          min={0}
          max={100}
          value={settings.minScore}
          onInput={(e) =>
            onSettingsChange({
              ...settings,
              minScore: Number(e.currentTarget.value),
            })
          }
        />
      </label>
    </div>
  );
}

export default Settings;
