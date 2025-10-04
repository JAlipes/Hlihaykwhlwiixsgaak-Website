// Import Types
import type { EditableImagePropType } from '../../../shared-types/ComponentPropTypes'

/**
 * 
 * A reusable Image edit component
 * 
 * Renders an image an image that can be edited if the user is authenticated.
 * 
 * @param src Default image file path
 * @param alt Alternative Text dispalyed if image doesn't work
 * @param wrapperClassName Tailwind css for the outer div handles position of the image
 * @param imageClassName Tailwind css for the image
 * @param isAuthenticated 
 * @param inputIdString InputID thats custom to each section
 * @param onChangeFunction Handles what happens when image changes 
 */
export default function EditableImage({ src, alt, wrapperClassName = '', imageClassName ='', isAuthenticated, inputIdString, onChangeFunction } : EditableImagePropType){
    return (
        <div className={ wrapperClassName }> 
            <img
                src={ src }
                alt={ alt }
                className={ imageClassName }
                onClick={() => {
                    if (isAuthenticated) {
                        document.getElementById(inputIdString)?.click();
                    }
                }}
            />
            {isAuthenticated && (
                <input
                    id={ inputIdString }
                    type="file"
                    accept="image/*"
                    onChange={onChangeFunction}
                    className="hidden"
                />
            )}
        </div>
    ); 
}   