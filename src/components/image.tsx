const Image = (props:any)=>{
    // const {src} = useImage({srcList: props.src});
    return <img src={props.src} className={props.className} alt={props.alt} />
}
export default Image;