import { useCallback } from 'react';
import {
    createTextAutoSaveAction,
    useTextAutoSave,
    textAutoSaveState,
} from '@bugofbook/react/hook/text';
export type AuthText = string;
export type authState = textAutoSaveState<AuthText>;
type signInApi<Prop, AuthText> = (prop?: Prop) => Promise<AuthText>;
type signOutApi<Prop> = (prop?: Prop) => Promise<void>;
type updateAuthApi<Prop, AuthText> = (prop?: Prop) => Promise<AuthText>;
type setAuthText = (authText: string) => void;
type clearAuthText = () => void;
type openAutoSaveAuth = () => void;
type closeAutoSaveAuth = () => void;

type outSideSiginAction<LoginProp> = {
    type: 'signIn';
    data: LoginProp;
};
type outSideSignOutAction<LogoutProp> = {
    type: 'signOut';
    data: LogoutProp;
};
type outSideControlAutoAuthAction = {
    type: 'controlAutoAuth';
    data: boolean;
};
type outSideUpdateAuthAction<UpdateAuthProp> = {
    type: 'updateAuth';
    data: UpdateAuthProp;
};
type outSideAuthAction<LoginProp, LogoutProp, UpdateAuthProp> =
    | outSideSiginAction<LoginProp>
    | outSideSignOutAction<LogoutProp>
    | outSideControlAutoAuthAction
    | outSideUpdateAuthAction<UpdateAuthProp>;
type outSideSignInFunction<LoginProp, AuthText> = (
    props: outSideSiginAction<LoginProp>
) => Promise<AuthText>;
type outSideSignOutFunction<LogoutProp> = (
    props: outSideSignOutAction<LogoutProp>
) => Promise<void>;
type outSideUpdateAuthFunction<UpdateAuthProp> = (
    props: outSideUpdateAuthAction<UpdateAuthProp>
) => Promise<boolean>;
type outSideControlAutoAuthFunction = (
    props: outSideControlAutoAuthAction
) => void;

export type authDispatch<LoginProp, LogoutProp, UpdateAuthProp, AuthText> =
    | outSideSignInFunction<LoginProp, AuthText>
    | outSideSignOutFunction<LogoutProp>
    | outSideUpdateAuthFunction<UpdateAuthProp>
    | outSideControlAutoAuthFunction
    | (() => void);

function createSignInAction<LoginProp>(
    data: LoginProp
): outSideSiginAction<LoginProp> {
    return {
        type: 'signIn',
        data,
    };
}
function createSignOutAction<LogoutProp>(
    data: LogoutProp
): outSideSignOutAction<LogoutProp> {
    return {
        type: 'signOut',
        data,
    };
}
function changeAutoAuthAction(data: boolean): outSideControlAutoAuthAction {
    return {
        type: 'controlAutoAuth',
        data,
    };
}
function createUpdateAuthAction<UpdateAuthProp>(
    data: UpdateAuthProp
): outSideUpdateAuthAction<UpdateAuthProp> {
    return {
        type: 'updateAuth',
        data,
    };
}
export const createAuthAction = {
    /**
     * 登入
     * @param {object=} data 登入用的資料
     * @returns {outSideSiginAction}
     */
    signIn: createSignInAction,
    /**
     * 登出
     * @param {object=} data 登出用的資料
     * @returns {outSideSignOutAction}
     */
    signOut: createSignOutAction,
    /**
     * 控制自動登入
     * @param {boolean} data 是否自動登入
     * @returns {outSideControlAutoAuthAction}
     */
    controlAutoAuth: changeAutoAuthAction,
    /**
     * 更新登入狀態
     * @param {object=} data 更新登入狀態用的資料
     * @returns {outSideUpdateAuthAction}
     */
    updateAuth: createUpdateAuthAction,
} as {
    signIn: <LoginProp>(data: LoginProp) => outSideSiginAction<LoginProp>;
    signOut: <LogoutProp>(data: LogoutProp) => outSideSignOutAction<LogoutProp>;
    controlAutoAuth: (data: boolean) => outSideControlAutoAuthAction;
    updateAuth: <UpdateAuthProp>(
        data: UpdateAuthProp
    ) => outSideUpdateAuthAction<UpdateAuthProp>;
};
export type useAuth<
    LoginProp,
    LogoutProp,
    UpdateAuthProp,
    AuthText extends string
> = (
    initAuthText: AuthText,
    initAutoSaveAuth: boolean,
    signInApi: signInApi<LoginProp, AuthText>,
    signOutApi: signOutApi<LogoutProp>,
    updateAuthApi: updateAuthApi<UpdateAuthProp, AuthText>,
    saveAuthText: setAuthText,
    clearAuthText: clearAuthText,
    openAutoSaveAuth: openAutoSaveAuth,
    closeAutoSaveAuth: closeAutoSaveAuth
) => [
            textAutoSaveState<AuthText>,
            authDispatch<LoginProp, LogoutProp, UpdateAuthProp, AuthText>
        ];

/**
 *
 * @param initAuthText - initial auth-text
 * @param initAutoSaveAuth - initial auto-save-auth
 * @param signInApi - sign-in api
 * @param signOutApi - sign-out api
 * @param updateAuthApi - update auth-text api
 * @param saveAuthText - function for save auth-text
 * @param clearAuthText - function for clear auth-text
 * @param openAutoSaveAuth - function for open auto-save-auth
 * @param closeAutoSaveAuth - function for close auto-save-auth
 * @returns
 */
export function useAuth<
    LoginProp,
    LogOutProp,
    UpdateAuthProp,
    AuthText extends string
>(
    initAuthText: AuthText,
    initAutoSaveAuth: boolean,
    signInApi: signInApi<LoginProp, AuthText>,
    signOutApi: signOutApi<LogOutProp>,
    updateAuthApi: updateAuthApi<UpdateAuthProp, AuthText>,
    saveAuthText: setAuthText,
    clearAuthText: clearAuthText,
    openAutoSaveAuth: openAutoSaveAuth,
    closeAutoSaveAuth: closeAutoSaveAuth
): [
        textAutoSaveState<AuthText>,
        authDispatch<LoginProp, LogOutProp, UpdateAuthProp, AuthText>
    ] {
    const [authState, dispatch] = useTextAutoSave({
        initText: initAuthText,
        initAutoSave: initAutoSaveAuth,
        saveText: saveAuthText,
        clearText: clearAuthText,
        openAutoSave: openAutoSaveAuth,
        closeAutoSave: closeAutoSaveAuth,
    });
    const signIn = useCallback(
        async (props?: LoginProp) => {
            try {
                const authText = await signInApi(props);
                dispatch(createTextAutoSaveAction.setText(authText));
                return authText;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        [dispatch, signInApi]
    );
    const signOut = useCallback(
        async (props?: LogOutProp) => {
            try {
                await signOutApi(props);
                dispatch(createTextAutoSaveAction.clearText());
                return;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        [dispatch, signOutApi]
    );
    const controlAutoSave = useCallback(
        (hasAutoSignInAuth: boolean) => {
            if (hasAutoSignInAuth) {
                dispatch(createTextAutoSaveAction.openAutoSave());
            } else {
                dispatch(createTextAutoSaveAction.closeAutoSave());
            }
        },
        [dispatch]
    );
    const updateAuth = useCallback(
        async (props?: UpdateAuthProp) => {
            try {
                const authText = await updateAuthApi(props);
                dispatch(createTextAutoSaveAction.setText(authText));
                return true;
            } catch (error) {
                console.error(error);
                dispatch(createTextAutoSaveAction.clearText());
                return false;
            }
        },
        [dispatch, updateAuthApi]
    );
    const outSideDispatch = useCallback(
        (action: outSideAuthAction<LoginProp, LogOutProp, UpdateAuthProp>) => {
            switch (action.type) {
                case 'signIn': {
                    return signIn(action.data);
                }
                case 'signOut': {
                    return signOut(action.data);
                }
                case 'controlAutoAuth': {
                    return controlAutoSave(action.data);
                }
                case 'updateAuth': {
                    return updateAuth(action.data);
                }
                default: {
                    return () => {
                        return;
                    };
                }
            }
        },
        [controlAutoSave, signIn, signOut, updateAuth]
    );
    return [authState, outSideDispatch];
}
