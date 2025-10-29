interface MainTitleProp {
    titleText : React.ReactNode // strings and jsx formatting
    underline? : boolean;
    className? : string;
}

export default function MainTitle({titleText, underline=true, className=""} : MainTitleProp) {
    const appliedClassName = className ? className : "titleStyle mb-5"; //use custom or default. 
    
    return (    
        
        <h2 className={appliedClassName}>
            {underline ? 
               ( <u className="decoration-black decoration-1 underline-offset-[10px]  2xl:decoration-2 2xl:underline-offset-[20px]">
                    {titleText}
                </u> ) : (
                    <>{titleText}</>
                )
            }
        </h2>
        // Maybe add underline here.
    );
}