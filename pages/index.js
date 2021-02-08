import { getMakes } from "../filterdb/getmakes";
import {getModels} from '../filterdb/getmodels';
import { Field, Form, Formik, useField, useFormikContext } from "formik";
import useSWR from 'swr';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  SelectProps,
} from "@material-ui/core";

import router, {useRouter} from 'next/router'
import {useState,useEffect} from 'react'


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "auto",
    maxWidth: 500,
    padding: theme.spacing(3),
  },
}));

const prices =[ 5000, 10000, 15000, 20000, 240000, 350000, 500000]



export default function Home({makes, models}) {
  //const { makes, models } = props;
  const classes = useStyles();
  const { query } = useRouter();
  const initialValues = {
    make: query.make || 'all',
    model: query.model || 'all',
    minPrice: query.minPrice || 'all',
    maxPrice: query.maxPrice || 'all'
    
  };
  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {
      router.push(
        {
          pathname: '/cars',
          query: { ...values, page: 1 },
        },
        undefined,
        { shallow: false }
      )

    }}>
      {({ values }) => (
        <Form>
          <Paper elevation={3} className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-make">Make</InputLabel>
                  <Field
                    name="make"
                    as={Select}
                    labelId="search-make"
                    label="Make"
                  >
                    <MenuItem value="all">
                      <em>All Makes</em>
                    </MenuItem>
                    {Object.entries(makes).map((make) => (
                      <MenuItem key={make[0]} value={make[0]}>
                        {`${make[0]} (${make[1]})`}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
             
              <Grid item xs={12} sm={12}>
                 <ModelSelect initialMake={initialValues.make} make={values.make} name="model" models={models} />
              </Grid>
              
              <Grid style={{display:"none"}} item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-min-price">Min Price</InputLabel>
                  <Field
                    name="minPrice"
                    as={Select}
                    labelId="search-min-price"
                    label="Min Price"
                  >
                    <MenuItem value="all">
                      <em>No Min</em>
                    </MenuItem>
                    {prices.map((price) => (
                      <MenuItem key={price} value={price}>
                        {price}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid style={{display:"none"}} item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-max-price">Max Price</InputLabel>
                  <Field
                    name="maxPrice"
                    as={Select}
                    labelId="search-max-price"
                    label="Max Price"
                  >
                    <MenuItem value="all">
                      <em>No Max</em>
                    </MenuItem>
                    {prices.map((price) => (
                      <MenuItem key={price} value={price}>
                        {price}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>

                 <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Search
                </Button>
              </Grid>       
            </Grid>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}

export function ModelSelect({ initialMake, models, make, ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name
  });

  const initialModelsOrUndefined = make === initialMake ? models : undefined;

  const { data: newModels } = useSWR('/api/models?make=' + make, {
    dedupingInterval: 60000,
    initialData: make === 'all' ? [] : initialModelsOrUndefined 
  });

  useEffect(() => {
    if (!newModels?.map((a) => a.model).includes(field.value)) {
      setFieldValue('model', 'all');
    }
  }, [make, newModels]);

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="search-model">Model</InputLabel>
      <Select
        name="model"
        labelId="search-model"
        label="Model"
        {...field}
        {...props}
      >
        <MenuItem value="all">
          <em>All Models</em>
        </MenuItem>
        {newModels?.map((model) => (
          <MenuItem key={model.model} value={model.model}>
            {`${model.model}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export const getServerSideProps = async (context) => {
  const make = context.query.make;
  const [makes, models] = await Promise.all([
    getMakes(),
    getModels(make)

  ])
  return {
    props: { makes: makes, models:models },
  };
};
