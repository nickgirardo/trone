import { useEffect, useState } from "react";
import cn from "classnames";

import "./persistence.scss";

enum PersistenceState {
  Persisted = "Persisted",
  BestEffort = "Best-Effort",
  Unknown = "Unknown",
}

interface Props {
  className?: string;
}

export const Persistence = ({ className }: Props) => {
  const [isPersisted, setIsPersisted] = useState<PersistenceState>(
    PersistenceState.Unknown
  );

  useEffect(() => {
    navigator.storage.persisted().then(updatePersisted);
  }, []);

  const updatePersisted = (persistence: boolean) =>
    setIsPersisted(
      persistence ? PersistenceState.Persisted : PersistenceState.BestEffort
    );

  return (
    <div className={cn("persistence", className)}>
      <h3>Persistence</h3>
      <div className="status">
        {isPersisted === PersistenceState.Persisted ? (
          <>
            <div className="icon">✅</div>
            <div>
              Your data is being persisted. It will not be removed from your
              browser's storage unless you explicitly clear your browser's
              storage.
            </div>
          </>
        ) : isPersisted === PersistenceState.BestEffort ? (
          <>
            <div className="icon">❗</div>
            <div>
              Your data is not being explicitly persisted. It may be removed
              from your browser's storage under storage pressure.
            </div>
          </>
        ) : (
          <>
            <div className="icon">❓</div>
            <div>
              Attempting to check your browser's storage persistence setting for
              this page...
            </div>
          </>
        )}
      </div>
      {isPersisted === PersistenceState.BestEffort && (
        <button
          onClick={() => navigator.storage.persist().then(updatePersisted)}
        >
          Persist my data
        </button>
      )}
    </div>
  );
};
