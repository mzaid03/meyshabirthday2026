import { useState } from "react";
import { motion } from "framer-motion";
import type { Step } from "./types";

type NextProps = { onNext: () => void };

function Screen({ children, night = false }: { children: React.ReactNode; night?: boolean }) {
  return (
    <motion.section
      className={night ? "screen night" : "screen"}
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65 }}
    >
      {children}
    </motion.section>
  );
}

export function Opening({ onNext }: NextProps) {
  const [stage, setStage] = useState<"sleeping" | "waking" | "running" | "ready">("sleeping");
function resetOpening() {
  setStage("sleeping");
}
  function startAnimation() {
    if (stage !== "sleeping") return;

    setStage("waking");
    setTimeout(() => setStage("running"), 2200);
    setTimeout(() => setStage("ready"), 4300);
  }

  return (
    <Screen>
      <div className="mochiScene">
        <motion.div
          className={`mochiCharacter ${stage}`}
          onClick={startAnimation}
          animate={
            stage === "sleeping"
              ? { y: [0, -5, 0] }
              : stage === "waking"
              ? { rotate: [0, -8, 8, -4, 4, 0], scale: [1, 1.04, 1] }
              : stage === "running"
              ? { x: [-220, 0, 35, 0], scale: [1, 1.1, 1] }
              : { y: [0, -8, 0] }
          }
          transition={{
            duration: stage === "running" ? 1.8 : 1.2,
            repeat: stage === "sleeping" || stage === "ready" ? Infinity : 0,
          }}
        >
          <div className="zzz">{stage === "sleeping" && "Zzz"}</div>
          <div className="catFace">🐱</div>
          <div className="bow">🎀</div>
          <div className="speechBubble">
            {stage === "sleeping" && "tap me..."}
            {stage === "waking" && "wait is that actually you?"}
            {stage === "running" && "I have something for you!!"}
            {stage === "ready" && "Okay okay, now I'm ready!"}
          </div>
        </motion.div>

        {stage === "running" && (
          <motion.div
            className="dragGift"
            initial={{ x: -260, opacity: 0 }}
            animate={{ x: 30, opacity: 1 }}
            transition={{ duration: 1.7 }}
          >
            🎁
          </motion.div>
        )}
      </div>

      {stage === "sleeping" && (
  <>
    <h1 className="title">Hey! it's Mochi! I am back again!!!!</h1>
    <p className="subtitle">
      Lowkey I am sleeping right now, kinda busy dreaming about you😉😉 <p>Hey, but do tap me when you are ready for a journey.</p>
    </p>
  </>
)}

      {stage === "ready" && (
        <>
          <p className="speech">
            Assalamu Alaikum Meysha, so glad to meet you again! I have been collecting a few little surprises for someone really special (aka you)!
          </p>
          <button className="mainBtn" onClick={onNext}>
            Begin the Little Journey
          </button>
        </>
      )}
    </Screen>
  );
}

export function GiftRoom({ onNext }: NextProps) {
  const gifts = [
    {
      emoji: "🎁",
      text: `Allah let our paths cross in a way I did not expect,
and through your kindness, I found a reason to reflect.
Not only on the happiness you bring into my days,
but on becoming better in so many ways.`,
    },
    {
      emoji: "💝",
      text: `Your heart shows itself in the smallest things you do,
in every kind word, every effort, every thoughtful view.
You make people feel cared for without even trying,
and that is a beauty worth always admiring.`,
    },
    {
      emoji: "🌸",
      text: `I still remember the gift you made with so much care,
twelve hours of love placed into something rare.
Not because of what it was, but what it showed to me:
how precious your heart and sincerity will always be.`,
    },
  ];

  const [opened, setOpened] = useState<number[]>([]);

  return (
    <Screen>
      <h1 className="title">Mochi's Gift Room</h1>
      <p className="subtitle">Before we officially start, I have few messages for you!</p>

      <div className="giftGrid">
        {gifts.map((gift, index) => (
          <motion.button
            className="giftBox"
            key={index}
            whileTap={{ scale: 0.9 }}
            onClick={() => !opened.includes(index) && setOpened([...opened, index])}
          >
            <span className="giftEmoji">{opened.includes(index) ? "✨" : gift.emoji}</span>
            <p>{opened.includes(index) ? gift.text : "Open me"}</p>
          </motion.button>
        ))}
      </div>

      {opened.length === gifts.length && (
        <button className="mainBtn" onClick={onNext}>
          Follow Mochi
        </button>
      )}
    </Screen>
  );
}

export function FlowerGarden({ onNext }: NextProps) {
  const flowers = [
    "May Allah bless your pure heart and keep you close to him.",
    "May Allah protect your beautiful smile.",
    "May Allah make pharmacy school easy for you so you can heal me and save my life when I get beat up by bunch of zios.",
    "May Allah increase you in noor and make your presence a source of goodness wherever you go.",
    "May Allah give you more happiness than you expect.",
    "May Allah grant you Jannah (please take me with you🙏).",
  ];

  const [bloomed, setBloomed] = useState<number[]>([]);

  return (
    <Screen>
      <h1 className="title">Du'a Garden</h1>
      <p className="subtitle">I know there is a long path before us till we get married InshAllah and ofc we can't pray together like those couples do but lets do a virtual prayer shall we?</p>

      <div className="flowerGarden">
        {flowers.map((dua, index) => (
          <motion.button
            key={index}
            className={bloomed.includes(index) ? "flowerCard bloomed" : "flowerCard"}
            whileHover={{ y: -8 }}
            onClick={() => !bloomed.includes(index) && setBloomed([...bloomed, index])}
          >
            <span>{bloomed.includes(index) ? "🌷" : "🌱"}</span>
            <p>{bloomed.includes(index) ? dua : "Bloom"}</p>
          </motion.button>
        ))}
      </div>

      {bloomed.length === flowers.length && (
        <button className="mainBtn" onClick={onNext}>
          Go to the Stars
        </button>
      )}
    </Screen>
  );
}

export function StarSky({ onNext }: NextProps) {
  const stars = [
    "🏆 Most Creative Award wooooooo — I don't even know how one can make that bouquet and garland like where and how do you even start??",
    "🌸 Masterchef Award woooooooo — I know the only got to try your food once but man you are killing me with your stories and instants! Ay also I am also getting better at cooking so be ready for the cookout challenge buddy, hope you did't forget about it!",
    "🎀 Most Prettiest Person Award wooooooo — I do not think I even have to explain why you got it. Allah blessed you with a beauty that not only shows in your smile, but in your kindness, sincerety, and the way you care for people.",
    "💊 Best Pharmacist Award woooooooooo —  I know sometimes it might feel a little tough and you might have doubts, but to me you are the best pharmacist and I know you will be the best pharmacist in the world InshAllah.",
    "🐱 Mochi's Favorite Human Award — unanimously decided, no other nominees allowed👊.",
  ];

  const [selected, setSelected] = useState<number | null>(null);
  const [clicked, setClicked] = useState<number[]>([]);
  const [fireworks, setFireworks] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  return (
    <Screen night>
      <h1 className="title moonTitle">Mochi's Award Ceremony</h1>
      <p className="subtitle light">Click each trophy to see what you've won!</p>

      <div className="fireworksLayer">
        {fireworks.map((firework) => (
          <div
            key={firework.id}
            className="firework"
            style={{
              left: firework.x,
              top: firework.y,
            }}
          >
            {Array.from({ length: 18 }).map((_, particleIndex) => (
              <span
                key={particleIndex}
                className="fireworkParticle"
                style={{
                  "--angle": `${particleIndex * 20}deg`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="starField">
        {stars.map((star, index) => (
          <motion.button
            key={index}
            className="star"
            style={{
              left: `${12 + index * 17}%`,
              top: `${20 + (index % 2) * 35}%`,
            }}
            animate={{ scale: [1, 1.25, 1], rotate: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
            onClick={(e) => {
              setSelected(index);

              if (!clicked.includes(index)) {
                setClicked([...clicked, index]);
              }

              const rect = e.currentTarget.getBoundingClientRect();

              const newFirework = {
                id: Date.now(),
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              };

              setFireworks((current) => [...current, newFirework]);

              setTimeout(() => {
                setFireworks((current) =>
                  current.filter((firework) => firework.id !== newFirework.id)
                );
              }, 900);
            }}
          >
            ⭐
          </motion.button>
        ))}
      </div>

      {selected !== null && <p className="starMessage">{stars[selected]}</p>}

      {clicked.length === stars.length && (
        <button className="mainBtn" onClick={onNext}>
          Wanna see what's next?
        </button>
      )}
    </Screen>
  );
}

export function MusicBox({ onNext }: NextProps) {
  const questions = [
    {
      question: "Who is the unc of the day?",
      options: ["Abir", "Meysha", "Redwan", "Someya"],
      answer: "Meysha",
    },
    {
      question: "Who is Abirs favorite Quran reciter?", 
      options: ["Mochi", "Ronaldo", "Mufti Menk", "Meysha"], 
      answer: "Meysha",
    },
    {
      question: "What is Abirs favorite gift?",
      options: [
        "A bouquet and garland made by his naseeb (InshAllah)",
        "Thobes",
        "A giant pizza",
        "Messi Jersey",
      ],
      answer: "A bouquet and garland made by his naseeb (InshAllah)",
    },
    {
      question: "What is Mochi's official rating for Meysha?",
      options: ["infinite/10", "7/10", "Needs more evidence", "0/10"],
      answer: "infinite/10",
    },
    {
      question: "Who is Meysha's biggest fan ever?",
      options: [
        "Abir", "Ronaldo", "Mochi", "Meysha herself"],
      answer: "Abir",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [message, setMessage] = useState("");
  const [finished, setFinished] = useState(false);
  const [locked, setLocked] = useState(false);

  const currentQuestion = questions[current];

  function chooseAnswer(option: string) {
    if (locked || finished) return;

    if (option !== currentQuestion.answer) {
      setMessage("Mochi says try againnn 🤭");
      return;
    }

    setLocked(true);
    setMessage("Correct! Mochi knew you would get it 🐱✨");

    setTimeout(() => {
      if (current === questions.length - 1) {
        setFinished(true);
        setMessage("You got every question right! Mochi says you are officially the birthday champion 🏆");
      } else {
        setCurrent((number) => number + 1);
        setMessage("");
        setLocked(false);
      }
    }, 2000);
  }

  return (
    <Screen>
      <h1 className="title">Mochi's Birthday Quiz</h1>
      <p className="subtitle">
        A few tiny questions about the birthday girl herself 🤭
      </p>

      {!finished && (
        <div className="triviaCard">
          <p className="questionNumber">
            Question {current + 1} of {questions.length}
          </p>

          <h2>{currentQuestion.question}</h2>

          <div className="triviaOptions">
            {currentQuestion.options.map((option) => (
              <motion.button
  key={option}
  className="cuteOption"
  onClick={() => chooseAnswer(option)}
  disabled={locked}
  whileHover={{ scale: 1.04, y: -6 }}
  whileTap={{ scale: 0.95 }}
>
  <span className="optionSparkle">✨</span>
  <span>{option}</span>
  <span className="optionHeart">🤍</span>
</motion.button>
            ))}
          </div>
        </div>
      )}

      <p className="message">{message}</p>

      {finished && (
        <button className="mainBtn" onClick={onNext}>
          Continue to the Final Surprise ✨
        </button>
      )}
    </Screen>
  );
}

export function VideoDoor({ onNext }: NextProps) {
  return (
    <Screen>
      <motion.div
        className="door"
        animate={{ rotateY: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🚪
      </motion.div>

      <h1 className="title">The Little Door</h1>
      <p className="subtitle">
        Behind this door is the main message Mochi was protecting.
      </p>

      <button className="mainBtn" onClick={onNext}>
        Open with Bismillah
      </button>
    </Screen>
  );
}

export function FinalMessage({ onNext }: NextProps) {
  return (
    <Screen night>
      <h1 className="title moonTitle">For Meysha</h1>

      <div className="finalCard">
        <p>
          Assalamu Alaikum Meysha.
        </p>

        <p>
          Hope you are doing well, as always!</p>
        <p>
          Now, I know you don't celebrate birthdays, and I want to respect that, especially after my mistake last year. So instead of wishing you a happy birthday, I wanted to use today as an opportunity to remind you of how much you are appreciated and to make du'a for another year of life that Allah has blessed you with.
        </p>

        <p>
          To begin with, I heard that you started Pharmacy School at Touro! Dude, I am so proud of you. Every day you give me another reason to want to become a better version of myself, and I am genuinely proud of the person you are becoming. I know this next chapter is not always going to be easy, but I genuinely believe you are capable of accomplishing everything you are working toward. May Allah make this journey as smooth as possible for you, place barakah in your education, and grant you the best pharmacy school experience along with all the success you ask Him for. In shaa Allah, one day you are going to look back at all the studying, stress, long nights, and sacrifices and realize that they helped shape you into the amazing pharmacist you worked so hard to become.
        </p>

        <p>
          Meysha, you are genuinely one of the most thoughtful people I have ever met. And I do not just say that because of the big things you have done. It is the little things too. The way you care about people, the effort you put into things, your patience, your kindness, and how naturally you make the people around you feel cared for. Those are qualities that cannot be bought or forced. They come from the heart, and I hope you never lose them.
        </p>

        <p>
          I will obviously never forget what you did for my graduation. You spent so many hours making that bouquet and garland for me, and I do not think I will ever be able to look at them as just gifts. What meant the most to me was knowing how much of your time, effort, and heart went into making someone else happy. That is just the kind of person you are, and I hope you know that your effort never went unnoticed.
        </p>

        <p>
          But beyond every gift, every memory, and everything else, one of the greatest things you have ever done for me is something you probably cannot even hold in your hands. You helped me become closer to Allah. Through our conversations and the person you have shown yourself to be, you gave me another reason to look at myself and want to become stronger in my deen and better in my character. That is something I will always be grateful to you for, because there are very few gifts more valuable than someone having a positive impact on your relationship with Allah.
        </p>

        <p>
          So more than anything else, I just want to say thank you. Thank you for your kindness, your sincerity, your patience, your effort, and for simply being the person you are.
        </p>

        <p>
          And for this next year Allah has given you, I have a lot more du'as for you than I have wishes.
        </p>

        <p>
          May Allah increase you in noor. May He protect you and your family from every form of harm. May He place endless barakah in your education, your health, your time, and your future. May He make Pharmacy School easy for you and allow you to become a pharmacist who brings comfort and benefit to countless people. May He strengthen your iman through every stage of your life, keep your heart close to Him, and never allow this dunya to take away the beautiful qualities He has placed within you. May Allah answer the du'as you make quietly that nobody else knows about, grant you things greater than what you thought to ask for, and make every difficulty you experience a means of bringing you closer to Him.
        </p>

        <p>
          And whatever Allah has written for your future, I pray that it is beautiful. I pray that the people, opportunities, accomplishments, and experiences He has written for you bring you closer to Him and fill your life with peace and barakah. And as for everything else that only Allah knows about our futures, I leave it with Him. If there is khayr written for us, then may Allah protect it, guide us toward it in the right way, and make it something that brings both of us closer to Him. And if Allah has written that future for us, then I can't wait for the day I get to call you my wife, In shaa Allah. 🤍
        </p>

        <p>
          Never stop being the kind, thoughtful, hardworking, slightly crazy future pharmacist that you are. You have an incredibly beautiful journey ahead of you, In shaa Allah.
        </p>

        <p>
          May Allah increase you in noor, Meysha, and may He make this next year of your life better than every year that came before it.
        </p>

        <p>
          And with that... I think Mochi has bothered you enough for one day 😭.
        </p>

        <p>
          Take care!
        </p>

        <p>
          Assalamu Alaikum, Meysha. 🤍
        </p>
      </div>
      <p className="ending">May Allah bless you always, Meysha 🤍</p>

      <button className="mainBtn" onClick={onNext}>
        Mochi has one more thing to say...
      </button>
    </Screen>
  );
}
function NextYearDate() {
  return <span>August 15, 2027</span>;
}

export function GoodnightMochi({ onReplay }: { onReplay: () => void }) {
  return (
    <Screen night>
      <motion.div
        className="mochiCharacter sleeping"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div className="catFace">😴</div>
        <div className="zzz">Zzz</div>
      </motion.div>

      <p className="ending">
        Mochi's getting sleepy again... rest well, Meysha 🤍
      </p>
      <p className="ending small">
        See you again on <NextYearDate />, InshAllah and remember like I always say, there is a beautiful day waiting for you!❤️ 
      </p>

      <button className="mainBtn ghost" onClick={onReplay}>
        While I sleep I'll take you back to the beginning of this journey! 🐱
      </button>
    </Screen>
  );
}
export function Progress({ step, steps }: { step: Step; steps: Step[] }) {
  const index = steps.indexOf(step);

  return (
    <div className="progress">
      {steps.map((item, i) => (
        <div key={item} className={i <= index ? "dot active" : "dot"} />
      ))}
    </div>
  );
}

export function RibbonBorder() {
  return (
    <>
      <div className="ribbon top" />
      <div className="ribbon bottom" />
      <div className="ribbon left" />
      <div className="ribbon right" />
    </>
  );
}

export function FloatingDecor() {
  return (
    <div className="decor">
      <span>🌙</span>
      <span>✨</span>
      <span>🌸</span>
      <span>🤍</span>
      <span>⭐</span>
    </div>
  );
}
