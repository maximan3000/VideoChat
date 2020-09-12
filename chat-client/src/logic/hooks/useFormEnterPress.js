import {useState} from 'react';

/**
 * Do anything when <Enter> pressed
 * @callback onEnter
 */

/**
 * @callback onEnterPress
 * @param {Event} event
 */

/**
 * @param {onEnter} onEnter Callback when <Enter> pressed
 * @return {(onEnterPress|boolean)[]}
 * Array of 2 elements:
 * 1. Wrapped function, occures when event.key is <Enter>
 * 2. State isFocus that set true inside wrapped function
 * @example
 * const sendText = () => {...sending text...}
 * const [onPressEnter, isFocus] = useFormEnterPress(sendText);
 * ...
 * <TextField onKeyPress={onPressEnter} focused={isFocus}/>
 */
export const useFormEnterPress = (onEnter) => {
  const [isFocus, setIsFocus] = useState(true);
  const onEnterPress = (event) => {
    if (event.key === 'Enter') {
      onEnter();
      setIsFocus(true);
    }
  };
  return [onEnterPress, isFocus];
};
