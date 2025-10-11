import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js';
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Radio, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { saveSurveyResponse } from '../db/dbStore.js';

// ===================== PAGE 2 =====================
const questionsSurvey1 = [
  "My audience finds me to be highly educated and trustworthy about the subject matter at hand.",
  "I always change my voice and point of emphasis in order to suit the needs and interests of those listening.",
  "When offering a suggestion, I focus on explaining the direct benefits and positive outcomes for the people I'm trying to persuade.",
  "When making a point, I frequently utilize colorful, emotionally charged language that has a strong impact.",
  "I use relevant personal tales or brief narratives (anecdotes) to demonstrate and make abstract subjects more understandable.",
  "I make sure my arguments are backed up by reliable data, facts, or figures rather than just my own opinion.",
  "I want to reduce unneeded filler words and typical linguistic ticks (e.g. 'um,' 'uh').",
  "I value straightforward communication, starting with the most important facts.",
  "I only use technical or industry-specific terms when it's necessary and understood by my audience."
];

export function Page1() {
  const [answers, setAnswers] = useState({});
  const userId = "anonymous"; // Replace with real user ID if available

  const handleRadioChange = async (index, value) => {
    const updatedAnswers = { ...answers, [index]: value };
    setAnswers(updatedAnswers);

    // Save to Firestore (only this page's answers)
    await saveSurveyResponse(userId, { page1: updatedAnswers });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Button
          component={Link}
          to="/"
          variant="outlined"
          startIcon={<HomeIcon />}
          sx={{
            mb: 2,
            color: 'black',
            fontWeight: 'bold',
            borderColor: 'black',
            '&:hover': {
              borderColor: 'black',
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          Home
        </Button>
        <Typography variant="h1">Excellent Speaking and Writing Strategies</Typography>
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
              {questionsSurvey1.map((q, index) => (
                <TableRow key={index}>
                  <TableCell>{q}</TableCell>
                  <TableCell align="center">
                    <Radio
                      checked={answers[index] === "true"}
                      onChange={() => handleRadioChange(index, "true")}
                      value="true"
                      name={`q${index + 12}`}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Radio
                      checked={answers[index] === "false"}
                      onChange={() => handleRadioChange(index, "false")}
                      value="false"
                      name={`q${index + 12}`}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}