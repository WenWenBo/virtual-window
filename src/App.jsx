import { useEffect, useRef, useState } from "react";
import { fetchData } from "./helper";
import memoizeOne from 'memoize-one';
import VirtuList, { AutoSizer } from 'virtual-list';
// import { VariableSizeList } from 'react-window';

import styles from './app.module.css';
// import Scroll from "./Scroll";

function App() {
  const listRef = useRef();
  const rowHeights = useRef({});
  const [state, setState] = useState({
    messages: [],
    originalIndex: 0,
  });

  const getItemStyle = memoizeOne((index) => ({}));

  const Row = ({ data, index, style }) => {
    const rowRef = useRef({});
    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight)
      }
    }, [rowRef, index])
    // console.log({data,index, style})
    return <div ref={rowRef} style={style} index={index}>
      { state.messages[index]
        ? <div className={styles.itemWrap}>
          【{index}】- 
          { state.messages[index].paragraph }
        </div>
        : <div>没有内容：{index}</div>
      }
    </div>
  };

  const setRowHeight = (index, size) => {
    // listRef.current.resetAfterIndex(0)
    rowHeights.current = {
      ...rowHeights.current,
      [index]: size,
    };
  }

  const getRowHeight = (index) => {
    return rowHeights.current[index] || 60;
  }

  useEffect(() => {
    const list = fetchData();
    setState({ originalIndex: 0, messages: list});
  }, []);

  const startReached = (e) => {
    const list = fetchData(10);
    setState((prev) => {
      return {
        originalIndex: prev.originalIndex + list.length,
        messages: [...list, ...prev.messages],
      };
    });
    listRef.current.restReachCallbacks({ start: true })
  }
  const endReached = (e) => {
    // const list = fetchData(10);
    // setState((prev) => {
    //   return {
    //     ...prev,
    //     ...{ messages: [...prev.messages, ...list], followOutput: true }
    //   }
    // });
    // listRef.current.restReachCallbacks({ end: true })
  }

  const addMessage = (num = 1) => {
    const list = fetchData(num);
    listRef.current.followOutput()
    setState((prev) => {
      return {
        ...prev,
        ...{ messages: [...prev.messages, ...list] }
      }
    });
  }

  return (
    <div className="App">
      <div style={{
        width: 800,
        height: 800,
        backgroundColor: 'pink'
      }}>
        {/* <Scroll/> */}
        {/* <AutoSizer>
          {({ height, width }) => (
            <div
              style={{
                height,
                width,
              }}
            >我是内容</div>
          )}
        </AutoSizer> */}
        {
          state.messages.length > 0
            ? <VirtuList
            itemCount={state.messages.length}
            itemSize={getRowHeight}
            originalIndex={state.originalIndex}
            // ref={listRef}
            width={800}
            height={800}
            initialIndex={0}
            startReached={startReached}
            endReached={endReached}
          >
            { Row }
          </VirtuList> : null
        }
      </div>

      <div>
        <button onClick={() => {
          listRef.current.resetAfterIndex(1, true)
        }}>清缓存</button>

        <button onClick={() => {
          getItemStyle(-1)
        }}>赋值getItemStyle</button>
        <button onClick={() => {
          console.log(getItemStyle())
        }}>测试memoizeOne</button>
        <button onClick={() => {
          addMessage();
        }}>新增</button>
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
