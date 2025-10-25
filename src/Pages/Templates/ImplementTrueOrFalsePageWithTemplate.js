export function Page6() {
  const trueFalseQuestions = [
    "I regularly provide constructive feedback.",
    "I avoid confrontation whenever possible."
  ];
  return <SurveyPage pageTitle="Feedback & Confrontation" pageKey="page6" questions={trueFalseQuestions} options={["true","false"]} />;
}
