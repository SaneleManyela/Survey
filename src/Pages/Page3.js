import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js';
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Radio, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { saveSurveyResponse } from '../db/dbStore.js';

// ===================== PAGE 4 =====================
const leadershipQuestions = [
  "I see myself as a forceful, uncompromising negotiator.",
  "Dominating and defeating the other party is the best approach for resolving a dispute.",
  "I try to ensure the other party feels they have gained something and can leave the negotiation feeling satisfied.",
  "To make space for my desired outcome, I intentionally start negotiations with an aggressive demand or offer.",
  "In a really effective negotiation, one party wins everything and the other loses everything.",
  "Both parties should leave the table with something beneficial after reaching an agreement.",
  "When disagreeing, I focus on paying close attention to understand the other person's point of view.",
  "I refuse to surrender or compromise during an argument because I am confident about my point.",
  "I always take into consideration how important it is to keep a positive, long-term working relationship while resolving conflicts with coworkers.",
  "People who are too friendly or welcoming get the worst outcomes in conflict resolution."
];

export function Page3() {
  const [answers, setAnswers] = useState({});
  const userId = "anonymous"; // Replace with real user ID if available

  const handleRadioChange = async (index, value) => {
    const updatedAnswers = { ...answers, [index]: value };
    setAnswers(updatedAnswers);

    // Save to Firestore (only this page's answers)
    await saveSurveyResponse(userId, { page3: updatedAnswers });
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
        <Typography variant="h1">Style of Conflict Resolution Self-Evaluation</Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Instructions:</strong> Indicate the extent to which each statement describes your attitude or behavior by selecting one number. 1 = Very Inaccurate (VI) | 2 = Moderately Inaccurate (MI) | 3 = Neither Accurate nor Inaccurate (N) | 4 = Moderately Accurate (MA) | 5 = Very Accurate (VA)
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Statement</TableCell>
                {[1,2,3,4,5].map(num => (
                  <TableCell key={num}>{num}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {leadershipQuestions.map((q, index) => (
                <TableRow key={index}>
                  <TableCell>{q}</TableCell>
                  {[1,2,3,4,5].map(num => (
                    <TableCell key={num} align="center">
                      <Radio
                        checked={answers[index] === num.toString()}
                        onChange={() => handleRadioChange(index, num.toString())}
                        value={num.toString()}
                        name={`cp${index + 1}`}
                        color="primary"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}