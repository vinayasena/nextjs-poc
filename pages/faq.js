import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    margin: "10px auto",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  answer: {
    fontSize: "18px;",
  },
}));

export default function Faq({ faq }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {faq.map((f) => {
        return (
          <Accordion key={f.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Q: {f.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.answer}>A: {f.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

// * fetch the faqs and return faqs data to props
export const getStaticProps = async () => {
  const response = await fetch(
    "https://api.jsonbin.io/b/601fbdcf06934b65f52f94b9/1"
  );
  const result = await response.json();
  return {
    props: result,
  };
};
