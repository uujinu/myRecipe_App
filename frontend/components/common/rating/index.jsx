import Rating from "@material-ui/lab/Rating";


export default function RatingStar(props) {
  const { value, onChange, ...otherProps } = props;

  return (
    <Rating
      name="rating"
      value={value}
      defaultValue={0}
      precision={0.5}
      onChange={onChange}
      {...otherProps}
    />
  )
}
