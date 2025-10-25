import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Radio,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import { saveSurveyResponse } from "../db/dbStore.js";

const questionsSurvey0 = [
  "Typically, when I speak in a group, others tend to pause and listen.",
  "My written work, such as emails and social media posts, consistently receives excellent responses.",
  "I typically return calls as soon as I get voicemail.",
  "I constantly seek chances to deliver presentations or speak in front of audiences.",
  "My writing, such as letters to editors or company newsletter articles, has been published or made public.",
  "I've had at least two messages or comments complimenting my own blog or website.",
  "I have received 'B' or higher marks for nearly all my academic papers as well as projects.",
  "Any time I tell a joke or a comment that I find funny, people usually chuckle.",
  "I keep myself informed by watching news shows on television or reading news articles online.",
  "My voice and gestures have been described as enthusiastic, vibrant, colorful, and dynamic by others.",
  "I usually send text messages with better grammar and spelling than I receive."
];

export function Page0() {
  const [answers, setAnswers] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const userId = "anonymous"; // replace with real user id

  const handleRadioChange = async (index, value) => {
    const updatedAnswers = { ...answers, [index]: value };
    setAnswers(updatedAnswers);

    // Save page responses
    await saveSurveyResponse(userId, { page: "page0", answers: updatedAnswers });

    // Show pop-up if last question
    if (index === questionsSurvey0.length - 1) {
      setShowPopup(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Typography variant="h1">Foundations of Communication Style</Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Statement</TableCell>
                <TableCell align="center">Mostly True</TableCell>
                <TableCell align="center">Mostly False</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questionsSurvey0.map((q, index) => (
                <TableRow key={index}>
                  <TableCell>{q}</TableCell>
                  <TableCell align="center">
                    <Radio
                      checked={answers[index] === "true"}
                      onChange={() => handleRadioChange(index, "true")}
                      name={`q${index}`}
                      value="true"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Radio
                      checked={answers[index] === "false"}
                      onChange={() => handleRadioChange(index, "false")}
                      name={`q${index}`}
                      value="false"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* Pop-up dialog for last radio */}
        <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
          <DialogContent sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => setShowPopup(false)}
              sx={{ fontSize: 24, width: 80, height: 80, borderRadius: 2 }}
            >
              ✅
            </Button>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}