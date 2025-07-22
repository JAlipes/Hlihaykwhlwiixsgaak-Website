import type {HeaderTextBlockProp} from '../../../../shared-types/types';
import React from 'react';

const headerTextBlock: React.FC<HeaderTextBlockProp> = ({ title , text }) => {
    return (
        <> 
            <h1>{ title }</h1>
            <p>{ text }</p>
        </>
    );
}

export default headerTextBlock;
