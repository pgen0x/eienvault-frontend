import TooltipTriangle from "@/assets/icon/tooltipTriangle";

const TopTooltip = ({...attribute}) => {
  return (
    <div className={`absolute -top-10 z-10 w-28 rounded-lg backdrop-blur-sm backdrop-opacity-60 bg-neutral-500/80 px-3 py-2 text-center text-xs text-white opacity-0 group-hover:opacity-100 ${attribute.className}`}>
      {attribute.title}
      <TooltipTriangle className="text-neutral-500" />
    </div>
  );
};

export default TopTooltip;
