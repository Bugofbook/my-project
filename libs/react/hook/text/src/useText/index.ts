import { useReducer, Reducer } from 'react';

type useTextProps<Text extends string> = {
  /**
   * Initial text
   */
  initText: Text | undefined;
};
export type textState<Text extends string> = {
  /**
   * The text to be used in the custom hook
   */
  text: Text | '';
  /**
   * Boolean to check if the text is empty or not
   */
  hasText: boolean;
};
type setTextAction<Text extends string> = {
  type: 'setText';
  text: Text;
};
type clearTextAction = {
  type: 'clear';
};
type textAction<Text extends string> = setTextAction<Text> | clearTextAction;
type textReducer<Text extends string> = Reducer<
  textState<Text>,
  textAction<Text>
>;
function reducer<Text extends string>(
  state: textState<Text>,
  action: textAction<Text>
): textState<Text> {
  switch (action.type) {
    case 'setText':
      return {
        text: action.text,
        hasText: true,
      };
    case 'clear':
      return {
        text: '',
        hasText: false,
      };
    default:
      return state;
  }
}

function initFunction<Text extends string>(
  initialText: Text | undefined
): textState<Text> {
  if (initialText === undefined) {
    return {
      text: '',
      hasText: false,
    };
  } else {
    return {
      text: initialText,
      hasText: true,
    };
  }
}
function createSetAction<Text extends string>(text: Text): setTextAction<Text> {
  return {
    type: 'setText',
    text,
  };
}
function createClearAction(): clearTextAction {
  return {
    type: 'clear',
  };
}
/**
 * create a action for dispatch to the custom hook
 * @template Text
 * @typedef {object} createAction
 * @property {(text: Text) => setTextAction<Text>} set - set text to the custom hook
 * @property {() => clearTextAction} clear - clear text from the custom hook
 */
export const createTextAction = {
  /**
   * set text to the custom hook
   * @param {string} text - The text to be used in the custom hook
   * @returns {setTextAction<string>} - The action to be setText text to the custom hook
   */
  setText: createSetAction,
  /**
   * clear text from the custom hook
   * @returns {clearTextAction} - The action to be clear text from the custom hook
   */
  clear: createClearAction,
} as {
  /**
   * set text to the custom hook
   * @param {string} text - The text to be used in the custom hook
   * @returns {setTextAction<Text>} - The action to be set text to the custom hook
   */
  setText: <Text extends string>(text: Text) => setTextAction<Text>;
  /**
   * clear text from the custom hook
   * @returns {clearTextAction} - The action to be clear text from the custom hook
   */
  clear: () => clearTextAction;
};
/**
 * @template Text
 * @param {object} object
 * @param {Text} object.initText - Initial text
 * @returns
 */
export function useText<Text extends string>({ initText }: useTextProps<Text>) {
  return useReducer<textReducer<Text>>(reducer, initFunction(initText));
}
