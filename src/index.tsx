import React, {useReducer} from 'react';
import {createRoot} from 'react-dom/client';
import {Button, Modal} from 'antd';
import {wrapper} from './index.module.less';

function test(p: string) {
  return 'ok';
}

test('1');

interface IState {
  open: boolean;
  name: string;
}

const initState = {
  open: false,
  name: '',
};

function App() {
  const [state, setState] = useReducer((pre: IState, next: Partial<IState>) => {
    return {
      ...pre,
      ...next,
    };
  }, initState);

  return (
    <div>
      hey, <Button onClick={() => setState({open: true})}>click open modal</Button>
      <br />
      <Button type="primary">click2</Button>
      <div className={wrapper}></div>
      <Modal open={state.open} onCancel={() => setState({open: false})}>
        11213
      </Modal>
    </div>
  );
}

createRoot(document.getElementById('app') as HTMLElement).render(<App />);
