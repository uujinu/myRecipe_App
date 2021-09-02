import { Avatar } from "@material-ui/core";

export default function ImageAvatar(props) {
    const { name, image } = props;
    return ( 
        <Avatar alt={name} src={image !== null ? image : "/profile_basic.PNG"} />
    )
}