import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import { useRouter } from 'next/router'
import Head from 'next/head'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: '100%',
  },
  image: {
   with:'100%'
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  extra:{
    margin:"20px 0px"
  }
}));

export default function CarDetails({ car }) {
  const classes = useStyles();
  const router = useRouter();

  if (!car) {
    return <div> No Car Found</div>;
  }
  return (
    <div className={classes.root} key={car.id}>
        <Head>
        <title>{car.make + ' ' + car.model}</title>
      </Head>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={car.photoUrl}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              <Typography variant="h5">
                  {car.make + ' ' + car.model}
                </Typography>
                <Typography gutterBottom variant="h4">
                  ${car.price}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  Year: {car.year}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  KMs: {car.kilometers}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  Fuel Type: {car.fuelType}
                </Typography>
                <Typography gutterBottom variant="body1" color="textSecondary">
                  Details: {car.details}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" style={{ cursor: "pointer", textDecoration:'underline' }}>
                <span onClick={() => router.back()}> Back To Results</span>
                </Typography>
              </Grid>
            </Grid>
            
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2} className={classes.extra}>
        <Grid item xs={12} md={3} sm={3}> 
         <Paper className={classes.paper} >
           <Typography variant="h6">
             Some Ad space
           </Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          </Paper>
         </Grid>
       
        <Grid item xs={12} md={3} sm={3}>
        <Paper className={classes.paper} >
           <Typography variant="h6">
             Some Ad space
           </Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} sm={3}>
        <Paper className={classes.paper} >
           <Typography variant="h6">
             Some Ad space
           </Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} sm={3}>
        <Paper className={classes.paper} >
           <Typography variant="h6">
             Some Ad space
           </Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

// * fetch the searched car
export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const url = "https://api.jsonbin.io/b/601fbcb8d5aafc6431a519a2/4";
  const response = await fetch(url);
  const result = await response.json();
  const filtered = result.cars.filter((car) => {
    if (car.id === parseInt(id)) {
      return car;
    }
  });

  return {
    props: { car: filtered[0] || null },
  };
};
