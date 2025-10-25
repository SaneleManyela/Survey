import { SurveyPage } from "./SurveyPage.js";

const page5Questions = [
  "I engage in and like arguments or conflicts at work.",
  "I would appreciate feedback that is open and truthful, even if it is harsh.",
  "My natural reaction when I'm insulted is to withdraw rather than react.",
  "I feel that avoiding unnecessary disagreement is typically the best strategy.",
  "Workplace conflict can either motivate or depress me.",
  "When my department or team is compared to others, I feel competitive.",
  "I like the challenge of work competitions or 'turf wars.'",
  "When someone is nasty to me, I usually feel forced to return the favor."
];

export function Page5() {
  return <SurveyPage pageTitle="Assessing One's Leadership: Potential towards Conflict" pageKey="page5" questions={page5Questions} options={[1,2,3,4,5]} />;
}
