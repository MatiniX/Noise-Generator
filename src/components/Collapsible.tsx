import React, { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  setOpen: (open: React.SetStateAction<boolean>) => void;
};

const Collapsible: React.FC<Props> = ({ open, children, setOpen }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open) {
      setHeight(ref.current?.getBoundingClientRect().height!);
    } else {
      setHeight(0);
    }
  }, [open]);

  // resize the collapsible when its height changes
  useEffect(() => {
    if (!height || !open || !ref.current) return undefined;
    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, open]);

  return (
    <>
      <div className="my-collapse" style={{ height }}>
        <div ref={ref}>
          <div>{open && <div className="p-1">{children}</div>}</div>
        </div>
      </div>
    </>
  );
};

export default Collapsible;
