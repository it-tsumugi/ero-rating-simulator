import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

type calProbPropsType = {
  target_rate: number;
  opponent_rate: number;
};

type updateRatingPropsType = {
  winner: "a" | "b";
};

type updatePropsType = {
  target: "a" | "b";
};

function App() {
  const [a_rate, setARate] = useState(1500);
  const [b_rate, setBRate] = useState(1500);

  //第一引数のプレイヤーが第二引数のプレイヤーに勝利する確率を返す関数
  const caliculate_probability = (props: calProbPropsType) => {
    const { target_rate, opponent_rate } = props;
    const probability_a_win =
      1 / (10 ** ((opponent_rate - target_rate) / 400) + 1);
    return probability_a_win;
  };

  //勝利したプレイヤー名を引数としてレートを更新する関数
  const update_rating = (props: updateRatingPropsType) => {
    const { winner } = props;

    const update = (props: updatePropsType) => {
      const { target } = props;
      const taget_rate = winner === "a" ? b_rate : a_rate;
      const opponent_rate = winner === "a" ? a_rate : b_rate;
      const k = winner === target ? 32 : -32;
      const update_target_rate = target === "a" ? a_rate : b_rate;

      return Math.round(
        update_target_rate +
          k *
            caliculate_probability({
              target_rate: taget_rate,
              opponent_rate: opponent_rate,
            })
      );
    };

    setARate(update({ target: "a" }));
    setBRate(update({ target: "b" }));
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/">
          <ComponentContaier>
            <h1 style={{ margin: 0 }}>イローレーティングシミュレータ</h1>
            <PlayersConainer>
              <Player>
                <div>{"プレイヤーAのレート : " + a_rate}</div>
                <h2>プレイヤーA</h2>
                <button onClick={() => update_rating({ winner: "a" })}>
                  プレイヤーAの勝利
                </button>
              </Player>
              <Player>
                <div>{"プレイヤーBのレート : " + b_rate}</div>
                <h2>プレイヤーB</h2>
                <button onClick={() => update_rating({ winner: "b" })}>
                  プレイヤーBの勝利
                </button>
              </Player>
            </PlayersConainer>
          </ComponentContaier>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const ComponentContaier = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: skyblue;
  width: 100vw;
  height: 100vh;
`;

const PlayersConainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 50px;
`;

const Player = styled.div`
  text-align: center;
`;

export default App;
