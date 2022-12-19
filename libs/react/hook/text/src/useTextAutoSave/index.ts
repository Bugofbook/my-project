import { useReducer, Reducer } from 'react';

type useDataTextProps<Text extends string> = {
  /**
   * Initial text
   */
  initText: Text | undefined;
  /**
   * Initial auto-save informaton
   */
  initAutoSave: boolean;
  /**
   * The function saving the text to storage
   */
  saveText: (text: string) => void;
  /**
   * The function clearing the storage
   */
  clearText: () => void;
  /**
   * The function to save the auto-save information
   */
  openAutoSave: () => void;
  /**
   * The function to clear the auto-save infomation
   */
  closeAutoSave: () => void;
};
export type textAutoSaveState<Text extends string> = {
  /**
   * The text to be used in the custom hook
   */
  text: Text | '';
  /**
   * Boolean to check if the text is empty or not
   */
  hasText: boolean;
  hasAutoSave: boolean;
};
/**
 * @typedef {Object} setTextAction
 * @porperty {"setText"} type
 * @property {string} text - The text to be used in the custom hook
 */
type setTextAction<Text extends string> = {
  type: 'setText';
  text: Text;
};
/**
 * @typedef {Object} clearTextAction
 * @porperty {"clearText"} type
 */
type clearTextAction = {
  type: 'clearText';
};
/**
 * @typedef {Object} openAutoSaveAction
 * @porperty {"openAutoSave"} type
 */
type openAutoSaveAction = {
  type: 'openAutoSave';
};
/**
 * @typedef {Object} closeAutoSaveAction
 * @porperty {"closeAutoSave"} type
 */
type closeAutoSaveAction = {
  type: 'closeAutoSave';
};
type dataAction<Text extends string> =
  | setTextAction<Text>
  | clearTextAction
  | openAutoSaveAction
  | closeAutoSaveAction;
type dataReducer<Text extends string> = Reducer<
  textAutoSaveState<Text>,
  dataAction<Text>
>;

function initFunction<Text extends string>({
  initText,
  initAutoSave,
}: {
  initText: Text | undefined;
  initAutoSave: boolean;
}): textAutoSaveState<Text> {
  if (initText === undefined) {
    return {
      text: '',
      hasText: false,
      hasAutoSave: initAutoSave,
    };
  } else {
    return {
      text: initText,
      hasText: true,
      hasAutoSave: initAutoSave,
    };
  }
}
/**
 *
 * @param {string} text
 * @returns {setTextAction} - The action to be set text to the custom hook
 */
function createSetAction<Text extends string>(text: Text): setTextAction<Text> {
  return {
    type: 'setText',
    text,
  };
}
/**
 *
 * @returns {clearTextAction} - The action to be clear text from the custom hook
 */
function createClearAction(): clearTextAction {
  return {
    type: 'clearText',
  };
}
/**
 *
 * @returns {openAutoSaveAction} - The action to be open auto save
 */
function createOpenAutoSaveAction(): openAutoSaveAction {
  return {
    type: 'openAutoSave',
  };
}
/**
 *
 * @returns {closeAutoSaveAction} - The action to be close auto save
 */
function createCloseAutoSaveAction(): closeAutoSaveAction {
  return {
    type: 'closeAutoSave',
  };
}
/**
 * create a action for dispatch to the custom hook
 * @typedef {object} createAction
 * @property {(text: string) => setTextAction<string>} set - set text to the custom hook
 * @property {() => clearTextAction} clear - clear text from the custom hook
 * @property {() => openAutoSaveAction} openAutoSave - open auto save
 * @property {() => closeAutoSaveAction} closeAutoSave - close auto save
 */
export const createTextAutoSaveAction = {
  /**
   * set text to the custom hook
   * @param {Text} text - The text to be used in the custom hook
   * @returns {setTextAction<Text>} - The action to be set text to the custom hook
   */
  setText: createSetAction,
  /**
   * clear text from the custom hook
   * @returns {clearTextAction} - The action to be clear text from the custom hook
   */
  clearText: createClearAction,
  /**
   * open auto save
   */
  openAutoSave: createOpenAutoSaveAction,
  /**
   * close auto save
   */
  closeAutoSave: createCloseAutoSaveAction,
} as {
  setText: <Text extends string>(text: Text) => setTextAction<Text>;
  clearText: () => clearTextAction;
  openAutoSave: () => openAutoSaveAction;
  closeAutoSave: () => closeAutoSaveAction;
};
/**
 * the custom hook used for save string to storage
 *
 * Warning: all the function must be used for "synchronous logic" and will ignore Error
 * @template Text
 * @param {object} object
 * @param {Text} object.initText - Initial text
 * @param {boolean} object.initAutoSave - Initial auto-save information
 * @param {(text: Text) => void} object.saveText - The function saving the text to storage
 * @param {() => void} object.clearText - The function clearing the storage
 * @param {() => void} object.openAutoSave - The function to save the auto-save information
 * @param {() => void} object.closeAutoSave - The function to clear the auto-save infomation
 * @returns
 */
export function useTextAutoSave<Text extends string>({
  initText,
  initAutoSave,
  saveText,
  clearText,
  openAutoSave,
  closeAutoSave,
}: useDataTextProps<Text>) {
  function reducer<Text extends string>(
    state: textAutoSaveState<Text>,
    action: dataAction<Text>
  ): textAutoSaveState<Text> {
    switch (action.type) {
      case 'setText': {
        const text = action.text;
        try {
          if (state.hasAutoSave) {
            saveText(text);
          }
        } catch (error) {
          console.error(error);
        }
        if (text !== state.text) {
          return {
            ...state,
            text,
            hasText: true,
          };
        } else if (state.hasText) {
          return state;
        } else {
          return {
            ...state,
            hasText: true,
          };
        }
      }
      case 'clearText': {
        try {
          clearText();
        } catch (error) {
          console.error(error);
        }
        return {
          ...state,
          text: '',
          hasText: false,
        };
      }
      case 'openAutoSave': {
        try {
          saveText(state.text);
          openAutoSave();
        } catch (error) {
          console.error(error);
        }
        return {
          ...state,
          hasAutoSave: true,
        };
      }
      case 'closeAutoSave': {
        try {
          closeAutoSave();
          clearText();
        } catch (error) {
          console.error(error);
        }
        return {
          ...state,
          hasAutoSave: false,
        };
      }
      default:
        return state;
    }
  }
  return useReducer<dataReducer<Text>>(
    reducer,
    initFunction({ initText, initAutoSave })
  );
}
