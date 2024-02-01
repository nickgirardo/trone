import { useState } from "react";

import "./index.scss";

export const MobileWarning = () => {
  const [showWarning, setShowWarning] = useState<boolean>(true);

  if (!showWarning) return <></>;

  return (
    <div className="mobile-warning">
      <div className="body">
        This tool is not currently designed to work on devices with small
        screens such as mobile phones!
      </div>
      <div className="icon" onClick={() => setShowWarning(false)}>
        ×
      </div>
    </div>
  );
};
