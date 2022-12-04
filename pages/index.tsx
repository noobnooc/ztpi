import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";

type QuestionType =
  | "past-negative"
  | "present-hedonistic"
  | "future"
  | "past-positive"
  | "present-fatalistic";

type Question = {
  question: string;
  type: QuestionType;
  reversed?: boolean;
};

const questions: Question[] = [
  {
    question: "我相信和朋友一起参加聚会是生活中重要的乐趣之一。",
    type: "present-hedonistic",
  },
  {
    question: "和童年相似的情景、声音、味道经常使我回忆起一系列美好往事。",
    type: "past-positive",
  },
  {
    question: "命运决定了我人生中很多事。",
    type: "present-fatalistic",
  },
  {
    question: "我经常想起生命中有些事我本该做得不一样。",
    type: "past-negative",
  },
  {
    question: "我的决定很大程度上受到周围的人和事的影响。",
    type: "past-negative",
  },
  { question: "我相信人的一天应该在每天早上就提前计划好。", type: "future" },
  { question: "回想我的过去令我愉悦。", type: "past-positive" },
  { question: "我做事冲动。", type: "present-hedonistic" },
  {
    question: "即使事情不能按时做完，我也不担心。",
    type: "future",
    reversed: true,
  },
  {
    question: "我想完成某件事时，会设立目标并考虑达到目标的具体途径。",
    type: "future",
  },
  {
    question: "总的来说，在我的过去，美好回忆比糟糕回忆多得多。",
    type: "past-positive",
  },
  {
    question: "听我最喜欢的音乐时，我经常忘了时间。",
    type: "present-hedonistic",
  },
  {
    question:
      "赶完明天截止的任务，还有完成其他必要的工作，优先于看今晚的演出。",
    type: "future",
  },
  {
    question: "该来的总是会来，所以我做什么其实不重要。",
    type: "present-fatalistic",
  },
  {
    question: "我喜欢那些描述“美好旧时光”里一切都是怎么样的故事。",
    type: "past-positive",
  },
  { question: "过去痛苦的经历经常在我脑海里重现。", type: "past-negative" },
  {
    question: "我试着让我的生活尽量充实，过一天算一天。",
    type: "present-hedonistic",
  },
  { question: "自己赴约迟到会让我觉得沮丧不安。", type: "future" },
  {
    question: "理想地说，我想把每天当做生命中的最后一天来过。",
    type: "present-hedonistic",
  },
  {
    question: "我很容易想起曾经快乐的时光，美好的回忆。",
    type: "past-positive",
  },
  { question: "我按町履行対朋友或上司的义务。", type: "future" },
  { question: "过去我受到的侮辱和拒绝都是应得的。", type: "past-negative" },
  { question: "我一时冲动做出決定。", type: "present-hedonistic" },
  {
    question: "我顺其自然地度日，而不是试着计划它。",
    type: "future",
    reversed: true,
  },
  {
    question: "过去有太多不愉快的回忆了，我宁愿不回想。",
    type: "past-positive",
    reversed: true,
  },
  { question: "在我生活里找刺激是重要的。", type: "present-hedonistic" },
  { question: "我在过去犯了错误，要是可以撤销就好了。", type: "past-negative" },
  {
    question: "我觉得享受正在做的事比按时完成工作更重要。",
    type: "present-hedonistic",
  },
  { question: "我怀念我的童年。", type: "past-positive" },
  { question: "做決定之前，我会衡量得失。", type: "future" },
  { question: "冒险让我的生活不会无聊。", type: "present-hedonistic" },
  {
    question: "对我来说，享受人生旅程比只关注目的地更重要。",
    type: "present-hedonistic",
  },
  { question: "事情的发生基本不按我预期。", type: "past-negative" },
  { question: "让我忘掉年轻时不愉快的画面很难。", type: "past-negative" },
  {
    question:
      "如果我不得不考虑目标、结果和产出，那会夺走我在工作和活动中的快乐。",
    type: "present-fatalistic",
  },
  {
    question: "就算我享受现在，我也经常和过去相似的经历作比较。",
    type: "past-negative",
  },
  {
    question: "你不可能真的能規划未来，変化大多了。",
    type: "present-fatalistic",
  },
  {
    question: "我的人生之路受到我无法影响的力量控制。",
    type: "present-fatalistic",
  },
  {
    question: "担心未来是没意义的，既然我也什么都不能做。",
    type: "present-fatalistic",
  },
  { question: "我按部就班地准时完成任务。", type: "future" },
  {
    question: "我发现当家庭成员谈论过去是怎样时，我不会参与。",
    type: "past-positive",
    reversed: true,
  },
  { question: "我冒风险在生活中寻求刺激。", type: "present-hedonistic" },
  { question: "我列下要做的事情的清単。", type: "future" },
  { question: "我经常随心所欲，而非跟随理性。", type: "present-hedonistic" },
  { question: "当我知道有工作没完成时，我能抵制诱惑。", type: "future" },
  { question: "我发现自己常常被激情冲昏头脑。", type: "present-hedonistic" },
  {
    question: "如今的生活太复杂了，我更喜欢过去简单点的生活。",
    type: "present-fatalistic",
  },
  {
    question: "我更喜欢那些随性的朋友;而不是有计划的朋友。",
    type: "present-hedonistic",
  },
  { question: "我喜欢那些经常重复的家庭礼仪和传统。", type: "past-positive" },
  { question: "我想起过去发生在我身上的那些坏事。", type: "past-negative" },
  {
    question: "如果这个任务能让我进步，即使它困难、无聊我也会坚持做。",
    type: "future",
  },
  {
    question: "把今天挣的钱花在享乐上，要比存起来为了明天有保障更好。",
    type: "present-fatalistic",
  },
  { question: "幸运带来的回报比努力带来的要好。", type: "present-fatalistic" },
  { question: "我想起生命中我错过的美好事物。", type: "past-negative" },
  { question: "我喜欢我的亲密关系充满激情。", type: "present-hedonistic" },
  { question: "我总有时间赶上工作任务的。", type: "future", reversed: true },
];

const ANSWERS_KEY = "answers";

function restoreAnswers(): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  return (
    window.localStorage
      .getItem(ANSWERS_KEY)
      ?.split(",")
      .map((str) => Number(str)) ?? []
  );
}

function storeAnswers(answers: number[]) {
  if (typeof window === "undefined") {
    return;
  }

  return window.localStorage.setItem(ANSWERS_KEY, answers.join(","));
}

type Result = {
  [TKey in QuestionType]: number;
};

function calculateAnswers(answers: number[]): Result {
  const totalAndCount = answers
    .map((answer, index) => {
      const question = questions[index];

      return {
        type: question.type,
        calculatedPoint: question.reversed ? Math.abs(answer - 6) : answer,
      };
    })
    .reduce<{
      [TKey in QuestionType]: {
        total: number;
        count: number;
      };
    }>(
      (result, current) => {
        result[current.type].total += current.calculatedPoint;
        result[current.type].count++;

        return result;
      },
      {
        "past-negative": {
          total: 0,
          count: 0,
        },
        "present-hedonistic": {
          total: 0,
          count: 0,
        },
        future: {
          total: 0,
          count: 0,
        },
        "past-positive": {
          total: 0,
          count: 0,
        },
        "present-fatalistic": {
          total: 0,
          count: 0,
        },
      }
    );

  console.log("aaa: ", totalAndCount);

  return Object.fromEntries(
    Object.entries(totalAndCount).map(([type, tac]) => [
      type,
      tac.total / tac.count,
    ])
  ) as Result;
}

const Home: NextPage = () => {
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<Result | undefined>(undefined);

  const answer = useCallback(
    (index: number, answer: number) => {
      let newAnswers = [...answers];
      newAnswers[index] = answer;
      setAnswers(newAnswers);
      storeAnswers(newAnswers);
    },
    [answers]
  );

  const calcResult = useCallback(() => {
    setResult(calculateAnswers(answers));
    storeAnswers([]);
  }, [answers]);

  useEffect(() => {
    setAnswers(restoreAnswers());
  }, []);

  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-hidden bg-gray-100 text-black dark:bg-neutral-900 dark:text-gray-100">
      <Head>
        <title>津巴多时间观量表</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex grow flex-col justify-center">
        {questions.map((question, index) => (
          <QuestionCard
            key={index}
            number={index + 1}
            question={question}
            answer={answers[index]}
            onAnswer={(a) => answer(index, a)}
          />
        ))}
        <button onClick={() => calcResult()}>查看结果</button>
        {result && <ResultCard result={result} />}
      </main>

      <footer className="text-md py-10 text-center text-sm opacity-60">
        © 2022 Nooc
      </footer>
    </div>
  );
};

function ResultCard({ result }: { result: Result }) {
  return (
    <div>
      <p>
        消极的过去时间观: <span>{result["past-negative"].toFixed(2)}</span>
      </p>
      <p>
        积极的过去时间观: <span>{result["past-positive"].toFixed(2)}</span>
      </p>
      <p>
        宿命论现在时间观: <span>{result["present-fatalistic"].toFixed(2)}</span>
      </p>
      <p>
        享乐主义现在时间观:{" "}
        <span>{result["present-hedonistic"].toFixed(2)}</span>
      </p>
      <p>
        未来时间观: <span>{result.future.toFixed(2)}</span>
      </p>
    </div>
  );
}

function QuestionCard({
  number,
  question,
  answer,
  onAnswer,
}: {
  number: number;
  question: Question;
  answer: number;
  onAnswer(answer: number): void;
}) {
  return (
    <div>
      <div>
        {number}.{question.question}.{question.type}
      </div>
      <div className="ml-10">
        <div
          className={classNames({
            "bg-red-500": answer === 1,
          })}
          onClick={() => onAnswer(1)}
        >
          极不符合
        </div>
        <div
          className={classNames({
            "bg-red-500": answer === 2,
          })}
          onClick={() => onAnswer(2)}
        >
          不符合
        </div>
        <div
          className={classNames({
            "bg-red-500": answer === 3,
          })}
          onClick={() => onAnswer(3)}
        >
          中间态
        </div>
        <div
          className={classNames({
            "bg-red-500": answer === 4,
          })}
          onClick={() => onAnswer(4)}
        >
          符合
        </div>
        <div
          className={classNames({
            "bg-red-500": answer === 5,
          })}
          onClick={() => onAnswer(5)}
        >
          极为符合
        </div>
      </div>
    </div>
  );
}

export default Home;
