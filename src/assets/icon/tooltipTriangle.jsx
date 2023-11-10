const TooltipTriangle = ({ children, ...attributes }) => {
  return (
    <svg
      className={`absolute left-0 top-full h-2 w-full font-semibold ${attributes.className}`}
      x="0px"
      y="0px"
      viewBox="0 0 255 255"
    >
      <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
    </svg>
  );
};

export default TooltipTriangle;