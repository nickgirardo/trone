import { useState } from "react";
import { RadioGroup } from "../../RadioGroup";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  DelCardWarning,
  DelListWarning,
  DelProjWarning,
  setDelCardWarning,
  setDelListWarning,
  setDelProjWarning,
} from "../../../reducers/Preferences";
import { Persistence } from "./Persistence";
import { ImportExport } from "./ImportExport";

import "./preferences.scss";

export const Preferences = () => {
  const dispatch = useAppDispatch();
  const preferences = useAppSelector((state) => state.preferences);

  const [delProjWarning, setDelProjWarningHook] = useState<DelProjWarning>(
    preferences.delProjWarning
  );

  const [delListWarning, setDelListWarningHook] = useState<DelListWarning>(
    preferences.delListWarning
  );

  const [delCardWarning, setDelCardWarningHook] = useState<DelCardWarning>(
    preferences.delCardWarning
  );

  return (
    <div className="preferences">
      <h3>Preferences</h3>
      <RadioGroup
        className="preference-item"
        label="Warn before deleting projects"
        name="del-project-warning"
        options={[
          DelProjWarning.Always,
          DelProjWarning.Never,
          DelProjWarning.OnlyWithLists,
        ]}
        value={delProjWarning}
        onChange={(p) => {
          setDelProjWarningHook(p);
          dispatch(setDelProjWarning(p));
        }}
      />
      <RadioGroup
        className="preference-item"
        label="Warn before deleting lists"
        name="del-lists-warning"
        options={[
          DelListWarning.Always,
          DelListWarning.Never,
          DelListWarning.OnlyWithCards,
        ]}
        value={delListWarning}
        onChange={(p) => {
          setDelListWarningHook(p);
          dispatch(setDelListWarning(p));
        }}
      />
      <RadioGroup
        className="preference-item"
        label="Warn before deleting cards"
        name="del-cards-warning"
        options={[DelCardWarning.Always, DelCardWarning.Never]}
        value={delCardWarning}
        onChange={(p) => {
          setDelCardWarningHook(p);
          dispatch(setDelCardWarning(p));
        }}
      />
      <Persistence />
      <ImportExport />
    </div>
  );
};
