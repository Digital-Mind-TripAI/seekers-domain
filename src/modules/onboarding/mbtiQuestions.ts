// src/modules/onboarding/mbtiQuestions.ts

export type MbtiDimension = "EI" | "SN" | "TF" | "JP";

export interface MbtiQuestion {
  id: string;
  prompt: string;
  optionA: string;
  optionB: string;
  dimension: MbtiDimension;
  // true  => "a" maps to first letter (E/S/T/J)
  // false => "a" maps to second letter (I/N/F/P)
  aIsFirstLetter: boolean;
}

export const mbtiQuestions: MbtiQuestion[] = [
  // E vs I
  {
    id: "ei_01",
    prompt: "You feel more energetic after:",
    optionA: "Spending time with a group of people",
    optionB: "Spending time alone",
    dimension: "EI",
    aIsFirstLetter: true, // a = E, b = I
  },
  {
    id: "ei_02",
    prompt: "You prefer to spend your free time:",
    optionA: "Going out and socializing",
    optionB: "Staying home and enjoying solitude",
    dimension: "EI",
    aIsFirstLetter: true,
  },
  {
    id: "ei_03",
    prompt: "You prefer to work:",
    optionA: "In a team",
    optionB: "Alone",
    dimension: "EI",
    aIsFirstLetter: true,
  },
  {
    id: "ei_04",
    prompt: "You feel more comfortable:",
    optionA: "Speaking up in a group discussion",
    optionB: "Listening during a group discussion",
    dimension: "EI",
    aIsFirstLetter: true,
  },
  {
    id: "ei_05",
    prompt: "You prefer to communicate:",
    optionA: "By talking",
    optionB: "In writing",
    dimension: "EI",
    aIsFirstLetter: true,
  },
  {
    id: "ei_06",
    prompt: "You prefer:",
    optionA: "Many friends with shorter contact",
    optionB: "A few friends with more lengthy contact",
    dimension: "EI",
    aIsFirstLetter: true,
  },
  {
    id: "ei_07",
    prompt: "You are more attracted to:",
    optionA: "Social events with lots of people",
    optionB: "Quiet events with a few close friends",
    dimension: "EI",
    aIsFirstLetter: true,
  },
  {
    id: "ei_08",
    prompt: "You are more:",
    optionA: "Outgoing",
    optionB: "Reserved",
    dimension: "EI",
    aIsFirstLetter: true,
  },
  {
    id: "ei_09",
    prompt: "You feel more comfortable:",
    optionA: "Expressing your thoughts and feelings",
    optionB: "Keeping your thoughts and feelings to yourself",
    dimension: "EI",
    aIsFirstLetter: true,
  },
  {
    id: "ei_10",
    prompt: "You prefer to learn:",
    optionA: "By doing or discussing",
    optionB: "By reading or thinking about the topic first",
    dimension: "EI",
    aIsFirstLetter: true,
  },

  // S vs N
  {
    id: "sn_01",
    prompt: "When learning something new, you prefer to:",
    optionA: "Start with the facts and details",
    optionB: "Start with the big picture and overall concept",
    dimension: "SN",
    aIsFirstLetter: true, // a = S, b = N
  },
  {
    id: "sn_02",
    prompt: "You trust information more when it is:",
    optionA: "Based on concrete, observable facts",
    optionB: "Based on patterns and possibilities",
    dimension: "SN",
    aIsFirstLetter: true,
  },
  {
    id: "sn_03",
    prompt: "You are more interested in:",
    optionA: "What is actually happening",
    optionB: "What could possibly happen",
    dimension: "SN",
    aIsFirstLetter: true,
  },
  {
    id: "sn_04",
    prompt: "You prefer to focus on:",
    optionA: "The present and the here-and-now",
    optionB: "The future and the what-could-be",
    dimension: "SN",
    aIsFirstLetter: true,
  },
  {
    id: "sn_05",
    prompt: "You are more:",
    optionA: "Practical and realistic",
    optionB: "Imaginative and innovative",
    dimension: "SN",
    aIsFirstLetter: true,
  },
  {
    id: "sn_06",
    prompt: "You prefer to solve problems by:",
    optionA: "Using proven methods",
    optionB: "Coming up with new ideas",
    dimension: "SN",
    aIsFirstLetter: true,
  },
  {
    id: "sn_07",
    prompt: "You prefer to:",
    optionA: "Experience things in the present moment",
    optionB: "Think about future possibilities",
    dimension: "SN",
    aIsFirstLetter: true,
  },
  {
    id: "sn_08",
    prompt: "You trust:",
    optionA: "Your experience and what you see in the present",
    optionB: "Your intuition and what you believe could happen",
    dimension: "SN",
    aIsFirstLetter: true,
  },
  {
    id: "sn_09",
    prompt: "You prefer to:",
    optionA: "Use established skills",
    optionB: "Learn new skills",
    dimension: "SN",
    aIsFirstLetter: true,
  },
  {
    id: "sn_10",
    prompt: "You are more interested in:",
    optionA: "What you see, touch, or do",
    optionB: "Ideas and concepts",
    dimension: "SN",
    aIsFirstLetter: true,
  },

  // T vs F
  {
    id: "tf_01",
    prompt: "When making a decision, you are more likely to:",
    optionA: "Consider the logical consequences",
    optionB: "Consider the impact on people's feelings",
    dimension: "TF",
    aIsFirstLetter: true, // a = T, b = F
  },
  {
    id: "tf_02",
    prompt: "You believe it's more important to:",
    optionA: "Be objective and detached",
    optionB: "Be compassionate and considerate",
    dimension: "TF",
    aIsFirstLetter: true,
  },
  {
    id: "tf_03",
    prompt: "When making a decision, you prefer to:",
    optionA: "Analyze the pros and cons",
    optionB: "Follow your heart and consider how others will feel",
    dimension: "TF",
    aIsFirstLetter: true,
  },
  {
    id: "tf_04",
    prompt: "You are more likely to:",
    optionA: "Question and challenge",
    optionB: "Accept and support",
    dimension: "TF",
    aIsFirstLetter: true,
  },
  {
    id: "tf_05",
    prompt: "You prefer to:",
    optionA: "Be fair and just",
    optionB: "Be merciful and forgiving",
    dimension: "TF",
    aIsFirstLetter: true,
  },
  {
    id: "tf_06",
    prompt: "You are more:",
    optionA: "Impersonal and objective",
    optionB: "Personal and empathetic",
    dimension: "TF",
    aIsFirstLetter: true,
  },
  {
    id: "tf_07",
    prompt: "You prefer to:",
    optionA: "Use logic and analysis to solve problems",
    optionB: "Use your values and feelings to solve problems",
    dimension: "TF",
    aIsFirstLetter: true,
  },
  {
    id: "tf_08",
    prompt: "You make decisions based on:",
    optionA: "Objective logic and facts",
    optionB: "Your feelings and values",
    dimension: "TF",
    aIsFirstLetter: true,
  },
  {
    id: "tf_09",
    prompt: "You are more likely to:",
    optionA: "Be skeptical and doubtful",
    optionB: "Be trusting and optimistic",
    dimension: "TF",
    aIsFirstLetter: true,
  },
  {
    id: "tf_10",
    prompt: "You believe it's more important to:",
    optionA: "Be truthful, even if it hurts someone's feelings",
    optionB: "Be tactful, even if it means stretching the truth",
    dimension: "TF",
    aIsFirstLetter: true,
  },

  // J vs P
  {
    id: "jp_01",
    prompt: "You feel more comfortable when:",
    optionA: "Things are settled and decided",
    optionB: "Things are open and flexible",
    dimension: "JP",
    aIsFirstLetter: true, // a = J, b = P
  },
  {
    id: "jp_02",
    prompt: "When working on a project, you prefer to:",
    optionA: "Follow a clear plan and timeline",
    optionB: "Adapt and make up the plan as you go",
    dimension: "JP",
    aIsFirstLetter: true,
  },
  {
    id: "jp_03",
    prompt: "You prefer to:",
    optionA: "Finish one project completely before starting another",
    optionB: "Juggle multiple projects at the same time",
    dimension: "JP",
    aIsFirstLetter: true,
  },
  {
    id: "jp_04",
    prompt: "You prefer to:",
    optionA: "Have a set schedule",
    optionB: "Go with the flow",
    dimension: "JP",
    aIsFirstLetter: true,
  },
  {
    id: "jp_05",
    prompt: "You are more:",
    optionA: "Organized and orderly",
    optionB: "Spontaneous and flexible",
    dimension: "JP",
    aIsFirstLetter: true,
  },
  {
    id: "jp_06",
    prompt: "You prefer to:",
    optionA: "Make decisions as soon as possible",
    optionB: "Delay decisions in case circumstances change",
    dimension: "JP",
    aIsFirstLetter: true,
  },
];
