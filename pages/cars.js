
import Home from '.'
import { getMakes } from "../filterdb/getmakes";
import {getModels} from '../filterdb/getmodels';
import {getCars} from '../filterdb/getcars';
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
import CarCard from '../components/CarCard';
import router, {useRouter} from 'next/router'
import {useState,useEffect} from 'react'



export default function CarsList({makes, models, cars}) {
  return (
    <div>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={5} lg={4}>
            <Home makes={makes} models={models}/>
          </Grid>
          <Grid container item xs={12} sm={6} md={7} lg={8} spacing={3}>
           {
               cars.map((car)=>{
                return( 
                     <Grid  key={car.id} item xs={12} sm={6}>
                        <CarCard car={car} />
                        
                      </Grid>
                    )
               })
           }
          </Grid>
      </Grid>
    </div>
  );
}

export const getServerSideProps = async (context) => {
    const make = context.query.make;

    const [makes, models, cars] = await Promise.all([
      getMakes(),
      getModels(make),
      getCars(context.query)
  
    ])
    
    return {
      props: { makes: makes, models:models, cars:cars },
    };
  };