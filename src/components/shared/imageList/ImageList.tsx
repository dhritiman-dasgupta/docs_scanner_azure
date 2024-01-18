import { IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import "./ImageList.css"

const ImageList = ({ imageArray, deleteImageByIndex }: { imageArray: string[], deleteImageByIndex: (indexToDelete: number) => void }) => {
    return (
        <div className='imageList'>
            {imageArray.map((image, index) => {
                return (
                    <div className="image" key={index}>
                        <img src={image} alt="captured" className="doc-image" />
                        <div className="bottom">
                            <p>{index + 1}</p>
                            <IconButton style={{ color: "red" }} onClick={() => deleteImageByIndex(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ImageList