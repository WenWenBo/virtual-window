import { useEffect, useRef, useState } from "react";
import { fetchData } from "./helper";
import VirtuList from 'virtual-list';

import styles from './app.module.css';

function App() {
  const listRef = useRef();
  const rowHeights = useRef({});
  const [messages, setMessages] = useState([]);

  const Row = ({ data, index, style }) => {
    // console.log({data,index, style})
    return <div style={style} className={styles.itemWrap} index={index}>
      { messages[index]
        ? <div>{ messages[index].paragraph }</div>
        : <div>没有内容：{index}</div>
      }
    </div>
  };

  const getRowHeight = (index) => {
    return rowHeights.current[index] + 8 || 60;
  }

  useEffect(() => {
    setMessages(fetchData());
  }, []);
  return (
    <div className="App">
      <div style={{
        width: 800,
        height: 800,
        backgroundColor: 'pink'
      }}>
        <VirtuList
          itemCount={messages.length}
          itemSize={getRowHeight}
          ref={listRef}
          width={800}
          height={800}
          
        >
          { Row }
        </VirtuList>
      </div>

      <div>
        <button onClick={() => {
          listRef.current.resetAfterIndex(1, true)
        }}>清缓存</button>
      </div>
      
      {/* <Button
        color='white'
        backgroundcolor='black'
        style={{
          padding: 25
        }}
        onClick={() => {
          alert('Clicks working!')
        }}

      >
        cool Button
      </Button> */}
    </div>
  );
}

export default App;
