import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import classnames from 'classnames';

const variants: Variants = {
  initial: { opacity: 1, display: 'flex' },
  visible: { opacity: 1, flexBasis: '100%' },
  hidden: { opacity: 0, transitionEnd: { display: 'none' } },
};

enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
}

function App() {
  const [tick, setTick] = useState(0);
  const [winner, setWinner] = useState<Direction>();

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => {
        // 10秒一个轮回, 前5秒没有胜出者
        if (prev % 10 < 5) {
          setWinner(undefined);
        } else {
          // 第5秒产生结果
          setWinner((prev) => {
            if (!prev) {
              return Math.random() > 0.5 ? Direction.DOWN : Direction.UP;
            }

            return prev;
          });
        }

        return prev + 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 text-white">
      <Player winner={winner} direction={Direction.DOWN} tick={tick} />
      <Player winner={winner} direction={Direction.UP} tick={tick} />
    </div>
  );
}

function Player(props: { tick: number; winner?: Direction; direction: Direction }) {
  const { winner, direction, tick } = props;
  const isWinner = winner && direction === winner;
  // 假设每局5秒后播放动画
  const animating = winner && tick % 10 >= 5;
  const isDown = direction === Direction.DOWN;

  return (
    <motion.div
      className={classnames(
        'h-screen flex-1 w-0 flex items-center justify-center font-bold text-5xl overflow-hidden',
        isDown ? 'bg-red-500' : 'bg-green-500'
      )}
      variants={variants}
      animate={animating ? (isWinner ? 'visible' : 'hidden') : 'initial'}
      transition={animating ? { duration: 1 } : { duration: 0 }}
    >
      {isDown ? 'Down' : 'Up'}
    </motion.div>
  );
}

export default App;
