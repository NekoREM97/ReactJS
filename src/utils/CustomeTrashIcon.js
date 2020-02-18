const CustomeTrashIcon = ({ type, className, size = 'md', ...restProps }) => (
    <svg  className = {`${className}`} style={{width:"19px",height:"20px", paddingRight:"7px", paddingTop:"3px"}}>
      {/* <use xlinkHref={type} /> svg-sprite-loader@0.3.x */}
      <use xlinkHref={`#${type.default.id}`} /> {/* svg-sprite-loader@latest */}
    </svg>
);
export default CustomeTrashIcon;