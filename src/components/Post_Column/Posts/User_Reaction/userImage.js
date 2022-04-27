export default function UserImage(props) {
  return (
    <img
      src={`${process.env.HOST}/media/${props.image}`}
      className="rounded-full h-10 w-10 sm:h-12 sm:w-12"
      alt={"user-image"}
    />
  );
}
