import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import Card from "../components/card";
import { EnvelopeIcon, HeartIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Github, Instagram, Twitter } from "@icons-pack/react-simple-icons";

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
  { question: "我按时履行对朋友或上司的义务。", type: "future" },
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
    question: "你不可能真的能规划未来，変化大多了。",
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
  { question: "我列下要做的事情的清单。", type: "future" },
  { question: "我经常随心所欲，而非跟随理性。", type: "present-hedonistic" },
  { question: "当我知道有工作没完成时，我能抵制诱惑。", type: "future" },
  { question: "我发现自己常常被激情冲昏头脑。", type: "present-hedonistic" },
  {
    question: "如今的生活太复杂了，我更喜欢过去简单点的生活。",
    type: "present-fatalistic",
  },
  {
    question: "我更喜欢那些随性的朋友，而不是有计划的朋友。",
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

  return Object.fromEntries(
    Object.entries(totalAndCount).map(([type, tac]) => [
      type,
      tac.total / tac.count,
    ])
  ) as Result;
}

function ifAnswersAvailable(answers: number[]): boolean {
  return (
    answers.length === questions.length &&
    answers.every((answer) => Number.isInteger(answer) && answer > 0)
  );
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

  const answersAvailable = useMemo(() => {
    return ifAnswersAvailable(answers);
  }, [answers]);

  const calcResult = useCallback(() => {
    setResult(calculateAnswers(answers));
    storeAnswers([]);
  }, [answers]);

  useEffect(() => {
    setAnswers(restoreAnswers());
  }, []);

  return (
    <div className="relative isolate flex items-center min-h-screen flex-col overflow-hidden bg-gray-100 text-black dark:bg-neutral-900 dark:text-gray-100">
      <Head>
        <title>津巴多时间观量表</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="在线计算津巴多时间观量表结果" />
        <meta
          name="keywords"
          content="津巴多, 津巴多量表, 津巴多时间观, 津巴多时间观量表, 津巴多时间观量表计算, 津巴多时间观量表在线计算, 津巴多量表在线计算, 津巴多在线计算, ZTPI, ztpi, Zimbardo, Zimbardo Time Perspective Inventory"
        />
        <meta name="author" content="Nooc" />
      </Head>
      <div className="fixed  -z-10 blur-3xl top-0 left-0 h-96 w-48 bg-indigo-500/30 duration-500 dark:bg-blue-500/40" />
      <div className="fixed -z-10 blur-3xl  left-60 top-96 h-64 w-72 rounded-lg bg-green-500/30  duration-700 dark:bg-indigo-500/40" />
      <div className="fixed -z-10 blur-3xl  right-96 bottom-60 h-60 w-60 rounded-lg bg-red-500/30 dark:bg-violet-500/30" />
      <div className="fixed -z-10 blur-3xl  right-0 bottom-0 h-48 w-96 rounded-full bg-yellow-500/30 dark:bg-cyan-500/30" />

      <Header />

      <main className="flex grow max-w-xl px-5 flex-col justify-center space-y-5">
        {questions.map((question, index) => (
          <QuestionCard
            key={index}
            number={index + 1}
            question={question}
            answer={answers[index]}
            onAnswer={(a) => answer(index, a)}
          />
        ))}
        <button
          className="disabled:opacity-50"
          disabled={!answersAvailable}
          onClick={() => calcResult()}
        >
          <Card className="rounded-full">
            {answersAvailable ? "查看结果" : "完成所有选项查看结果"}
          </Card>
        </button>
        {result && <ResultCard result={result} />}
      </main>

      <Footer />
    </div>
  );
};

function ResultCard({ result }: { result: Result }) {
  return (
    <Card className="py-5">
      <div className="grid grid-cols-3 gap-5">
        <p className="text-right col-span-2 text-gray-700 dark:text-gray-400">
          消极的过去时间观
        </p>
        <p className="text-left">{result["past-negative"].toFixed(2)}</p>
        <p className="text-right col-span-2 text-gray-700 dark:text-gray-400">
          积极的过去时间观
        </p>
        <p className="text-left">{result["past-positive"].toFixed(2)}</p>
        <p className="text-right col-span-2 text-gray-700 dark:text-gray-400">
          宿命论现在时间观
        </p>
        <p className="text-left">{result["present-fatalistic"].toFixed(2)}</p>
        <p className="text-right col-span-2 text-gray-700 dark:text-gray-400">
          享乐主义现在时间观
        </p>
        <p className="text-left">{result["present-hedonistic"].toFixed(2)}</p>
        <p className="text-right col-span-2 text-gray-700 dark:text-gray-400">
          未来时间观
        </p>
        <p className="text-left">{result.future.toFixed(2)}</p>
      </div>
    </Card>
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
    <Card className="flex">
      <div className="w-5 text-gray-500 text-right mr-2">{number}.</div>
      <div className="grow">
        <div className="border-b dark:border-white/10 border-black/10 pb-2">
          {question.question}
        </div>
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-5 mt-2">
          <div
            className={classNames(
              "text-center cursor-pointer transition-colors rounded dark:border-gray-700 border p-2 text-sm border-gray-200",
              {
                "bg-white/50": answer !== 1,
                "dark:bg-black/50": answer !== 1,
                "bg-blue-500": answer === 1,
                "text-white/90": answer === 1,
              }
            )}
            onClick={() => onAnswer(1)}
          >
            极不符合
          </div>
          <div
            className={classNames(
              "text-center cursor-pointer rounded dark:border-gray-700 border p-2 text-sm border-gray-200",
              {
                "bg-white/50": answer !== 2,
                "dark:bg-black/50": answer !== 2,
                "bg-blue-500": answer === 2,
                "text-white/90": answer === 2,
              }
            )}
            onClick={() => onAnswer(2)}
          >
            不符合
          </div>
          <div
            className={classNames(
              "text-center cursor-pointer rounded dark:border-gray-700 border p-2 text-sm border-gray-200",
              {
                "bg-white/50": answer !== 3,
                "dark:bg-black/50": answer !== 3,
                "bg-blue-500": answer === 3,
                "text-white/90": answer === 3,
              }
            )}
            onClick={() => onAnswer(3)}
          >
            中间态
          </div>
          <div
            className={classNames(
              "text-center cursor-pointer rounded dark:border-gray-700 border p-2 text-sm border-gray-200",
              {
                "bg-white/50": answer !== 4,
                "dark:bg-black/50": answer !== 4,
                "bg-blue-500": answer === 4,
                "text-white/90": answer === 4,
              }
            )}
            onClick={() => onAnswer(4)}
          >
            符合
          </div>
          <div
            className={classNames(
              "text-center cursor-pointer rounded dark:border-gray-700 border p-2 text-sm border-gray-200",
              {
                "bg-white/50": answer !== 5,
                "dark:bg-black/50": answer !== 5,
                "bg-blue-500": answer === 5,
                "text-white/90": answer === 5,
              }
            )}
            onClick={() => onAnswer(5)}
          >
            极为符合
          </div>
        </div>
      </div>
    </Card>
  );
}

function Header() {
  return (
    <header className="px-5 max-w-xl w-full mt-10 mb-5">
      <h1 className="text-2xl">津巴多时间观量表</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer className="pb-16 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600">
          <a href="https://nooc.ink" target="_blank">
            <svg
              className="cursor-pointer  text-gray-700 dark:text-gray-400"
              width="35px"
              viewBox="0 0 291 249"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Nooc"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Avatar-Template"
                  transform="translate(-54.000000, -54.000000)"
                  fill="currentColor"
                >
                  <path
                    d="M199.5,54 C279.857431,54 345,119.142569 345,199.5 C345,239.745848 328.65989,276.17526 302.25197,302.515935 L199,199.264935 L96.249446,302.016217 C70.1345949,275.715474 54,239.491955 54,199.5 C54,119.142569 119.142569,54 199.5,54 Z"
                    id="Sun"
                  ></path>
                </g>
              </g>
            </svg>
          </a>
        </div>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          <li>
            <a
              href="https://nooc.ink"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-400"
            >
              <span className="sr-only">Homepage</span>
              <HomeIcon className="h-6 w-6" aria-hidden />
            </a>
          </li>

          <li>
            <a
              href="https://www.instagram.com/noobnooc/"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-400"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" aria-hidden />
            </a>
          </li>

          <li>
            <a
              href="https://twitter.com/noobnooc"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-400"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" aria-hidden />
            </a>
          </li>

          <li>
            <a
              href="https://github.com/noobnooc/ztpi"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-400"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" aria-hidden />
            </a>
          </li>

          <li>
            <a
              href="mailto:nooc@nooc.ink"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-400"
            >
              <span className="sr-only">Email</span>
              <EnvelopeIcon className="h-6 w-6" aria-hidden />
            </a>
          </li>
        </ul>
      </div>

      <p className="flex items-center justify-center text-sm text-gray-500">
        Crafted by
        <a className="mx-1 underline" href="https://nooc.ink" target="_blank">
          Nooc
        </a>
        with <HeartIcon className="ml-1 h-5 w-5" />
      </p>
      <p className="text-center text-sm text-gray-500">© 2022</p>
      <div className="mt-4 text-center text-sm text-gray-500">
        <p className="my-1 uppercase opacity-60">Acknowledgement</p>
        Powered by TypeScript / React / TailwindCSS and more
        <br />
        Hosted on Vercel
      </div>
    </footer>
  );
}

export default Home;
