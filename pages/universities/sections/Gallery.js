import PhotoGallery from "components/partials/PhotoGallery";
import Subsection from "components/ui/Subsection";

const Gallery = ({ university}) => {
    return(
        <Subsection title={university.gallery.length > 0 ? "Галерея" : ""}>
            <PhotoGallery university={university} />
        </Subsection>
    )
}

export default Gallery