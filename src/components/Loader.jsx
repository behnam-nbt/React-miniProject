import ClipLoader from "react-spinners/ClipLoader";

function Loader() {
    return (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
            <ClipLoader
                color="#090ef2"
                size={40}
                speedMultiplier={0}
            />
        </div>
    )
}

export default Loader