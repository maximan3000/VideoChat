import {useContext} from 'react';
import {IContext} from './IContext';
import {SocketContext} from './SocketContext';

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  return new IContext(context);
};
