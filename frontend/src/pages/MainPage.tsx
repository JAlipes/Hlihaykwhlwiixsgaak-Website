// Import Component Sections
import TestTailwind from '../components/TestTailwind';
import LogoutButton from '../components/LogoutButton';

// Import Hooks
import { UseAuth } from '../hooks/UseAuth';

export default function MainPage(){
    const { isAuthenticated } = UseAuth();
    
    return (
        <>  
            {isAuthenticated && <LogoutButton/>} {/* Temporary */}
            <TestTailwind/>
        </>
    );
}