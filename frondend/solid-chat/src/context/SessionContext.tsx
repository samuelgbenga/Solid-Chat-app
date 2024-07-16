import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { apiClient } from "../service/api";
import { UserSchema } from "../type/schema";


// setting types for state and function
interface ContextSchema {
    details: UserSchema | null;
    handleUserLogin: LOGIN_FUNC;
    handleUserLogout: () => Promise<void>;
}

// set a state without loader for now
// details contain user details
interface StateSchema {
    details: UserSchema | null;
}

// this is an alias for handleUserLogin
type LOGIN_FUNC = (credentials: {
    username: string;
    password: string;
}) => Promise<void>;

// instantiate the ContextSchema to react context
// so it would be accessible globaly
const SessionContext = createContext<ContextSchema>({
    details: null,
    handleUserLogin: () => Promise.resolve(),
    handleUserLogout: () => Promise.resolve(),
});

const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // set the state of the details
    const [state, setState] = useState<StateSchema>({details: null});

    const navigate = useNavigate();
    const location = useLocation();

    // handle user login
    const handleUserLogin: LOGIN_FUNC = useCallback(
        async (credentials, redirectPath = "/chat") => {

            let userDetails: UserSchema | null = null;

            try {
                const response = await apiClient.post("/login", credentials);
                userDetails = response.data;
                if (userDetails === null)
                    throw new Error("Could not Login this user");
                setState({ details: userDetails });
               
                // stores the new / old user details in a session
                localStorage.setItem("session", JSON.stringify(userDetails));
               
                //  route the user to the chat path (react)
                // with a new history
                // so a user cannot return back 
                // after this action
                navigate(redirectPath, { replace: true });
            } 
            catch (error: unknown) {

                let message = "Something went wrong";
                if (error instanceof AxiosError) {
                    // makes sure there is no error if
                    // any line of chain as null
                    // but if error it will return the default message
                    message = error.response?.data.message ?? message;
                }
                throw new Error(message);

            }
        }, 
        []
    )

    // Handle user logout redirect user to /login
    const handleUserLogout = useCallback(
        async () => {

            try {
                // await apiClient.post("/logout");
                localStorage.removeItem("session");
                // wsClient?.onDisconnected();
            } finally {
                navigate("/login", { replace: true });
            }  // eslint-disable-next-line

            
        }, 
        []
    )


    // handle user authentication if the user is still in session
    // else redirect that user to login page
    const handleIfUserAuthenticated = useCallback(
        async () => {
            setState({ details: null });
            let userDetails: UserSchema;
            // const response = await apiClient.get("/refresh");
            // userDetails = response.data;

            let session = localStorage.getItem("session");
            if (session) {
                userDetails = JSON.parse(session);
                // const wsClient = new WebSocketsClient(userDetails, setOnlineUsers);
                // setWsClient(wsClient);
                setState({ details: userDetails });
                if (location.pathname === "/login" || location.pathname === "/")
                    navigate("/chat", { replace: true });
            } else {
                navigate("/login", { replace: true });
                setState({ details: null });
            }
            // eslint-disable-next-line
        }, []
    );

    // useEffect for any rerender
    // keeps the user on the chat page
    useEffect(() => {
        handleIfUserAuthenticated(); // eslint-disable-next-line
    }, []);

    return (
        <SessionContext.Provider
            value={{ details: state.details,
                 handleUserLogin, 
                 handleUserLogout 
                }}
        >
            {children}
        </SessionContext.Provider>
    );
};

// this would be used by its children to access its properties
export const useSession = () => useContext(SessionContext);

// this would be used by the Application center so children can
// access globally
export default SessionContextProvider;