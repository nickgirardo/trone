import { ChangeEventHandler, useState } from "react";
import { dumpDb, getDB } from "../../../db";
import { ConfirmModal } from "../Confirm";
import { readFile } from "../../../util";
import { RootState, resetForImport, useAppDispatch } from "../../../store";

import "./import-export.scss";

export const ImportExport = () => {
  const dispatch = useAppDispatch();

  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [importData, setImportData] = useState<File | null>(null);

  const exportData = async () => {
    const db = await getDB();
    const dbData = await dumpDb(db);

    // NOTE the `.toWellFormed()` property is well supported but isn't currently recognized by my ts
    //@ts-ignore
    const data: string = JSON.stringify(dbData).toWellFormed();

    const today = new Date();
    const dateString = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ].join("-");
    const filename = `trone-data-${dateString}.json`;

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const elem = document.createElement("a");
    elem.href = url;
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
    URL.revokeObjectURL(url);
  };

  const handleImport = async () => {
    if (!importData) return;

    const data = await readFile(importData);
    // TODO should ideally actually parse the data here instead of assuming it's fine
    const importedState = JSON.parse(data) as RootState;

    resetForImport(dispatch, importedState);
  };

  const fileInputChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    if (ev.target.files) setImportData(ev.target.files[0]);
    else setImportData(null);
  };

  return (
    <div className="import-export">
      <h3>Import or export data</h3>
      <div className="controls">
        <button onClick={() => setShowImportModal(true)}>Import Data</button>
        <button onClick={exportData}>Export Data</button>
      </div>
      <ConfirmModal
        isOpen={showImportModal}
        label="Are you sure you want to import data?"
        closeModal={() => setShowImportModal(false)}
        allowConfirm={importData !== null}
        handleConfirm={() => {
          setShowImportModal(false);
          handleImport();
        }}
        noUndo
      >
        <div>
          <div>
            This will overwrite all of your current data. All unsaved data will
            be lost.
          </div>
          <input type="file" onChange={fileInputChange} />
        </div>
      </ConfirmModal>
    </div>
  );
};
