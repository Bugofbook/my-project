import { createContext, ReactNode } from 'react';
import {
    useAuth,
    createAuthAction,
    authState,
    authDispatch,
    AuthText,
} from '@bugofbook/react/hook/system';
type signInApi<Prop, AuthText> = (prop?: Prop) => Promise<AuthText>;
type signOutApi<Prop> = (prop?: Prop) => Promise<void>;
type updateAuthApi<Prop, AuthText> = (prop?: Prop) => Promise<AuthText>;
type setAuthText = (authText: AuthText) => void;
type clearAuthText = () => void;
type openAutoSaveAuth = () => void;
type closeAutoSaveAuth = () => void;
type createAuthProps<LoginProp, LogoutProp, UpdateAuthProp, AuthText> = {
    signInApi: signInApi<LoginProp, AuthText>;
    signOutApi: signOutApi<LogoutProp>;
    updateAuthApi: updateAuthApi<UpdateAuthProp, AuthText>;
    saveAuthText: setAuthText;
    clearAuthText: clearAuthText;
    openAutoSaveAuth: openAutoSaveAuth;
    closeAutoSaveAuth: closeAutoSaveAuth;
};
type authProviderProps = {
    children: ReactNode;
    initAuthText: AuthText;
    initSaveAuth?: boolean;
}
const initAuthContent = {
    text: '',
    hasText: false,
    hasAutoSave: true,
}
/**
 * @template LoginProp,LogOutProp,UpdateAuthProp,AuthText
 * @param {object} params
 * @param {(prop: LoginProp) => Promise<AuthText>} params.signInApi - api for sign in
 * @param {(prop: LogOutProp) => Promise<void>} params.signOutApi - api for sign out
 * @param {(prop: UpdateAuthProp) => Promise<AuthText>} params.updateAuthApi - api for update auth
 * @param {(authText: AuthText) => void} params.saveAuthText - save auth text
 * @param {() => void} params.clearAuthText - clear auth text
 * @param {() => void} params.openAutoSaveAuth - open auto save auth
 * @param {() => void} params.closeAutoSaveAuth - close auto save auth
 * @returns
 */
export function createAuth<LoginProp, LogOutProp, UpdateAuthProp>({
    signInApi,
    signOutApi,
    updateAuthApi,
    saveAuthText,
    clearAuthText,
    openAutoSaveAuth,
    closeAutoSaveAuth,
}: createAuthProps<LoginProp, LogOutProp, UpdateAuthProp, AuthText>) {
    const AuthContent = createContext<authState>(initAuthContent);
    const AuthDispatchContent = createContext<authDispatch<LoginProp, LogOutProp, UpdateAuthProp, AuthText>>(() => {return;});
    const AuthProvider = ({children,initAuthText,initSaveAuth = true,}: authProviderProps) => {
        const [authState, dispatch] = useAuth(
            initAuthText,
            initSaveAuth,
            signInApi,
            signOutApi,
            updateAuthApi,
            saveAuthText,
            clearAuthText,
            openAutoSaveAuth,
            closeAutoSaveAuth
        );
        return (
            <AuthContent.Provider value={ authState }>
                <AuthDispatchContent.Provider value={ dispatch }>
                    { children }
                </AuthDispatchContent.Provider>
            </AuthContent.Provider>
        );
};
return {
    /**
     * content for auth-State
     */
    AuthContent,
    /**
     * content for auth-dispatch
     */
    AuthDispatchContent,
    /**
     * create action for auth
     */
    AuthCreateAction: createAuthAction,
    /**
     * provider for auth
     */
    AuthProvider,
};
}
