import {useState} from 'react';
import {Button} from 'antd';
import {useSnapshot} from 'valtio';
import {store, addMenu} from './store';
import * as styles from './index.module.less';

const Home = () => {
  const [count, setCount] = useState(0);
  const snap = useSnapshot(store);

  return (
    <div className={styles.wrapper}>
      <Button type="primary" onClick={() => setCount(count + 1)}>
        click, {count}
      </Button>
      <br />
      <Button onClick={addMenu}>click, {snap.menu}</Button>
    </div>
  );
};

export default Home;
