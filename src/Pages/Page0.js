import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js';
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Radio, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { saveSurveyResponse } from '../db/dbStore.js';

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
  // Track answers in state
  const [answers, setAnswers] = useState({});
  const userId = "anonymous"; // Replace with real user ID if available

  // Handle radio change and save to Firestore
  const handleRadioChange = async (index, value) => {
    const updatedAnswers = { ...answers, [index]: value };
    setAnswers(updatedAnswers);

    // Save to Firestore (only this page's answers)
    await saveSurveyResponse(userId, { page0: updatedAnswers });
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
        <Typography variant="h1">Foundations of Communication Style</Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Instructions:</strong> Please indicate whether the following statements are <strong>Mostly True</strong> or <strong>Mostly False</strong> in relation to your personal communication style.
        </Typography>
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
                      value="true"
                      name={`q${index + 1}`}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Radio
                      checked={answers[index] === "false"}
                      onChange={() => handleRadioChange(index, "false")}
                      value="false"
                      name={`q${index + 1}`}
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