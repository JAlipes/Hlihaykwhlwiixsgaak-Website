/**
 * A resuable save button component
 * 
 * Executes provided onClickFunction when save button is clicked
 * 
 * @param onClickFunction Function to run when the button is clicked
 * 
 */
export default function SaveEditsButton({onClickFunction} : {onClickFunction: () => void}){
    return(
        <button
            onClick={onClickFunction}
            
            className='bg-red-600 text-white px-4 py-2 rounded'
        >
            Save
        </button>
    );
}