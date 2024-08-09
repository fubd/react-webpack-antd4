import React, {useContext, useEffect, useReducer, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Button, Modal} from 'antd';
import {wrapper} from './index.module.less';
import {Provider, connect, useDispatch, useSelector} from 'react-redux';
import store from './store';
import {createSelector} from 'reselect';

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

  const [count, setCount] = useState(0);

  return (
    <div>
      hey, <Button onClick={() => setState({open: true})}>click open modal1</Button>
      <br />
      <Button type="primary">click2</Button>
      <div className={wrapper}></div>
      <Modal open={state.open} onCancel={() => setState({open: false})}>
        11213
      </Modal>
      <Button onClick={() => setCount(count + 1)}>click to increase,, {count}</Button>
    </div>
  );
}

const Home = (props) => {
  // console.log('props', props.userId)

  const userId = useSelector((state: any) => state.userId);
  const dispatch = useDispatch();
  return (
    <div>
      123, home,
      <hr></hr>
      <button
        onClick={() => {
          dispatch({type: 'ADD_ID', payload: userId + 1});
        }}
      >
        click, {userId}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log('.....', state);
  return {...state};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addId: (v) => {
      dispatch({type: 'ADD_ID', payload: v});
    },
  };
};

const Home1 = connect(mapStateToProps, mapDispatchToProps)(Home);

const Lily = () => {
  return (
    <div>
      <Provider store={store}>
        <div>
          lily
          <Home1></Home1>
        </div>
      </Provider>
    </div>
  );
};

const Rose = () => {
  const data = {
    name: 'jack',
    age: 10,
  };
  function calc() {
    console.log('>>>>>>');
    return data.name + data.age;
  }

  const calc1 = createSelector(calc);

  return (
    <div>
      <button onClick={calc}>click</button>
    </div>
  );
};

const MyContext = React.createContext<any>(null);

function C3() {
  // const contextValue = useContext(MyContext);
  console.log('render c3...');
  // const userId = useSelector((state: any) => state.userId);
  return <div style={{border: '1px solid powderblue'}}>c3</div>;
}

function C1() {
  return (
    <div style={{border: '1px solid hotpink'}}>
      c1
      <C3></C3>
    </div>
  );
}

const C41 = connect((state: any) => {
  return {userId: state.userId};
})(C4);

function C4(props: any) {
  console.log('render c4...');
  const userId = useSelector((state: any) => state.userId);
  // const contextValue = useContext(MyContext);

  return <div style={{border: '1px solid green'}}>c4, {userId}</div>;
}

function C2() {
  console.log('c2')
  return (
    <div style={{border: '1px solid orange', margin: 24}}>
      c2 <C4></C4>
    </div>
  );
}

function Daisy(props: any) {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  console.log('~~');
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>click1</button>
      <button onClick={() => dispatch({type: 'ADD_ID', payload: (Math.random() * 1000).toString().slice(0, 2)})}>
        click
      </button>
      <br />
      <MyContext.Provider value={count}>
        <C1></C1>
        <C2></C2>
      </MyContext.Provider>
    </div>
  );
}

const Daisy1 = connect()(Daisy);

const App1 = () => {
  return (
    <Provider store={store}>
      <Daisy1 />
    </Provider>
  );
};

createRoot(document.getElementById('app') as HTMLElement).render(<App1 />);
