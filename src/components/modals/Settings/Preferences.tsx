import { useState } from "react";
import { RadioGroup } from "../../RadioGroup";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  setDelCardWarning,
  setDelListWarning,
  setDelProjWarning,
} from "../../../reducers/Preferences";

import "./preferences.scss";

export enum DelProjWarning {
  Always = "Always",
  Never = "Never",
  OnlyWithLists = "Only if it has lists",
}

export enum DelListWarning {
  Always = "Always",
  Never = "Never",
  OnlyWithCards = "Only if it has cards",
}

export enum DelCardWarning {
  Always = "Always",
  Never = "Never",
}

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
      <RadioGroup
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
        label="Warn before deleting cards"
        name="del-cards-warning"
        options={[DelCardWarning.Always, DelCardWarning.Never]}
        value={delCardWarning}
        onChange={(p) => {
          setDelCardWarningHook(p);
          dispatch(setDelCardWarning(p));
        }}
      />
    </div>
  );
};
